import { forwardRef } from "react";

const CardImage = forwardRef(({ ...props }, ref) => {
  return (
    <figure ref={ref}>
      <img {...props} />
    </figure>
  );
});

CardImage.displayName = "Card image";

export default CardImage;
