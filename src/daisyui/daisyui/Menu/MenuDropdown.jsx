import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const MenuDropdown = forwardRef(
  ({ className, label, open, children, ...props }, ref) => {
    const classes = twMerge(
      "menu-dropdown-toggle",
      className,
      clsx({ "menu-dropdown-show": open })
    );

    return (
      <>
        <span {...props} className={classes} ref={ref}>
          {label}
        </span>
        <ul className={clsx("menu-dropdown", { "menu-dropdown-show": open })}>
          {children}
        </ul>
      </>
    );
  }
);

MenuDropdown.displayName = "Menu Dropdown";

export default MenuDropdown;
