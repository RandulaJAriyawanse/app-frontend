import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Button from '@mui/joy/Button';
import GoogleIcon from "../components_custom/GoogleIcon";
import { Typography } from "@mui/joy";
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Link from '@mui/joy/Link';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';



const callBackURI = process.env.REACT_APP_GOOGLE_CALLBACK_URI;
const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const Login = () => {

    const { isAuthenticated, login, setLoading } = useAuth();
    const navigate = useNavigate();
    console.log(`callBackURI: ${callBackURI}`)

    const reachGoogle = () => {
        setLoading(true);
        window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${callBackURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=openid%20email%20profile%20https://www.googleapis.com/auth/gmail.readonly&access_type=offline`)
    }
    if (isAuthenticated) {
        return <Navigate to={"../"}></Navigate>
    }
    return (
        <CssVarsProvider>
            <CssBaseline />
        <div className="flex flex-col items-center justify-center h-screen space-y-4" style={{ height: 'calc(100vh - 60px)' }}>
            <Typography level="title-sm">Login</Typography>

            <form
            onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData).entries());
                login(formJson.email, formJson.password);
            }}
            style={{ width: '300px' }}
            >
            <Stack spacing={2}>
                <Input name="email" placeholder="Email" required/>
                <Input name="password" type="password" placeholder="Password" required/>
                <Button type="submit">Submit</Button>
                <Button
                    variant="soft"
                    color="neutral"
                    startDecorator={<GoogleIcon />}
                    onClick={ reachGoogle }
                    style={{ marginTop: '30px'}}
                >
                    Continue with Google
                </Button>
                <div className="flex justify-center items-center">
                <Link
                    color="neutral"
                    level="body-sm"
                    underline="hover"
                    variant="plain"
                    onClick={() => navigate('/signup')}
                >
                   Click Here to&nbsp;<span style={{ fontWeight: 'bold' }}>Sign Up</span>
                </Link>
                </div>
            </Stack>
            </form>

        </div>
        </CssVarsProvider>
    )
}

export default Login