type FetcherProps = RequestInit & {
  input: string,
}

export const fetcher = async ({ input, method = "GET", body, headers, cache }: FetcherProps) => {
  const hasHeaders = headers ? headers : {}

  const hasDuplex = (method === "POST" || method === "PUT") ? { duplex: "half" } : {}

  try {
    const res = await fetch(input, {
      method,
      body: method === "GET" || method === "DELETE" ? undefined : body,
      headers: {
        "Content-Type": "application/json",
        ...hasHeaders,
      },
      ...hasDuplex,
      cache: cache ?? "no-store",
    })
    if (!res.ok) {
      if (res.status === 401) {
        // Manejar el error 401 (no autorizado) de manera específica si es necesario
        return { error: "No autorizado. Por favor, inicia sesión." }
      }
      const errorMessage = res.status ? `Error - ${res.status ?? "interno"}: ${res.statusText ?? "Inténtalo más tarde."}` : await res.text()
      const errorDetail = () => {
        try {
          return res.json().then(data => data.detail).catch(() => null);
        } catch {
          return null;
        }
      }
      return { error: errorMessage, detail: errorDetail() }
    }
    const data = await res.json()
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return { error: (error as Error).message }
  }
}
