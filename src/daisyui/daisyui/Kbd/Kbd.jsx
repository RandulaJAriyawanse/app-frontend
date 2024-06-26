import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Kbd = forwardRef(
  ({ children, size, dataTheme, className, ...props }, ref) => {
    const classes = twMerge(
      "kbd",
      className,
      clsx({
        "kbd-lg": size === "lg",
        "kbd-md": size === "md",
        "kbd-sm": size === "sm",
        "kbd-xs": size === "xs",
      })
    );

    return (
      <kbd {...props} data-theme={dataTheme} className={classes} ref={ref}>
        {children}
      </kbd>
    );
  }
);

Kbd.displayName = "Kbd";

export default Kbd;
