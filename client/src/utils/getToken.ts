import { cookies } from "next/headers"


export const getToken: () => Promise<string | undefined> = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  return token;
}
