import React, { FC } from 'react'
import { FlexProps, Flex } from '@chakra-ui/react'

export const Container: FC<FlexProps> = ({ children, ...flexProps }) => {
  // TODO: implement  getContainerProps

  return (
    <Flex className='pagination-container' aria-label='pagination navigation' as='nav' {...flexProps}>
      {children}
    </Flex>
  )
}
