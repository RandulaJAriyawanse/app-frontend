import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const classesFn = ({ className, variant } = {}) =>
  twMerge(
    "mask",
    className,
    clsx({
      "mask-squircle": variant === "squircle",
      "mask-heart": variant === "heart",
      "mask-hexagon": variant === "hexagon",
      "mask-hexagon-2": variant === "hexagon-2",
      "mask-decagon": variant === "decagon",
      "mask-pentagon": variant === "pentagon",
      "mask-diamond": variant === "diamond",
      "mask-square": variant === "square",
      "mask-circle": variant === "circle",
      "mask-parallelogram": variant === "parallelogram",
      "mask-parallelogram-2": variant === "parallelogram-2",
      "mask-parallelogram-3": variant === "parallelogram-3",
      "mask-parallelogram-4": variant === "parallelogram-4",
      "mask-star": variant === "star",
      "mask-star-2": variant === "star-2",
      "mask-triangle": variant === "triangle",
      "mask-triangle-2": variant === "triangle-2",
      "mask-triangle-3": variant === "triangle-3",
      "mask-triangle-4": variant === "triangle-4",
      "mask-half-1": variant === "half-1",
      "mask-half-2": variant === "half-2",
    })
  );

const Mask = forwardRef(
  ({ src, variant, dataTheme, className, ...props }, ref) => {
    return (
      <img
        {...props}
        data-theme={dataTheme}
        className={classesFn({ className, variant })}
        src={src}
        ref={ref}
      />
    );
  }
);
Mask.displayName = "Mask";

export default Object.assign(Mask, { className: classesFn });
