import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";
import { NextResponse } from "next/server";


export const GET = async () => {
  const token = await getToken()

  if (!token) {
    return NextResponse.json(({ error: "No estas autorizado." }), { status: 401 });
  }

  const data = await fetcher({
    input: `${process.env.SERVER_API}/labour`,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })

  return NextResponse.json((data))
}
