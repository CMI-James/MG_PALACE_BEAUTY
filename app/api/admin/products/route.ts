import { createServerClient, createServiceClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();
    const supabase = await createServerClient();

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (!profile?.is_admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Use service client for admin operations (bypass RLS)
    const service = createServiceClient();

    // Transform the data to match database schema
    const transformedData = {
      ...productData,
      // Convert image_url to images array if provided
      images: productData.image_url ? [productData.image_url] : null,
      // Remove image_url as it's not in the database schema
      image_url: undefined,
      // Convert compare_price 0 to null
      compare_price:
        productData.compare_price === 0 ? null : productData.compare_price,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Create the product
    const { data: product, error } = await service
      .from("products")
      .insert([transformedData])
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      return NextResponse.json(
        { error: "Failed to create product" },
        { status: 500 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
