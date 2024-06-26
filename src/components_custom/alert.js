import * as React from 'react';
import Grid from '@mui/joy/Grid';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import useAuth from '../hooks/useAuth';

export default function Alert() {
    const { message, setMessage, alertColor } = useAuth()
    // const [open, setOpen] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    
    React.useEffect(() => {
        setIsOpen(message !== "")
    }, [message]);

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                open={isOpen}
                autoHideDuration={9000}
                onClose={() => setMessage("")}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                color={alertColor}
                variant="soft"
            >
                {message}
            </Snackbar>
        </Box>
    );

}
