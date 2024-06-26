import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const HeroContent = forwardRef(
  ({ dataTheme, className, children, ...props }, ref) => {
    const classes = twMerge("hero-content", className);

    return (
      <div {...props} data-theme={dataTheme} className={classes} ref={ref}>
        {children}
      </div>
    );
  }
);

HeroContent.displayName = "Hero Content";

export default HeroContent;
