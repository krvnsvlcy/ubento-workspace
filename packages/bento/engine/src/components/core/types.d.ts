export type CoreComponent<P> = {
    name: string;
    props: (props: P) => P;
    component: React.ComponentType<P>;
};
export declare function coreComponent<P>(name: string, render: (props: P) => React.ReactNode): {
    name: string;
    props: (props: P) => P;
    component: (props: P) => React.ReactNode;
};
//# sourceMappingURL=types.d.ts.map