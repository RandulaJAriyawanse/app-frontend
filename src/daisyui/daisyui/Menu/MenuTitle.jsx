import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const MenuTitle = forwardRef(({ className, ...props }, ref) => {
  const classes = twMerge("menu-title", className);

  return <li {...props} className={classes} ref={ref} />;
});

MenuTitle.displayName = "Menu Title";

export default MenuTitle;
