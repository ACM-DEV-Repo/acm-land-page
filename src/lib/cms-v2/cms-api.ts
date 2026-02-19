import { supabase } from "@/integrations/supabase/client";
import { LPRecord, LPContent, LPStatus, TrackingSettings } from "./cms-types";
import { Json } from "@/integrations/supabase/types";

// ============================================================
// CMS V2 API - Camada de persistência com tipagem rigorosa
// ============================================================

const rowToRecord = (row: any): LPRecord => ({
  id: row.id,
  lp_key: row.lp_key,
  name: row.name,
  slug: row.slug,
  status: row.status as LPStatus,
  content: row.content as unknown as LPContent,
  created_at: row.created_at ?? '',
  updated_at: row.updated_at ?? ''
});

export const fetchLPByRef = async (ref: string): Promise<LPRecord | null> => {
  try {
    const { data, error } = await supabase
      .from('bd_cms_lp_v2')
      .select('*')
      .or(`lp_key.eq.${ref},slug.eq.${ref}`)
      .single();

    if (error) {
      console.error(`[CMS-V2] Erro ao buscar LP (${ref}):`, error);
      return null;
    }

    if (!data) return null;
    return rowToRecord(data);
  } catch (err) {
    console.error(`[CMS-V2] Erro crítico no fetch:`, err);
    return null;
  }
};

export const fetchAllLPs = async (): Promise<LPRecord[]> => {
  try {
    const { data, error } = await supabase
      .from('bd_cms_lp_v2')
      .select('*')
      .order('lp_key');
    
    if (error) {
      console.error(`[CMS-V2] Erro ao listar LPs:`, error);
      return [];
    }
    
    return (data || []).map(rowToRecord);
  } catch (err) {
    console.error(`[CMS-V2] Erro crítico no fetchAll:`, err);
    return [];
  }
};

export const saveContent = async (lpKey: string, content: LPContent): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bd_cms_lp_v2')
      .update({
        content: content as unknown as Json,
        updated_at: new Date().toISOString()
      })
      .eq('lp_key', lpKey);

    if (error) {
      console.error(`[CMS-V2] Erro ao salvar content (${lpKey}):`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[CMS-V2] Erro crítico no saveContent:`, err);
    return false;
  }
};

export const saveLP = async (lp: Partial<LPRecord> & { lp_key: string }): Promise<boolean> => {
  try {
    const updatePayload = {
      lp_key: lp.lp_key,
      name: lp.name ?? '',
      slug: lp.slug ?? lp.lp_key,
      status: lp.status ?? 'draft',
      content: (lp.content ?? {}) as unknown as Json
    };

    const { error } = await supabase
      .from('bd_cms_lp_v2')
      .upsert(updatePayload, { onConflict: 'lp_key' });

    if (error) {
      console.error(`[CMS-V2] Erro ao salvar LP (${lp.lp_key}):`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[CMS-V2] Erro crítico no save:`, err);
    return false;
  }
};

export const deleteLP = async (lpKey: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bd_cms_lp_v2')
      .delete()
      .eq('lp_key', lpKey);

    if (error) {
      console.error(`[CMS-V2] Erro ao deletar LP (${lpKey}):`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[CMS-V2] Erro crítico no delete:`, err);
    return false;
  }
};

export const duplicateLP = async (
  sourceLpKey: string,
  newLpKey: string,
  newName: string,
  newSlug: string
): Promise<boolean> => {
  try {
    const source = await fetchLPByRef(sourceLpKey);
    if (!source) {
      console.error(`[CMS-V2] LP origem não encontrada: ${sourceLpKey}`);
      return false;
    }

    const { error } = await supabase
      .from('bd_cms_lp_v2')
      .insert({
        lp_key: newLpKey,
        name: newName,
        slug: newSlug,
        status: 'draft' as const,
        content: source.content as unknown as Json
      });

    if (error) {
      console.error(`[CMS-V2] Erro ao duplicar LP:`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[CMS-V2] Erro crítico no duplicate:`, err);
    return false;
  }
};

export const createLP = async (lp: Omit<LPRecord, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bd_cms_lp_v2')
      .insert({
        lp_key: lp.lp_key,
        name: lp.name,
        slug: lp.slug,
        status: lp.status,
        content: lp.content as unknown as Json
      });
    
    if (error) {
      console.error(`[CMS-V2] Erro ao criar LP:`, error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error(`[CMS-V2] Erro crítico no create:`, err);
    return false;
  }
};

export const updateLPStatus = async (lpKey: string, status: LPStatus): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bd_cms_lp_v2')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('lp_key', lpKey);
    
    if (error) {
      console.error(`[CMS-V2] Erro ao atualizar status:`, error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error(`[CMS-V2] Erro crítico no updateStatus:`, err);
    return false;
  }
};

export const updateLPSettings = async (lpKey: string, data: { name: string; slug: string }): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('bd_cms_lp_v2')
      .update({
        name: data.name,
        slug: data.slug,
        updated_at: new Date().toISOString()
      })
      .eq('lp_key', lpKey);

    if (error) {
      console.error(`[CMS-V2] Erro ao atualizar settings:`, error);
      return false;
    }

    return true;
  } catch (err) {
    console.error(`[CMS-V2] Erro crítico no updateSettings:`, err);
    return false;
  }
};

const GLOBAL_V2_KEY = 'global-v2';

export const fetchGlobalTrackingV2 = async (): Promise<TrackingSettings | null> => {
  try {
    const record = await fetchLPByRef(GLOBAL_V2_KEY);
    if (!record?.content?.tracking) return null;
    return record.content.tracking;
  } catch (err) {
    console.error('[CMS-V2] Erro ao buscar tracking global:', err);
    return null;
  }
};

export const saveGlobalTrackingV2 = async (tracking: TrackingSettings): Promise<boolean> => {
  try {
    const existing = await fetchLPByRef(GLOBAL_V2_KEY);

    if (existing) {
      const updatedContent = { ...existing.content, tracking };
      return await saveContent(GLOBAL_V2_KEY, updatedContent);
    }

    const { error } = await supabase
      .from('bd_cms_lp_v2')
      .insert({
        lp_key: GLOBAL_V2_KEY,
        name: 'Global V2 (Tracking)',
        slug: 'global-v2',
        status: 'active' as const,
        content: { tracking } as unknown as Json,
      });

    if (error) {
      console.error('[CMS-V2] Erro ao criar registro global-v2:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[CMS-V2] Erro crítico no saveGlobalTracking:', err);
    return false;
  }
};