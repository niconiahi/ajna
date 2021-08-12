import { Dispatch, useState, useMemo, SetStateAction, useEffect } from "react"

// lib
import { generatePages, isDecimalNumber } from "../helpers"

type InitialState = {
  currentPage: number
  pageSize?: number
  isDisabled?: boolean
}

type Limits = {
  inner: number
  outer: number
}

type UsePagination = {
  initialState: InitialState
  total?: number
  pagesCount?: number
  limits?: Limits
}

export const usePagination = ({
  total,
  initialState,
  pagesCount: pagesCountProp,
  limits,
}: UsePagination): {
  offset: number
  pages: number[]
  pagesCount: number
  currentPage: number
  pageSize: number
  isDisabled: boolean
  setPageSize: Dispatch<SetStateAction<number>>
  setIsDisabled: Dispatch<SetStateAction<boolean>>
  setCurrentPage: Dispatch<SetStateAction<number>>
} => {
  // states
  const [pageSize, setPageSize] = useState<number>(initialState.pageSize ?? 0)
  const [currentPage, setCurrentPage] = useState<number>(
    initialState.currentPage,
  )
  const [isDisabled, setIsDisabled] = useState<boolean>(
    initialState.isDisabled ?? false,
  )

  // memos
  const innerLimit = useMemo(() => limits?.inner ?? 0, [limits])
  const outerLimit = useMemo(() => limits?.outer ?? 0, [limits])

  const offset = useMemo(() => {
    if (pageSize == null) {
      return 0
    }

    return currentPage * pageSize - pageSize
  }, [currentPage, pageSize])

  const pagesCount = useMemo(() => {
    if (pagesCountProp != null) {
      return pagesCountProp
    }

    if (total == null || pageSize == null) {
      return 0
    }

    return Math.ceil(total / pageSize)
  }, [total, pageSize, pagesCountProp])

  const pages = useMemo(
    () =>
      generatePages({
        currentPage,
        innerLimit,
        outerLimit,
        pagesCount,
      }),
    [currentPage, innerLimit, outerLimit, pagesCount],
  )

  // effects
  useEffect(() => {
    if (innerLimit != null && isDecimalNumber(innerLimit)) {
      console.error(
        "Ajna pagination -> passed down inner limit has to be a whole number",
      )
    }

    if (outerLimit != null && isDecimalNumber(outerLimit)) {
      console.error(
        "Ajna pagination -> passed down outerLimit limit has to be a whole number",
      )
    }
  }, [innerLimit, limits, outerLimit])

  return {
    offset,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    isDisabled,
    setIsDisabled,
    pages,
    pagesCount,
  }
}
