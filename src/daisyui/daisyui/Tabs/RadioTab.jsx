import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const RadioTab = forwardRef(
  (
    {
      children,
      className,
      active,
      label,
      disabled,
      name,
      contentClassName,
      ...props
    },
    ref
  ) => {
    const classes = twMerge(
      "tab",
      className,
      clsx({
        "tab-active": active,
        "tab-disabled": disabled,
      })
    );
    const contentClasses = twMerge("tab-content", contentClassName);

    return (
      <>
        <input
          className={classes}
          role="tab"
          type="radio"
          name={name}
          disabled={disabled}
          aria-label={label}
          {...props}
          ref={ref}
        />
        <div className={contentClasses}>{children}</div>
      </>
    );
  }
);

RadioTab.displayName = "Radio Tab";

export default RadioTab;
