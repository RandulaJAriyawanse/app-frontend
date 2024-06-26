import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Textarea = forwardRef(
  (
    {
      bordered = true,
      borderOffset,
      color,
      size,
      dataTheme,
      className,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      "textarea",
      className,
      clsx({
        "textarea-lg": size === "lg",
        "textarea-md": size === "md",
        "textarea-sm": size === "sm",
        "textarea-xs": size === "xs",
        "textarea-primary": color === "primary",
        "textarea-secondary": color === "secondary",
        "textarea-accent": color === "accent",
        "textarea-ghost": color === "ghost",
        "textarea-info": color === "info",
        "textarea-success": color === "success",
        "textarea-warning": color === "warning",
        "textarea-error": color === "error",
        "textarea-bordered": bordered,
        "focus:outline-offset-0": !borderOffset,
      })
    );

    return (
      <textarea
        {...props}
        data-theme={dataTheme}
        className={classes}
        ref={ref}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
