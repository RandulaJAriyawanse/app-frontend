import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const BottomNavigationLabel = forwardRef(
  ({ children, className, ...props }, ref) => {
    const classes = twMerge("btm-nav-label", className);
    return (
      <span {...props} className={classes} ref={ref}>
        {children}
      </span>
    );
  }
);

BottomNavigationLabel.displayName = "Bottom Navigation Label";

export default BottomNavigationLabel;
