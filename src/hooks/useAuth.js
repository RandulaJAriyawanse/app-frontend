import { useStore } from 'zustand';
import authStore from '../stores/auth_store';  // Ensure the path is correct based on your project structure

const useAuth = () => {
    const state = useStore(authStore);
    return state;
};

export default useAuth;