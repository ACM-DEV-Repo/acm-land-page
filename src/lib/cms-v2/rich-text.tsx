import React from 'react';

/**
 * renderRichText — Converte marcadores simples em React elements
 *
 * Padroes suportados:
 * - **texto** → <strong>
 * - {{texto}} → <span> com cor accent (design token ou override)
 * - \n → <br />
 *
 * Seguro: nao usa dangerouslySetInnerHTML, gera React elements.
 */
export function renderRichText(
  text: string | undefined,
  accentColor?: string
): React.ReactNode {
  if (!text) return null;

  const lines = text.split('\n');

  return lines.map((line, lineIdx) => (
    <React.Fragment key={lineIdx}>
      {lineIdx > 0 && <br />}
      {parseLine(line, accentColor)}
    </React.Fragment>
  ));
}

function parseLine(line: string, accentColor?: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  // Regex: match **bold** or {{highlight}}
  const regex = /(\*\*(.+?)\*\*|\{\{(.+?)\}\})/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(line)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      tokens.push(line.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // **bold**
      tokens.push(<strong key={`b-${match.index}`}>{match[2]}</strong>);
    } else if (match[3]) {
      // {{highlight}}
      tokens.push(
        <span
          key={`h-${match.index}`}
          style={{ color: accentColor || 'hsl(var(--ds-color-accent))' }}
          className="font-semibold"
        >
          {match[3]}
        </span>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Remaining text after last match
  if (lastIndex < line.length) {
    tokens.push(line.slice(lastIndex));
  }

  return tokens;
}
