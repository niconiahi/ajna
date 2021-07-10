import { Dispatch, useState, useMemo, SetStateAction } from 'react'

// lib
import { generatePages } from '../helpers'

interface InitialState {
  currentPage: number
  pageSize?: number
  isDisabled?: boolean
}

interface UsePagination {
  initialState: InitialState
  total?: number
  pagesCount?: number
  limits?: {
    inner: number
    outer: number
  }
}

export const usePagination = ({
  total,
  initialState,
  pagesCount: pagesCountProp,
  limits
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
    initialState.currentPage
  )
  const [isDisabled, setIsDisabled] = useState<boolean>(
    initialState.isDisabled ?? false
  )

  // constants
  const innerLimit = limits?.inner ?? 0
  const outerLimit = limits?.outer ?? 0

  // memos
  const offset = useMemo(() => {
    if (pageSize == null) {
      return 0
    }

    return currentPage * pageSize - pageSize
  }, [currentPage, pageSize])

  const pagesCount = useMemo(() => {
    if (total == null || pageSize == null) {
      return 0
    }

    return Math.ceil(total / pageSize)
  }, [total, pageSize])

  const pages = useMemo(
    () =>
      generatePages({
        currentPage,
        innerLimit,
        outerLimit,
        pagesCount: pagesCountProp ?? pagesCount
      }),
    [currentPage, innerLimit, outerLimit, pagesCount]
  )

  return {
    offset,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    isDisabled,
    setIsDisabled,
    pages,
    pagesCount
  }
}
