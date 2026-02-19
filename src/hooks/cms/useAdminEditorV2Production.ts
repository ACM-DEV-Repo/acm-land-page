import { useState, useEffect, useCallback, useRef } from 'react';
import { LPContent } from '@/lib/cms-v2/cms-types';
import { useCMSSync } from './useCMSSync';

type SaveStatus = 'idle' | 'unsaved' | 'saving' | 'success' | 'error';

export const useAdminEditorV2Production = (lpKey: string) => {
  const [draft, setDraft] = useState<LPContent | null>(null);
  const initializedRef = useRef(false);
  const draftRef = useRef<LPContent | null>(null);
  const serverContentRef = useRef<LPContent | null>(null);
  const touchedFieldsRef = useRef<Set<string>>(new Set());
  const { loadFromDatabase, persistToDatabase, isSyncing, lastSavedAt } = useCMSSync(lpKey);

  const protectImageFields = useCallback((draftContent: LPContent, serverContent: LPContent | null): LPContent => {
    if (!serverContent) return draftContent;
    const safe = JSON.parse(JSON.stringify(draftContent)) as LPContent;
    const fields = [
      { section: 'hero' as const, field: 'imageDesktop' }, { section: 'hero' as const, field: 'imageMobile' },
      { section: 'about' as const, field: 'imageDesktop' }, { section: 'about' as const, field: 'imageMobile' },
      { section: 'footer' as const, field: 'logo' }, { section: 'footer' as const, field: 'logoDesktop' }, { section: 'footer' as const, field: 'logoMobile' },
    ];
    for (const { section, field } of fields) {
      const touchKey = `${section}.${field}`;
      if (touchedFieldsRef.current.has(touchKey)) continue;
      const s = safe[section] as any; const srv = serverContent[section] as any;
      if (s && srv && srv[field] && (!s[field] || s[field] === '')) s[field] = srv[field];
    }
    return safe;
  }, []);

  const [isDirty, setIsDirty] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  useEffect(() => {
    const init = async () => { const record = await loadFromDatabase(); if (record?.content) { setDraft(record.content); draftRef.current = record.content; serverContentRef.current = record.content; initializedRef.current = true; } };
    init();
  }, [loadFromDatabase]);

  useEffect(() => { draftRef.current = draft; }, [draft]);

  const updateField = useCallback(<T extends keyof LPContent>(section: T, field: string, value: unknown) => {
    touchedFieldsRef.current.add(`${String(section)}.${field}`);
    setDraft(prev => {
      if (!prev) return prev;
      const s = prev[section];
      if (typeof s === 'object' && s !== null && !Array.isArray(s)) {
        setIsDirty(true); setSaveStatus('unsaved');
        return { ...prev, [section]: { ...(s as Record<string, unknown>), [field]: value } } as LPContent;
      }
      return prev;
    });
  }, []);

  const updateNestedField = useCallback((path: string, value: unknown) => {
    const parts = path.split('.');
    touchedFieldsRef.current.add(parts.length >= 2 ? `${parts[0]}.${parts[1]}` : path);
    setDraft(prev => {
      if (!prev) return prev;
      const keys = path.split('.');
      const update = (obj: Record<string, unknown>, ks: string[], idx: number): Record<string, unknown> => {
        if (idx === ks.length - 1) return { ...obj, [ks[idx]]: value };
        return { ...obj, [ks[idx]]: update((obj[ks[idx]] ?? {}) as Record<string, unknown>, ks, idx + 1) };
      };
      setIsDirty(true); setSaveStatus('unsaved');
      return update(prev as unknown as Record<string, unknown>, keys, 0) as unknown as LPContent;
    });
  }, []);

  const updateSection = useCallback(<T extends keyof LPContent>(section: T, data: LPContent[T]) => {
    touchedFieldsRef.current.add(String(section));
    setDraft(prev => { if (!prev) return prev; setIsDirty(true); setSaveStatus('unsaved'); return { ...prev, [section]: data }; });
  }, []);

  const saveNow = useCallback(async () => {
    if (!draftRef.current) return false;
    setSaveStatus('saving');
    const safeDraft = protectImageFields(draftRef.current, serverContentRef.current);
    const success = await persistToDatabase(safeDraft);
    if (success) { serverContentRef.current = safeDraft; touchedFieldsRef.current.clear(); setIsDirty(false); setSaveStatus('success'); setTimeout(() => setSaveStatus('idle'), 3000); } else { setSaveStatus('error'); }
    return success;
  }, [persistToDatabase, protectImageFields]);

  useEffect(() => {
    const h = () => { if (draftRef.current && isDirty) saveNow(); };
    window.addEventListener('hotkey:save', h);
    return () => window.removeEventListener('hotkey:save', h);
  }, [saveNow, isDirty]);

  return { draft, isDirty, isLoading: !initializedRef.current || isSyncing, saveStatus, lastSavedAt, updateField, updateNestedField, updateSection, saveNow };
};