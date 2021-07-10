import React, { FC } from 'react'

import { Button, ButtonProps } from '@chakra-ui/react'

// lib
import { usePaginationContext } from '../lib/hooks/usePaginationContext'

export const Previous: FC<ButtonProps> = ({ children, isDisabled: isDisabledProp, ...buttonProps }) => {
  // provider
  const { actions, state } = usePaginationContext()
  const { changePage } = actions
  const { currentPage, isDisabled: isDisabledGlobal } = state

  // constants
  const isDisabled = isDisabledProp ?? isDisabledGlobal
  const isFirst = currentPage === 1

  // handlers
  const handlePreviousClick = (): void => {
    if (!isFirst) changePage(currentPage - 1)
  }

  // TODO: implement getPreviousProps

  return (
    <Button
      aria-label='Previous page'
      className='pagination-previous'
      isDisabled={isFirst || isDisabled}
      onClick={handlePreviousClick}
      pointerEvents={isDisabled ? 'none' : 'auto'}
      {...(isFirst || isDisabled ? { 'aria-disabled': true } : {})}
      {...buttonProps}
    >
      {children}
    </Button>
  )
}
