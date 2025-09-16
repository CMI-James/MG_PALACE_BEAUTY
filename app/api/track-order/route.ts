import { createServerClient } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const trackingNumber = searchParams.get("tracking");

  if (!trackingNumber) {
    return NextResponse.json(
      { error: "Tracking number is required" },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerClient();

    // Get order with tracking number
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(
        `
        id,
        tracking_number,
        shipping_status,
        shipped_at,
        delivered_at,
        shipping_updates (
          id,
          status,
          message,
          location,
          created_at
        )
      `
      )
      .eq("tracking_number", trackingNumber)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      order_id: order.id,
      tracking_number: order.tracking_number,
      shipping_status: order.shipping_status,
      shipped_at: order.shipped_at,
      delivered_at: order.delivered_at,
      shipping_updates: order.shipping_updates || [],
    });
  } catch (error) {
    console.error("Error tracking order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
