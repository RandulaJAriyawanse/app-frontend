import * as React from 'react';
import Box from '@mui/joy/Box';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import Sheet from '@mui/joy/Sheet';
import { IconButton, Input, Stack, Typography } from '@mui/joy';

import FormatColorTextRoundedIcon from '@mui/icons-material/FormatColorTextRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import useAuth from '../../../hooks/useAuth';


const WriteEmail = React.forwardRef(

  function WriteEmail({ open, onClose }, ref) {

    const [from, setFrom] = React.useState('');
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [demoData, setDemoData] = React.useState([]);
    const { customDemoEmails, setCustomDemoEmails } = useAuth()
  
    const handleFromChange = (event) => {
      setFrom(event.target.value);
    };
  
    const handleSubjectChange = (event) => {
      setSubject(event.target.value);
    };
  
    const handleMessageChange = (event) => {
      setMessage(event.target.value);
    };
  
    const handleCreateDemo = () => {
      console.log('Creating demo email...')
      const newDemo = {
        name: from,
        date: new Date().toISOString().substring(0, 10), // Adjust date format as needed
        title: subject,
        textBody: message,
        htmlBody: `<div dir="ltr">${message}</div>`,
        snippet: message.split(' ').slice(0, 8).join(' '),
      };
      
      setCustomDemoEmails([newDemo, ...customDemoEmails]);
      // Reset fields if necessary
      setFrom('');
      setSubject('');
      setMessage('');
    };
  
    return (
      <Sheet
        ref={ref}
        sx={{
          alignItems: 'center',
          px: 1.5,
          py: 1.5,
          ml: 'auto',
          width: { xs: '100dvw', md: 600 },
          flexGrow: 1,
          border: '1px solid',
          borderRadius: '8px 8px 0 0',
          backgroundColor: 'background.level1',
          borderColor: 'neutral.outlinedBorder',
          boxShadow: 'lg',
          zIndex: 1000,
          position: 'fixed',
          bottom: 0,
          right: 24,
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography level="title-sm">New message</Typography>
          <ModalClose id="close-icon" onClick={onClose} />
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexShrink: 0 }}
        >
          <FormControl>
            <FormLabel>From</FormLabel>
            <Input value={from} placeholder="email@email.com" aria-label="Message" onChange={handleFromChange}/>
          </FormControl>
          <Input value={subject} placeholder="Subject" aria-label="Message" onChange={handleSubjectChange}/>
          <FormControl sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Textarea
              value={message}
              placeholder="Type your message here…"
              aria-label="Message"
              minRows={8}
              onChange={handleMessageChange}
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
                    onClick={handleCreateDemo}
                  >
                    Create Demo
                  </Button>
                </Stack>
              }
              sx={{
                '& textarea:first-of-type': {
                  minHeight: 72,
                },
              }}
            />
          </FormControl>
        </Box>
      </Sheet>
    );
  },
);

export default WriteEmail;
