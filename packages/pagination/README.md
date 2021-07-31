# @ajna/pagination

## Table of Contents

- [Version](#version)
- [Installation](#installation)
- [Demo with all options applied](#demo-with-all-options-applied)
- [Components](#components)
  - [Pagination](#pagination)
  - [PaginationContainer](#paginationcontainer)
  - [PaginationPageGroup](#paginationpagegroup)
  - [PaginationPrevious](#paginationprevious)
  - [PaginationNext](#paginationnext)
  - [PaginationPage](#paginationpage)
  - [PaginationSeparator](#paginationseparator)
- [Hooks](#hooks)
  - [usePagination](#usepagination)
- [Usage](#usage)
  - [Minimal](#minimal)
  - [Styling](#styling)
  - [Disabling](#disabling)
  - [Page size](#page-size)
  - [Limits](#limits)
  - [Separator](#separator)
  - [Offset](#offset)
  - [Total](#total)
  - [Full usage example](#full-usage-example)

## Version

## [![npm version](https://badge.fury.io/js/%40ajna%2Fpagination.svg)](https://badge.fury.io/js/%40ajna%2Fpagination)

<br />

## Installation

### npm

```bash
npm i @ajna/pagination
```

### Yarn

```bash
yarn add @ajna/pagination
```

<br />

## Demo with all options applied

### [Check it out in this Sandbox](https://codesandbox.io/s/ajna-pagination-forked-7mrtq)

<br />

## Components

<br />

### Pagination

| Prop         | Description                                                  | Type                          | Default | Required |
| ------------ | ------------------------------------------------------------ | ----------------------------- | ------- | -------- |
| pagesCount   | The total number of pages                                    | number                        |         | yes      |
| currentPage  | The page which is currently being selected                   | number                        |         | yes      |
| onPageChange | On change handler which returns the last selected page       | (currentPage: number) => void |         | yes      |
| isDisabled   | Denotates if all items on the pagination are disabled or not | boolean                       | false   | no       |

<br />

### PaginationContainer

It's a **Flex** component, so any **FlexProps** are accepted

<br />

### PaginationPageGroup

It's a **Stack** component, so any **StackProps** are accepted

<br />

### PaginationPrevious

It's a **Button** component, so any **ButtonProps** are accepted

<br />

### PaginationNext

It's a **Button** component, so any **ButtonProps** are accepted

<br />

### PaginationPage

It's a **Button** component, so any **ButtonProps** are accepted

<br />

### PaginationSeparator

It's a **Button** component, so any **ButtonProps** are accepted

<br />

## Hooks

### usePagination

<br />

#### Options

| Prop         | Description                                                     | Type         | Default   | Required |
| ------------ | --------------------------------------------------------------- | ------------ | --------- | -------- |
| initialState | Initial states for pagination values                            | InitialState |           | yes      |
| total        | The total amount of items from the endpoint you are consuming   | number       | undefined | no       |
| limits       | The limits cut the amount of pages to show                      | Limits       | undefined | no       |
| pagesCount   | If the amount of pages is manually set, it will take precedence | number       | undefined | no       |

<br />

#### Returned values

| Prop           | Description                                                  | Type                              | Default   |
| -------------- | ------------------------------------------------------------ | --------------------------------- | --------- |
| offset         | Offset value generated                                       | number                            | 0         |
| pages          | The array of pages to render                                 | number[]                          | []        |
| pagesCount     | The total amount of pages                                    | number                            | 0         |
| currentPage    | The page which is currently being selected                   | number                            |           |
| pageSize       | The amount of items per page                                 | number                            | undefined |
| isDisabled     | Denotates if all items on the pagination are disabled or not | boolean                           | false     |
| setPageSize    | A setter for the isDisabled value                            | Dispatch<SetStateAction<number>>  |           |
| setIsDisabled  | A setter for the isDisabled value                            | Dispatch<SetStateAction<boolean>> |           |
| setCurrentPage | A setter for the currentPage value                           | Dispatch<SetStateAction<number>>  |           |

<br />

## Usage

<br />

### Minimal

This is the bare minimum set up you need to get it up and working

```tsx
import React, { FC, ChangeEvent, useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Paginator,
  PaginationContainer,
  PaginationPrevious,
  PaginationNext,
  PaginationPageGroup,
  PaginationPage,
  usePagination,
} from "@ajna/pagination";

const Minimal: FC = () => {
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: 12,
    initialState: { currentPage: 1 },
  });

  return (
    <ChakraProvider>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <PaginationContainer>
          <PaginationPrevious>Previous</PaginationPrevious>
          <PaginationPageGroup>
            {pages.map((page: number) => (
              <PaginationPage key={`pagination_page_${page}`} page={page} />
            ))}
          </PaginationPageGroup>
          <PaginationNext>Next</PaginationNext>
        </PaginationContainer>
      </Pagination>
    </ChakraProvider>
  );
};

export default Demo;
```

<br />

### Styling

The **\_curent** prop will contain the props for the page which is currently selected
All other props will apply to every other page

```tsx
<PaginationPage
  w={7}
  bg="red.300"
  fontSize="sm"
  _hover={{
    bg: "green.300"
  }}
  _current={{
    w: 7,
    bg: "green.300"
    fontSize: "sm"
    _hover: {
      bg: "blue.300"
    },
  }}
>
```

<br />

```tsx
<PaginationPrevious
  bg="blue.500"
  w="20rem"
  //...any button prop
>
  Previous
</PaginationPrevious>
```

<br />

```tsx
<PaginationNext
  w={7}
  bg="red.300"
  fontSize="sm"
  //...any button prop
>
  Next
</PaginationNext>
```

<br />

```tsx
<PaginationContainer
  bg="blue.500"
  w="full"
  //...any flex prop
>
  ...
</PaginationContainer>
```

<br />

```tsx
<PaginationPageGroup
  bg="blue.500"
  w="full"
  //...any stack prop
>
  ...
</PaginationPageGroup>
```

<br />

### Disabling

It's provided a commodity disable prop to disable/enable all your pagination components at once

```tsx
const { isDisabled, setIsDisabled } = usePagination({
  initialState: { isDisabled: false }
});

const handleDisableClick = () => {
  return setIsDisabled((oldState) => !oldState);
};

<Pagination
  isDisabled={isDisabled}
>
```

<br />

### Page size

It's provided a commodity page size setter and getter

```tsx
const { pageSize, setPageSize } = usePagination({
  initialState: { pageSize: 5 },
});

const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
  const pageSize = Number(event.target.value);

  setPageSize(pageSize);
};
```

<br />

### Limits

You can trim the ammount of pages you show by passing _both_ **limits** at the same time
You need to pass them _both_, otherwise no limits will be applied

```tsx
const { pages } = usePagination({
  limits: {
    outer: outerLimit,
    inner: innerLimit,
  },
});
```

<br />

### Separator

Additionaly, you can customize the separator component used when limits are defined

```tsx
<PaginationPageGroup separator={<PaginationSeparator _hover={{ bg: 'purple.500' }} bg='teal.500'>}>
  {pages.map((page: number) => (
    <PaginationPage key={`pagination_page_${page}`} page={page} />
  ))}
</PaginationPageGroup>
```

<br />

### Offset

It's possible that the API for the pagination you are consuming works with an **offset**
One it's calculated and provided for you using the **pageSize** and **currentPage** values

This is calculated with the next formula:

```
[currentPage * pageSize - pageSize]

currentPage === 1 && pageSize === 5 // offset = 0;
currentPage === 2 && pageSize === 5 // offset = 5;
currentPage === 3 && pageSize === 5 // offset = 10;
```

```tsx
const { offset, pageSize } = usePagination({
  initialState: { pageSize: 5 },
});

fetchUsingOffset(pageSize, offset).then((data) => {
  // use data
});
```

<br />

### Total

Keep in mind that if you know the **total** amount of items of the requested endpoint, which is not
a strange thing to be returned, you can use that to generate the **pages** for you

```tsx
const { pages, pagesCount } = usePaginator({
  total: 4021,
  initialState: { pageSize: 5 }
});

<Pagination
  pagesCount={pagesCount}
>

<PaginationPageGroup>
  {pages.map((page: number) => (
    <PaginationPage key={`pagination_page_${page}`} page={page} />
  ))}
</PaginationPageGroup>
```

<br />

### Full usage example

In this example you can see all the possible features provided by the library being applied
to show 10 pokemons names, with the ability to play with the page size and disable state

```tsx
import React, { FC, ChangeEvent, useEffect, useState } from "react";
import { Grid, Center, Select, Text, Button, Stack } from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";

const fetchPokemons = async (
  pageSize: number,
  offset: number
): Promise<any> => {
  return await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
  ).then(async (res) => await res.json());
};

const Full: FC = () => {
  // states
  const [pokemonsTotal, setPokemonsTotal] = useState<number | undefined>(
    undefined
  );
  const [pokemons, setPokemons] = useState<any[]>([]);

  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  // pagination hook
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
  });

  // effects
  useEffect(() => {
    fetchPokemons(pageSize, offset)
      .then((pokemons) => {
        setPokemonsTotal(pokemons.count);
        setPokemons(pokemons.results);
      })
      .catch((error) => console.error("App =>", error));
  }, [currentPage, pageSize, offset]);

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const handlePageSizeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  const handleDisableClick = (): void => {
    setIsDisabled((oldState) => !oldState);
  };

  return (
    <Stack>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
            isDisabled
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
                onClick={() => console.warn("I'm clicking the separator")}
                bg="blue.300"
                fontSize="sm"
                w={7}
                jumpSize={11}
              />
            }
          >
            {pages.map((page: number) => (
              <PaginationPage
                w={7}
                bg="red.300"
                key={`pagination_page_${page}`}
                page={page}
                onClick={() => console.warn("Im clicking the page")}
                fontSize="sm"
                _hover={{
                  bg: "green.300",
                }}
                _current={{
                  bg: "green.300",
                  fontSize: "sm",
                  w: 7,
                }}
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
        <Select ml={3} onChange={handlePageSizeChange} w={40}>
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
  );
};

export default Full;
```
