import React, { FC, MouseEvent, useMemo } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

// lib
import { usePaginationContext } from '../lib/hooks/usePaginationContext'

export const Previous: FC<ButtonProps> = ({ children, isDisabled: isDisabledProp, ...buttonProps }) => {
  // provider
  const { actions, state } = usePaginationContext()
  const { changePage } = actions
  const { currentPage, isDisabled: isDisabledGlobal } = state

  // methods
  const getPreviousProps = ({ onClick, isDisabled: _isDisabled, ...props }: ButtonProps): ButtonProps => ({
    ...props,
    'aria-label': 'Previous page',
    'aria-disabled': isDisabled,
    isDisabled,
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        onClick?.(event)
      }
      handlePreviousClick()
    }
  })

  // memos
  const isFirst = useMemo(() => currentPage === 1, [currentPage])
  const isDisabled = useMemo(() => isFirst || (isDisabledProp ?? isDisabledGlobal), [isFirst, isDisabledProp, isDisabledGlobal])

  // handlers
  const handlePreviousClick = (): void => {
    if (!isFirst) changePage(currentPage - 1)
  }

  return (
    <Button
      className='pagination-previous'
      {...getPreviousProps(buttonProps)}
    >
      {children}
    </Button>
  )
}
