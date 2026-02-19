import { LPContent } from '@/lib/cms-v2/cms-types';

export interface V2SectionEditorProps {
  draft: LPContent;
  lpKey: string;
  updateField: <T extends keyof LPContent>(section: T, field: string, value: unknown) => void;
  updateNestedField: (path: string, value: unknown) => void;
  updateSection: <T extends keyof LPContent>(section: T, data: LPContent[T]) => void;
}
