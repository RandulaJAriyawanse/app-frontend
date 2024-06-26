import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Footer = forwardRef(({ center, dataTheme, className, ...props }, ref) => {
  const classes = twMerge(
    "footer",
    className,
    clsx({
      "footer-center": center,
    })
  );

  return (
    <div
      role="contentinfo"
      {...props}
      data-theme={dataTheme}
      className={classes}
      ref={ref}
    />
  );
});

Footer.displayName = "Footer";

export default Footer;
