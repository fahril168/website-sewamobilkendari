import { signIn, createSession } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { error: "Email dan password diperlukan" },
        { status: 400 }
      );
    }

    const user = await signIn(email, password);

    if (!user) {
      return Response.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    await createSession(user);

    return Response.json({ success: true, user: { name: user.name, role: user.role } });
  } catch (error: any) {
    console.error("Login error:", error);
    return Response.json(
      { error: `Terjadi kesalahan server: ${error?.message || error}` },
      { status: 500 }
    );
  }
}
