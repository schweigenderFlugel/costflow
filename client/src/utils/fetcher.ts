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

    const data = await res.json()
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return { error: (error as Error).message }
  }
}
