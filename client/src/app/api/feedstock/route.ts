import { getToken } from "@/utils/get-token";
import { NextRequest } from "next/server";


export async function GET() {
  const token = await getToken()

  if (!token) {
    return new Response(JSON.stringify({ error: "No estas autorizado." }), { status: 401 });
  }

  const res = await fetch(`api/feedstock`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  return new Response(data);
}


export async function POST(req: NextRequest) {
  const token = await getToken()

  if (!token) {
    return new Response(JSON.stringify({ error: "No estas autorizado." }), { status: 401 });
  }

  const res = await fetch(`api/feedstock`, {
    method: "POST",
    body: req.body,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  return new Response(data);
}
