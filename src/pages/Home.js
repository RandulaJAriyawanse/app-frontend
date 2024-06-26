import React from "react";
import useAuth from "../hooks/useAuth";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";

const Home = () => {
    const { isAuthenticated } = useAuth();
    // console.log(`isAuthenticated Home: ${isAuthenticated}`)
    // style={{ height: 'calc(100vh - 60px)' }}
    return (
    <div className="flex flex-col flex-grow"> 
        {isAuthenticated ? <Dashboard /> : <LandingPage />}
    </div> 
    )
}

export default Home;