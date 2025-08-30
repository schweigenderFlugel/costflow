import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";
import { NextResponse } from "next/server";


export async function GET() {
  const token = await getToken()

  if (!token) {
    return NextResponse.json(JSON.stringify({ error: "No estas identificado." }), { status: 401 });
  }
  try {
    const data = await fetcher({
      input: `${process.env.SERVER_API}/users/me`,
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error desconocido." }, { status: 500 });
  }
}
