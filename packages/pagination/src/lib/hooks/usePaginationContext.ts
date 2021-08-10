import { useContext } from "react"

// lib
import {
  PaginationContext,
  PaginationContextValues,
} from "../providers/PaginationProvider"

export const usePaginationContext = (): PaginationContextValues => {
  return useContext(PaginationContext)
}
