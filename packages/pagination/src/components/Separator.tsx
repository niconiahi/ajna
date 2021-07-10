import React, { FC } from 'react'
import { Button, Flex, ButtonProps, Icon } from '@chakra-ui/react'

// components
import FiMoreHorizontal from './FiMoreHorizontal'

// lib
import { usePaginationContext } from '../lib/hooks/usePaginationContext'
import { INITIAL_VALUES } from '../lib/constants'
import { IconType } from '../lib/types'

interface SeparatorProps {
  hoverIcon?: IconType
  jumpSize?: number
  isDisabled?: boolean
  separatorPosition?: 'left' | 'right'
}

export const Separator: FC<SeparatorProps & ButtonProps> = ({
  hoverIcon,
  separatorPosition,
  isDisabled: isDisabledProp,
  jumpSize = INITIAL_VALUES.jumpSize,
  ...buttonProps
}) => {
  // provider
  const { actions, state } = usePaginationContext()
  const { currentPage, isDisabled: isDisabledGlobal } = state
  const { changePage } = actions

  // memos
  const getPageToJump = (): number => {
    if (separatorPosition === 'left') return currentPage - jumpSize
    if (separatorPosition === 'right') return currentPage + jumpSize

    return 0
  }

  // constants
  // TODO: add 'canJump' using 'pagesCount' to determine allowence to not going over the limit
  const isDisabled = isDisabledProp ?? isDisabledGlobal
  const jumpingDirectionLabel =
    separatorPosition === 'left' ? 'backwards' : 'forward'

  // handlers
  const handleJumpClick = (): void => {
    if (isDisabled) return

    const pageToJump = getPageToJump()

    changePage(pageToJump)
  }

  // TODO: implement getSeparatorProps

  return (
    <Flex as='li'>
      <Button
        align='center'
        className='pagination-separator'
        aria-label={`Jump pages ${jumpingDirectionLabel}`}
        bg='transparent'
        cursor='pointer'
        justify='center'
        minW='auto'
        pointerEvents={isDisabled ? 'none' : 'auto'}
        pos='relative'
        px={1}
        onClick={handleJumpClick}
        sx={{
          _hover: {
            '.call-to-action': {
              opacity: 1
            }
          }
        }}
        {...(isDisabled ? { 'aria-disabled': true } : {})}
        {...buttonProps}
      >
        <Icon
          as={FiMoreHorizontal}
          bg='inherit'
          color='inherit'
          h={4}
          w={4}
        />
        <Icon
          as={hoverIcon}
          bg='inherit'
          bottom={0}
          className='call-to-action'
          color='inherit'
          h={4}
          left={0}
          m='auto'
          opacity={0}
          pos='absolute'
          right={0}
          top={0}
          transition='all  cubic-bezier(0.4, 1, 0.9, 0.6) 0.3s'
          w={4}
        />
      </Button>
    </Flex>
  )
}
