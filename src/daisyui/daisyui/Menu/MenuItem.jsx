import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const MenuItem = forwardRef(({ className, disabled, ...props }, ref) => {
  const classes = twMerge(
    className,
    clsx({
      disabled: disabled,
    })
  );

  return <li className={classes} {...props} ref={ref} />;
});

MenuItem.displayName = "Menu Item";

export default MenuItem;
