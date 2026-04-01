import { NextResponse } from "next/server";

import { getAppointments } from "@/lib/appointments";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const appointments = await getAppointments();

    return NextResponse.json(
      {
        appointments
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to load appointments."
      },
      {
        status: 500
      }
    );
  }
}
