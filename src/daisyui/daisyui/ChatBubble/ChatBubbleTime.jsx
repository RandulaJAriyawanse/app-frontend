import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const ChatBubbleTime = forwardRef(({ className, ...props }, ref) => (
  <time
    {...props}
    className={twMerge("text-xs opacity-50", className)}
    ref={ref}
  />
));

ChatBubbleTime.displayName = "Chat Bubble Time";

export default ChatBubbleTime;
