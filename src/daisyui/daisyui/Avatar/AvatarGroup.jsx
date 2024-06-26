import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const AvatarGroup = forwardRef(({ children, className, ...props }, ref) => {
  const classes = twMerge("avatar-group -space-x-6", className);

  return (
    <div
      aria-label={`Group of ${children.length} avatar photos`}
      {...props}
      className={classes}
      ref={ref}
    >
      {children}
    </div>
  );
});

AvatarGroup.displayName = "Avatar Group";

export default AvatarGroup;
