import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Progress = forwardRef(
  ({ color, dataTheme, className, ...props }, ref) => {
    const classes = twMerge(
      "progress",
      className,
      clsx({
        "progress-accent": color === "accent",
        "progress-error": color === "error",
        "progress-ghost": color === "ghost",
        "progress-info": color === "info",
        "progress-primary": color === "primary",
        "progress-secondary": color === "secondary",
        "progress-success": color === "success",
        "progress-warning": color === "warning",
      })
    );

    return (
      <progress
        {...props}
        ref={ref}
        data-theme={dataTheme}
        className={classes}
      />
    );
  }
);

Progress.displayName = "Progress";

export default Progress;
