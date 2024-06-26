import React from "react";
import useAuth from '../hooks/useAuth';
import Button from '@mui/joy/Button';
import { Typography } from "@mui/joy";
import Stack from '@mui/joy/Stack';
import { useNavigate, Navigate, useParams } from "react-router-dom";


const EmailVerification = () => {

    const { isAuthenticated, emailVerification } = useAuth();
    const { key } = useParams();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to={"../"}></Navigate>
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4" style={{ height: 'calc(100vh - 60px)' }}>
            <Typography level="title-sm">Verify Email</Typography>

            <form
            onSubmit={(event) => {
                event.preventDefault();
                try {
                emailVerification(key)
                navigate('/login')
                } catch (err) {
                    console.log(`catch failed: ${err}`)
                    navigate('/login')
                }
            }}
            >
            <Stack spacing={1}>
                <Button type="submit">Activate</Button>
            </Stack>
            </form>

        </div>
    )
}

export default EmailVerification