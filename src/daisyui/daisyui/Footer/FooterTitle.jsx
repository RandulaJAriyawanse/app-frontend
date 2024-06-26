import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const FooterTitle = forwardRef(({ className, ...props }, ref) => {
  const classes = twMerge("footer-title", className);

  return <span {...props} className={classes} ref={ref} />;
});

FooterTitle.displayName = "Footer Title";

export default FooterTitle;
