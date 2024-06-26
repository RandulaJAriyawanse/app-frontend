import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Stats = forwardRef(
  (
    { direction = "horizontal", dataTheme, className, children, ...props },
    ref
  ) => {
    const classes = twMerge(
      "stats",
      className,
      clsx({
        "stats-vertical": direction === "vertical",
        "stats-horizontal": direction === "horizontal",
      })
    );

    return (
      <div {...props} ref={ref} data-theme={dataTheme} className={classes}>
        {children}
      </div>
    );
  }
);

Stats.displayName = "Stats";

export default Stats;
