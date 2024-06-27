import React from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import Typography from "@mui/material/Typography";
import { htmlpage } from "./htmlpage"; // Import the HTML content

import markdownContent from "./swiss_faq.md";

import { CardBody } from "../daisyui/daisyui";

const MdViewer = () => {
  const [markdown, setMarkdown] = React.useState("");

  React.useEffect(() => {
    fetch(markdownContent)
      .then((response) => response.text())
      .then((text) => setMarkdown(text))
      .catch((err) => console.error("Failed to load markdown file:", err));
  }, []);

  return (
    <div
      className="flex flex-col"
      style={{ height: "100%", width: "100%", maxWidth: "100%" }}
    >
      <div className="pt-3 px-4 pb-3 border-b mb-4 font-medium text-gray-900">
        <span>Knowledge Base</span>
      </div>
      <ScrollArea className="prose lg:prose-xl flex-grow overflow-auto w-full h-full pl-4 pr-4">
        <div
          className="terms-container px-0"
          dangerouslySetInnerHTML={{ __html: htmlpage }}
          style={{
            fontSize: "16px", // Smaller font size
            lineHeight: "1.6", // Improves readability
            color: "#333", // Text color
            overflowY: "auto", // Adds scrolling
          }}
        />
        {/* <ReactMarkdown
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
                >{markdown}</ReactMarkdown> */}
      </ScrollArea>
    </div>
  );
};

export default MdViewer;
