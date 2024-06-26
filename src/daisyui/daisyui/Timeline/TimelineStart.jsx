import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const TimelineStart = forwardRef(
  ({ children, className, box, ...props }, ref) => {
    const classes = twMerge(
      "timeline-start",
      clsx({
        "timeline-box": box,
      }),
      className
    );
    return (
      <div {...props} className={classes} ref={ref}>
        {children}
      </div>
    );
  }
);

TimelineStart.displayName = "TimelineStart";
export default TimelineStart;
