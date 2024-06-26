import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import AspectRatio from '@mui/joy/AspectRatio';
import Divider from '@mui/joy/Divider';
import Avatar from '@mui/joy/Avatar';
import Tooltip from '@mui/joy/Tooltip';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ForwardToInboxRoundedIcon from '@mui/icons-material/ForwardToInboxRounded';
import FolderIcon from '@mui/icons-material/Folder';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import useAuth from '../../../hooks/useAuth';

import DOMPurify from 'dompurify';

export default function EmailContent() {
  const { currentMail, setReplyOpen } = useAuth();  

  const [open, setOpen] = React.useState([false, false, false]);

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

  console.log("EmailContent Current: ", currentMail)

  return (
    <Sheet
      variant="outlined"
      sx={{
        minHeight: 500,
        borderRadius: 'sm',
        p: 2,
        mb: 3,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Avatar
          >{currentMail.name[0].toUpperCase()}</Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography level="title-sm" textColor="text.primary" mb={0.5}>
              {currentMail.name}
            </Typography>
            <Typography level="body-xs" textColor="text.tertiary">
              {currentMail.date}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{ display: 'flex', height: '32px', flexDirection: 'row', gap: 1.5 }}
        >
          <Button
            size="sm"
            variant="plain"
            color="neutral"
            startDecorator={<ReplyRoundedIcon sx = {{ color: 'white'}} />}
            onClick={() => setReplyOpen(prevState => !prevState)}
            sx = {{ backgroundColor: 'purple', color: 'white', '&:hover': { backgroundColor: 'darkpurple' }}}
          >
            AI Reply
          </Button>
          <Button
            size="sm"
            variant="plain"
            color="neutral"
            startDecorator={<ReplyRoundedIcon />}
            onClick={() => handleSnackbarOpen(0)}
          >
            Reply
          </Button>
          <Snackbar
            color="success"
            open={open[0]}
            onClose={() => handleSnackbarClose(0)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            startDecorator={<CheckCircleRoundedIcon />}
            endDecorator={
              <Button
                onClick={() => handleSnackbarClose(0)}
                size="sm"
                variant="soft"
                color="neutral"
              >
                Dismiss
              </Button>
            }
          >
            Your message has been sent.
          </Snackbar>
          <Button
            size="sm"
            variant="plain"
            color="neutral"
            startDecorator={<ForwardToInboxRoundedIcon />}
            onClick={() => handleSnackbarOpen(1)}
          >
            Forward
          </Button>
          <Snackbar
            color="success"
            open={open[1]}
            onClose={() => handleSnackbarClose(1)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            startDecorator={<CheckCircleRoundedIcon />}
            endDecorator={
              <Button
                onClick={() => handleSnackbarClose(1)}
                size="sm"
                variant="soft"
                color="neutral"
              >
                Dismiss
              </Button>
            }
          >
            Your message has been forwarded.
          </Snackbar>
          <Button
            size="sm"
            variant="plain"
            color="danger"
            startDecorator={<DeleteRoundedIcon />}
            onClick={() => handleSnackbarOpen(2)}
          >
            Delete
          </Button>
          <Snackbar
            color="danger"
            open={open[2]}
            onClose={() => handleSnackbarClose(2)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            startDecorator={<CheckCircleRoundedIcon />}
            endDecorator={
              <Button
                onClick={() => handleSnackbarClose(2)}
                size="sm"
                variant="soft"
                color="neutral"
              >
                Dismiss
              </Button>
            }
          >
            Your message has been deleted.
          </Snackbar>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box
        sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'start' }}
      >
        <Typography
          level="title-lg"
          textColor="text.primary"
        >
          {currentMail.title}
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Typography
              component="span"
              level="body-sm"
              sx={{ mr: 1, display: 'inline-block' }}
            >
              From
            </Typography>
            <Tooltip size="sm" title="Copy email" variant="outlined">
              <Chip size="sm" variant="soft" color="primary" onClick={() => {}}>
                {currentMail.name}
              </Chip>
            </Tooltip>
          </div>
          <div>
            <Typography
              component="span"
              level="body-sm"
              sx={{ mr: 1, display: 'inline-block' }}
            >
              to
            </Typography>
            <Tooltip size="sm" title="Copy email" variant="outlined">
              <Chip size="sm" variant="soft" color="primary" onClick={() => {}}>
                Undefined
              </Chip>
            </Tooltip>
          </div>
        </Box>
      </Box>
      <Divider />
      {currentMail.htmlBody ? <div
        className="email-body"
        dangerouslySetInnerHTML={{ __html: currentMail.htmlBody }}
      ></div> 
      : 
      <Typography level="body-sm" mt={2} mb={2}>{currentMail.textBody}</Typography>
      }
      {/* <Typography level="body-sm" mt={2} mb={2}>
        {currentMail.bodyFull}
      </Typography> */}
      <Divider />
      <Typography level="title-sm" mt={2} mb={2}>
        Attachments
      </Typography>
      {/* <Box
        sx={(theme) => ({
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          '& > div': {
            boxShadow: 'none',
            '--Card-padding': '0px',
            '--Card-radius': theme.vars.radius.sm,
          },
        })}
      >
        <Card variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&h=80"
              srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&h=160 2x"
              alt="Yosemite National Park"
            />
          </AspectRatio>
        </Card>
        <Card variant="outlined">
          <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
            <img
              src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&h=80"
              srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&h=160 2x"
              alt="Yosemite National Park"
            />
          </AspectRatio>
        </Card>
        <Card variant="outlined" orientation="horizontal">
          <CardOverflow>
            <AspectRatio ratio="1" sx={{ minWidth: 80 }}>
              <div>
                <FolderIcon />
              </div>
            </AspectRatio>
          </CardOverflow>
          <Box sx={{ py: { xs: 1, sm: 2 }, pr: 2 }}>
            <Typography level="title-sm" color="primary">
              videos-hike.zip
            </Typography>
            <Typography level="body-xs">100 MB</Typography>
          </Box>
        </Card>
      </Box> */}
    </Sheet>
  );
}
