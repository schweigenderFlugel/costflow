import { fetcher } from "@/utils/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { message: "El parámetro 'code' es requerido", success: false },
      { status: 400 }
    );
  }

  const body = (await req.json()) as { password: string };

  if (!body?.password) {
    return NextResponse.json(
      { message: "La contraseña es requerida", success: false },
      { status: 400 }
    );
  }

  const data = await fetcher({
    input: `${process.env.SERVER_API}/auth/reset-password?code=${code}`,
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (data) {
    return NextResponse.json({
      message: "Contraseña actualizada correctamente",
      success: true,
    });
  }

  return NextResponse.json({
    message: data?.message || "No se pudo actualizar la contraseña",
    success: false,
  });
}
