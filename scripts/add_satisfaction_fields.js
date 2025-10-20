// Adiciona campos de satisfação na tabela tickets via Supabase API
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://<your-project>.supabase.co',
  '<your-service-role-key>'
);

async function addColumns() {
  const sql = `
    ALTER TABLE tickets
      ADD COLUMN IF NOT EXISTS satisfaction_csat integer,
      ADD COLUMN IF NOT EXISTS satisfaction_ces integer,
      ADD COLUMN IF NOT EXISTS satisfaction_nps integer,
      ADD COLUMN IF NOT EXISTS satisfaction_comment text,
      ADD COLUMN IF NOT EXISTS satisfaction_submitted_at timestamptz;
  `;
  const { error } = await supabase.rpc('execute_sql', { sql });
  if (error) console.error(error);
  else console.log('Campos adicionados!');
}

addColumns();
