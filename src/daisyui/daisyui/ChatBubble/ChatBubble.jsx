import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const ChatBubble = forwardRef(
  ({ end = false, color, dataTheme, className, children, ...props }, ref) => (
    <div
      {...props}
      data-theme={dataTheme}
      className={twMerge("chat", `chat-${end ? "end" : "start"}`, className)}
      ref={ref}
    >
      {children}
    </div>
  )
);

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
