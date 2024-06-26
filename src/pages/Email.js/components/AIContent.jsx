import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';

import useAuth from '../../../hooks/useAuth';
import { IconButton, Input, Stack, Typography } from '@mui/joy';
import ModalClose from '@mui/joy/ModalClose';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';

import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

import { useTheme, ThemeProvider } from '@mui/material/styles';

import { Accordion, AccordionDetails, AccordionSummary } from '@mui/joy';
import axios from 'axios';
import DOMPurify from 'dompurify';


// axios.defaults.withCredentials = true;
const apiUrl = process.env.REACT_APP_API_URL;



export default function AIContent() {
  const theme = useTheme()

  const { currentMail, setReplyOpen, demoEmails, setMessage, setAlertColor } = useAuth();  

  const [open, setOpen] = React.useState([false, false, false]);
  const [inputValue, setInputValue] = React.useState('');

  const [expand, setExpand] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  const handleSnackbarOpen = (index) => {
    const updatedOpen = [...open];
    updatedOpen[index] = true;
    setOpen(updatedOpen);
  };

  const handleSnackbarClose = (index) => {
    const updatedOpen = [...open];
    updatedOpen[index] = false;
    setOpen(updatedOpen);
  };

  if (currentMail && currentMail.htmlBody) {
    currentMail.bodyFull = DOMPurify.sanitize(currentMail.htmlBody);
  }

  if (!currentMail || Object.keys(currentMail).length === 0 || !currentMail.name) {
    return null;
  }

  const handlePersonalGenerate = async () => {
    console.log("Generating AI content...")

    const body = {"question" : currentMail.textBody}

    await axios.post(`${apiUrl}/mailchat/`, body)
      .then(response => {
        setInputValue(response.data.response)
      })
      .catch(error => {
        setAlertColor("warning")
        setMessage(`Error in generating AI content: ${error}`);
      });
  }

  const handleDemoGenerate = async () => {
    console.log("Generating AI content...")

    const body = {"question" : currentMail.textBody}

    await axios.post(`${apiUrl}/flightchat/`, body)
      .then(response => {
        setInputValue(response.data.response)
      })
      .catch(error => {
        setAlertColor("warning")
        setMessage(`Error: ${error}`);
      });
  }

  const handleGenerate = async () => {
    setLoading(true)
    if (demoEmails) {
      await handleDemoGenerate()
    } else {
      await handlePersonalGenerate()
    }
    setLoading(false)
  }


  return (
    <Sheet
      variant="outlined"
      sx={{
        minHeight: 500,
        borderRadius: 'sm',
        p: 2,
        mb: 3,
        display: 'flex',      // Enables flexbox layout
        flexDirection: 'column',
      }}
    >
        <Box sx={{ mb: 2 }}>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>                  
            <Typography level="title-sm">New message</Typography>
            <Button
              loading={loading}
              sx={{ borderRadius: 'sm', mr: 4, backgroundColor: 'purple', color: 'white'  }}
              onClick={() => handleGenerate()}
            >
                Generate
            </Button>
            <ModalClose id="close-icon" onClick={() => setReplyOpen(false)} />
            </Box>
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0}}
        >
          <Box sx={{ display: 'flex' , flexDirection: 'column'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* <FormControl fullWidth> */}
              {/* <FormLabel>To</FormLabel> */}
                  <Input placeholder="To" aria-label="Message" sx={{
                          flexGrow: 1, // This makes the input take up all available space
                          backgroundColor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
                        }}/>
            {/* </FormControl> */}
            <IconButton size="small" onClick={toggleAcordion} sx={{ ml: 1 }}>
                    <Typography>CC BCC</Typography>
            </IconButton>
            </Box>
          <div  >
          <Accordion expanded={expand}>
            <AccordionDetails>
              <Stack sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
              <Input placeholder="CC" aria-label="Message" sx={{
                      backgroundColor: theme.palette.mode === 'light' ? 'white' : 'grey.800'
                    }} />
              <Input placeholder="BCC" aria-label="Message" sx={{
                      backgroundColor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
                    }} />
            </Stack>
            </AccordionDetails>
          </Accordion>
          </div>
          </Box>



          <Input placeholder="Subject" aria-label="Message" sx={{
                    backgroundColor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
                  }}>uigig</Input>
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}>
            <Textarea
              placeholder="Type your message here…"
              aria-label="Message"
              minRows={8} 
              value={inputValue}
              endDecorator={
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexGrow={1}
                  sx={{
                    py: 1,
                    pr: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <div>
                    <IconButton size="sm" variant="plain" color="neutral">
                      <FormatColorTextRoundedIcon />
                    </IconButton>
                    <IconButton size="sm" variant="plain" color="neutral">
                      <AttachFileRoundedIcon />
                    </IconButton>
                    <IconButton size="sm" variant="plain" color="neutral">
                      <InsertPhotoRoundedIcon />
                    </IconButton>
                    <IconButton size="sm" variant="plain" color="neutral">
                      <FormatListBulletedRoundedIcon />
                    </IconButton>
                  </div>
                  <Button
                    color="primary"
                    sx={{ borderRadius: 'sm' }}
                  >
                    Send
                  </Button>
                </Stack>
              }
              sx={{
                '& textarea:first-of-type': {
                  minHeight: 72,
                },
                backgroundColor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
                height: '100%'
              }}
            />
          </FormControl>
        </Box>
    </Sheet>
  );
}
