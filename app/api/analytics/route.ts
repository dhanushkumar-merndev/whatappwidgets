import { NextResponse } from "next/server";
import { getGa4Metrics } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const metrics = await getGa4Metrics();
    return NextResponse.json(metrics, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown analytics error";
    return NextResponse.json(
      {
        uniqueViews: 0,
        totalViews: 0,
        totalClicks: 0,
        totalRedirects: 0,
        error: message
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }
}
