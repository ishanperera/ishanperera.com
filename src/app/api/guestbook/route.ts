import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const guestbookSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  message: z.string().min(1, "Message is required").max(500),
});

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, name, message, created_at
      FROM guestbook
      ORDER BY created_at DESC
      LIMIT 100
    `;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = guestbookSchema.parse(body);

    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Rate limit: 1 post per IP per hour
    const { rows: recent } = await sql`
      SELECT id FROM guestbook
      WHERE ip = ${ip} AND created_at > NOW() - INTERVAL '1 hour'
    `;

    if (recent.length > 0) {
      return NextResponse.json(
        { error: "Please wait before posting again." },
        { status: 429 }
      );
    }

    await sql`
      INSERT INTO guestbook (name, message, ip)
      VALUES (${data.name}, ${data.message}, ${ip})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    console.error("Guestbook error:", error);
    return NextResponse.json(
      { error: "Failed to sign guestbook." },
      { status: 500 }
    );
  }
}
