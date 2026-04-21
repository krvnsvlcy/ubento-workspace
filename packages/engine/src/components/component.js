import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { proxy } from "valtio";
import { text } from "./core/text";
const coreComponents = {
    [text.name]: text.component,
};
export const ComponentRegistryContext = createContext(proxy(coreComponents));
export function ComponentRegistryProvider({ registry, children, }) {
    const proxyRegistry = useMemo(() => proxy({ ...coreComponents, ...registry }), [registry]);
    return (_jsx(ComponentRegistryContext.Provider, { value: proxyRegistry, children: children }));
}
// Cache for remote modules to avoid re-importing
const remoteCache = {};
export function Component({ id, props = {}, }) {
    const registry = useContext(ComponentRegistryContext);
    const [remoteComponent, setRemoteComponent] = useState(null);
    const [error, setError] = useState(null);
    const localComponent = registry[id];
    const isUrl = id.startsWith("http://") || id.startsWith("https://") || id.endsWith(".js");
    useEffect(() => {
        if (!localComponent && isUrl) {
            if (remoteCache[id]) {
                setRemoteComponent(() => remoteCache[id]);
                return;
            }
            // Dynamic import of the ES module
            import(/* @vite-ignore */ id)
                .then((mod) => {
                const Comp = mod.default;
                remoteCache[id] = Comp;
                setRemoteComponent(() => Comp);
            })
                .catch((err) => {
                console.log(`Failed to load remote component: ${id}`, err);
                setError(err.message);
            });
        }
    }, [id, localComponent, isUrl]);
    if (localComponent) {
        return React.createElement(localComponent, props);
    }
    if (isUrl) {
        if (error)
            return _jsxs("div", { style: { color: 'red', fontSize: '10px' }, children: ["Error: ", error] });
        if (!remoteComponent)
            return _jsxs("div", { style: { opacity: 0.5 }, children: ["Loading remote ", id, "..."] });
        return React.createElement(remoteComponent, props);
    }
    return _jsx(_Fragment, {});
}
//# sourceMappingURL=component.js.map