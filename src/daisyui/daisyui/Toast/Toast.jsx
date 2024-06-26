import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const horizontalOptions = {
  start: "toast-start",
  center: "toast-center",
  end: "toast-end",
};

const verticalOptions = {
  top: "toast-top",
  middle: "toast-middle",
  bottom: "toast-bottom",
};

const Toast = forwardRef(
  (
    { horizontal = "end", vertical = "bottom", className, children, ...props },
    ref
  ) => {
    return (
      <div
        {...props}
        className={twMerge(
          "toast",
          horizontalOptions[horizontal],
          verticalOptions[vertical],
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
Toast.displayName = "Toast";
export default Toast;
