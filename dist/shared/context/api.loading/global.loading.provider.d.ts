import React, { JSX } from "react";
type Props = {
    children: JSX.Element;
    LoadingComponent: React.ReactNode;
};
export default function GlobalLoadingProvider({ children, LoadingComponent, }: Props): import("react/jsx-runtime").JSX.Element | null;
export {};
