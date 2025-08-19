"use client"
import { useUpdateDataTable } from "@/hooks/use-update-data-table"
import { fetcher } from "@/utils/fetcher"
import { useEffect, useState, useTransition } from "react"

const useFetch = <T,>(inputRequest: "product" | "feedstock" = "feedstock", initialData: T | [] = []
) => {
  const [data, setData] = useState<T | []>(initialData)
  const [error, setError] = useState<string>()
  const { state } = useUpdateDataTable(inputRequest)
  const [isPending, startTransition] = useTransition()

  const fetchToData = async () => {
    try {
      const res = await fetcher({ input: `/api/${inputRequest}` })
      setData(res)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  useEffect(() => {
    if (state != null && !isPending) {
      startTransition(fetchToData)
    }
  }, [state])

  return { data, error, isPending }
}


export default useFetch
