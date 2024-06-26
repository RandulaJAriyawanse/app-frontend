import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { SendHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from 'react'
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import useAuth from "../hooks/useAuth";
import styles from './TypingIndicator.module.css';

const apiUrl = process.env.REACT_APP_API_URL;

const TypingIndicator = () => {
    return (
      <div className={styles.stypingindicator}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
    );
  };

async function generateThreadId(inputs) {
    const encoder = new TextEncoder();
    const dataString = inputs.join('');
    const data = encoder.encode(dataString);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // Convert bytes to hex string
    return hashHex;
}

const FlightChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const { user } = useAuth()

    const ws = useRef(null);

    useEffect(() => {
        console.log("websocket initiated")

        if (!user) {
          console.log("User data not available yet.");
          return;
        } 

        try{
        ws.current = new WebSocket(`${apiUrl}/ws/flightchat/`);
        } catch (error) {
            alert(`Error in websocket connection ${error}`)
        }

        ws.current.onopen = async () => {
          if (user) {
            const threadId = await generateThreadId([user.email]);
            const initData = { type: "init", thread_id: threadId }
            ws.current.send(JSON.stringify(initData))
            }
          }

        let accumulatedAnswer = ''
        let message_count = 0
        
        ws.current.onmessage =(event) => {
          const data = JSON.parse(event.data);

          if (data) {
            console.log("kind: ", data.kind)

            switch (data.kind) {
              case 'on_chat_model_init':
                setMessages(data.content)
                break;
              case 'on_chat_model_start':
                accumulatedAnswer = ''
                message_count = 0

                break;
              case 'on_chat_model_stream':
                message_count += 1
                if (message_count === 1) {
                    const botMessage = { text: '', isBot: true, pages: [] };
                    setMessages(prevMessages => {
                      if (prevMessages.length > 0) {
                          const newMessages = prevMessages.slice(0, prevMessages.length - 1);
                          return [...newMessages, botMessage];
                      } else {
                          return [botMessage];
                      }
                    });
                }
                accumulatedAnswer += data.content;
                setMessages(
                    prevMessages  => {
                    const newMessages = [...prevMessages ];
                    newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], text: accumulatedAnswer };
                    return newMessages;
                  }
                )
                break;
              case 'on_chat_model_end':
                break;
              default:
                console.log('Received unknown message kind:', data.kind);
                break;
            }
          } else {
            console.error('Message format incorrect or missing content:', data);
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

        const botMessage = { text: '...', isBot: true, pages: [], typing: true };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        
        generateThreadId([user.email]).then(threadId => {
            ws.current.send(JSON.stringify({ content: input, thread_id: threadId }));
        });
        setInput('');
    };

    const viewportRef = useRef(null);

    useEffect(() => {
      if (viewportRef !== null && viewportRef.current !== null) {
              viewportRef.current.scrollTo(0, viewportRef.current.scrollHeight);
          }
    }, [messages])

    return (
        <div className='mx-auto mt-3 w-full h-full flex flex-col p-4 flex-grow' style={{ maxHeight: 'calc(100vh - 100px)', maxWidth: '800px'}}>
          <ScrollArea
            className='mb-2 flex-grow rounded-md border p-4 overflow-auto w-full h-full'
            viewportRef={viewportRef}
          >
            {messages.map((m, i) => (
              <div key={i} className='mr-6 whitespace-pre-wrap md:mr-12'>
                {!m.isBot && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='text-sm'>U</AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5'>
                      <p className='font-semibold'>You</p>
                      <div className='mt-1.5 text-sm text-zinc-500'>
                        {m.text}
                      </div>
                      
                    </div>
                  </div>
                )}
                {m.isBot && (
                  <div className='mb-6 flex gap-3'>
                    <Avatar>
                      <AvatarImage src='' />
                      <AvatarFallback className='bg-emerald-500 text-white'>
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className='mt-1.5 w-full'>
                      <div className='flex justify-between'>
                        <p className='font-semibold'>Bot</p>
                      </div>
                      <div className='mt-2 text-sm text-zinc-500'>
                        {m.typing ? <TypingIndicator/>
                        : 
                        m.text
                        }
                      </div>

                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>
          <form onSubmit={handleSubmit} className='relative'>
            <Input
              name='message'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
            />
            <Button
              size='icon'
              type='submit'
              variant='secondary'
              className='absolute right-1 top-1 h-8 w-10'
            >
              <SendHorizontalIcon className='h-5 w-5 text-emerald-500' />
            </Button>
          </form>
        </div>
    );
}

export default FlightChat;