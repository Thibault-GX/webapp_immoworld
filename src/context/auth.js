import { createContext, useContext} from 'react';
export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
    //return useContext(false);
}
