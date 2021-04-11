import { FC } from "react";
import { ButtonProps } from "@chakra-ui/react";
import { IconType } from "../lib/types";
export declare type PaginatorProps = {
    pagesQuantity: number;
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
export declare const Paginator: FC<PaginatorProps>;
