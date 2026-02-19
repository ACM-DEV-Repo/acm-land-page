/**
 * Hook para acessar histórico de alterações do CMS
 * Permite rollback para versões anteriores
 * (Plano Blindado - Fase 4)
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CMSHistoryEntry {
  id: string;
  table_name: string;
  record_id: string | null;
  record_key: string | null;
  action: 'INSERT' | 'UPDATE' | 'DELETE' | 'BACKUP';
  old_data: Record<string, any> | null;
  new_data: Record<string, any> | null;
  changed_by: string | null;
  changed_at: string;
}

interface UseCMSHistoryOptions {
  tableName: string;
  recordId?: string;
  recordKey?: string;
  limit?: number;
}

/**
 * Hook para listar histórico de alterações
 */
export function useCMSHistory(options: UseCMSHistoryOptions) {
  const { tableName, recordId, recordKey, limit = 50 } = options;

  return useQuery({
    queryKey: ['cms-history', tableName, recordId, recordKey, limit],
    queryFn: async () => {
      let query = (supabase as any)
        .from('bd_cms_history')
        .select('*')
        .eq('table_name', tableName)
        .order('changed_at', { ascending: false })
        .limit(limit);
      
      if (recordId) {
        query = query.eq('record_id', recordId);
      }
      
      if (recordKey) {
        query = query.eq('record_key', recordKey);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as CMSHistoryEntry[];
    },
    staleTime: 1000 * 30, // 30 segundos
  });
}

/**
 * Hook para restaurar uma versão anterior
 */
export function useRestoreVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      tableName, 
      recordKey, 
      dataToRestore 
    }: { 
      tableName: string; 
      recordKey: string; 
      dataToRestore: Record<string, any>;
    }) => {
      // Remove campos de controle que não devem ser sobrescritos
      const { id, created_at, updated_at, ...cleanData } = dataToRestore;

      if (tableName === 'bd_cms_lp') {
        const { data, error } = await (supabase as any)
          .from('bd_cms_lp')
          .update(cleanData)
          .eq('lp_key', recordKey)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }

      if (tableName === 'bd_cms_conteudo') {
        const { data, error } = await (supabase as any)
          .from('bd_cms_conteudo')
          .update({ content: cleanData.content })
          .eq('id', recordKey)
          .select()
          .single();

        if (error) throw error;
        return data;
      }

      if (tableName === 'bd_cms_lp_v2') {
        const { data, error } = await supabase
          .from('bd_cms_lp_v2')
          .update({ content: cleanData.content })
          .eq('lp_key', recordKey)
          .select()
          .single();

        if (error) throw error;
        return data;
      }

      throw new Error(`Restore not supported for table: ${tableName}`);
    },
    onSuccess: (_, variables) => {
      // Invalida queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['cms-history'] });
      queryClient.invalidateQueries({ queryKey: ['cms-lp'] });
      queryClient.invalidateQueries({ queryKey: ['cms-content'] });
      queryClient.invalidateQueries({ queryKey: ['cms-v2'] });
    },
  });
}

/**
 * Utilitário para comparar duas versões e gerar diff
 */
export function generateDiff(
  oldData: Record<string, any> | null, 
  newData: Record<string, any> | null
): { added: string[]; removed: string[]; changed: string[] } {
  const added: string[] = [];
  const removed: string[] = [];
  const changed: string[] = [];

  const oldKeys = new Set(Object.keys(oldData || {}));
  const newKeys = new Set(Object.keys(newData || {}));

  // Campos adicionados
  newKeys.forEach(key => {
    if (!oldKeys.has(key)) {
      added.push(key);
    }
  });

  // Campos removidos
  oldKeys.forEach(key => {
    if (!newKeys.has(key)) {
      removed.push(key);
    }
  });

  // Campos alterados
  oldKeys.forEach(key => {
    if (newKeys.has(key)) {
      const oldVal = JSON.stringify(oldData?.[key]);
      const newVal = JSON.stringify(newData?.[key]);
      if (oldVal !== newVal) {
        changed.push(key);
      }
    }
  });

  return { added, removed, changed };
}
