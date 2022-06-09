import React, {
  FC,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react"

// lib
import { INITIAL_VALUES } from "../constants"
import { isDecimalNumber } from "../helpers"

export type PaginationContextValues = {
  state: {
    isDisabled: boolean
    pagesCount: number
    currentPage: number
  }
  actions: {
    setCurrentPage: Dispatch<SetStateAction<number>>
    setIsDisabled: Dispatch<SetStateAction<boolean>>
    changePage: (page: number) => void
  }
}

export const PaginationContext = createContext<PaginationContextValues>({
  state: {
    currentPage: INITIAL_VALUES.currentPage,
    isDisabled: INITIAL_VALUES.isDisabled,
    pagesCount: 0,
  },
  actions: {
    setCurrentPage: () => null,
    setIsDisabled: () => null,
    changePage: () => null,
  },
})

export type PaginationProviderProps = {
  children?: React.ReactElement
  isDisabled: boolean
  pagesCount: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const PaginationProvider: FC<PaginationProviderProps> = ({
  children,
  onPageChange,
  pagesCount: pagesCountProp,
  currentPage: currentPageProp,
  isDisabled: isDisabledProp,
}) => {
  // react hooks
  const [currentPage, setCurrentPage] = useState<number>(
    INITIAL_VALUES.currentPage,
  )
  const [isDisabled, setIsDisabled] = useState<boolean>(
    INITIAL_VALUES.isDisabled,
  )
  const [pagesCount, setPagesCount] = useState<number>(0)

  // effects
  useEffect(() => {
    setIsDisabled(isDisabledProp)
  }, [isDisabledProp])

  useEffect(() => {
    setPagesCount(pagesCountProp)
  }, [pagesCountProp])

  useEffect(() => {
    if (isDecimalNumber(currentPageProp)) {
      console.error(
        "Ajna pagination -> passed down currentPage has to be a whole number",
      )

      return
    }

    if (currentPageProp < 1) {
      console.error(
        "Ajna pagination -> passed down currentPage can't be lower than 1",
      )

      return
    }

    if (currentPageProp != null && currentPageProp !== currentPage) {
      setCurrentPage(currentPageProp)
    }
  }, [currentPage, currentPageProp])

  // handlers
  const changePage = (page: number): void => {
    setCurrentPage(page)
    onPageChange(page)
  }

  const state = {
    currentPage,
    pagesCount,
    isDisabled,
  }

  const actions = {
    setCurrentPage,
    setIsDisabled,
    changePage,
  }

  return (
    <PaginationContext.Provider value={{ state, actions }}>
      {children}
    </PaginationContext.Provider>
  )
}
