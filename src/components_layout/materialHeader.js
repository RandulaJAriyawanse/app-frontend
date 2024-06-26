import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Avatar from '@mui/joy/Avatar';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import useAuth from '../hooks/useAuth';

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Navigation from '../pages/Email.js/components/Navigation';

import { useColorScheme as useJoyColorScheme } from '@mui/joy/styles';
import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';
import { LightMode, DarkMode } from '@mui/icons-material';


const ModeToggle = () => {
  const { mode, setMode: setMaterialMode } = useMaterialColorScheme();
  const { setMode: setJoyMode } = useJoyColorScheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <IconButton
      onClick={() => {
        const newMode = mode === 'dark' ? 'light' : 'dark';
        setMaterialMode(newMode);
        setJoyMode(newMode);
      }}
    >
      {/** You can use `mode` from Joy UI or Material UI since they are synced **/}
      {mode === 'dark' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
};


function ColorSchemeToggle() {
  
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <Tooltip title="Change theme" variant="outlined">
      <IconButton
        id="toggle-mode"
        size="sm"
        variant="plain"
        color="neutral"
        sx={{ alignSelf: 'center' }}
        onClick={() => {
          if (mode === 'light') {
            setMode('dark');
          } else {
            setMode('light');
          }
        }}
      >
        {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default function Header() {
  const { isAuthenticated, logout, loading, selectedMenuItem, setSelectedMenuItem, user } = useAuth()

  const [open, setOpen] = React.useState(false);

  // Function to handle menu item click
  const handleMenuItemClick = (item) => {
    localStorage.setItem('selectedMenuItem', item);
    setSelectedMenuItem(item);
    console.log("selected: ", selectedMenuItem === 'chat')
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        padding: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        maxHeight: '50px',
        bgcolor: 'background.surface'
      }}
    >
        { isAuthenticated ?  
        <>
         <List role="menubar" orientation="horizontal">
         <ListItem role="none">
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            borderRadius: '50%',
          }}
        >
          <LanguageRoundedIcon />
        </IconButton>
        </ListItem>

        <ListItem role="none">
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/"
          size="sm"
          sx={{ alignSelf: 'center' }}
          aria-pressed={selectedMenuItem === 'chat'}
          onClick={() => handleMenuItemClick('chat')}
        >
          PDF Research
        </Button>
        </ListItem>
        <ListItem role="none">
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/flightchat/"
          size="sm"
          sx={{ alignSelf: 'center' }}
          aria-pressed={selectedMenuItem === 'travelagent'}
          onClick={() => handleMenuItemClick('travelagent')}
        >
          Travel Agent
        </Button>
        </ListItem>
        <ListItem role="none">
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/email/"
          size="sm"
          sx={{ alignSelf: 'center' }}
          aria-pressed={selectedMenuItem === 'email'}
          onClick={() => handleMenuItemClick('email')}
        >
          Email
        </Button>
        </ListItem>
        </List>

        </>
        : 
        <IconButton
        size="md"
        variant="outlined"
        color="neutral"
        sx={{
          display: { xs: 'none', sm: 'inline-flex' },
          borderRadius: '50%',
        }}
          >
            <LanguageRoundedIcon />
          </IconButton>
        }
      
      <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
        <IconButton variant="plain" color="neutral" onClick={() => setOpen(true)}>
          <MenuRoundedIcon />
        </IconButton>
        <Drawer
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <ModalClose />
          <DialogTitle>NA Co.</DialogTitle>
          <Box sx={{ px: 1 }}>
           <Navigation />
          </Box>
        </Drawer>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        
        <>
        <ModeToggle />
        { isAuthenticated ?  "" : 
        <Button
          variant="plain"
          color="neutral"
          component="a"
          href="/login/"
          size="sm"
          sx={{ alignSelf: 'center' }}
        >
          Login
        </Button>
        }
        </>
        { isAuthenticated ?   
        <Dropdown>
          <MenuButton
            variant="plain"
            size="sm"
            sx={{ maxWidth: '32px', maxHeight: '32px', borderRadius: '9999999px' }}
          >
            <Avatar
              src={loading ? '' : "https://github.com/shadcn.png"}
              sx={{ maxWidth: '32px', maxHeight: '32px' }}
            >
            </Avatar>
          </MenuButton>
          <Menu
            placement="bottom-end"
            size="sm"
            sx={{
              zIndex: '99999',
              p: 1,
              gap: 1,
              '--ListItem-radius': 'var(--joy-radius-sm)',
            }}
          >
            <MenuItem>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
              <Avatar
                src={loading ? '' : "https://github.com/shadcn.png"}
                sx={{ maxWidth: '32px', maxHeight: '32px' }}
              >
              </Avatar>
                <Box sx={{ ml: 1.5 }}>
                  <Typography level="title-sm" textColor="text.primary">
                    Name
                  </Typography>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {user && user.email}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
            {/* <ListDivider />
            <MenuItem>
              <HelpRoundedIcon />
              Help
            </MenuItem>
            <MenuItem>
              <SettingsRoundedIcon />
              Settings
            </MenuItem>
            <ListDivider />
            <MenuItem
              component="a"
              href="https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/email"
            >
              Sourcecode
              <OpenInNewRoundedIcon />
            </MenuItem> */}
            <ListDivider />
            <MenuItem onClick={() => logout()}>
              <LogoutRoundedIcon />
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
        :
        ""
        }
      </Box>
    </Box>
  );
}
