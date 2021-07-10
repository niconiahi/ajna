import React, { useMemo, FC, ReactElement } from 'react'
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
  separator?: ReactElement
  _current?: ButtonProps
}

export const Page: FC<PageProps & ButtonProps> = ({ page, isDisabled: isDisabledProp, separator, _current = {}, ...buttonProps }) => {
  // provider
  const { actions, state } = usePaginationContext()
  const { changePage } = actions
  const {
    currentPage,
    isDisabled: isDisabledGlobal
  } = state

  // constants
  const isDisabled = isDisabledProp ?? isDisabledGlobal
  const isCurrent = currentPage === page
  const isLeftSeparator = page === SEPARATORS.left
  const isRightSeparator = page === SEPARATORS.right
  const pageLabel = isCurrent
    ? `Current page, page ${page}`
    : `Go to page ${page}`

  // memos
  const baseButtonProps: ButtonProps = useMemo(
    () => ({
      minW: 'auto',
      px: 1,
      pointerEvents: isDisabled ? 'none' : 'auto',
      cursor: 'pointer',
      onClick: (): void => changePage(page)
    }),
    [changePage, isDisabled, page]
  )

  if (isLeftSeparator) {
    return (
      <Separator
        hoverIcon={FiChevronLeft}
        isDisabled={isDisabled}
        separatorPosition='left'
        {...(separator?.props ?? {})}
      />
    )
  }

  if (isRightSeparator) {
    return (
      <Separator
        hoverIcon={FiChevronRight}
        isDisabled={isDisabled}
        separatorPosition='right'
        {...(separator?.props ?? {})}
      />
    )
  }

  // TODO: implement getPageProps

  return (
    <Flex as='li'>
      <Button
        className='pagination-page'
        aria-label={pageLabel}
        {...baseButtonProps}
        {...buttonProps}
        isDisabled={isDisabled}
        {...(isDisabled ? { 'aria-disabled': true } : {})}
        {...(isCurrent ? { 'aria-current': true } : {})}
        {...(isCurrent ? { ..._current } : {})}
      >
        {page}
      </Button>
    </Flex>
  )
}
