import clsx from "clsx";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { twMerge } from "tailwind-merge";

const Checkbox = forwardRef(
  ({ color, size, indeterminate, dataTheme, className, ...props }, ref) => {
    const classes = twMerge(
      "checkbox",
      className,
      clsx({
        "checkbox-lg": size === "lg",
        "checkbox-md": size === "md",
        "checkbox-sm": size === "sm",
        "checkbox-xs": size === "xs",
        "checkbox-primary": color === "primary",
        "checkbox-secondary": color === "secondary",
        "checkbox-accent": color === "accent",
        "checkbox-info": color === "info",
        "checkbox-success": color === "success",
        "checkbox-warning": color === "warning",
        "checkbox-error": color === "error",
      })
    );

    const checkboxRef = useRef(null);
    useImperativeHandle(ref, () => checkboxRef.current);

    useEffect(() => {
      if (!checkboxRef.current) {
        return;
      }

      checkboxRef.current.indeterminate = !!indeterminate;
    }, [indeterminate]);

    return (
      <input
        {...props}
        ref={checkboxRef}
        type="checkbox"
        data-theme={dataTheme}
        className={classes}
      />
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
