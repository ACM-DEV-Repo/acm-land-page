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

export function useCMSHistory(options: UseCMSHistoryOptions) {
  const { tableName, recordId, recordKey, limit = 50 } = options;

  return useQuery({
    queryKey: ['cms-history', tableName, recordId, recordKey, limit],
    queryFn: async () => {
      // bd_cms_history table may not exist yet - return empty array
      try {
        let query = supabase
          .from('bd_cms_history_v2' as any)
          .select('*')
          .eq('lp_key', recordKey || '')
          .order('created_at', { ascending: false })
          .limit(limit);

        const { data, error } = await query;
        if (error) {
          console.warn('[CMSHistory] Table not available:', error.message);
          return [];
        }
        return (data || []).map((row: any) => ({
          id: row.id,
          table_name: tableName,
          record_id: null,
          record_key: row.lp_key,
          action: 'UPDATE' as const,
          old_data: row.content,
          new_data: null,
          changed_by: row.saved_by,
          changed_at: row.created_at,
        })) as CMSHistoryEntry[];
      } catch {
        return [];
      }
    },
    staleTime: 1000 * 30,
  });
}

export function useRestoreVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ tableName, recordKey, dataToRestore }: { tableName: string; recordKey: string; dataToRestore: Record<string, any> }) => {
      const { id, created_at, updated_at, ...cleanData } = dataToRestore;
      if (tableName === 'bd_cms_lp_v2') {
        const { data, error } = await supabase
          .from('bd_cms_lp_v2')
          .update({ content: cleanData.content || cleanData })
          .eq('lp_key', recordKey)
          .select()
          .single();
        if (error) throw error;
        return data;
      }
      throw new Error(`Restore not supported for table: ${tableName}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-history'] });
      queryClient.invalidateQueries({ queryKey: ['cms-v2'] });
    },
  });
}

export function generateDiff(
  oldData: Record<string, any> | null,
  newData: Record<string, any> | null
): { added: string[]; removed: string[]; changed: string[] } {
  const added: string[] = [];
  const removed: string[] = [];
  const changed: string[] = [];
  const oldKeys = new Set(Object.keys(oldData || {}));
  const newKeys = new Set(Object.keys(newData || {}));
  newKeys.forEach(key => { if (!oldKeys.has(key)) added.push(key); });
  oldKeys.forEach(key => { if (!newKeys.has(key)) removed.push(key); });
  oldKeys.forEach(key => {
    if (newKeys.has(key) && JSON.stringify(oldData?.[key]) !== JSON.stringify(newData?.[key])) {
      changed.push(key);
    }
  });
  return { added, removed, changed };
}
