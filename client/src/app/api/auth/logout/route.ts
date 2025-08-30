// import { fetcher } from "@/utils/fetcher"
import { deleteToken, getToken } from "@/utils/get-token"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function GET() {
  const token = await getToken()

  if (!token) {
    return NextResponse.json({ message: "No ha iniciado sesión" })
  }

  try {
    // const data = await fetcher({
    //   input: process.env.SERVER_API + "/auth/logout",
    //   headers: {
    //     "Authorization": `Bearer ${token}`,
    //   }
    // })
    await deleteToken()
    revalidatePath("/")
    return NextResponse.json({ message: "Sesión cerrada correctamente" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Error al cerrar sesión" }, { status: 500 })
  }
}
