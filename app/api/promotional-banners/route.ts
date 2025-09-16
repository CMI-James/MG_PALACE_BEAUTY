import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createServerClient();

    const { data: banners, error } = await supabase
      .from("promotional_banners")
      .select("*")
      .eq("is_active", true)
      .lte("start_date", new Date().toISOString())
      .or(`end_date.is.null,end_date.gte.${new Date().toISOString()}`)
      .order("priority", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching banners:", error);
      return NextResponse.json(
        { error: "Failed to fetch banners" },
        { status: 500 }
      );
    }

    return NextResponse.json(banners || []);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
