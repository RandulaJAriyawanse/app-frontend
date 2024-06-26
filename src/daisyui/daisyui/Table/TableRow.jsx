import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const TableRow = forwardRef(
  ({ children, active, hover, className, ...props }, ref) => {
    const classes = twMerge(
      className,
      clsx({
        active: active,
        hover: hover,
      })
    );

    return (
      <tr {...props} className={classes} ref={ref}>
        {children?.map((child, i) =>
          i < 1 ? <th key={i}>{child}</th> : <td key={i}>{child}</td>
        )}
      </tr>
    );
  }
);

TableRow.displayName = "Table Row";

export default TableRow;
