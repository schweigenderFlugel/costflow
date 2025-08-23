import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const API_PATH = "products";

export async function GET() {
  const token = await getToken()

  if (!token) {
    return NextResponse.json(JSON.stringify({ error: "No estas autorizado." }), { status: 401 });
  }

  const data = await fetcher({
    input: `${process.env.SERVER_API}/${API_PATH}`,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    // cache: "force-cache",
    next: {
      tags: [API_PATH],
    }
  });
  if (Array.isArray(data)) {
    return NextResponse.json(data.reverse())
  }
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const token = await getToken()

  if (!token) {
    return NextResponse.json(JSON.stringify({ error: "No estas autorizado." }), { status: 401 });
  }

  try {
    const data = await fetcher({
      input: `${process.env.SERVER_API}/${API_PATH}`,
      method: "POST",
      body: req.body,
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    // Invalidar cache ANTES de enviar respuesta
    revalidateTag(API_PATH)
    revalidatePath("/productos")

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json({ error: "Error al crear el producto" }, { status: 500 });
  }
}
