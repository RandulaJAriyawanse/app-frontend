import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Toggle = forwardRef(
  ({ color, size, dataTheme, className, ...props }, ref) => {
    const classes = twMerge(
      "toggle",
      className,
      clsx({
        "toggle-lg": size === "lg",
        "toggle-md": size === "md",
        "toggle-sm": size === "sm",
        "toggle-xs": size === "xs",
        "toggle-primary": color === "primary",
        "toggle-secondary": color === "secondary",
        "toggle-accent": color === "accent",
        "toggle-info": color === "info",
        "toggle-success": color === "success",
        "toggle-warning": color === "warning",
        "toggle-error": color === "error",
      })
    );

    return (
      <input
        {...props}
        ref={ref}
        type="checkbox"
        data-theme={dataTheme}
        className={classes}
      />
    );
  }
);

Toggle.displayName = "Toggle";

export default Toggle;
