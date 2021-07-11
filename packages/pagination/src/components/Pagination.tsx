import React, { FC } from 'react'

// lib
import { PaginationProvider } from '../lib/providers/PaginationProvider'
import { INITIAL_VALUES } from '../lib/constants'

export interface PaginationProps {
  onPageChange: (page: number) => void
  currentPage: number
  pagesCount: number
  isDisabled?: boolean
}

export const Pagination: FC<PaginationProps> = ({
  children,
  pagesCount,
  onPageChange,
  isDisabled = INITIAL_VALUES.isDisabled,
  currentPage = INITIAL_VALUES.currentPage
}) => (
  <PaginationProvider
    currentPage={currentPage}
    isDisabled={isDisabled}
    pagesCount={pagesCount}
    onPageChange={onPageChange}
  >
    {children}
  </PaginationProvider>
)
