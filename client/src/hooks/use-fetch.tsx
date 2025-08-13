"use client"
import { useEffect, useState, useTransition } from "react"

const API = process.env.SERVER_API


const useFetch = (inputRequest: string, localFetch: boolean = true) => {
  const [data, setData] = useState()
  const [error, setError] = useState<string>()
  const [isPending, startTransition] = useTransition()


  const fetcher = async () => {
    try {
      const res = await fetch(`${localFetch ? "/api" : API}/${inputRequest}`)
      const data = await res.json()
      setData(data)
    } catch (err) {
      setError((err as Error).message)
    }
  }



  useEffect(() => {
    startTransition(fetcher)
  }, [inputRequest, localFetch])


  return {
    data,
    error,
    isPending
  }
}


export default useFetch
