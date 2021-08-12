import React, { FC, MouseEvent, useMemo } from "react"
import { Button, ButtonProps } from "@chakra-ui/react"

// lib
import { usePaginationContext } from "../lib/hooks/usePaginationContext"

export const PaginationPrevious: FC<ButtonProps> = ({
  children,
  isDisabled: isDisabledProp,
  ...buttonProps
}) => {
  // provider
  const { actions, state } = usePaginationContext()
  const { changePage } = actions

  const { currentPage, isDisabled: isDisabledGlobal } = state

  // memos
  const isFirst = useMemo(() => currentPage === 1, [currentPage])
  const isDisabled = useMemo(
    () => isFirst || (isDisabledProp ?? isDisabledGlobal),
    [isFirst, isDisabledProp, isDisabledGlobal],
  )
  const allProps = useMemo(
    () => ({
      ...buttonProps,
      isDisabled,
    }),
    [buttonProps, isDisabled],
  )

  // methods
  const getPreviousProps = ({
    onClick,
    isDisabled,
    ...props
  }: ButtonProps): ButtonProps => ({
    ...props,
    "aria-label": "Previous page",
    "aria-disabled": isDisabled,
    isDisabled,
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        onClick?.(event)
      }

      handlePreviousClick()
    },
  })

  // handlers
  const handlePreviousClick = (): void => {
    if (!isFirst) changePage(currentPage - 1)
  }

  return (
    <Button className="pagination-previous" {...getPreviousProps(allProps)}>
      {children}
    </Button>
  )
}
