import React, { FC, useMemo, MouseEvent } from "react"
import { Button, Flex, ButtonProps, Icon, IconProps } from "@chakra-ui/react"

// components
import FiMoreHorizontal from "./FiMoreHorizontal"

// lib
import { usePaginationContext } from "../lib/hooks/usePaginationContext"
import { INITIAL_VALUES } from "../lib/constants"
import { IconType, SeparatorPosition } from "../lib/types"

type SeparatorProps = {
  hoverIcon?: IconType
  jumpSize?: number
  isDisabled?: boolean
  separatorPosition?: SeparatorPosition
}

const separatorStyles: ButtonProps = {
  cursor: "pointer",
  minW: "auto",
  justifyContent: "center",
  pos: "relative",
  alignItems: "center",
  bg: "transparent",
  px: 1,
  sx: {
    _hover: {
      ".call-to-action": {
        opacity: 1,
      },
    },
  },
}

const separatorIconStyles: IconProps = {
  h: 4,
  w: 4,
  bg: "inherit",
  color: "inherit",
}

const separatorTransitionStyles: IconProps = {
  m: "auto",
  pos: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0,
  transition: "all  cubic-bezier(0.4, 1, 0.9, 0.6) 0.3s",
}

export const PaginationSeparator: FC<SeparatorProps & ButtonProps> = ({
  hoverIcon,
  separatorPosition,
  isDisabled: isDisabledProp,
  jumpSize = INITIAL_VALUES.jumpSize,
  ...buttonProps
}) => {
  // provider
  const { actions, state } = usePaginationContext()
  const { currentPage, pagesCount, isDisabled: isDisabledGlobal } = state
  const { changePage } = actions

  // methods
  const getPageToJump = (separatorPosition?: SeparatorPosition): number => {
    if (separatorPosition === "left") return currentPage - jumpSize
    if (separatorPosition === "right") return currentPage + jumpSize

    return 0
  }

  const determineJumpAllowance = (
    separatorPosition?: SeparatorPosition,
  ): boolean => {
    if (separatorPosition === "left") {
      return currentPage - jumpSize > 0
    }

    if (separatorPosition === "right") {
      return currentPage + jumpSize < pagesCount + 1
    }

    return false
  }

  const getSeparatorProps = ({
    onClick,
    ...props
  }: ButtonProps): ButtonProps => ({
    ...props,
    "aria-label": `Jump pages ${jumpingDirectionLabel}`,
    "aria-disabled": isDisabled,
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        onClick?.(event)
      }

      handleJumpClick()
    },
  })

  // constants
  const canJump = determineJumpAllowance(separatorPosition)

  // memos
  const isDisabled = useMemo(
    () => !canJump || (isDisabledProp ?? isDisabledGlobal),
    [canJump, isDisabledProp, isDisabledGlobal],
  )

  const jumpingDirectionLabel = useMemo(
    () => (separatorPosition === "left" ? "backwards" : "forward"),
    [separatorPosition],
  )

  const allProps = useMemo(
    () => ({
      ...separatorStyles,
      ...buttonProps,
    }),
    [buttonProps],
  )

  // handlers
  const handleJumpClick = (): void => {
    if (isDisabled) return

    const pageToJump = getPageToJump(separatorPosition)

    changePage(pageToJump)
  }

  return (
    <Flex as="li">
      <Button className="pagination-separator" {...getSeparatorProps(allProps)}>
        <Icon as={FiMoreHorizontal} {...separatorIconStyles} />
        <Icon
          as={hoverIcon}
          className="call-to-action"
          {...separatorIconStyles}
          {...separatorTransitionStyles}
        />
      </Button>
    </Flex>
  )
}
