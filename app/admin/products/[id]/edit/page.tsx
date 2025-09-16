import { createServerClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/admin/products");
  }

  // Check if user is admin
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/");
  }

  // Get product and categories
  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", params.id).single(),
    supabase.from("categories").select("*").order("name"),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Link
              href="/admin/products"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="mt-2 text-gray-600">Update product information</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm categories={categories || []} product={product} />
      </div>
    </div>
  );
}
