import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";
import { NextResponse } from "next/server";

const API_PATH = "historial";

export async function GET() {
  const token = await getToken();

  if (!token) {
    return NextResponse.json(
      JSON.stringify({ error: "No estas autorizado." }),
      { status: 401 }
    );
  }

  const data = await fetcher({
    input: `${process.env.SERVER_API}/${API_PATH}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // cache: "force-cache",
    next: {
      tags: [API_PATH],
    },
  });
  if (Array.isArray(data)) {
    return NextResponse.json(data.reverse());
  }
  return NextResponse.json(data);
}
