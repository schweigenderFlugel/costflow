import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const API_PATH = "feedstocks";

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
    input: `${process.env.SERVER_API}/${API_PATH}/${id}`,
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

  try {
    const data = await fetcher({
      input: `${process.env.SERVER_API}/feedstocks/${id}`,
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    // Invalidar cache ANTES de enviar respuesta
    revalidateTag(API_PATH)
    revalidatePath("/insumos")

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting feedstock:', error)
    return NextResponse.json({ error: "Error al eliminar el insumo" }, { status: 500 });
  }
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

  try {
    const data = await fetcher({
      input: `${process.env.SERVER_API}/${API_PATH}/${id}`,
      method: "PUT",
      body: req.body,
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    // Invalidar cache ANTES de enviar respuesta
    revalidateTag(API_PATH)
    revalidatePath("/insumos")

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating feedstock:', error)
    return NextResponse.json({ error: "Error al actualizar el insumo" }, { status: 500 });
  }
}
