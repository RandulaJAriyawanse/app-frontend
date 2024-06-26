import React from "react";
import useAuth from '../hooks/useAuth';
import Button from '@mui/joy/Button';
import { Typography } from "@mui/joy";
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

const EmailTest = () => {

    const { testEmail, setMessage } = useAuth();
    const [loading ] = React.useState(false);

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4" style={{ height: 'calc(100vh - 60px)' }}>
            <Typography level="title-sm">Test Email</Typography>
            <form
            onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData).entries());
                try {
                    const res = testEmail()
                } catch (err) {
                    setMessage(err)
                }

            }}
            >
            <Stack spacing={1}>
                <Input name="email" placeholder="Email" required />
                <Button type="submit" loading={loading}>Submit</Button>
            </Stack>
            </form>

        </div>
    )
}

export default EmailTest