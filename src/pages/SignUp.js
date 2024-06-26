import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Button from '@mui/joy/Button';
import { Typography } from "@mui/joy";
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

const SignUp = () => {

    const { isAuthenticated, signUp, setMessage, setAlertColor } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const [ success, setSuccess ] = React.useState(false);

    if (isAuthenticated) {
        return <Navigate to={"../"}></Navigate>
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4" style={{ height: 'calc(100vh - 60px)' }}>
            <Typography level="title-sm">Sign Up</Typography>
            
            {success ? <Typography level="title-sm">Success! Please check your email to verify your account</Typography> :
            <form
            onSubmit={(event) => {
                event.preventDefault();
                setLoading(true);

                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData).entries());
                if (formJson.password !== formJson.password2) {
                    setAlertColor("warning")
                    setMessage('Passwords do not match');
                    setLoading(false);
                    return;
                }
                signUp(formJson.email, formJson.password, formJson.password2)
                .then(() => {
                    setLoading(false)
                    setSuccess(true)
                    })
                .catch((err) => {
                })
                .finally(() => {
                    setLoading(false);
                })

            }}
            >
            <Stack spacing={1}>
                <Input name="email" placeholder="Email" required />
                <Input name="password" type="password" placeholder="Password" required /> 
                <Input name="password2" type="password" placeholder="Password Confirmation" required />
                <Button type="submit" loading={loading}>Submit</Button>
            </Stack>
            </form>
            }
        </div>
    )
}

export default SignUp