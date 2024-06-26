import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Input = forwardRef(
  (
    {
      value,
      placeholder,
      bordered = true,
      borderOffset,
      size,
      color,
      dataTheme,
      className,
      type,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      "input",
      className,
      clsx({
        "input-lg": size === "lg",
        "input-md": size === "md",
        "input-sm": size === "sm",
        "input-xs": size === "xs",
        "input-primary": color === "primary",
        "input-secondary": color === "secondary",
        "input-accent": color === "accent",
        "input-ghost": color === "ghost",
        "input-info": color === "info",
        "input-success": color === "success",
        "input-warning": color === "warning",
        "input-error": color === "error",
        "input-bordered": bordered,
        "focus:outline-offset-0": !borderOffset,
      })
    );

    return (
      <input
        {...props}
        ref={ref}
        type={type}
        value={value}
        placeholder={placeholder}
        data-theme={dataTheme}
        className={classes}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
