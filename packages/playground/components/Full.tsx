import React, { FC, ChangeEvent, useEffect, useState } from "react"
import { Grid, Center, Select, Text, Button, Stack } from "@chakra-ui/react"
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination"

type Pokemon = {
  name: string
  url: string
}

type PokemonResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Pokemon[]
}

const fetchPokemons = async (
  pageSize: number,
  offset: number,
): Promise<PokemonResponse> => {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`,
  ).then(async (res) => await res.json())
}

const Full: FC = () => {
  // states
  const [pokemonsTotal, setPokemonsTotal] = useState<number | undefined>(
    undefined,
  )
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  // constants
  const outerLimit = 2
  const innerLimit = 2
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: pokemonsTotal,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: 5,
      isDisabled: false,
      currentPage: 1,
    },
  })
  // effects
  useEffect(() => {
    fetchPokemons(pageSize, offset)
      .then((pokemons) => {
        setPokemonsTotal(pokemons.count)
        setPokemons(pokemons.results)
      })
      .catch((error) => console.error("App =>", error))
  }, [currentPage, pageSize, offset])

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage)
    console.log("request new data with ->", nextPage)
  }
  const handlePageSizeChange = (
    event: ChangeEvent<HTMLSelectElement>,
  ): void => {
    const pageSize = Number(event.target.value)

    setPageSize(pageSize)
  }
  const handleDisableClick = (): void => {
    setIsDisabled((oldState) => !oldState)
  }

  return (
    <Stack>
      <Pagination
        currentPage={currentPage}
        isDisabled={isDisabled}
        pagesCount={pagesCount}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious
            isDisabled
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
            onClick={() => console.warn("I'm clicking the previous")}
          >
            <Text>Previous</Text>
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                isDisabled
                bg="blue.300"
                fontSize="sm"
                jumpSize={11}
                w={7}
                onClick={() => console.warn("I'm clicking the separator")}
              />
            }
          >
            {pages.map((page: number) => (
              <PaginationPage
                key={`pagination_page_${page}`}
                _current={{
                  bg: "green.300",
                  fontSize: "sm",
                  w: 7,
                }}
                _hover={{
                  bg: "green.300",
                }}
                bg="red.300"
                fontSize="sm"
                page={page}
                w={7}
                onClick={() => console.warn("Im clicking the page")}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
            onClick={() => console.warn("I'm clicking the next")}
          >
            <Text>Next</Text>
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
      <Center w="full">
        <Button
          _hover={{
            bg: "purple.400",
          }}
          bg="purple.300"
          onClick={handleDisableClick}
        >
          Disable ON / OFF
        </Button>
        <Select ml={3} w={40} onChange={handlePageSizeChange}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </Select>
      </Center>
      <Grid
        gap={3}
        mt={20}
        px={20}
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(2, 1fr)"
      >
        {pokemons?.map(({ name }) => (
          <Center key={name} bg="green.100" p={4}>
            <Text>{name}</Text>
          </Center>
        ))}
      </Grid>
    </Stack>
  )
}

export default Full
