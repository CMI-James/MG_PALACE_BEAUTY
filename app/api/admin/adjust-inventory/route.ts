import { createServerClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { productId, newQuantity, reason } = await request.json();

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

    // Call the adjust_product_inventory function
    const { error } = await supabase.rpc("adjust_product_inventory", {
      p_product_id: productId,
      p_new_quantity: newQuantity,
      p_reason: reason,
    });

    if (error) {
      console.error("Error adjusting inventory:", error);
      return NextResponse.json(
        { error: "Failed to adjust inventory" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adjusting inventory:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
