import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — copy .env.example to .env and fill in your Supabase project credentials.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type PortfolioCategory = "Sipil" | "Konstruksi Baja" | "Interior" | "Furniture";
export type ContentStatus = "draft" | "published";

export type PortfolioItem = {
  id: string;
  slug: string;
  title: string;
  category: PortfolioCategory;
  description: string | null;
  location: string | null;
  year: string | null;
  client: string | null;
  cover_image_url: string | null;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
};

export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  content_html: string;
  cover_image_url: string | null;
  status: ContentStatus;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};
