import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Steps = forwardRef(
  ({ children, dataTheme, className, vertical, horizontal, ...props }, ref) => {
    const classes = twMerge(
      "steps",
      className,
      clsx({
        "steps-vertical": vertical,
        "steps-horizontal": horizontal,
      })
    );

    return (
      <ul
        aria-label="Steps"
        role="group"
        {...props}
        data-theme={dataTheme}
        className={classes}
        ref={ref}
      >
        {children}
      </ul>
    );
  }
);

Steps.displayName = "Steps";
export default Steps;
