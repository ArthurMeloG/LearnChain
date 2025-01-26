import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005';

const Auth = {
    register : async (email: string, password: string) => {
        return axios.post(`${API_URL}/auth/register`, { email, password });
    },
    login : async (email: string, password: string) => {
        console.log(email, password);
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        return response.data;
    },
    logout : () => {
        localStorage.removeItem('token');
    }
};

export default Auth;
