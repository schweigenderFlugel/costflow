import { fetcher } from "@/utils/fetcher";
import { saveToken } from "@/utils/get-token";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const data = await fetcher({
    input: `${process.env.SERVER_API}/auth/login`,
    method: "POST",
    body: req.body,
  });

  if (data?.access_token) {
    await saveToken(data.access_token)
    revalidatePath("/login")
    return NextResponse.json({ message: "Sesión iniciada correctamente", success: true });
  }

  return NextResponse.json(data);
}
