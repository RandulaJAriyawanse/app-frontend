import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const Drawer = ({
  children,
  side,
  open,
  end,
  dataTheme,
  className,
  toggleClassName,
  contentClassName,
  sideClassName,
  overlayClassName,
  onClickOverlay,
  ...props
}) => {
  const classes = twMerge(
    "drawer",
    className,
    clsx({
      "drawer-end": end,
    })
  );

  return (
    <div
      // aria-expanded={open}
      {...props}
      data-theme={dataTheme}
      className={classes}
    >
      <input
        aria-label="Drawer handler"
        type="checkbox"
        className={clsx("drawer-toggle", toggleClassName)}
        checked={open}
        readOnly
      />
      <div className={clsx("drawer-content", contentClassName)}>{children}</div>
      <div className={clsx("drawer-side", sideClassName)}>
        <label
          className={clsx("drawer-overlay", overlayClassName)}
          onClick={onClickOverlay}
        ></label>
        {side}
      </div>
    </div>
  );
};

export default Drawer;
