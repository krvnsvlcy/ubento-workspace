import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSnapshot } from "valtio";
import { Route, Router, Switch } from "wouter";
import { Page } from "./page";
export function App({ app, locationHook, }) {
    const snap = useSnapshot(app);
    return (_jsx(Router, { hook: locationHook, children: _jsxs(Switch, { children: [Object.entries(snap.routes).map(([path, pageId]) => (_jsx(Route, { path: path, children: _jsx(Page, { id: pageId }) }, path))), _jsx(Route, { children: _jsxs("div", { className: "p-4 text-white", children: ["404 - No route matches for ", snap.id] }) })] }) }));
}
// --- Communication Bridge ---
export class Bridge {
    static send(target, type, payload) {
        if (!target)
            return;
        target.postMessage({ type, payload }, "*");
    }
    static listen(callback) {
        const handler = (event) => {
            if (event.data && typeof event.data.type === "string") {
                callback(event.data.type, event.data.payload);
            }
        };
        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }
}
//# sourceMappingURL=app.js.map