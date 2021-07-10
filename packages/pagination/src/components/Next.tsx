import React, { FC, useContext } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

// lib
import { PaginationContext } from '../lib/providers/PaginationProvider'

export const Next: FC<ButtonProps> = ({ children, isDisabled: isDisabledProp, ...buttonProps }) => {
  // provider
  const { actions, state } = useContext(PaginationContext)
  const { changePage } = actions
  const { currentPage, pagesCount, isDisabled: isDisabledGlobal } = state

  // constants
  const isDisabled = isDisabledProp ?? isDisabledGlobal
  const isLast = currentPage > pagesCount - 1

  // handlers
  const handleNextClick = (): void => {
    if (!isLast) changePage(currentPage + 1)
  }

  // TODO: implement getNextProps

  return (
    <Button
      aria-label='Next page'
      className='pagination-next'
      isDisabled={isLast || isDisabled}
      onClick={handleNextClick}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      {...(isLast || isDisabled ? { 'aria-disabled': true } : {})}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}
