import React, { FC, Dispatch, SetStateAction } from "react";
import { ButtonProps } from "@chakra-ui/react";
import { IconType } from "../types";
export declare type PaginatorContextValues = {
    state: {
        currentPage: number;
        pagesQuantity: number;
        outerLimit: number;
        activeStyles: ButtonProps;
        hoverIconRight?: IconType;
        hoverIconLeft?: IconType;
        separatorStyles: ButtonProps;
        normalStyles: ButtonProps;
        innerLimit: number;
        separatorIcon?: IconType;
        isDisabled: boolean;
    };
    actions: {
        setCurrentPage: Dispatch<SetStateAction<number>>;
        setIsDisabled: Dispatch<SetStateAction<boolean>>;
        changePage: (page: number) => void;
    };
};
export declare const PaginatorContext: React.Context<PaginatorContextValues>;
declare type PaginatorProviderProps = {
    pagesQuantity: number;
    normalStyles: ButtonProps;
    activeStyles: ButtonProps;
    hoverIconRight?: IconType;
    separatorStyles: ButtonProps;
    hoverIconLeft?: IconType;
    innerLimit: number;
    currentPage: number;
    outerLimit: number;
    separatorIcon?: IconType;
    onPageChange: (page: number) => void;
    isDisabled: boolean;
};
export declare const PaginatorProvider: FC<PaginatorProviderProps>;
export {};
