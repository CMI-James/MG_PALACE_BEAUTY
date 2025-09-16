import { createServerClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { orderId, status, trackingNumber, message, location } =
      await request.json();

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

    // Update order with tracking number if provided
    if (trackingNumber) {
      await supabase
        .from("orders")
        .update({ tracking_number: trackingNumber })
        .eq("id", orderId);
    }

    // Call the update_shipping_status function
    const { error } = await supabase.rpc("update_shipping_status", {
      p_order_id: orderId,
      p_status: status,
      p_message: message || null,
      p_location: location || null,
    });

    if (error) {
      console.error("Error updating shipping status:", error);
      return NextResponse.json(
        { error: "Failed to update shipping status" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating shipping status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
