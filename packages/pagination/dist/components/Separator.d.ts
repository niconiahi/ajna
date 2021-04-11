import { FC } from "react";
import { ButtonProps } from "@chakra-ui/react";
import { IconType } from "../lib/types";
declare type SeparatorProps = {
    separatorIcon?: IconType;
    hoverIcon: IconType;
    separatorStyles: ButtonProps;
    separatorPosition: "left" | "right";
    isDisabled: boolean;
};
export declare const Separator: FC<SeparatorProps>;
export {};
