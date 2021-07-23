# Chakra paginator

## Table of Contents

- [Version](#version)
- [Installation](#installation)
- [Demo with all options applied](#demo-with-all-options-applied)
- [Components API](#components-api)
  - [Pagination](#pagination)
  - [PaginationContainer](#pagination-container)
  - [PaginationPageGroup](#pagination-pagegroup)
  - [PaginationPrevious](#pagination-previous)
  - [PaginationNext](#pagination-next)
  - [PaginationPage](#pagination-page)
  - [PaginationSeparator](#pagination-separator)
- [Hooks API](#hooks-api)
  - [usePagination](#usepaginator)
- [Usage](#usage)
  - [Minimal](#minimal)
  - [Styling](#styling)
  - [Disabling](#disabling)
  - [Page size](#page-size)
  - [Limits](#limits)
  - [Offset](#offset)
  - [Pages quantity](#pages-quantity)
  - [Full usage example](#full-usage-example)

## Version

## [![npm version](https://badge.fury.io/js/chakra-paginator.svg)](https://badge.fury.io/js/chakra-paginator)

<br />

## Installation

### npm

```bash
npm i chakra-paginator
```

### Yarn

```bash
yarn add chakra-paginator
```

<br />

## Demo with all options applied

## [Check it out in this Sandbox](https://codesandbox.io/s/chakra-paginator-demo-4n2gd)

<br />

## Components API

<br />

### Pagination

| Prop            | Description                                                                                                                                                | Type                       | Default | Required |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------- | -------- |
| pagesQuantity   | The total number of pages, calculated based on Backend data                                                                                                | number                     | 0       | yes      |
| onPageChange    | On change handler which returns the last selected page                                                                                                     | (nextPage: number) => void |         | yes      |
| isDisabled      | Disables all of the pagination components. You can always disable each individual component via the isDisabled prop, as the components render HTML buttons | boolean                    | false   | no       |
| activeStyles    | The styles of the active page button                                                                                                                       | ButtonProps                | {}      | no       |
| normalStyles    | The styles of the inactive page buttons                                                                                                                    | ButtonProps                | {}      | no       |
| separatorStyles | The styles of the separator wrapper                                                                                                                        | ButtonProps                | {}      | no       |
| outerLimit      | The amount of pages to show at the start and at the end                                                                                                    | number                     | 0       | no       |
| innerLimit      | The amount of pages to show from the _currentPage_ backwards and forward                                                                                   | number                     | 0       | no       |
| currentPage     | Manually set the _currentPage_ of the pagination                                                                                                           | number                     | 1       | no       |

<br />

### usePaginator

<br />

#### Options

| Prop         | Description                                            | Type         | Default | Required |
| ------------ | ------------------------------------------------------ | ------------ | ------- | -------- |
| total        | The total amount of items obtained from a Backend call | number       | 0       | no       |
| initialState | Initial states for pagination values                   | InitialState |         | yes      |

<br />

#### Returned values

| Prop           | Description                                                                                                                                                | Type                                | Default | Required |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ------- | -------- |
| offset         | Generic offset value generated if pageSize is provided                                                                                                     | number                              | 0       | no       |
| pagesQuantity  | Automatically calculated based on total and pageSize. Keep in mind that you can pass this directly to Paginator. This is a commodity if you know the total | number                              | 0       | no       |
| currentPage    | The current page number                                                                                                                                    | number                              |         | yes      |
| pageSize       | The amount of items per page                                                                                                                               | number                              | 10      | no       |
| isDisabled     | Disabled or enables all the pagination components                                                                                                          | boolean                             | false   | no       |
| setPageSize    | A setter for the pageSize value                                                                                                                            | Dispatch<SetStateAction <number> >  |         | no       |
| setIsDisabled  | A setter for the isDisabled value                                                                                                                          | Dispatch<SetStateAction <boolean> > |         | no       |
| setCurrentPage | A setter for the currentPage value                                                                                                                         | Dispatch<SetStateAction <number> >  |         | yes      |

<br />

### Container

```
Container is a _Flex_ component, so any _FlexProps_ are accepted
```

<br />

### PageGroup

```
PageGroup is a _Stack_ component, so any _StackProps_ are accepted
```

<br />

### Previous

```
Previous is a _Button_ component, so any _ButtonProps_ are accepted
```

<br />

### Next

```
Next is a _Button_ component, so any _ButtonProps_ are accepted
```

<br />

## Usage

<br />

### Minimal

```
This is the bare minimum set up you need to get it up and working
```

```tsx
import React, { FC, ChangeEvent, useEffect, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Paginator,
  Container,
  Previous,
  Next,
  PageGroup,
  Page,
  usePagination,
} from "@ajna/pagination";

const Demo: FC = () => {
  const { currentPage, setCurrentPage, pagesCount } = usePagination({
    pagesCount: 12,
    initialState: { currentPage: 1 },
  });

  return (
    <ChakraProvider>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          w="full"
          p={4}
        >
          <PaginationPrevious>
            Previous
            {/* Or an icon from `react-icons` */}
          </PaginationPrevious>
          <PaginationPageGroup isInline align="center">
            {pages.map((page: number) => (
              <PaginationPage key={`pagination_page_${page}`} page={page} />
            ))}
          </PaginationPageGroup>
          <PaginationNext>
            Next
            {/* Or an icon from `react-icons` */}
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
    </ChakraProvider>
  );
};

export default Demo;
```

<br />

### Styling

```
The _current prop will contain the styles for the page which is currently selected
All other props will apply to every other page
```

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

<PaginationNext
  w={7}
  bg="red.300"
  fontSize="sm"
  //...any button prop
>
  Next
</PaginationNext>

<PaginationContainer
  bg="blue.500"
  w="full"
  //...any flex prop
>
  ...
</PaginationContainer>
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

```
It's provided a commodity disable prop to disable/enable all your pagination components at once
```

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

```
It's provided a commodity page size setter and getter
```

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

```
You can trim the ammount of pages you show by passing both limits at the same time
You need to pass them both, otherwise no limits will be applied
```

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

```
Additionaly, you can customize the separator component used when limits are defined
```

```tsx
<PaginationPageGroup separator={<PaginationSeparator _hover={{ bg: 'purple.500' }} bg='teal.500'>}>
  {pages.map((page: number) => (
    <PaginationPage key={`pagination_page_${page}`} page={page} />
  ))}
</PaginationPageGroup>
```

<br />

### Offset

```
It's possible that the API for the pagination you are consuming works with an offset
One it's calculated and provided for you using the pageSize and currentPage values
```

```
This is calculated with the next formula:

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

### Pages quantity

```
Keep in mind that if you know the total amount of items of the requested endpoint, which is not
a strange thing to be returned, you can use that to generate the pages quantity value for you
```

```tsx
const { pagesCount } = usePaginator({
  total: 4021,
  initialState: { pageSize: 5 }
});

<Paginator
  pagesCount={pagesCount}
>
```

<br />

### Full usage example

```
In this example you can see all the possible features provided by the library being applied
to show 10 pokemons names, with the ability to play with the page size and disable state
```

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
