import { createContext, useState } from "react";
import { login, register } from "./services/auth.api.js";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [user, setuser] = useState("");
    const [isloading, setisloading] = useState(false);

    const handleLogin = async (email, password) => {
        setisloading(true);
        try{
            const resp = await login(email, password);

            setuser(resp.data?.user || resp.data);
        }catch(err){
            alert(err.message);
            console.error(err);
        }finally{
            setisloading(false);
        }   
    }

    const handleRegister = async (username, email, password, bio) => {
        setisloading(true);
        try{
            const resp = await register(username, email, password, bio);            
            setuser(resp.data?.user ||resp.data);
            return resp.data?.user ||resp.data;
        }
        catch(err){
            alert(err.message);
            console.error(err);
        } 
        finally{
            setisloading(false);
        }
    }

    return(
        <AuthContext.Provider value={{ user, isloading, handleLogin, handleRegister }}>
            {props.children}
        </AuthContext.Provider>
    )
}