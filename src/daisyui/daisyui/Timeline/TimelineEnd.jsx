import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const TimelineEnd = forwardRef(
  ({ children, className, box = true, ...props }, ref) => {
    const classes = twMerge(
      "timeline-end",
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

TimelineEnd.displayName = "TimelineEnd";
export default TimelineEnd;
