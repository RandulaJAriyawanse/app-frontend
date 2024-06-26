import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const HeroOverlay = forwardRef(
  ({ dataTheme, className, children, ...props }, ref) => {
    const classes = twMerge("hero-overlay", className);

    return (
      <div {...props} data-theme={dataTheme} className={classes} ref={ref}>
        {children}
      </div>
    );
  }
);

HeroOverlay.displayName = "Hero Overlay";

export default HeroOverlay;
