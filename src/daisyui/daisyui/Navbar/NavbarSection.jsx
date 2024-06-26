import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const NavbarSection = forwardRef(
  ({ children, section, dataTheme, className, style }, ref) => {
    const classes = twMerge(
      className,
      clsx({
        "navbar-start": section === "start",
        "navbar-center": section === "center",
        "navbar-end": section === "end",
      })
    );

    return (
      <div data-theme={dataTheme} className={classes} style={style} ref={ref}>
        {children}
      </div>
    );
  }
);

NavbarSection.displayName = "Navbar Section";

export default NavbarSection;
