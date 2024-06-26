import FlightChat from "../components_custom/flight_chat";
import MdViewer from "../components_custom/md_viewer";
import FlightsDataGrid from "../components_custom/flight_table";
import Paper from '@mui/material/Paper';
// import ChatApp from "../components_custom/daisy_chat/index";
import {
    Card,
    CardBody
  } from "../daisyui/daisyui";
import useAuth from "../hooks/useAuth";

import { useColorScheme as useMaterialColorScheme } from '@mui/material/styles';

import { Navigate } from "react-router-dom";




const FlightChatPage = () => {
    const { isAuthenticated } = useAuth();
    const { mode } = useMaterialColorScheme();

    console.log("user", isAuthenticated)

    // if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <div data-theme={mode} className="flex flex-1 custom-bg" style={{ maxHeight: 'calc(100vh - 50px)'}} >
            <Card className="flex flex-1 items-center my-7 ml-7 font-body bg-base-100 custom-border-color" style={{ maxWidth: '30%' }}>
                <FlightChat />
            </Card>
            <div className="flex flex-1 flex-col flex-grow" style={{ width: '50%' }}>
                <Card className="flex flex-1 flex-col m-7 font-body bg-base-100 custom-border-color" style={{ maxHeight: 'calc(45% - 75px)' }}>
                    <MdViewer/>
                </Card>
                <Card className="flex flex-1 mx-7 font-body bg-base-100 custom-border-color" style={{ maxHeight: 'calc(55% - 9px)' }}>
                    <FlightsDataGrid/>
                </Card>
            </div>
        </div>
    );
}

export default FlightChatPage;
