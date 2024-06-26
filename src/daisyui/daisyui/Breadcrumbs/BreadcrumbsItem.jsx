import { forwardRef } from "react";

const BreadcrumbsItem = forwardRef(({ children, href, ...props }, ref) => {
  return (
    <li {...props} ref={ref}>
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </li>
  );
});

BreadcrumbsItem.displayName = "Breadcrumbs Item";

export default BreadcrumbsItem;
