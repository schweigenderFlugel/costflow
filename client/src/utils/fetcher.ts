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
      let errorDetail;
      try {
        const detailData = await res.json();
        errorDetail = detailData.detail;
      } catch {
        try {
          errorDetail = await res?.text();
        } catch (error) {
          errorDetail = "Error desconocido";
        }
      }

      if (res.status === 401 && errorDetail) {
        // Manejar el error 401 (no autorizado) de manera específica si es necesario
        if (errorDetail === "Authorization token is missing") {
          return { detail: "Debe estar autenticado" }
        }
        if (errorDetail === "Invalid credentials") {
          return { detail: "Credenciales inválidas" }
        }
      }
      const errorMessage = res.status ? `Error - ${res.status ?? "interno"}: ${res.statusText ?? "Inténtalo más tarde."}` : errorDetail;


      return { error: errorMessage, detail: errorDetail }
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
