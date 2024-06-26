import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Step = forwardRef(
  ({ children, value, color, dataTheme, className, ...props }, ref) => {
    const classes = twMerge(
      "step",
      className,
      clsx({
        "step-primary": color === "primary",
        "step-secondary": color === "secondary",
        "step-accent": color === "accent",
        "step-info": color === "info",
        "step-success": color === "success",
        "step-warning": color === "warning",
        "step-error": color === "error",
      })
    );

    return (
      <li
        aria-label="Step"
        {...props}
        data-theme={dataTheme}
        data-content={value}
        className={classes}
        ref={ref}
      >
        {children}
      </li>
    );
  }
);

Step.displayName = "Step";

export default Step;
