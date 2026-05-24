// Tremor Calendar [v1.0.0]

"use client";

import { addYears, format, isSameMonth } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import * as React from "react";
import {
  DayPicker,
  useDayPicker,
  useDayRender,
  useNavigation,
  type DayPickerRangeProps,
  type DayPickerSingleProps,
  type DayProps,
  type Matcher,
} from "react-day-picker";

import { cx, focusRing } from "@/lib/utils.js";

interface NavigationButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  icon: React.ElementType;
  disabled?: boolean;
}

const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>(
  (
    { onClick, icon, disabled, ...props }: NavigationButtonProps,
    forwardedRef,
  ) => {
    const Icon = icon;
    return (
      <button
        ref={forwardedRef}
        type="button"
        disabled={disabled}
        className={cx(
          "flex size-8 shrink-0 select-none items-center justify-center rounded-sm border p-1 outline-hidden transition sm:size-[30px]",
          "text-neutral-content-muted hover:text-neutral-content",
          // border color
          "border-neutral-border",
          // background color
          "hover:bg-neutral-surface-hover active:bg-neutral-surface-hover",
          // disabled
          "disabled:pointer-events-none",
          "disabled:border-neutral-border",
          "disabled:text-neutral-content-muted",
          focusRing,
        )}
        onClick={onClick}
        {...props}
      >
        <Icon className="size-full shrink-0" />
      </button>
    );
  },
);

NavigationButton.displayName = "NavigationButton";

type OmitKeys<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type KeysToOmit = "showWeekNumber" | "captionLayout" | "mode";

type SingleProps = OmitKeys<DayPickerSingleProps, KeysToOmit>;
type RangeProps = OmitKeys<DayPickerRangeProps, KeysToOmit>;

type CalendarProps =
  | ({
      mode: "single";
    } & SingleProps)
  | ({
      mode?: undefined;
    } & SingleProps)
  | ({
      mode: "range";
    } & RangeProps);

const Calendar = ({
  mode = "single",
  weekStartsOn = 1,
  numberOfMonths = 1,
  enableYearNavigation = false,
  disableNavigation,
  locale,
  className,
  classNames,
  ...props
}: CalendarProps & { enableYearNavigation?: boolean }) => {
  return (
    <DayPicker
      mode={mode}
      weekStartsOn={weekStartsOn}
      numberOfMonths={numberOfMonths}
      locale={locale}
      showOutsideDays={numberOfMonths === 1}
      className={cx(className)}
      classNames={{
        months: "flex space-y-0",
        month: "space-y-4 p-3",
        nav: "gap-1 flex items-center rounded-full size-full justify-between p-4",
        table: "w-full border-collapse space-y-1",
        head_cell:
          "w-9 font-medium text-sm sm:text-xs text-center text-neutral-content-muted pb-2",
        row: "w-full mt-0.5",
        cell: cx(
          "relative p-0 text-center focus-within:relative",
          "text-neutral-content",
        ),
        day: cx(
          "size-9 rounded-sm text-sm focus:z-10",
          "text-neutral-content",
          "hover:bg-neutral-surface-hover",
          focusRing,
        ),
        day_today: "font-semibold",
        day_selected: cx(
          "rounded-sm",
          "aria-selected:bg-blue-500 aria-selected:text-white",
          "dark:aria-selected:bg-blue-500 dark:aria-selected:text-white",
        ),
        day_disabled:
          "text-neutral-content-muted! line-through disabled:hover:bg-transparent",
        day_outside: "text-neutral-content-muted",
        day_range_middle: cx(
          "rounded-none!",
          "aria-selected:bg-neutral-surface! aria-selected:text-neutral-content!",
        ),
        day_range_start: "rounded-r-none rounded-l!",
        day_range_end: "rounded-l-none rounded-r!",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft aria-hidden="true" className="size-4" />,
        IconRight: () => <ChevronRight aria-hidden="true" className="size-4" />,
        Caption: ({ ...props }) => {
          const {
            goToMonth,
            nextMonth,
            previousMonth,
            currentMonth,
            displayMonths,
          } = useNavigation();
          const { numberOfMonths, fromDate, toDate } = useDayPicker();

          const displayIndex = displayMonths.findIndex((month) =>
            isSameMonth(props.displayMonth, month),
          );
          const isFirst = displayIndex === 0;
          const isLast = displayIndex === displayMonths.length - 1;

          const hideNextButton = numberOfMonths > 1 && (isFirst || !isLast);
          const hidePreviousButton = numberOfMonths > 1 && (isLast || !isFirst);

          const goToPreviousYear = () => {
            const targetMonth = addYears(currentMonth, -1);
            if (
              previousMonth &&
              (!fromDate || targetMonth.getTime() >= fromDate.getTime())
            ) {
              goToMonth(targetMonth);
            }
          };

          const goToNextYear = () => {
            const targetMonth = addYears(currentMonth, 1);
            if (
              nextMonth &&
              (!toDate || targetMonth.getTime() <= toDate.getTime())
            ) {
              goToMonth(targetMonth);
            }
          };

          return (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {enableYearNavigation && !hidePreviousButton && (
                  <NavigationButton
                    disabled={
                      disableNavigation ||
                      !previousMonth ||
                      (fromDate &&
                        addYears(currentMonth, -1).getTime() <
                          fromDate.getTime())
                    }
                    aria-label="Go to previous year"
                    onClick={goToPreviousYear}
                    icon={ChevronsLeft}
                  />
                )}
                {!hidePreviousButton && (
                  <NavigationButton
                    disabled={disableNavigation || !previousMonth}
                    aria-label="Go to previous month"
                    onClick={() => previousMonth && goToMonth(previousMonth)}
                    icon={ChevronLeft}
                  />
                )}
              </div>

              <div
                role="presentation"
                aria-live="polite"
                className="text-sm font-medium capitalize tabular-nums text-neutral-content"
              >
                {format(props.displayMonth, "LLLL yyy", { locale })}
              </div>

              <div className="flex items-center gap-1">
                {!hideNextButton && (
                  <NavigationButton
                    disabled={disableNavigation || !nextMonth}
                    aria-label="Go to next month"
                    onClick={() => nextMonth && goToMonth(nextMonth)}
                    icon={ChevronRight}
                  />
                )}
                {enableYearNavigation && !hideNextButton && (
                  <NavigationButton
                    disabled={
                      disableNavigation ||
                      !nextMonth ||
                      (toDate &&
                        addYears(currentMonth, 1).getTime() > toDate.getTime())
                    }
                    aria-label="Go to next year"
                    onClick={goToNextYear}
                    icon={ChevronsRight}
                  />
                )}
              </div>
            </div>
          );
        },
        Day: ({ date, displayMonth }: DayProps) => {
          const buttonRef = React.useRef<HTMLButtonElement>(null);
          const { activeModifiers, buttonProps, divProps, isButton, isHidden } =
            useDayRender(
              date,
              displayMonth,
              buttonRef as React.RefObject<HTMLButtonElement>,
            );

          const { selected, today, disabled, range_middle } = activeModifiers;

          if (isHidden) {
            return <></>;
          }

          if (!isButton) {
            return (
              <div
                {...divProps}
                className={cx(
                  "flex items-center justify-center",
                  divProps.className,
                )}
              />
            );
          }

          const {
            children: buttonChildren,
            className: buttonClassName,
            ...buttonPropsRest
          } = buttonProps;

          return (
            <button
              ref={buttonRef}
              {...buttonPropsRest}
              type="button"
              className={cx("relative", buttonClassName)}
            >
              {buttonChildren}
              {today && (
                <span
                  className={cx(
                    "absolute inset-x-1/2 bottom-1.5 h-0.5 w-4 -translate-x-1/2 rounded-[2px]",
                    {
                      "bg-blue-500 dark:bg-blue-500": !selected,
                      "bg-accent-contrast!": selected,
                      "bg-neutral-content-muted!": selected && range_middle,
                      "bg-neutral-content-muted text-neutral-content-muted":
                        disabled,
                    },
                  )}
                />
              )}
            </button>
          );
        },
      }}
      {...(props as SingleProps & RangeProps)}
    />
  );
};

Calendar.displayName = "Calendar";

export { Calendar, type Matcher };
