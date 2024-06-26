import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { type } from '@testing-library/user-event/dist/type';
import useAuth from '../../../hooks/useAuth';


export default function EmailList({data}) {
  const { setCurrentMail, customDemoEmails } = useAuth()
  const [emails, setEmails] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    let initialEmails = typeof data === 'string' ? JSON.parse(data) : data;
    setEmails(initialEmails);
    // Set the first email as current if available
    if (initialEmails.length > 0) {
      setCurrentMail(initialEmails[0]);
    }
  }, [data]);

  React.useEffect(() => {
    // Add customDemoEmails and re-sort
    setEmails(prevEmails => {
      const updatedEmails = [...prevEmails, ...customDemoEmails];
      updatedEmails.sort((a, b) => new Date(a.date) - new Date(b.date));
      return updatedEmails;
    });
  }, [customDemoEmails]);

  function createMarkup(snippet) {
    return {__html: snippet};
  }
  
  return (
    <List
      sx={{
        [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
          borderLeft: '2px solid',
          borderLeftColor: 'var(--joy-palette-primary-outlinedBorder)',
        },
      }}
    >
      {emails.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem
            onClick={() => {
              console.log("ITEM: ", typeof item)
              setCurrentMail(item)
              setSelectedIndex(index)
            }}
          >
            <ListItemButton
              selected={index === selectedIndex}
              sx={{ p: 2 }}
            >
              <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Avatar>
                  {item.name[0].toUpperCase()}
                </Avatar>
              </ListItemDecorator>
              <Box sx={{ pl: 2, width: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 0.5,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography level="body-xs">{item.name}</Typography>
                  </Box>
                  <Typography level="body-xs" textColor="text.tertiary">
                    {item.date}
                  </Typography>
                </Box>
                <div>
                  <Typography level="title-sm" sx={{ mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography level="body-sm"><div dangerouslySetInnerHTML={createMarkup(item.snippet.slice(0, 100))}/></Typography>
                </div>
              </Box>
            </ListItemButton>
          </ListItem>
          <ListDivider sx={{ m: 0 }} />
        </React.Fragment>
      ))}
    </List>
  );
}
