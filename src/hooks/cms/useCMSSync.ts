import { useState, useCallback, useRef } from 'react';
import { LPContent } from '@/lib/cms-v2/cms-types';
import { fetchLPByRef, saveContent } from '@/lib/cms-v2/cms-api';

export const useCMSSync = (lpKey: string) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const isFirstLoadRef = useRef(true);

  const loadFromDatabase = useCallback(async () => {
    setIsSyncing(true);
    try { const record = await fetchLPByRef(lpKey); isFirstLoadRef.current = false; return record; } finally { setIsSyncing(false); }
  }, [lpKey]);

  const persistToDatabase = useCallback(async (content: LPContent) => {
    setIsSyncing(true);
    try { const success = await saveContent(lpKey, content); if (success) setLastSavedAt(new Date()); return success; } finally { setIsSyncing(false); }
  }, [lpKey]);

  return { loadFromDatabase, persistToDatabase, isSyncing, lastSavedAt, isFirstLoad: isFirstLoadRef.current };
};