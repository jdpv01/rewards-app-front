import { createContext, useEffect, useState } from "react";
import {
    data as dataX,
    auth as authX,
    setData as setDataX,
    setAuth as setAuthX
} from '../components/others/storageManager';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => { //usuario contrase;a token
    const [auth, setAuth] = useState(JSON.parse(authX??"{}"));
    const [data, setData] = useState(JSON.parse(dataX??"{}"));

    useEffect(() => {
        setAuthX(auth);
    }, [auth]);

    useEffect(() => {
        setDataX(data);
    }, [data]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, data, setData }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;