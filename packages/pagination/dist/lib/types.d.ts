/// <reference types="react" />
interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
}
export declare type IconType = (props: IconBaseProps) => JSX.Element;
export {};
