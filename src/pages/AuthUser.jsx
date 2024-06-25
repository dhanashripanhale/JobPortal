
import axios from 'axios';

const Auth = () => {
    const http = axios.create({
        baseURL: "http://localhost:8080/api",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const https = axios.create({
        baseURL: "http://localhost:8080/api",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });   
    return {
        http,
        https
    };  
   
};

export default Auth

