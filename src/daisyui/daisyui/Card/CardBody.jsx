import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const CardBody = forwardRef(({ className, ...props }, ref) => (
  <div {...props} className={twMerge("card-body", className)} ref={ref} />
));

CardBody.displayName = "Card Body";

export default CardBody;
