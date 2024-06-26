import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const PhoneMockup = forwardRef(
  (
    { color, dataTheme, className, children, innerRef, innerProps, ...props },
    ref
  ) => {
    const classes = twMerge(
      "mockup-phone",
      clsx({
        "border-primary": color === "primary",
        "border-secondary": color === "secondary",
        "border-info": color === "info",
        "border-success": color === "success",
        "border-warning": color === "warning",
        "border-error": color === "error",
      }),
      className
    );

    return (
      <div
        aria-label="Phone mockup"
        {...props}
        data-theme={dataTheme}
        className={classes}
        ref={ref}
      >
        <div className="camera" />
        <div className="display">
          <div
            {...innerProps}
            className={twMerge(
              "artboard artboard-demo phone-1",
              innerProps?.className
            )}
            ref={innerRef}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

PhoneMockup.displayName = "PhoneMockup";

export default PhoneMockup;
