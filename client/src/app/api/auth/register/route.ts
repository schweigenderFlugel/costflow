import { fetcher } from "@/utils/fetcher";
import { NextResponse } from "next/server";


export async function POST(request: Request) {

  const data = await fetcher({
    input: process.env.SERVER_API + "/auth/register",
    method: "POST",
    body: request.body
  })
  if (data?.message?.includes("successfully")) {
    return NextResponse.json({ success: true, message: "Tu cuenta ha sido creada y está pendiente de aprobación por el administrador." });
  }
  return NextResponse.json(data);
}
