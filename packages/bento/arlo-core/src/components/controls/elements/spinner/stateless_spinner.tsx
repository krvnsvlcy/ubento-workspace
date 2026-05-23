import type { ReactNode } from "react";
import type { RawSpinnerControlProps } from "./raw_spinner.js";
import { RawSpinnerControl } from "./raw_spinner.js";

export function StatelessSpinnerControl({
  prefix,
  ...props
}: RawSpinnerControlProps & {
  prefix?: ReactNode;
}) {
  return (
    <div
      className="h-7 px-2 border rounded-md w-full"
      style={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        justifyContent: "space-between",
        cursor: "pointer",
        overflow: "hidden",
        gap: 4,
        paddingLeft: prefix ? 4 : 8,
      }}
    >
      {prefix ? (
        <div
          className="h-5 w-5"
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prefix}
        </div>
      ) : (
        <></>
      )}
      <div
        style={{
          flexGrow: 1,
          overflow: "hidden",
          textWrap: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        <RawSpinnerControl {...props} />
      </div>
    </div>
  );
}
