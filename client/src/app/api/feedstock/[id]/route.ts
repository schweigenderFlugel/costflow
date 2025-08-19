import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken()

  if (!token) {
    return NextResponse.json(JSON.stringify({ error: "No estas autorizado." }), { status: 401 });
  }
  const { id } = await params;

  const data = await fetcher({
    input: `${process.env.SERVER_API}/feedstocks/${id}`,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  return NextResponse.json(data);
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken()

  if (!token) {
    return NextResponse.json(JSON.stringify({ error: "No estas autorizado." }), { status: 401 });
  }
  const { id } = await params;
  const data = await fetcher({
    input: `${process.env.SERVER_API}/feedstocks/${id}`,
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  revalidateTag("feedstocks")
  return NextResponse.json(data);
}


export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getToken()

  if (!token) {
    return NextResponse.json(JSON.stringify({ error: "No estas autorizado." }), { status: 401 });
  }
  const { id } = await params;

  const data = await fetcher({
    input: `${process.env.SERVER_API}/feedstocks/${id}`,
    method: "PUT",
    body: req.body,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  revalidateTag("feedstocks")
  return NextResponse.json(data);
}
