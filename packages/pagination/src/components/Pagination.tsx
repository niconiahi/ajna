import React, { FC } from "react";
import { ButtonProps } from "@chakra-ui/react";

// lib
import { PaginationProvider } from "../lib/providers/PaginationProvider";
import { IconType } from "../lib/types";
import { INITIAL_VALUES } from "../lib/constants";

export type PaginationProps = {
  pagesQuantity?: number;
  onPageChange: (page: number) => void;
  normalStyles?: ButtonProps;
  activeStyles?: ButtonProps;
  separatorStyles?: ButtonProps;
  currentPage?: number;
  innerLimit?: number;
  outerLimit?: number;
  separatorIcon?: IconType;
  hoverIconRight?: IconType;
  hoverIconLeft?: IconType;
  isDisabled?: boolean;
};

export const Pagination: FC<PaginationProps> = ({
  children,
  pagesQuantity = INITIAL_VALUES.pagesQuantity,
  normalStyles = INITIAL_VALUES.normalStyles,
  activeStyles = INITIAL_VALUES.activeStyles,
  separatorStyles = INITIAL_VALUES.separatorStyles,
  isDisabled = INITIAL_VALUES.isDisabled,
  innerLimit = INITIAL_VALUES.innerLimit,
  separatorIcon = INITIAL_VALUES.separatorIcon,
  outerLimit = INITIAL_VALUES.outerLimit,
  hoverIconLeft = INITIAL_VALUES.hoverIconLeft,
  hoverIconRight = INITIAL_VALUES.hoverIconRight,
  currentPage = INITIAL_VALUES.currentPage,
  onPageChange,
}) => (
  <PaginationProvider
    activeStyles={activeStyles}
    currentPage={currentPage}
    hoverIconLeft={hoverIconLeft}
    hoverIconRight={hoverIconRight}
    innerLimit={innerLimit}
    isDisabled={isDisabled}
    normalStyles={normalStyles}
    onPageChange={onPageChange}
    outerLimit={outerLimit}
    pagesQuantity={pagesQuantity}
    separatorIcon={separatorIcon}
    separatorStyles={separatorStyles}
  >
    {children}
  </PaginationProvider>
);
