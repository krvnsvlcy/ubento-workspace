import { Tooltip } from "@ubento/bento.arlo-core";
import { Icon, IconName } from "../icon/icon";

export type ActionProps = {
  title: string;
  icon: IconName | Exclude<React.ReactNode, string>;
  handler: (e: React.MouseEvent) => void;
  size?: number;
  iconSize?: number;
};

export function Action({
  size = 6,
  iconSize = 4,
  title,
  icon,
  handler,
}: ActionProps) {
  return (
    <Tooltip delayDuration={500} sideOffset={4} content={title}>
      <button
        style={{
          height: size * 4,
          width: size * 4,
        }}
        className="flex items-center justify-center text-current/80 hover:bg-current/10 hover:text-current cursor-pointer rounded-lg"
        onClick={(e) => {
          e.stopPropagation();
          handler(e);
        }}
      >
        {typeof icon === "string" ? (
          <Icon icon={icon as IconName} size={iconSize * 4} />
        ) : (
          icon
        )}
      </button>
    </Tooltip>
  );
}
