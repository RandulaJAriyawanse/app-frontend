import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Modal = forwardRef(
  (
    { children, open, responsive, backdrop, dataTheme, className, ...props },
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
      <dialog
        {...props}
        aria-label="Modal"
        // aria-hidden={!open}
        open={open}
        aria-modal={open}
        data-theme={dataTheme}
        className={containerClasses}
        ref={ref}
      >
        <div data-theme={dataTheme} className={bodyClasses}>
          {children}
        </div>
        {backdrop && (
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        )}
      </dialog>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
