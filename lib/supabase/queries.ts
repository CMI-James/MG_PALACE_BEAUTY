import { createClient } from "@/lib/supabase/server";

export interface Product {
  id: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  compare_price: number | null;
  sku: string | null;
  quantity: number;
  images: string[];
  tags: string[];
  is_featured: boolean;
  is_active: boolean;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  short_description: string;
  price: number;
  duration: number;
  images: string[];
  is_bookable: boolean;
  is_active: boolean;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  is_active: boolean;
}

export async function getProducts(params?: {
  category?: string;
  featured?: boolean;
  limit?: number;
  search?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(
      `
      *,
      category:categories(id, name, slug)
    `
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (params?.category) {
    query = query.eq("categories.slug", params.category);
  }

  if (params?.featured) {
    query = query.eq("is_featured", true);
  }

  if (params?.search) {
    query = query.or(
      `name.ilike.%${params.search}%,description.ilike.%${params.search}%,tags.cs.{${params.search}}`
    );
  }

  if (params?.limit) {
    query = query.limit(params.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data as Product[];
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      category:categories(id, name, slug)
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data as Product;
}

export async function getServices(params?: {
  category?: string;
  limit?: number;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("services")
    .select(
      `
      *,
      category:categories(id, name, slug)
    `
    )
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (params?.category) {
    query = query.eq("categories.slug", params.category);
  }

  if (params?.limit) {
    query = query.limit(params.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  return data as Service[];
}

export async function getServiceBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select(
      `
      *,
      category:categories(id, name, slug)
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching service:", error);
    return null;
  }

  return data as Service;
}

export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data as Category[];
}
