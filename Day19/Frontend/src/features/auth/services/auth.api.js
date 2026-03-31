import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:3000/api/auth",
    withCredentials: true,
    method : ["post", "get", "patch", "delete"]
});

export const login = async (email, password) => {
    try{
        const resp = await api.post("login", {email, password});
        return resp;
    }
    catch(err){
        throw err.response?.data || err;
    }
}

export const register = async (username, email, password, bio) =>{
    try{
        const resp = await api.post("/register", {username, email, password, bio});

        return resp;
    }
    catch(err){
        throw err.response?.data || err;
    }
}