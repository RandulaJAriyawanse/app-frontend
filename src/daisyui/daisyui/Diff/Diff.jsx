import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Diff = forwardRef(
  ({ dataTheme, className, children, secondItem, ...props }, ref) => {
    const classes = twMerge("diff aspect-[16/9]", clsx({}), className);

    return (
      <div {...props} data-theme={dataTheme} className={classes} ref={ref}>
        <div className="diff-item-1">{children}</div>
        <div className="diff-item-2">{secondItem}</div>
        <div className="diff-resizer" />
      </div>
    );
  }
);

Diff.displayName = "Diff";

export default Diff;
