import * as React from 'react';
import { CssVarsProvider, Accordion, AccordionSummary, AccordionDetails } from '@mui/joy/styles';
import { FocusTrap } from '@mui/base/FocusTrap';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';

import Layout from './components/Layout';
import Navigation from './components/Navigation';
import EmailContent from './components/EmailContent';
import AIContent from './components/AIContent';

import Mails from './components/Mails';
import WriteEmail from './components/WriteEmail';
import Header from './components/Header';
import useAuth from '../../hooks/useAuth';

import ListDivider from '@mui/joy/ListDivider';
import { Navigate, } from "react-router-dom";

const demoData = [
  {
    name: 'Alex Jonnold',
    date: '2024-05-21',
    title: 'Flight time',
    textBody: 'Hi there,/nCould you please let me know what time my flight is. My passenger id is 3442 587242/n/nThanks, Alex',
    htmlBody: "<div dir=\"ltr\">Hi there,<br><br>Could you please let me know what time my flight is. My passenger id is 6615 976589. <br><br>Thanks, Alex</div>\n",
    snippet: 'Hi there, Could you please let me know what time my flight is',
  },
  {
    name: 'Pete Sand',
    date: '2024-06-06',
    title: 'Flights Next Week',
    textBody: 'Hello, Can you let me know what flights are available next week from MUC to RIX. Thanks',
    htmlBody: '<div dir=\"ltr\">Hello,<br><br>Can you let me know what flights are available next week from MUC to RIX.<br><br> Thanks</div>',
    snippet: 'Hello, Can you let me know what flights are available next week from MUC to RIX. Thanks',
  },
];


function Root(props) {
  return (
    <Box
      {...props}
      sx={[
        {
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: props.sidenavOpen
              ? 'minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)'
              : 'minmax(300px, 500px) minmax(500px, 1fr)',
          },
          gridTemplateRows: '64px 1fr',
          minHeight: '100vh',
          transition: 'grid-template-columns 0.3s ease-in-out',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    />
  );
}


export default function EmailExample() {
  const { testEmail, replyOpen, setCurrentMail, isAuthenticated, setDemoEmails, demoEmails } = useAuth();


  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [ loading, setLoading ] = React.useState(false);


  const [sidenavOpen, setSidenavOpen] = React.useState(true);
  const [ mails, setMails ] = React.useState(demoData);

  let initialMails = ""
  if (mails == demoData) {
    initialMails = "Load Personal Emails"
  } else {
    initialMails = "Load Demo Emails"
  }

  const [ loadButton, setLoadButton ] = React.useState(initialMails);
  
  if (!isAuthenticated) {
    return <Navigate to={"../"}></Navigate>
  }

  const handleRefresh = async (event) => {
    event.preventDefault();
  }

  const handleToggleDemoEmails = async () => {
    if (demoEmails) {
      setLoadButton("Load Demo Emails")
      setLoading(true)
      const res = await testEmail();
      setLoading(false)
      setMails(localStorage.getItem('mails'))
    } else {
      setLoadButton("Load Personal Emails")
      setMails(demoData)
    }
    setDemoEmails(!demoEmails);
  };

  

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Root
        sidenavOpen={sidenavOpen}
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Header />
        </Layout.Header>
        {sidenavOpen && (
          <Layout.SideNav
          sx={{
            transform: sidenavOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease-in-out',
          }}
          >
            <Navigation />
          </Layout.SideNav>
          )}
        
        <Layout.SidePane sx={{ display: "none"}}>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ alignItems: 'center', gap: 1 }}>
              <Typography level="title-lg" textColor="text.secondary" component="h1">
                Demo Inbox
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
            {/* <Button
              size="sm"
              onClick={handleRefresh}
              sx={{ ml: 'auto' }}
              color="primary"
              loading={loading}
            ><RefreshRoundedIcon /></Button>
            <Button
              size="sm"
              startDecorator={<CreateRoundedIcon />}
              onClick={() => handleToggleDemoEmails()}
              sx={{ ml: 'auto' , ml: 1}}
            >
              {loadButton}
            </Button> */}
            <Button
              size="sm"
              startDecorator={<CreateRoundedIcon />}
              onClick={() => setOpen(true)}
              sx={{ ml: 'auto' , ml: 1}}
            >
              New Demo
            </Button>
            </Box>
            <FocusTrap open={open} disableAutoFocus disableEnforceFocus>
              <WriteEmail open={open} onClose={() => setOpen(false)} />
            </FocusTrap>
          </Box>
          <ListDivider />

          <Mails data={mails}/>
        </Layout.SidePane>
        <Layout.Main>
          { replyOpen && <AIContent />}
          <EmailContent />
        </Layout.Main>
      </Root>
    </CssVarsProvider>
  );
}
