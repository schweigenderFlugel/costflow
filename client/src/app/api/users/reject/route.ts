import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  req: NextRequest) {
  const token = await getToken()

  if (!token) {
    return NextResponse.json(JSON.stringify({ error: "No estas autorizado." }), { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id")
  if (!id) {
    return NextResponse.json(JSON.stringify({ error: "ID de usuario no proporcionado." }), { status: 400 });
  }

  try {
    const data = await fetcher({
      input: `${process.env.SERVER_API}/users/reject/${id}`,
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })

    if (data?.message?.includes("successfully")) {
      revalidateTag("users")
      revalidatePath("/dashboard/usuarios")
      return NextResponse.json({ message: "Usuario denegado correctamente.", success: true });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error desconocido." }, { status: 500 });
  }
}
