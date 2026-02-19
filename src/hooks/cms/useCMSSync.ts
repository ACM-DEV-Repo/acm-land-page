import { useState, useCallback, useRef } from 'react';
import { LPRecord, LPContent } from '@/lib/cms-v2/cms-types';
import { fetchLPByRef, saveContent } from '@/lib/cms-v2/cms-api';

/**
 * Hook para gerenciar a sincronização de dados entre Banco e Editor (V2)
 * Focado em eliminar a Race Condition de carregamento.
 */
export const useCMSSync = (lpKey: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const isFirstLoadRef = useRef(true);

  // Carrega os dados do banco garantindo que a primeira carga SEMPRE vença
  const loadFromDatabase = useCallback(async () => {
    setIsSyncing(true);
    try {
      const record = await fetchLPByRef(lpKey);
      isFirstLoadRef.current = false;
      return record;
    } finally {
      setIsSyncing(false);
    }
  }, [lpKey]);

  // Persiste os dados no Supabase (Upsert Linear)
  const persistToDatabase = useCallback(async (content: LPContent) => {
    setIsSyncing(true);
    try {
      const success = await saveContent(lpKey, content);
      if (success) {
        setLastSavedAt(new Date());
      }
      return success;
    } finally {
      setIsSyncing(false);
    }
  }, [lpKey]);

  return {
    loadFromDatabase,
    persistToDatabase,
    isSyncing,
    lastSavedAt,
    isFirstLoad: isFirstLoadRef.current
  };
};
