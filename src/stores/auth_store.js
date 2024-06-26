// authStore.js
import  { createStore }  from 'zustand/vanilla';
import axios from 'axios';
import { log, error } from '../logger/logger';

axios.defaults.withCredentials = true;
const apiUrl = process.env.REACT_APP_API_URL;

const authStore = createStore((set, get) => ({
    access: localStorage.getItem('access'),
    isAuthenticated: Boolean(localStorage.getItem('access')),
    user: null,
    // user: JSON.parse(localStorage.getItem('user')) || null,
    message: "",
    isLoading: false,
    pdfBase64: null,
    currentMail: {},
    replyOpen: false,
    selectedMenuItem: localStorage.getItem('selectedMenuItem'),
    demoEmails: true,
    customDemoEmails: [],
    currentPDFPage: 1,
    alertColor: "neutral",

    setAlertColor: (alertColor) => {
        set({ alertColor: alertColor });
    },

    setCurrentPDFPage: (currentPDFPage) => {
        set({ currentPDFPage: currentPDFPage });
    },

    setCustomDemoEmails: (customDemoEmails) => {
        set({ customDemoEmails: customDemoEmails });
    },

    setDemoEmails: (demoEmails) => {
        set({ demoEmails: demoEmails });
    },

    setSelectedMenuItem: (selectedMenuItem) => {
        set({ selectedMenuItem: selectedMenuItem });
    },

    setReplyOpen: (replyOpen) => {
        set({ replyOpen: replyOpen });
    },

    setLoading: (loading) => {
        set({ isLoading : loading });
    },

    setMessage: (message) => {
        set({ message: message });
    },

    setPdfBase64: (pdfBase64) => {
        set({ pdfBase64: pdfBase64 });
    },

    setCurrentMail: (currentMail) => {
        set({ currentMail: currentMail });
    },

    testEmail: async () => {
        const access = localStorage.getItem('access');
        console.log(`testEmail Access: ${access}`)
        if (access) {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access}`
                }
            };
            try {
                const res = await axios.get(`${apiUrl}/mail/mails/`, config);
                console.log(`testEmail Data: ${JSON.stringify(res.data)}`)
                localStorage.setItem('mails', JSON.stringify(res.data))
            } catch (err) {
                // localStorage.removeItem('user');
                set({
                    alertColor: "warning",
                    message: `Failed to run testEmail: ${JSON.stringify(err.response.data)}`,
                })
                error(`testEmail failed: ${err}`)
            }
        }
    },


    verify: async () => {
        log("Verify function called")
        const access = localStorage.getItem('access');
        if (access) {
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            const body = JSON.stringify({ token: access });

            try {
                await axios.post(`${apiUrl}/dj-rest-auth/token/verify/`, body, config);
                set({ isAuthenticated: true });
                log("Verify success")
            } catch (err) {
                log("Verify error: ", err.response.data)
                await get().refresh(); 
            }
        } else {
            set({ isAuthenticated: false });
        }
    },

    getUser: async () => {
        const access = localStorage.getItem('access');
        if (access) {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access}`
                }
            };
            try {
                const res = await axios.get(`${apiUrl}/dj-rest-auth/user/`, config);
                set({ user: res.data });
            } catch (err) {
                set({ user: null });
            }
        }
    },

    refresh: async () => {
        log("Refresh function called")
        const config = {
            headers: { "Content-Type": "application/json" }
        };
        try {
            const res = await axios.post(`${apiUrl}/dj-rest-auth/token/refresh/`, config);
            localStorage.setItem('access', res.data.access);
            set({ isAuthenticated: true, access: res.data.access });
            log("Refresh success")
        } catch (err) {
            log("Refresh error: ", err.response.data)
            localStorage.removeItem('access');
            set({ isAuthenticated: false, access: null, user: null });
        }
    },

    logout: async () => {
        get().setLoading(true);
        const config = {
            headers: { "Content-Type": "application/json" }
        };
        try {
            localStorage.removeItem('access');
            set({ isAuthenticated: false, access: null, user: null });
            await axios.post(`${apiUrl}/dj-rest-auth/logout/`, config);
        } catch (err) {
            localStorage.removeItem('access');
            set({ isAuthenticated: false, access: null, user: null });
        } finally {
            get().setLoading(false);
        }
    },

    login: async ( email, password ) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const body = JSON.stringify({ email, password })
        try {
            const res = await axios.post(`${apiUrl}/dj-rest-auth/login/`, body, config)
            localStorage.setItem('access', res.data.access);
            set({
                isAuthenticated: true,
                access: res.data.access,
                user: res.data.user,
            });
        } catch (err) {
            localStorage.removeItem('access');
            set({
                isAuthenticated: false,
                access: null,
                user: null,
                alertColor: "warning",
                message: `${JSON.stringify(err.response.data)}`,
            });
        }
    }, 

    signUp: async ( email, password1, password2 ) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const body = JSON.stringify({ email, password1, password2 });
        try {
            await axios.post(`${apiUrl}/dj-rest-auth/registration/`, body, config);
            set({
                alertColor: "success",
                message: "Verification link has sent to your email",
            });

        } catch (err) {
            log("log signup: ", err.response.data)
            set({
                alertColor: "warning",
                message: `${JSON.stringify(err.response.data)}`,
            });
            throw err;
        };
    }, 

    emailVerification: async ( key ) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const body = JSON.stringify({ key });
        try {
            const res = await axios.post(`${apiUrl}/dj-rest-auth/registration/verify-email/`, body, config);
            set({
                alertColor: "success",
                message: "Your account has been verified. Login to continue"
            });
        } catch (err) {
            set({
                alertColor: "warning",
                message: `Email verification failed: ${JSON.stringify(err.response.data)}`,
            });
        };
    },


    googleLogin: async (code) => {
        get().setLoading(true);

        if (!localStorage.getItem('access')) {
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            const body = JSON.stringify({ code });
            log("Google Login Body: ", body)
            try {
                get().setLoading(true);
                const res = await axios.post(`${apiUrl}/dj-rest-auth/google/`, body, config);
    
                localStorage.setItem('access', res.data.access);
                set({
                    isAuthenticated: true,
                    access: res.data.access,
                    user: res.data.user,
                    message: ""
                });
                log("Google login success")
    
            } catch (err) {
                localStorage.removeItem('access');
                set({
                    isAuthenticated: false,
                    access: null,
                    user: null,
                    alertColor: "warning",
                    message: `${JSON.stringify(err.response.data, null, 2)}`
                });
                error(`Google login failed: ${JSON.stringify(err.response.data, null, 2)}`)

            } finally {
                // get().setLoading(false);
            }
        } else {
            try {
                await Promise.all([get().verify(), get().getUser()]);
            } finally {
                // get().setLoading(false);
            }
        }
    },
}));

export default authStore;
