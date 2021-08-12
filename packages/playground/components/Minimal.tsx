import React, { FC } from "react"
import { Text } from "@chakra-ui/react"
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
} from "@ajna/pagination"

const Minimal: FC = () => {
  const { pages, pagesCount, currentPage, setCurrentPage } = usePagination({
    pagesCount: 12,
    initialState: {
      currentPage: 1,
    },
  })

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage)
    console.log("request new data with ->", nextPage)
  }

  return (
    <Pagination
      currentPage={currentPage}
      pagesCount={pagesCount}
      onPageChange={handlePageChange}
    >
      <PaginationContainer>
        <PaginationPrevious>
          <Text>Previous</Text>
        </PaginationPrevious>
        <PaginationPageGroup>
          {pages.map((page: number) => (
            <PaginationPage key={`pagination_page_${page}`} page={page} />
          ))}
        </PaginationPageGroup>
        <PaginationNext>
          <Text>Next</Text>
        </PaginationNext>
      </PaginationContainer>
    </Pagination>
  )
}

export default Minimal
