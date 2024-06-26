import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const ChatBubbleHeader = forwardRef(({ className, ...props }, ref) => (
  <div {...props} className={twMerge("chat-header", className)} ref={ref} />
));

ChatBubbleHeader.displayName = "Chat Bubble Header";

export default ChatBubbleHeader;
