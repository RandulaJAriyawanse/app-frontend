import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Tooltip = forwardRef(
  (
    {
      message,
      children,
      open,
      color,
      position,
      dataTheme,
      className,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      "tooltip",
      className,
      clsx({
        "tooltip-open": open,
        "tooltip-primary": color === "primary",
        "tooltip-secondary": color === "secondary",
        "tooltip-accent": color === "accent",
        "tooltip-info": color === "info",
        "tooltip-success": color === "success",
        "tooltip-warning": color === "warning",
        "tooltip-error": color === "error",
        "tooltip-top": position === "top",
        "tooltip-bottom": position === "bottom",
        "tooltip-left": position === "left",
        "tooltip-right": position === "right",
      })
    );

    return (
      <div
        role="tooltip"
        {...props}
        ref={ref}
        data-theme={dataTheme}
        data-tip={message}
        className={classes}
      >
        {children}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
