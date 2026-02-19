import { supabase } from '@/integrations/supabase/client';

export type HomepageConfig = {
  version: 'v1' | 'v2';
  lp_ref: string;
};

export const DEFAULT_HOMEPAGE: HomepageConfig = { version: 'v1', lp_ref: 'lp01' };

export async function fetchHomepageConfig(): Promise<HomepageConfig> {
  try {
    const { data, error } = await (supabase as any)
      .from('bd_site_homepage')
      .select('version, lp_ref')
      .limit(1)
      .maybeSingle();

    if (error || !data) return DEFAULT_HOMEPAGE;
    const version = data.version as string;
    const lp_ref = data.lp_ref as string;
    if (version !== 'v1' && version !== 'v2') return DEFAULT_HOMEPAGE;
    if (!lp_ref?.trim()) return DEFAULT_HOMEPAGE;
    return { version: version as 'v1' | 'v2', lp_ref };
  } catch (err) {
    console.error('[Homepage] Erro crítico no fetch:', err);
    return DEFAULT_HOMEPAGE;
  }
}

export async function setHomepage(version: 'v1' | 'v2', lpRef: string): Promise<boolean> {
  try {
    if (version === 'v2') {
      const { data: lp, error: lpErr } = await supabase
        .from('bd_cms_lp_v2')
        .select('lp_key, status')
        .eq('lp_key', lpRef)
        .maybeSingle();
      if (lpErr || !lp) return false;
      if (lp.status !== 'active') return false;
    }

    const { data: existing } = await (supabase as any)
      .from('bd_site_homepage')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (existing?.id) {
      const { error: updErr } = await (supabase as any)
        .from('bd_site_homepage')
        .update({ version, lp_ref: lpRef, updated_at: new Date().toISOString() })
        .eq('id', existing.id);
      if (updErr) return false;
    } else {
      const { error: insErr } = await (supabase as any)
        .from('bd_site_homepage')
        .insert({ version, lp_ref: lpRef, updated_at: new Date().toISOString() });
      if (insErr) return false;
    }
    return true;
  } catch (err) {
    console.error('[Homepage] Erro crítico:', err);
    return false;
  }
}