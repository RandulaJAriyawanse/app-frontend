import React from 'react';
import Chat from '../components_custom/chat';
import PdfViewerTwo from '../components_custom/pdf_viewer2';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import { ThemeProvider } from "../providers/shadcn_theme_provider"


const Dashboard = () => {
    return (
        <ThemeProvider storageKey="vite-ui-theme">
            <CssVarsProvider>
                <CssBaseline />
            <div className="flex flex-1">
                <div className="flex flex-1 items-center border-r-2 h-full w-full">
                        <PdfViewerTwo/>
                </div>
                <div className="flex flex-1 justify-center items-center h-full">
                    <Chat/>
                </div>
            </div>
            </CssVarsProvider>
        </ThemeProvider>
    );
}

export default Dashboard;
