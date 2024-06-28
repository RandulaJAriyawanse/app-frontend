import React, { useState } from "react";
import FlightChat from "../components_custom/flight_chat";
import MdViewer from "../components_custom/md_viewer";
import FlightsDataGrid from "../components_custom/flight_table";
import Paper from "@mui/material/Paper";
// import ChatApp from "../components_custom/daisy_chat/index";
import { Card, CardBody } from "../daisyui/daisyui";
import useAuth from "../hooks/useAuth";
import messagesquareIcon from "@iconify/icons-lucide/message-square";
import Icon from "../daisyui/components/Icon";

import { useColorScheme as useMaterialColorScheme } from "@mui/material/styles";

import { Navigate } from "react-router-dom";

const FlightChatPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showElement = () => {
    setIsVisible(true);
  };

  // Function to hide the element
  const hideElement = () => {
    setIsVisible(false);
  };
  const { isAuthenticated } = useAuth();
  const { mode } = useMaterialColorScheme();

  console.log("user", isAuthenticated);

  // if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    // <div data-theme={mode} className="flex flex-1 custom-bg" style={{ maxHeight: 'calc(100vh - 50px)'}} >
    //     <Card className="flex flex-1 items-center my-7 ml-7 font-body bg-base-100 custom-border-color" style={{ maxWidth: '30%' }}>
    //         <FlightChat />
    //     </Card>
    //     <div className="flex flex-1 flex-col flex-grow" style={{ width: '50%' }}>
    //         <Card className="flex flex-1 flex-col m-7 font-body bg-base-100 custom-border-color" style={{ maxHeight: 'calc(45% - 75px)' }}>
    //             <MdViewer/>
    //         </Card>
    //         <Card className="flex flex-1 mx-7 font-body bg-base-100 custom-border-color" style={{ maxHeight: 'calc(55% - 9px)' }}>
    //             <FlightsDataGrid/>
    //         </Card>
    //     </div>
    // </div>
    <div className="relative">
      <div
        data-theme={mode}
        className="flex flex-1 custom-bg"
        style={{ maxHeight: "calc(100vh - 50px)" }}
      >
        <Card
          className="border-0 rounded-lg flex flex-1 items-center my-7 ml-7 font-body bg-base-100"
          style={{ maxWidth: "42%" }}
        >
          <MdViewer />
        </Card>
        <div
          className="flex flex-1 flex-col flex-grow"
          style={{ width: "58%" }}
        >
          <Card
            className="border-0 rounded-lg flex flex-1 flex-col mx-7 mt-7 font-body bg-base-100"
            style={{ maxHeight: "calc(50% - 43px)" }}
          >
            <FlightsDataGrid />
          </Card>
        </div>
      </div>
      <button
        className="fixed bottom-6 right-6 btn btn-circle btn-primary btn-lg shadow-lg close-chat"
        onClick={showElement}
      >
        <Icon icon={messagesquareIcon} fontSize={24} className="text-white" />
      </button>
      <div
        style={{ display: isVisible ? "block" : "none" }}
        className="fixed z-10 right-6 bottom-6 bg-base-100 shadow-xl rounded-2xl overflow-hidden"
      >
        <button
          className="chat-close absolute right-4 top-2 w-8 h-8"
          onClick={hideElement}
        ></button>
        <div className="chat-outer">
          <FlightChat />
        </div>
      </div>
    </div>
  );
};

export default FlightChatPage;
