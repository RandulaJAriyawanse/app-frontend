import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const ModalActions = forwardRef(({ children, className, ...props }, ref) => {
  const classes = twMerge("modal-action", className);
  return (
    <div {...props} className={classes} ref={ref}>
      {children}
    </div>
  );
});

ModalActions.displayName = "ModalActions";

export default ModalActions;
