import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NewProductPage() {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?redirect=/admin/products/new");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    redirect("/");
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

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
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Product
            </h1>
            <p className="mt-2 text-gray-600">
              Create a new product for your catalog
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm categories={categories || []} />
      </div>
    </div>
  );
}
