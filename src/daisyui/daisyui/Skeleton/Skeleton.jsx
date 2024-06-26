import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Skeleton = forwardRef(
  ({ dataTheme, className, children, ...props }, ref) => {
    const classes = twMerge("skeleton", clsx({}), className);

    return (
      <div {...props} data-theme={dataTheme} className={classes} ref={ref}>
        {children}
      </div>
    );
  }
);

Skeleton.displayName = "Skeleton";

export default Skeleton;
