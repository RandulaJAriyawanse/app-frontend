import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const CardTitle = forwardRef(({ className, tag = "div", ...props }, ref) => {
  const Tag = tag;

  return (
    <Tag {...props} className={twMerge("card-title", className)} ref={ref} />
  );
});

CardTitle.displayName = "Card title";

export default CardTitle;
