-- Yardy Translate schema (Supabase/Postgres)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  handle text unique,
  role text check (role in ('translator','reviewer','admin')) default 'translator',
  lang text[],
  reputation integer default 0,
  created_at timestamptz default now()
);

create table if not exists clips (
  id uuid primary key default gen_random_uuid(),
  title text,
  url text not null,
  duration_ms integer,
  created_by uuid references users(id),
  created_at timestamptz default now()
);

-- task_type: patois_en, en_es, en_ptbr
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  clip_id uuid references clips(id) on delete cascade,
  task_type text not null,
  segment_index integer not null,
  source_text text,
  target_lang text,
  status text check (status in ('open','pending_review','approved','rejected')) default 'open',
  created_at timestamptz default now()
);

create table if not exists answers (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id) on delete cascade,
  user_id uuid references users(id),
  text text not null,
  created_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  task_id uuid references tasks(id) on delete cascade,
  reviewer_id uuid references users(id),
  decision text check (decision in ('accept','reject')),
  reason text,
  created_at timestamptz default now()
);

create table if not exists payouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  task_id uuid references tasks(id),
  amount_lamports bigint not null,
  tx_hash text,
  status text check (status in ('pending','sent','failed')) default 'pending',
  created_at timestamptz default now()
);
