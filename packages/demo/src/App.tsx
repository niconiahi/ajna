import React, { FC, ChangeEvent, useEffect, useState } from 'react'
import {
  Grid,
  Center,
  Select,
  Text,
  Button,
  ChakraProvider
} from '@chakra-ui/react'
import {
  Pagination,
  Container,
  Separator,
  Previous,
  Page,
  usePagination,
  Next,
  PageGroup
} from '@vishuda/pagination'

const fetchPokemons = async (pageSize: number, offset: number): Promise<any> => {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
  ).then(async (res) => await res.json())
}

const Demo: FC = () => {
  // states
  const [pokemonsTotal, setPokemonsTotal] = useState<number | undefined>(
    undefined
  )
  const [pokemons, setPokemons] = useState<any[]>([])

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
    setPageSize
  } = usePagination({
    total: pokemonsTotal,
    limits: {
      outer: outerLimit,
      inner: innerLimit
    },
    initialState: {
      pageSize: 5,
      isDisabled: false,
      currentPage: 1
    }
  })
  // effects
  useEffect(() => {
    fetchPokemons(pageSize, offset).then((pokemons) => {
      setPokemonsTotal(pokemons.count)
      setPokemons(pokemons.results)
    }).catch((error) => console.error('App =>', error))
  }, [currentPage, pageSize, offset])

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage)
    console.log('request new data with ->', nextPage)
  }

  const handlePageSizeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const pageSize = Number(event.target.value)

    setPageSize(pageSize)
  }

  const handleDisableClick = (): void => {
    setIsDisabled((oldState) => !oldState)
  }

  return (
    <ChakraProvider>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageChange}
      >
        <Container align='center' justify='space-between' p={4} w='full'>
          <Previous bg='yellow.300' isDisabled onClick={() => console.error("I'm clicking the previous")}>
            <Text>Previous</Text>
          </Previous>
          <PageGroup isInline align='center' separator={<Separator isDisabled onClick={() => console.error("I'm clicking the separator")} bg='blue.300' fontSize='sm' w={7} jumpSize={11} />}>
            {pages.map((page: number) => (
              <Page
                w={7}
                bg='red.300'
                key={`pagination_page_${page}`}
                page={page}
                onClick={() => console.error('Im clicking the page')}
                fontSize='sm'
                _hover={{
                  bg: 'green.300'
                }}
                _current={{
                  _hover: {
                    bg: 'blue.300'
                  },
                  bg: 'green.300',
                  fontSize: 'sm',
                  w: 7
                }}
              />
            ))}
          </PageGroup>
          <Next bg='yellow.300' onClick={() => console.error("I'm clicking the next")}>
            <Text>Next</Text>
          </Next>
        </Container>
      </Pagination>
      <Center w='full'>
        <Button bg='purple.300' onClick={handleDisableClick}>Disable ON / OFF</Button>
        <Select ml={3} onChange={handlePageSizeChange} w={40}>
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
        </Select>
      </Center>
      <Grid
        gap={3}
        mt={20}
        px={20}
        templateColumns='repeat(5, 1fr)'
        templateRows='repeat(2, 1fr)'
      >
        {pokemons?.map(({ name }) => (
          <Center key={name} bg='green.100' p={4}>
            <Text>{name}</Text>
          </Center>
        ))}
      </Grid>
    </ChakraProvider>
  )
}

export default Demo
