import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Stack = forwardRef(
  ({ dataTheme, className, children, ...props }, ref) => {
    const classes = twMerge("stack", className);

    return (
      <div
        aria-label="Stack"
        {...props}
        ref={ref}
        data-theme={dataTheme}
        className={classes}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = "Stack";

export default Stack;
