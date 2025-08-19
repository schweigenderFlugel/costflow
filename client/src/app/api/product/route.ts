import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  const token = await getToken()

  if (!token) {
    return NextResponse.json(JSON.stringify({ error: "No estas autorizado." }), { status: 401 });
  }

  const data = await fetcher({
    input: `${process.env.SERVER_API}/product`,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  revalidateTag("products")
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const token = await getToken()

  if (!token) {
    return NextResponse.json(JSON.stringify({ error: "No estas autorizado." }), { status: 401 });
  }

  const data = await fetcher({
    input: `${process.env.SERVER_API}/product`,
    method: "POST",
    body: req.body,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  revalidateTag("products")
  return NextResponse.json(data);
}
