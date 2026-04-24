export function coreComponent(name, render) {
    return {
        name,
        props: (props) => props,
        component: render,
    };
}
//# sourceMappingURL=types.js.map