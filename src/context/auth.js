import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export function AuthProvider({children}) {
    const tokenTimer = () => {
        const currentTime = new Date().getTime();
        const expiresTime = +localStorage.getItem('expiresTime');

        if (currentTime > expiresTime) {
            return logout();
        }

        setTimeout(() => {
            return logout();
        }, expiresTime - currentTime );
    }

    const isAuth = () => {
        const token = localStorage.getItem('token');
        const expiresTime = localStorage.getItem('expiresTime')
        if (!token || !expiresTime) {
            return false;
        } else {
            tokenTimer();
            return true;
        }
    }
    const [isUserAuth, setIsUserAuth] = useState(isAuth);

    const login = (token, expiresIn) => {
        localStorage.setItem('token', token);
        localStorage.setItem('expiresTime', expiresIn + new Date().getTime());
        setIsUserAuth(true);
        tokenTimer();
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresTime');
        setIsUserAuth(false);
    }


    return (
        <AuthContext.Provider value={{isUserAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    return useContext(AuthContext);
}
