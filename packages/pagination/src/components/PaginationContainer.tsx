import React, { FC } from "react"
import { FlexProps, Flex } from "@chakra-ui/react"

export const PaginationContainer: FC<FlexProps> = ({
  children,
  ...flexProps
}) => (
  <Flex
    className="pagination-container"
    aria-label="pagination navigation"
    as="nav"
    {...flexProps}
  >
    {children}
  </Flex>
)
