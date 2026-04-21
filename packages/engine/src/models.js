import { proxy } from "valtio";
export function createApp(init) {
    return proxy(init);
}
export function createPage(init) {
    return proxy(init);
}
export const editorContext = proxy({
    mode: "view",
    selection: [],
});
//# sourceMappingURL=models.js.map