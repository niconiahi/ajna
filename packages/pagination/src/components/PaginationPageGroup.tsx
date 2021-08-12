import React, { FC, ReactElement, cloneElement, Children } from "react"
import { Stack, StackProps } from "@chakra-ui/react"

export type PageGroupProps = {
  separator?: ReactElement
}

export const PaginationPageGroup: FC<PageGroupProps & StackProps> = ({
  children,
  separator,
  ...stackProps
}) => {
  // TODO: implement getPageGroupProp

  return (
    <Stack
      isInline
      as="ol"
      className="pagination-page-group"
      spacing={1}
      {...stackProps}
    >
      {Children.map(children, (child) => {
        if (child == null) return

        // @ts-expect-error We know it's a Page component for now
        return cloneElement(child, { separator })
      })}
    </Stack>
  )
}
