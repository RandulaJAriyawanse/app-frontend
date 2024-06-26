import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Hero = forwardRef(({ dataTheme, className, children, ...props }, ref) => {
  const classes = twMerge("hero", className);

  return (
    <div
      role="banner"
      {...props}
      data-theme={dataTheme}
      className={classes}
      ref={ref}
    >
      {children}
    </div>
  );
});

Hero.displayName = "Hero";

export default Hero;
