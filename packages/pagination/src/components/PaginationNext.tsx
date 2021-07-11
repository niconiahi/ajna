import React, { FC, useMemo, useContext, MouseEvent } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

// lib
import { PaginationContext } from '../lib/providers/PaginationProvider'

export const PaginationNext: FC<ButtonProps> = ({ children, isDisabled: isDisabledProp, ...buttonProps }) => {
  // provider
  const { actions, state } = useContext(PaginationContext)
  const { changePage } = actions
  const { currentPage, pagesCount, isDisabled: isDisabledGlobal } = state

  // methods
  const getNextProps = ({ onClick, isDisabled: _isDisabled, ...props }: ButtonProps): ButtonProps => ({
    ...props,
    'aria-label': 'Next page',
    'aria-disabled': isDisabled,
    isDisabled,
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        onClick?.(event)
      }
      handleNextClick()
    }
  })

  // memos
  const isLast = useMemo(() => currentPage > pagesCount - 1, [currentPage, pagesCount])
  const isDisabled = useMemo(() => isLast || (isDisabledProp ?? isDisabledGlobal), [isLast, isDisabledProp, isDisabledGlobal])

  // handlers
  const handleNextClick = (): void => {
    if (!isLast) changePage(currentPage + 1)
  }

  return (
    <Button
      className='pagination-next'
      {...getNextProps(buttonProps)}
    >
      {children}
    </Button>
  )
}
