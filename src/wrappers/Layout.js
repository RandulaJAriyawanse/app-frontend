import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import Header from "../components_layout/materialHeader";
import { Modal } from "@mui/joy";
import CircularProgress from '@mui/joy/CircularProgress';
import Alert from "../components_custom/alert";



const Layout = ({ children }) => {
    const navigate = useNavigate();
    let location = useLocation();
    const { verify, getUser, googleLogin, isLoading, setLoading, isAuthenticated } = useAuth();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const code = values.code;

        const handleAuthentication = async () => {
            if (code) {
                if (isAuthenticated) {
                    navigate("/");
                } else {
                    await googleLogin(code);
                }
            } else {
                try {
                    await verify();
                    await getUser();
                } catch (error) {
                    console.error("Error during authentication:", error);
                }
                setLoading(false);
            }
        };

        handleAuthentication()

    }, [location, googleLogin, verify, getUser, isAuthenticated, navigate]);

    return (
        <div style={{ height:'100%'}}>
             <>
             <Alert/>
             <Modal
                open={isLoading}
                sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                <CircularProgress variant="soft" color="neutral" sx={{'&:focus': {outline: 'none'}}}/>
            </Modal>
             <div style={{ height:'100%'}} className="flex flex-col">
                <Header />
                {children}
             </div>
             </>
        </div>
      );
};

export default Layout;