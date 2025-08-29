
import { fetcher } from "@/utils/fetcher"
import { getToken } from "@/utils/get-token"

const getProducts = async () => {
  const token = await getToken()

  if (!token) {
    return ({ error: "No estas autorizado." })
  }

  const data = await fetcher({
    input: `${process.env.SERVER_API}/products`,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    cache: "force-cache", // Habilitar cache
    next: {
      tags: ["products"],
      revalidate: 300 // Revalidar cada 5 minutos automáticamente
    }
  });

  if (Array.isArray(data)) {
    return data.reverse()
  }
  return data;
}


export default getProducts;
