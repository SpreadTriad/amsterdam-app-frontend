import {useCallback, useEffect, useState} from 'react'

type UseFetchProps = {
  onLoad?: Boolean
  options: {
    params?: string
  }
  url: string
}

export const useFetch = <T>({url, options, onLoad = true}: UseFetchProps) => {
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState<T | []>([])

  const fetchData = useCallback(
    async (params?: string) => {
      const p = options.params ?? params
      setLoading(true)
      try {
        const response = await fetch(url + '?' + p)
        const json = await response.json()
        setData(json)
      } catch (error) {
        console.error('useFetch', error)
      }
      setLoading(false)
    },
    [options.params, url],
  )

  useEffect(() => {
    onLoad && fetchData()
  }, [fetchData, onLoad])

  return {data, fetchData, isLoading}
}
