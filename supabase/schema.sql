-- SK.INTERIOR.DESIGN — CMS schema for portfolio & articles
-- Run this once in the Supabase dashboard: Project > SQL Editor > New query > paste > Run.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Sipil', 'Konstruksi Baja', 'Interior', 'Furniture')),
  description text,
  location text,
  year text,
  client text,
  cover_image_url text,
  status text not null default 'published' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  excerpt text,
  content_html text not null default '',
  cover_image_url text,
  status text not null default 'published' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- updated_at auto-touch
-- ---------------------------------------------------------------------------

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists portfolio_items_set_updated_at on portfolio_items;
create trigger portfolio_items_set_updated_at
  before update on portfolio_items
  for each row execute function set_updated_at();

drop trigger if exists articles_set_updated_at on articles;
create trigger articles_set_updated_at
  before update on articles
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table portfolio_items enable row level security;
alter table articles enable row level security;

drop policy if exists "public read published portfolio" on portfolio_items;
create policy "public read published portfolio" on portfolio_items
  for select to anon, authenticated
  using (status = 'published');

drop policy if exists "admin full access portfolio" on portfolio_items;
create policy "admin full access portfolio" on portfolio_items
  for all to authenticated
  using (true)
  with check (true);

drop policy if exists "public read published articles" on articles;
create policy "public read published articles" on articles
  for select to anon, authenticated
  using (status = 'published');

drop policy if exists "admin full access articles" on articles;
create policy "admin full access articles" on articles
  for all to authenticated
  using (true)
  with check (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for uploaded images
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "admin write media" on storage.objects;
create policy "admin write media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'media');

drop policy if exists "admin update media" on storage.objects;
create policy "admin update media" on storage.objects
  for update to authenticated
  using (bucket_id = 'media');

drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'media');

-- ---------------------------------------------------------------------------
-- Seed: migrate existing hardcoded content so the site isn't empty
-- ---------------------------------------------------------------------------

insert into portfolio_items (slug, title, category, cover_image_url, location, year)
values
  ('rumah-modern-minimalis-bintaro', 'Rumah Modern Minimalis Bintaro', 'Interior', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80', 'Bintaro', '2024'),
  ('gudang-baja-cikarang', 'Gudang Baja Cikarang', 'Konstruksi Baja', 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&q=80', 'Cikarang', '2024'),
  ('kitchen-set-custom-menteng', 'Kitchen Set Custom Menteng', 'Furniture', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80', 'Menteng', '2023'),
  ('renovasi-ruko-kemang', 'Renovasi Ruko Kemang', 'Sipil', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80', 'Kemang', '2023'),
  ('kantor-startup-kuningan', 'Kantor Startup Kuningan', 'Interior', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', 'Kuningan', '2024'),
  ('wardrobe-walk-in-closet-bsd', 'Wardrobe & Walk-in Closet BSD', 'Furniture', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', 'BSD', '2023'),
  ('kanopi-baja-perumahan', 'Kanopi Baja Perumahan', 'Konstruksi Baja', 'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=1200&q=80', 'Jakarta', '2024'),
  ('villa-modern-bogor', 'Villa Modern Bogor', 'Sipil', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80', 'Bogor', '2023')
on conflict (slug) do nothing;

insert into articles (slug, title, category, excerpt, content_html, cover_image_url, published_at)
values
  ('5-kesalahan-umum-saat-merenovasi-rumah', '5 Kesalahan Umum Saat Merenovasi Rumah dan Cara Menghindarinya', 'Tips Renovasi', 'Renovasi rumah bukan sekadar merapikan tampilan. Kesalahan kecil di awal bisa berdampak besar pada biaya dan waktu pengerjaan.', '<p>Renovasi rumah bukan sekadar merapikan tampilan. Kesalahan kecil di awal bisa berdampak besar pada biaya dan waktu pengerjaan.</p>', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80', '2026-07-12'),
  ('kelebihan-struktur-baja-untuk-bangunan-modern', 'Kelebihan Struktur Baja untuk Bangunan Modern', 'Konstruksi', 'Konstruksi baja menawarkan kecepatan, kekuatan, dan fleksibilitas desain yang sulit ditandingi material lain.', '<p>Konstruksi baja menawarkan kecepatan, kekuatan, dan fleksibilitas desain yang sulit ditandingi material lain.</p>', 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=1200&q=80', '2026-06-28'),
  ('memilih-material-kitchen-set-yang-tahan-lama', 'Memilih Material Kitchen Set yang Tahan Lama', 'Interior', 'Dari HPL hingga solid wood — pahami karakter material sebelum memutuskan investasi kitchen set Anda.', '<p>Dari HPL hingga solid wood — pahami karakter material sebelum memutuskan investasi kitchen set Anda.</p>', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80', '2026-06-15'),
  ('cara-menentukan-konsep-interior-rumah-yang-konsisten', 'Cara Menentukan Konsep Interior Rumah yang Konsisten', 'Interior', 'Konsep yang matang membuat rumah terasa selaras dari ruang tamu hingga kamar tidur.', '<p>Konsep yang matang membuat rumah terasa selaras dari ruang tamu hingga kamar tidur.</p>', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80', '2026-06-02'),
  ('tips-membangun-gudang-dengan-struktur-baja', 'Tips Membangun Gudang dengan Struktur Baja', 'Konstruksi', 'Perencanaan bentang, tinggi, dan sirkulasi udara menjadi kunci gudang yang efisien.', '<p>Perencanaan bentang, tinggi, dan sirkulasi udara menjadi kunci gudang yang efisien.</p>', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', '2026-05-18'),
  ('wardrobe-custom-vs-beli-jadi', 'Wardrobe Custom vs Beli Jadi: Mana yang Lebih Efisien?', 'Furniture', 'Custom bukan selalu lebih mahal — tergantung ukuran ruang dan kebutuhan penyimpanan Anda.', '<p>Custom bukan selalu lebih mahal — tergantung ukuran ruang dan kebutuhan penyimpanan Anda.</p>', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', '2026-05-05'),
  ('perencanaan-anggaran-proyek-konstruksi-sipil', 'Perencanaan Anggaran Proyek Konstruksi Sipil', 'Konstruksi', 'Alokasi cadangan biaya dan tahap pembayaran yang jelas melindungi proyek dari over-budget.', '<p>Alokasi cadangan biaya dan tahap pembayaran yang jelas melindungi proyek dari over-budget.</p>', 'https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=1200&q=80', '2026-04-20'),
  ('mendesain-kantor-yang-meningkatkan-produktivitas', 'Mendesain Kantor yang Meningkatkan Produktivitas', 'Interior', 'Pencahayaan, akustik, dan tata letak mempengaruhi fokus tim lebih dari yang Anda kira.', '<p>Pencahayaan, akustik, dan tata letak mempengaruhi fokus tim lebih dari yang Anda kira.</p>', 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80', '2026-04-08'),
  ('furniture-multifungsi-untuk-rumah-berukuran-kecil', 'Furniture Multifungsi untuk Rumah Berukuran Kecil', 'Furniture', 'Setiap sentimeter matter — pelajari trik furniture custom untuk memaksimalkan ruang mungil Anda.', '<p>Setiap sentimeter matter — pelajari trik furniture custom untuk memaksimalkan ruang mungil Anda.</p>', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80', '2026-03-25')
on conflict (slug) do nothing;
