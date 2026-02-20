import { useState, memo } from 'react';
import { ICON_MAP, ICON_CATEGORIES } from '@/lib/cms-v2/iconResolver';
import { cn } from '@/lib/utils';

interface IconPickerV2Props {
  value?: string;
  onChange: (iconName: string) => void;
}

export const IconPickerV2 = memo(({ value, onChange }: IconPickerV2Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const SelectedIcon = value ? ICON_MAP[value] : null;

  const filteredCategories = search.trim()
    ? { 'Resultados': Object.keys(ICON_MAP).filter(k => k.includes(search.toLowerCase())) }
    : ICON_CATEGORIES;

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200',
          'bg-black/[0.03] hover:bg-black/[0.06]',
          open ? 'border-accent shadow-sm' : 'border-black/[0.12]',
          'text-sm text-foreground'
        )}
      >
        {SelectedIcon ? (
          <SelectedIcon className="w-4 h-4 text-accent" />
        ) : (
          <span className="w-4 h-4 rounded border border-dashed border-muted-foreground/40" />
        )}
        <span className="text-xs text-muted-foreground">
          {value || 'Ícone'}
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 top-full left-0 mt-2 w-[320px] max-h-[360px] overflow-auto rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl shadow-xl p-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ícone..."
            className="w-full px-3 py-2 text-sm rounded-lg input-admin"
            autoFocus
          />

          {/* Icon grid by category */}
          {Object.entries(filteredCategories).map(([category, icons]) => {
            if (icons.length === 0) return null;
            return (
              <div key={category}>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 px-1">
                  {category}
                </p>
                <div className="grid grid-cols-8 gap-1">
                  {icons.map((iconName) => {
                    const Icon = ICON_MAP[iconName];
                    if (!Icon) return null;
                    const isSelected = value === iconName;
                    return (
                      <button
                        key={iconName}
                        type="button"
                        title={iconName}
                        onClick={() => {
                          onChange(iconName);
                          setOpen(false);
                          setSearch('');
                        }}
                        className={cn(
                          'w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150',
                          isSelected
                            ? 'bg-accent text-accent-foreground ring-2 ring-accent/30'
                            : 'hover:bg-black/[0.06] text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {search && Object.values(filteredCategories).every(arr => arr.length === 0) && (
            <p className="text-xs text-muted-foreground text-center py-4">Nenhum ícone encontrado</p>
          )}
        </div>
      )}
    </div>
  );
});

IconPickerV2.displayName = 'IconPickerV2';
