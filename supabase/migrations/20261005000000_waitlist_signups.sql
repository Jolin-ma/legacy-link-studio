create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  email text not null unique check (email = lower(email)),
  buyer_type text not null check (buyer_type in ('couple', 'gift')),
  occasion text not null check (occasion in ('wedding', 'anniversary', 'proposal', 'other')),
  occasion_month date,
  tier_interest text not null check (tier_interest in ('spark', 'forever', 'heirloom', 'unsure')),
  marketing_opt_in boolean not null default false,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  referrer text,
  landing_path text
);

-- No public policies: only the server (service role key) reads or writes this table.
alter table public.waitlist_signups enable row level security;
