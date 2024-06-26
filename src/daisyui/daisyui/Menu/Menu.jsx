import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Menu = forwardRef(
  (
    { responsive, horizontal, vertical, dataTheme, className, size, ...props },
    ref
  ) => {
    const classes = twMerge(
      "menu",
      className,
      clsx({
        "menu-vertical lg:menu-horizontal": responsive,
        "menu-lg": size === "lg",
        "menu-md": size === "md",
        "menu-sm": size === "sm",
        "menu-xs": size === "xs",
        "menu-vertical": vertical,
        "menu-horizontal": horizontal,
      })
    );

    return (
      <ul data-theme={dataTheme} className={classes} {...props} ref={ref} />
    );
  }
);

Menu.displayName = "Menu";

export default Menu;
