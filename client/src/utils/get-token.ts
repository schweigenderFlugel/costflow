import { cookies } from "next/headers"


export const getToken: () => Promise<string | undefined> = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  return token;
}


export const saveToken: (token: string) => Promise<void> = async (token) => {
  const cookieStore = await cookies()
  cookieStore.set("token", token, {
    expires: 1800000,
    secure: process.env.ENVIRONMENT == "production",
    maxAge: 60 * 30,
    sameSite: process.env.ENVIRONMENT == "production" ? "strict" : "lax",
  })
}
export const hasToken: () => Promise<boolean> = async () => {
  const cookieStore = await cookies()
  return cookieStore.has("token")
}


export const deleteToken: () => Promise<void> = async () => {
  const cookieStore = await cookies()
  cookieStore.delete("token")
}
