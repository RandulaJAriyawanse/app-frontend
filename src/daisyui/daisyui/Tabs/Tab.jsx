import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Tab = forwardRef(
  ({ children, className, active, disabled, ...props }, ref) => {
    const classes = twMerge(
      "tab",
      className,
      clsx({
        "tab-active": active,
        "tab-disabled": disabled,
      })
    );
    return (
      <a role="tab" {...props} ref={ref} className={classes}>
        {children}
      </a>
    );
  }
);

Tab.displayName = "Tab";

export default Tab;
