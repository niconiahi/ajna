import { useContext, useMemo } from "react";
import { generatePages } from "../helpers";

// lib
import { PaginationContext } from "../providers/PaginationProvider";

type Values = {
  pages: number[];
};

export const useGeneratePages = (): Values => {
  // react hooks
  const { state } = useContext(PaginationContext);

  // constants
  const { currentPage, innerLimit, outerLimit, pagesQuantity } = state;

  const pages = useMemo(
    () =>
      generatePages({
        currentPage,
        innerLimit,
        outerLimit,
        pagesQuantity,
      }),
    [currentPage, innerLimit, outerLimit, pagesQuantity]
  );

  return {
    pages,
  };
};
