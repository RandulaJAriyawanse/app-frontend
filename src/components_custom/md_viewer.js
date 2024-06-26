import React from 'react';
import { ScrollArea } from "../components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';
import Typography from '@mui/material/Typography';


import markdownContent from './swiss_faq.md';

import {
    CardBody,
  } from "../daisyui/daisyui";




const MdViewer = () => {

    const [markdown, setMarkdown] = React.useState('');

    React.useEffect(() => {
      fetch(markdownContent)
        .then(response => response.text())
        .then(text => setMarkdown(text))
        .catch(err => console.error('Failed to load markdown file:', err));
    }, []);

    return (
        <div className="flex flex-col" style={{ height: '100%', width: '100%', maxWidth: '100%'}} >
            <div className="pl-4 pt-1" >
                <span>Knowledge Base</span>
            </div>
            <hr className="my-1 border-base-content/10" />
            <ScrollArea 
            className='prose lg:prose-xl flex-grow overflow-auto w-full h-full pl-4 pr-4' 
            >
                <ReactMarkdown
                        components={{
                            h1: ({ node, ...props }) => <Typography variant="h4" {...props} />,
                            h2: ({ node, ...props }) => <Typography variant="h5" {...props} />,
                            h3: ({ node, ...props }) => <Typography variant="h6" {...props} />,
                            h4: ({ node, ...props }) => <Typography variant="h7" {...props} />,
                            p: ({ node, ...props }) => <Typography variant="body2" paragraph {...props} />,
                            li: ({ node, ...props }) => <Typography component="li" variant="body2" {...props} />,
                            ul: ({ node, ...props }) => <Typography component="ul" {...props} />,
                            ol: ({ node, ...props }) => <Typography component="ol" {...props} />,
                        }}
                >{markdown}</ReactMarkdown>
            </ScrollArea>
        </div>
    );
};

export default MdViewer;