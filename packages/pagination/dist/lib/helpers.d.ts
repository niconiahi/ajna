declare type Arguments = {
    pagesQuantity: number;
    innerLimit: number;
    outerLimit: number;
    currentPage: number;
};
export declare const getFirstItem: <T>(array: T[]) => T;
export declare const getLastItem: <T>(array: T[]) => T;
export declare const isDecimalNumber: (number: number) => boolean;
export declare const generatePages: ({ pagesQuantity, currentPage, innerLimit, outerLimit, }: Arguments) => number[];
export {};
