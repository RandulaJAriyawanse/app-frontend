import React, { useState, useEffect } from 'react';
import { Worker, Viewer, SpecialZoomLevel, Icon, MinimalButton, Position, Tooltip } from '@react-pdf-viewer/core';
// import { highlightPlugin } from '@react-pdf-viewer/highlight';
import { NextIcon, PreviousIcon, searchPlugin } from '@react-pdf-viewer/search';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/search/lib/styles/index.css';
import useAuth from '../hooks/useAuth';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import axios from 'axios';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Drawer from '@mui/joy/Drawer';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { useTheme } from "../providers/shadcn_theme_provider"
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';

const apiUrl = process.env.REACT_APP_API_URL;

const PdfViewerTwo = () => {
  const { setPdfBase64, pdfBase64, currentPDFPage, setMessage, setAlertColor } = useAuth();  
  const searchPluginInstance = searchPlugin();
  const { highlight, jumpToNextMatch, jumpToPreviousMatch } = searchPluginInstance;
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = React.useState(false);
  const [publicDocuments, setPublicDocuments] = useState([{}]);
  const [documents, setDocuments] = useState([{}]);
  const [ pdfFile, setPdfFile ] = useState(null);
  const [ pdfId, setPdfId ] = useState(null);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { jumpToPage, CurrentPageInput } = pageNavigationPluginInstance;

  const { setTheme } = useTheme();
  const { mode } = useMaterialColorScheme();



  const goToPage = (pageNumber) => {
    // `pageNumber` should be the target page number minus one since page numbers are zero-based
    jumpToPage(pageNumber);
  };

  useEffect(() => {
    setTheme(mode)
  }, [mode, setTheme])

  useEffect(() => {
    goToPage(currentPDFPage);
  }, [currentPDFPage]);

  const fetchPdfAndConvertToBase64 = (pdfUrl) => {
    fetch(pdfUrl)
      .then(response => response.blob())  // Convert the response to a Blob
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);  // Read the blob as Base64
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          setPdfBase64(base64String);
        };
      })
      .catch(error => {
        setAlertColor("warning")
        setMessage('Error fetching or converting file:', error)
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const access = localStorage.getItem('access');
      try {
        const res = await axios.get(`${apiUrl}/api/public-documents/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
          }
        });
        setPublicDocuments(res.data.documents);

        const id = res.data.documents[0].id
        const body = JSON.stringify({ id })
        try {
          const res = await axios.post(`${apiUrl}/api/publicdocument/`, body, {
            headers: {
              'Content-Type': 'application/json'
          }
          })
          if (res.data.document && res.data.document.file_url) {
            setPdfFile(res.data.document.file_url);
            fetchPdfAndConvertToBase64(res.data.document.file_url);
          }
          } catch (error) {
            setAlertColor("warning")
            setMessage("Failed to retrieve public file: ", error)
          }
      } catch (error) {
        setAlertColor("warning")
        setMessage("Failed to retrieve public file: ", error)
      }

      try {
        const res = await axios.get(`${apiUrl}/api/documents/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
          }
        });
        setDocuments(res.data.documents);
      } catch (error) {
        setAlertColor("warning")
        setMessage("Failed to retrieve documents: ", error);
      }
    };
  
    fetchData();
  }, [])


  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(inOpen);
  };

  const searchInput = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) return;
    if (searchTerm) {
      highlight({
          keyword: searchTerm,
          matchCase: false,
      });
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const access = localStorage.getItem('access');

    if (file && file.size > 1024 * 1024 * 5) {
        setAlertColor("warning")
        setMessage("File size should not exceed 5 MB.");
        return;
    }

    if (file && file.type === "application/pdf") {
      const fileUrl = URL.createObjectURL(file); 
      setPdfFile(fileUrl);
    }
    const formData = new FormData();
    formData.append("document", file);
    formData.append("filename", file.name);

    try {
      await axios.post(`${apiUrl}/api/upload/`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": `Bearer ${access}`
          }
      })} catch (error) {
          setAlertColor("warning")
          setMessage("Error in file upload: ", error)
      }
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setPdfBase64(base64String);
    };
    reader.readAsDataURL(file);

    try {
        const res = await axios.get(`${apiUrl}/api/documents/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
          }
        });
        setDocuments(res.data.documents);
      } catch (error) {
        setAlertColor("warning")
        setMessage("Failed to retrieve documents: ", error);
      }
  };

  const onClickDocument = async (id) => {
    const access = localStorage.getItem('access');
    const body = {"doc_id": id}
    try {
      const res = await axios.post(`${apiUrl}/api/document/`, body, {
          headers: {
              "Authorization": `Bearer ${access}`
          }
      })
      setPdfFile(res.data.file_url);
      fetchPdfAndConvertToBase64(res.data.file_url);
  
      } catch (error) {
          setAlertColor("warning")
          setMessage("Failed to retrieve document: ", error)
      }
      setOpen(!open);
    }

  const onClickPublicDocument = async (id) => {
      const body = JSON.stringify({ id })
      try {
        const res = await axios.post(`${apiUrl}/api/publicdocument/`, body, {
          headers: {
            'Content-Type': 'application/json'
        }
        })
        setPdfFile(res.data.document.file_url);
        fetchPdfAndConvertToBase64(res.data.document.file_url);
        setOpen(!open);
      } catch (error) {
        setAlertColor("warning")
        setMessage("Failed to retrieve public document: ", error)
      }
    }

  return (
    <div className="flex flex-col flex-1 h-full w-full ">
          <Drawer open={open} onClose={toggleDrawer(false)}>
          <AccordionGroup>
            <Accordion>
              <AccordionSummary>Shared Documents</AccordionSummary>
              {publicDocuments.map((document, index) => {
                return (
                  <AccordionDetails key={index}>
                    <div onClick={() => onClickPublicDocument(document.id)}>
                    {document.filename}
                    </div>
                  </AccordionDetails>
                )
               })
              }
            </Accordion>
            <Accordion>
              <AccordionSummary>Personal Documents</AccordionSummary>
              {documents.map((document, index) => {
                return (
                  <AccordionDetails key={index}>
                    <div onClick={() => onClickDocument(document.id)}>
                    {document.filename}
                    </div>
                  </AccordionDetails>
                )
               })
              }
            </Accordion>
          </AccordionGroup>
          </Drawer>
          {pdfBase64 ?
            <div className="flex p-2 items-center">
              <div className="flex w-full">
                  <form onSubmit={searchInput} className='relative flex-grow'>
                    <Input
                      name='message'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={'Enter Search Term...'}
                      className='pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500'
                    />
                    <Button
                      size='icon'
                      type='submit'
                      variant='secondary'
                      className='absolute right-1 top-1 h-8 w-10'
                    >
                      <Search className='h-5 w-5 text-emerald-500'/>
                    </Button>

                  </form>
              </div>
              <div className="flex h-10 rounded-md border m-2 items-center pl-1 pr-1">
                    <div>
                            <MinimalButton onClick={jumpToPreviousMatch}>
                                <PreviousIcon />
                            </MinimalButton>

                    </div>
                    <div>
                                <MinimalButton onClick={jumpToNextMatch}>
                                    <NextIcon />
                                </MinimalButton>
                    </div>
              </div>
              <div className="flex h-10 rounded-md border items-center pl-1 pr-1 mr-1">
                    <ZoomOutButton />
                    <ZoomPopover />
                    <ZoomInButton />
              </div>
              <div className="flex h-10 rounded-md border justify-center items-center pl-1 pr-1 ml-1" style={{ width: "70px" }}>
                    <FolderOpenIcon onClick={() => setOpen(!open)}/>
              </div>
              <input type="file" onChange={handleFileChange} accept=".pdf" className="p-2 w-2/5"/>
            </div>
                :
            <div className="flex flex-col flex-1 h-full w-full items-center justify-center">
                <input type="file" onChange={handleFileChange} accept=".pdf"/>
            </div>
            }

          
          {pdfBase64 && 
            <div className="flex flex-col flex-1">
              
              <div style={{ height: 'calc(100vh - 140px)'}} className="border-t">

              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">

                      <Viewer
                          fileUrl={`${pdfFile}`}
                          defaultScale={SpecialZoomLevel.PageFit}
                          theme={mode}
                          plugins={[
                              // highlightPluginInstance,
                              searchPluginInstance,
                              zoomPluginInstance,
                              pageNavigationPluginInstance
                          ]}
                      />
                  </Worker>
              </div>
            </div>
          }

      </div>
  );
};

export default PdfViewerTwo;

