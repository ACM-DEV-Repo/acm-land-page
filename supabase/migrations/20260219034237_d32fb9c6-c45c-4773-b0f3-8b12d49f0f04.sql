
-- 1. Tabela principal
CREATE TABLE IF NOT EXISTS bd_cms_lp_v2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lp_key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Índices
CREATE INDEX IF NOT EXISTS idx_bd_cms_lp_v2_slug ON bd_cms_lp_v2(slug);
CREATE INDEX IF NOT EXISTS idx_bd_cms_lp_v2_status ON bd_cms_lp_v2(status);

-- 3. RLS
ALTER TABLE bd_cms_lp_v2 ENABLE ROW LEVEL SECURITY;

-- Admin: acesso total para usuários autenticados
CREATE POLICY "Admin full access V2"
  ON bd_cms_lp_v2
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
    )
  );

-- Público: leitura de LPs ativas
CREATE POLICY "Public read for active LPs V2"
  ON bd_cms_lp_v2
  FOR SELECT
  USING (status = 'active');

-- Tabela de histórico
CREATE TABLE IF NOT EXISTS bd_cms_history_v2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lp_key TEXT NOT NULL REFERENCES bd_cms_lp_v2(lp_key) ON DELETE CASCADE,
  content JSONB NOT NULL,
  saved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE bd_cms_history_v2 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin full access history V2"
  ON bd_cms_history_v2
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
    )
  );

CREATE INDEX IF NOT EXISTS idx_bd_cms_history_v2_lp ON bd_cms_history_v2(lp_key);

-- Tabela de submissões de formulário
CREATE TABLE IF NOT EXISTS bd_cms_form_submissions_v2 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lp_key TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE bd_cms_form_submissions_v2 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read submissions V2"
  ON bd_cms_form_submissions_v2
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.uid() = id
    )
  );

CREATE POLICY "Public insert submissions V2"
  ON bd_cms_form_submissions_v2
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_bd_cms_form_sub_lp ON bd_cms_form_submissions_v2(lp_key);
