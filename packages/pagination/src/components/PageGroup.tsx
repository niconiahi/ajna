import React, { FC, ReactElement, cloneElement, Children } from 'react'
import { Stack, StackProps } from '@chakra-ui/react'

interface Props {
  separator?: ReactElement
}

export const PageGroup: FC<Props & StackProps> = ({ children, separator, ...stackProps }) => {
  // TODO: implement getPageGroupProp

  return (
    <Stack className='pagination-page-group' isInline as='ol' spacing={1} {...stackProps}>
      {Children.map((children), (child) => {
        if (child == null) return

        // @ts-expect-error We know it's a Page component for now
        return cloneElement(child, { separator })
      })}
    </Stack>
  )
}
