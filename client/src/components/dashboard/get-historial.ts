import { fetcher } from "@/utils/fetcher";
import { getToken } from "@/utils/get-token";

const getHistorial = async () => {
  const token = await getToken();

  if (!token) {
    return { error: "No estas autorizado." };
  }

  const data = await fetcher({
    input: `${process.env.SERVER_API}/historial`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "force-cache", // Habilitar cache
    next: {
      tags: ["historial"],
      revalidate: 300, // Revalidar cada 5 minutos automáticamente
    },
  });

  if (Array.isArray(data)) {
    return data.reverse();
  }
  return data;
};
export default getHistorial;
