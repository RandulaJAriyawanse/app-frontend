import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export const classesFn = ({
  className,
  horizontal,
  vertical,
  end,
  hover,
  open,
}) =>
  twMerge(
    "dropdown",
    className,
    clsx({
      "dropdown-left": horizontal === "left",
      "dropdown-right": horizontal === "right",
      "dropdown-top": vertical === "top",
      "dropdown-bottom": vertical === "bottom",
      "dropdown-end": end,
      "dropdown-hover": hover,
      "dropdown-open": open,
    })
  );

const Dropdown = forwardRef(
  (
    {
      children,
      className,
      item,
      horizontal,
      vertical,
      end,
      hover,
      open,
      dataTheme,
      ...props
    },
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref}
        data-theme={dataTheme}
        className={classesFn({
          className,
          horizontal,
          vertical,
          end,
          hover,
          open,
        })}
      >
        {item ? (
          <>
            <label tabIndex={0}>{children}</label>
            <ul className="dropdown-content">{item}</ul>
          </>
        ) : (
          <>{children}</>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
