import { twMerge } from "tailwind-merge";

const CollapseContent = ({ children, className, ...props }) => {
  const classes = twMerge("collapse-content", className);

  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
};

export default CollapseContent;
