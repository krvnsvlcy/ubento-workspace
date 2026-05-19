import type { ControlMap, ResolvedControlProps } from "./control_map.js";
import { baseControlMap } from "./control_map.js";

export function Control<M extends ControlMap<string>, T extends keyof M>({
  type,
  value,
  onChange,
  settings,
  map,
}: ResolvedControlProps<M, T> & {
  type: T;
  map?: M;
}) {
  const Control = (map ?? (baseControlMap as unknown as M))[type] as any;
  if (!Control) throw new Error(`Control ${String(type)} not found`);

  return <Control value={value} onChange={onChange} settings={settings} />;
}
