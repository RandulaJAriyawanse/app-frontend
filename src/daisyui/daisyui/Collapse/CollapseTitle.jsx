import { twMerge } from "tailwind-merge";

const classesFn = ({ className }) => twMerge("collapse-title", className);

const CollapseTitle = ({ children, className, ...props }) => {
  return (
    <div {...props} className={classesFn({ className })}>
      {children}
    </div>
  );
};

export default CollapseTitle;
