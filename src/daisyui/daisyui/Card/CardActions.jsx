import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const CardActions = forwardRef(({ className, ...props }, ref) => (
  <div {...props} className={twMerge("card-actions", className)} ref={ref} />
));

CardActions.displayName = "Card actions";

export default CardActions;
