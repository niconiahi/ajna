import React, { FC, ReactElement, MouseEvent, useMemo } from 'react'
import { Button, Flex, ButtonProps } from '@chakra-ui/react'

// lib
import { SEPARATORS } from '../lib/constants'
import { usePaginationContext } from '../lib/hooks/usePaginationContext'

// components
import FiChevronLeft from './FiChevronLeft'
import FiChevronRight from './FiChevronRight'
import { Separator } from './Separator'

export interface PageProps {
  page: number
  separator?: ReactElement<ButtonProps>
  _current?: ButtonProps
}

const buttonStyles: ButtonProps = {
  minW: 'auto',
  px: 1,
  cursor: 'pointer'
}

export const Page: FC<PageProps & ButtonProps> = ({ page, isDisabled: isDisabledProp, separator, _current = {}, ...buttonProps }) => {
  // provider
  const { actions, state } = usePaginationContext()
  const { changePage } = actions
  const {
    currentPage,
    isDisabled: isDisabledGlobal
  } = state

  // methods
  const getPageProps = ({ onClick, isDisabled: _isDisabled, ...props }: ButtonProps): ButtonProps => ({
    ...props,
    'aria-disabled': isDisabled,
    'aria-current': isCurrent,
    'aria-label': pageLabel,
    isDisabled,
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        onClick?.(event)
      }
      changePage(page)
    }
  })

  // memos
  const isCurrent = useMemo(() => currentPage === page, [currentPage, page])
  const isDisabled = useMemo(() => isDisabledProp ?? isDisabledGlobal, [isDisabledGlobal, isDisabledProp])
  const isSeparatorDisabled = useMemo(() => separator?.props?.isDisabled ?? isDisabledGlobal, [isDisabledGlobal, isDisabledProp])
  const currentStyles = useMemo(() => isCurrent ? _current : {}, [isCurrent, _current])
  const isLeftSeparator = useMemo(() => page === SEPARATORS.left, [page])
  const isRightSeparator = useMemo(() => page === SEPARATORS.right, [page])
  const pageLabel = useMemo(() => isCurrent
    ? `Current page, page ${page}`
    : `Go to page ${page}`, [isCurrent, page])
  const allProps = useMemo(() => ({
    ...buttonStyles,
    ...buttonProps,
    ...currentStyles
  }), [buttonStyles, buttonProps, currentStyles])

  if (isLeftSeparator) {
    return (
      <Separator
        hoverIcon={FiChevronLeft}
        isDisabled={isSeparatorDisabled}
        separatorPosition='left'
        {...(separator?.props ?? {})}
      />
    )
  }

  if (isRightSeparator) {
    return (
      <Separator
        hoverIcon={FiChevronRight}
        isDisabled={isSeparatorDisabled}
        separatorPosition='right'
        {...(separator?.props ?? {})}
      />
    )
  }

  return (
    <Flex as='li'>
      <Button
        className='pagination-page'
        {...getPageProps(allProps)}
      >
        {page}
      </Button>
    </Flex>
  )
}
