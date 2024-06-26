import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Join = forwardRef(
  (
    {
      dataTheme,
      className,
      children,
      responsive,
      vertical,
      horizontal,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      "join",
      clsx({
        "join-vertical": !responsive && vertical,
        "join-horizontal": !responsive && horizontal,
        "join-vertical lg:join-horizontal": responsive,
      }),
      className
    );

    return (
      <div {...props} data-theme={dataTheme} className={classes} ref={ref}>
        {children}
      </div>
    );
  }
);

Join.displayName = "Join";

export default Join;
