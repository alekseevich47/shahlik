import { QueryClient } from "@tanstack/react-query"

/** Каталог витрины: кэш 60s, без refetch при фокусе окна — меньше FullList на mobile. */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
})
