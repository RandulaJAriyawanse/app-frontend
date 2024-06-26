import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const classesFn = ({ className }) => twMerge("collapse-title", className);

export const CollapseSummary = forwardRef(({ children, className }, ref) => {
  return (
    <summary ref={ref} className={classesFn({ className })}>
      {children}
    </summary>
  );
});

CollapseSummary.displayName = "Collapse Summary";

export default CollapseSummary;
