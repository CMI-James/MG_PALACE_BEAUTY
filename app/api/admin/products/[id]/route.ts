import { createServerClient, createServiceClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      updated_at: new Date().toISOString(),
    };

    // Update the product
    const { data: product, error } = await service
      .from("products")
      .update(transformedData)
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      return NextResponse.json(
        {
          error: "Failed to update product",
          details: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    // Delete the product
    const { error } = await service
      .from("products")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Error deleting product:", error);
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
