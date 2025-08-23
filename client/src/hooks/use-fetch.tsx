"use client";
import { useUpdateDataTable } from "@/hooks/use-update-data-table";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState, useTransition } from "react";

const useFetch = <T,>(
  inputRequest: "product" | "feedstock" | "users" = "feedstock",
  initialData: T | [] = []
) => {
  const [data, setData] = useState<T | []>(initialData)
  const [error, setError] = useState<string>()
  const { state, prev, markPrev } = useUpdateDataTable(inputRequest)
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
    // solo fetch si hay cambio real respecto al anterior
    if (state !== null && state !== prev) {
      startTransition(fetchToData)
      if (markPrev) {
        markPrev(state) // actualizamos el valor previo en el store global
      }
    }
  }, [state, prev, markPrev, inputRequest])

  return { data, error, isPending };
};

export default useFetch;
