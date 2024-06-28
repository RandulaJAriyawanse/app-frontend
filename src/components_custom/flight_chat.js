import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
// import { Button } from "../components/ui/button";
import { SendHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import useAuth from "../hooks/useAuth";
import styles from "./TypingIndicator.module.css";
import Typography from "@mui/material/Typography";
import thumbsupIcon from "@iconify/icons-lucide/thumbs-up";
import thumbsdownIcon from "@iconify/icons-lucide/thumbs-down";
import xIcon from "@iconify/icons-lucide/x";
import sendHorizonalIcon from "@iconify/icons-lucide/send-horizonal";
import TextField from "@mui/material/TextField";

// import ReactMarkdown from 'react-markdown';

import Icon from "../daisyui/components/Icon";

import SimpleBar from "simplebar-react";

import ReactMarkdown from "react-markdown";

import {
  Card,
  Button,
  Input,
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTime,
} from "../daisyui/daisyui";

import DateUtil from "../daisyui/helpers/utils/date";
import { cn } from "../daisyui/helpers/utils/cn";

import avatar1 from "../daisyui/1.png";

const dummyMessages = [
  {
    text: "Hi there! Can you help me with my account?",
    isBot: false,
    from_me: true, // Assuming 'from_me' means the message is from the user
  },
  {
    text: "Sure, I'd be happy to help! What seems to be the problem?",
    isBot: true,
    from_me: false,
  },
  {
    text: "I'm having trouble logging in.",
    isBot: false,
    from_me: true,
  },
  {
    text: "I've checked your account and it seems you need to reset your password. Would you like me to send you a reset link?",
    isBot: true,
    from_me: false,
  },
];

const apiUrl = process.env.REACT_APP_API_URL;
const REACT_APP_WS_URL = process.env.REACT_APP_WS_URL;

const TypingIndicator = () => {
  return (
    <div className={styles.stypingindicator}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

const SingleMessage = ({ message }) => {
  return (
    <div>
      <ChatBubble end={!message.isBot}>
        <ChatBubbleAvatar
          alt={"U"}
          src={!message.isBot ? avatar1 : avatar1}
          innerClassName={"bg-base-content/10 rounded-box p-0.5"}
          shape={"square"}
        />
        <ChatBubbleMessage
          className={cn("min-h-fit py-3 text-base/none", {
            "bg-base-content/5 text-base-content": message.from_me,
            "bg-base-content/10 text-base-content": !message.from_me,
            "whitespace-pre-wrap": true,
          })}
        >
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </ChatBubbleMessage>
        <ChatBubbleTime>
          {/* {DateUtil.formatted(message.send_at, { format: "hh:mm A" })} */}
          time
        </ChatBubbleTime>
      </ChatBubble>
    </div>
  );
};

async function generateThreadId(inputs) {
  const encoder = new TextEncoder();
  const dataString = inputs.join("");
  const data = encoder.encode(dataString);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // Convert bytes to hex string
  return hashHex;
}

const FlightChat = () => {
  // const viewportref = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user, setMessage, setAlertColor } = useAuth();

  const ws = useRef(null);

  useEffect(() => {
    console.log("websocket initiated");

    if (!user) {
      console.log("User data not available yet.");
      return;
    }
    console.log(`${REACT_APP_WS_URL}/ws/flightchat/`);
    try {
      ws.current = new WebSocket(`${REACT_APP_WS_URL}/ws/flightchat/`);
    } catch (error) {
      setMessage(`Error in websocket connection ${error}`);
      setAlertColor("error");
    }

    ws.current.onopen = async () => {
      if (user) {
        const threadId = await generateThreadId([user.email]);
        const initData = { type: "init", thread_id: threadId };
        ws.current.send(JSON.stringify(initData));
      }
    };

    let accumulatedAnswer = "";
    let message_count = 0;

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data) {
        switch (data.kind) {
          case "on_chat_model_init":
            setMessages(data.content);
            break;
          case "on_chat_model_start":
            accumulatedAnswer = "";
            message_count = 0;
            break;
          case "on_chat_model_stream":
            message_count += 1;
            if (message_count === 1) {
              const botMessage = { text: "", isBot: true, pages: [] };
              setMessages((prevMessages) => {
                if (prevMessages.length > 0) {
                  const newMessages = prevMessages.slice(
                    0,
                    prevMessages.length - 1
                  );
                  return [...newMessages, botMessage];
                } else {
                  return [botMessage];
                }
              });
            }
            accumulatedAnswer += data.content;
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
              newMessages[newMessages.length - 1] = {
                ...newMessages[newMessages.length - 1],
                text: accumulatedAnswer,
              };
              return newMessages;
            });
            break;
          case "on_chat_model_end":
            break;
          default:
            console.log("Received unknown message kind:", data.kind);
            break;
        }
      } else {
        console.error("Message format incorrect or missing content:", data);
      }
    };

    return () => {
      ws.current.close();
    };
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages([...messages, userMessage]);

    const botMessage = { text: "...", isBot: true, pages: [], typing: true };
    setMessages((prevMessages) => [...prevMessages, botMessage]);

    generateThreadId([user.email]).then((threadId) => {
      ws.current.send(JSON.stringify({ content: input, thread_id: threadId }));
    });
    setInput("");
  };

  const viewportRef = useRef(null);

  useEffect(() => {
    if (viewportRef !== null && viewportRef.current !== null) {
      viewportRef.current.scrollTo(0, viewportRef.current.scrollHeight);
    }
  }, [messages]);

  // const ref = useRef(null);

  // useEffect(() => {
  //   const scrollE = ref.current?.getScrollElement();
  //   if (scrollE)
  //     scrollE.scrollTo({ top: scrollE.scrollHeight, behavior: "smooth" });

  // }, [messages, ref]);

  return (
    // <div className='mx-auto flex flex-col flex-grow w-full h-full'>
    // <ScrollArea
    //   className="pl-5 pr-5 pb-5 overflow-auto w-full h-full"
    //   style={{ height: "calc(100vh)" }}

    //   viewportRef={viewportRef}

    // >
    //   {messages.map((message, index) => (
    //     <SingleMessage message={message} key={index} />
    //   ))}
    // </ScrollArea>

    // <form onSubmit={handleSubmit} className='relative'>
    //   <div  className="flex gap-3 bg-base-content/5 p-4">
    //   <Button
    //     color={"ghost"}
    //     size={"sm"}
    //     shape={"circle"}
    //     aria-label="Attachment"
    //   >
    //     <Icon
    //       icon={paperclipIcon}
    //       fontSize={18}
    //       className="text-base-content/80"
    //     />
    //   </Button>
    //   <div className="grow">
    //     <Input
    //       size={"sm"}
    //       className="w-full"
    //       aria-label="Input message"
    //       name='message'
    //       value={input}
    //       onChange={(e) => setInput(e.target.value)}
    //     />
    //   </div>
    //   <Button
    //     color={"primary"}
    //     size={"sm"}
    //     shape={"circle"}
    //     aria-label="Send message"
    //     type='submit'
    //   >
    //     <Icon icon={sendHorizonalIcon} fontSize={18} />
    //   </Button>
    // </div>
    // </form>
    // </div>
    <div className="card h-full">
      <div className="card-body p-0">
        <div className="bg-primary card-actions justify-between content-center px-4 py-2 text-white">
          <span className="text-lg">Chat</span>
          <button className="btn btn-square btn-ghost btn-sm close-chat">
            <Icon icon={xIcon} fontSize={24} className="text-white" />
          </button>
        </div>
        <div className="chat-container">
          <div className="text-center my-4">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
            <p className="text-md font-medium">Name</p>
            <p className="text-sm text-gray-500">Hi, how may I help you</p>
          </div>
          <ScrollArea
            className="pl-5 pr-5 pb-5 overflow-auto w-full"
            // style={{ height: "calc(100vh)" }}

            viewportRef={viewportRef}
          >
            {dummyMessages.map((message, index) => (
              <SingleMessage message={message} key={index} />
            ))}
            <div className="flex gap-1 pl-1">
              <span className="text-xs pt-2 text-gray-500">
                Was this helpful?
              </span>
              <div>
                <Button
                  color={"ghost"}
                  size={"sm"}
                  shape={"circle"}
                  aria-label="Attachment"
                >
                  <Icon icon={thumbsupIcon} fontSize={18} />
                </Button>
                <Button
                  color={"ghost"}
                  size={"sm"}
                  shape={"circle"}
                  aria-label="Attachment"
                >
                  <Icon icon={thumbsdownIcon} fontSize={18} />
                </Button>
              </div>
            </div>
          </ScrollArea>
        </div>
        <form
          onSubmit={handleSubmit}
          className="absolute left-0 bottom-0 w-full"
        >
          <div className="flex chat-input-outer gap-2 bg-base-content/5 px-4 py-2">
            {/* <Button
              color={"ghost"}
              size={"sm"}
              shape={"circle"}
              aria-label="Attachment"
            >
              <Icon
                icon={paperclipIcon}
                fontSize={18}
                className="text-base-content/80"
              />
            </Button> */}
            <div className="grow">
              <TextField
                multiline
                maxRows={2}
                size={"sm"}
                className="chat-input"
                aria-label="Input message"
                name="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message"
                InputLabelProps={{
                  shrink: false,
                }}
              />
              {/* <Input
                size={"sm"}
                className="chat-input"
                aria-label="Input message"
                name="message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message"
              /> */}
            </div>
            <Button
              color={"primary"}
              size={"sm"}
              shape={"circle"}
              aria-label="Send message"
              type="submit"
            >
              <Icon icon={sendHorizonalIcon} fontSize={18} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlightChat;
