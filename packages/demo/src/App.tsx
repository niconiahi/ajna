import React, { FC, useState } from "react";
import { ButtonProps, Input, Button, Flex, ChakraProvider } from "@chakra-ui/react";
import { Pagination, Previous, Next, PageGroup, Container } from "@vishuda/pagination";

const App: FC = () => {
  // react hooks
  const [isPaginatorDisabled, setIsPaginatorDisabled] = useState<boolean>(
    false
  );
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);

  // constants
  const pagesQuantity = 20; // -> calculated or obtained from Backend
  const outerLimit = 2;
  const innerLimit = 2;

  // styles
  const baseStyles = {
    w: 7, 
    fontSize: 'sm', 
  }

  const normalStyles = {
    ...baseStyles,
    bg: "red.300"
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    bg: "green.300",
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: 'green.200'
  }

  // handlers
  const handlePageChange = (page: number) => {
    // -> request new data using the page number
    console.log(page);
  };

  const handleDisableClick = () =>
    setIsPaginatorDisabled((oldState) => !oldState);

  const handleCurrentPageChange = (event: React.ChangeEvent<HTMLInputElement>) => setCurrentPage(Number(event.target.value))

  return (
    <ChakraProvider>
      <Pagination
        currentPage={currentPage}
        isDisabled={isPaginatorDisabled}
        activeStyles={activeStyles}
        innerLimit={innerLimit}
        outerLimit={outerLimit}
        normalStyles={normalStyles}
        separatorStyles={separatorStyles}
        pagesQuantity={pagesQuantity}
        onPageChange={handlePageChange}
      >
        <Container align="center" justify="space-between" w="full" p={4}>
          <Previous
          
    bg="green.300"
          >
            Previous
            {/* Or an icon from `react-icons` */}
          </Previous>
          <PageGroup isInline align="center" />
          <Next
          
          
    bg="green.300"
          >
            Next
            {/* Or an icon from `react-icons` */}
          </Next>
        </Container>
      </Pagination
      <Flex w="full" justify="center" align="center">
        <Input value={currentPage} onChange={handleCurrentPageChange} />
        <Button ml={4} onClick={handleDisableClick}>
          Disable ON / OFF
        </Button>
      </Flex>
    </ChakraProvider>
  );
};

export default App;
