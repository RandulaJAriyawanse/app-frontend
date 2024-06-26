import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Alert = forwardRef(
  ({ children, icon, status, dataTheme, className, ...props }, ref) => {
    const classes = twMerge(
      "alert",
      className,
      clsx({
        "alert-info": status === "info",
        "alert-success": status === "success",
        "alert-warning": status === "warning",
        "alert-error": status === "error",
      })
    );

    return (
      <div
        role="alert"
        {...props}
        ref={ref}
        data-theme={dataTheme}
        className={classes}
      >
        {icon}
        {children}
      </div>
    );
  }
);

Alert.displayName = "Alert";

export default Alert;
