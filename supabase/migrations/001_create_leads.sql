-- Synecta Leads Table
-- Created for lead capture and questionnaire storage

CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Contact information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  company_size TEXT,
  website TEXT,
  
  -- Questionnaire responses (stored as JSONB)
  answers JSONB,
  
  -- Lead scoring
  lead_score INTEGER DEFAULT 0,
  
  -- Metadata
  language TEXT DEFAULT 'es',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'qualified', 'unqualified', 'contacted', 'converted')),
  
  -- Timestamps
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Enable Row Level Security (recommended for production)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant access to authenticated users (adjust based on your needs)
-- For server-side access via service role, no additional policies needed
-- For client-side access, add appropriate policies:

-- Example: Allow service role full access
-- CREATE POLICY "Service role has full access" ON leads
--   FOR ALL
--   TO service_role
--   USING (true)
--   WITH CHECK (true);
