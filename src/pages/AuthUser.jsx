
import axios from 'axios';

const Auth = () => {
    const http = axios.create({
        baseURL: "http://localhost:8080/api",
        headers: {
            "Content-Type": "application/json"
        }
    });
    return {
        http,
    };
};

export default Auth
