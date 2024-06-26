import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const BottomNavigation = forwardRef(
  ({ size, dataTheme, className, children, ...props }, ref) => {
    const classes = twMerge(
      "btm-nav",
      clsx({
        "btm-nav-lg": size === "lg",
        "btm-nav-md": size === "md",
        "btm-nav-sm": size === "sm",
        "btm-nav-xs": size === "xs",
      }),
      className
    );

    return (
      <div
        {...props}
        role="navigation"
        data-theme={dataTheme}
        className={classes}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

BottomNavigation.displayName = "BottomNavigation";

export default BottomNavigation;
