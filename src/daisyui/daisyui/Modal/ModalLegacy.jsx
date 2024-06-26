import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const ModalLegacy = forwardRef(
  (
    {
      children,
      open,
      responsive,
      onClickBackdrop,
      dataTheme,
      className,
      ...props
    },
    ref
  ) => {
    const containerClasses = twMerge(
      "modal",
      clsx({
        "modal-open": open,
        "modal-bottom sm:modal-middle": responsive,
      })
    );

    const bodyClasses = twMerge("modal-box", className);

    return (
      <div
        aria-label="Modal"
        aria-hidden={!open}
        aria-modal={open}
        data-theme={dataTheme}
        className={containerClasses}
        onClick={(e) => {
          e.stopPropagation();
          if (e.target === e.currentTarget) {
            e.stopPropagation();
            if (onClickBackdrop) {
              onClickBackdrop();
            }
          }
        }}
      >
        <div
          {...props}
          data-theme={dataTheme}
          className={bodyClasses}
          ref={ref}
        >
          {children}
        </div>
      </div>
    );
  }
);

ModalLegacy.displayName = "Modal Legacy";
export default ModalLegacy;
