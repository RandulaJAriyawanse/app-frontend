import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const StatSection = forwardRef(
  ({ children, section, className, ...props }, ref) => {
    const classes = twMerge(
      className,
      clsx({
        "stat-title": section === "title",
        "stat-value": section === "value",
        "stat-desc": section === "desc",
        "stat-figure": section === "figure",
        "stat-actions": section === "actions",
      })
    );

    return (
      <div {...props} className={classes} ref={ref}>
        {children}
      </div>
    );
  }
);

StatSection.displayName = "Stat Section";

export default StatSection;
