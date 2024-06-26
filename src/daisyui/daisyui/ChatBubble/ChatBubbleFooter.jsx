import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const ChatBubbleFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    {...props}
    className={twMerge("chat-footer opacity-50", className)}
    ref={ref}
  />
));

ChatBubbleFooter.displayName = "Chat Bubble Footer";

export default ChatBubbleFooter;
