import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { SendHorizontalIcon } from "lucide-react";
import { useEffect, useRef, useState } from 'react'
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import useAuth from "../hooks/useAuth";
import styles from './TypingIndicator.module.css';
import Typography from '@mui/material/Typography';




const apiUrl = process.env.REACT_APP_API_URL;
const REACT_APP_WS_URL = process.env.REACT_APP_WS_URL;



const Chat = () => {


    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const { pdfBase64, user, setCurrentPDFPage, setMessage, setAlertColor } = useAuth()


    const ws = useRef(null);
    // const messagesRef = useRef([]);
    



    const TypingIndicator = () => {
      return (
        <div className={styles.stypingindicator}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      );
    };

    async function generateThreadId(pdfBase64, userEmail) {
      const encoder = new TextEncoder();
      const data = encoder.encode(pdfBase64 + userEmail);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // Convert bytes to hex string
      return hashHex;
    }

    const handleClick = (page) => {
      setCurrentPDFPage(page)}

    // useEffect(() => {
    //   messagesRef.current = messages;
    // }, [messages]);

    useEffect(() => {
        if (!user) {
          return;
        } 

        console.log("websocket initiated")
        console.log(`${REACT_APP_WS_URL}/ws/chat/`)
        try{
        ws.current = new WebSocket(`${REACT_APP_WS_URL}/ws/chat/`);
        } catch (error) {
            console.log(`websocket error: ${error}`)
            setMessage(`Error in websocket connection ${error}`)
            setAlertColor("error")
        }

        let accumulatedAnswer = ''

        ws.current.onopen = async () => {
          console.log("Connection opened");
          // Send data right after the connection is established
          if (pdfBase64 && user) {
            const threadId = await generateThreadId(pdfBase64, user.email);
            const initData = { type: "init", thread_id: threadId, pdfBase64: pdfBase64 };
            ws.current.send(JSON.stringify(initData));
            }
          }


        ws.current.onmessage =(event) => {
          const data = JSON.parse(event.data);
        
          if (data) {
            switch (data.kind) {
              case 'on_chat_model_init':
                console.log('Chat model initialized...')
                setMessages(data.content)
                break;
              case 'on_chat_model_start':
                accumulatedAnswer = ''
                const botMessage = { text: '', isBot: true, pages: [] };
                setMessages(prevMessages => {
                  if (prevMessages.length > 0) {
                      const newMessages = prevMessages.slice(0, prevMessages.length - 1);
                      return [...newMessages, botMessage];
                  } else {
                      return [botMessage];
                  }
                });
                break;
              case 'on_chat_model_stream':
                accumulatedAnswer += data.content;
                setMessages(
                    prevMessages  => {
                    const newMessages = [...prevMessages ];
                    newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], text: accumulatedAnswer };
                    return newMessages;
                  }
                )
                break;
              case 'on_chat_model_documents':
                setMessages(
                  prevMessages  => {
                  const newMessages = [...prevMessages ];
                  newMessages[newMessages.length - 1] = { ...newMessages[newMessages.length - 1], pages: data.page_numbers };
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
    }, [user, pdfBase64]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!input.trim()) return;
        
        const userMessage = { text: input, isBot: false };
        setMessages([...messages, userMessage]);

        const botMessage = { text: '...', isBot: true, pages: [], typing: true };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        

        console.time("Generate Thread ID Time");
        generateThreadId(pdfBase64, user.email).then(threadId => {
            console.timeEnd("Generate Thread ID Time");
            ws.current.send(JSON.stringify({ pdf_base64: pdfBase64, content: input, thread_id: threadId }));
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
        <div className='mx-auto mt-3 w-full h-full flex flex-col p-4 flex-grow' style={{ maxHeight: 'calc(100vh - 100px)' }}>
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
                      <Typography>{m.text}</Typography>
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
                          <Typography>{m.text}</Typography>
                        }
                      </div>
                      <div className='mt-2 text-sm text-zinc-500'>
                        {m.pages && m.pages.length > 0 && (
                          <>
                            <span>Pages: </span>
                            {m.pages.map((page, i) => (
                              <button 
                                key={i}
                                onClick={() => handleClick(page)}
                                className='underline text-emerald-500 focus:outline-none'
                                style={{ marginRight: i === m.pages.length - 1 ? 0 : '8px' }} // adds margin to all but the last button
                              >
                                {page}
                              </button>
                            ))}
                          </>
                        )}
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
              placeholder={pdfBase64 === 'https://djangoreactupwork.s3.amazonaws.com/documents/ba824cdd-8708-4bbe-9250-1c0353dce4fa.pdf?AWSAccessKeyId=AKIAZI2LFTE45F5OAGMW&Signature=JTTCthGsdkfCGd4BVRp80lRGteM%3D&Expires=1717479310' ?
                `How were iphone sales this quarter...?` : `Ask me anything...`
              }
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

export default Chat;