
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeEncrypted } from "../../utils/AuthToken";
import useApi from "../../hook/UseApi";

export const AuthContext = createContext();

const AuthProvider = (props) => {
    const { createCaller, isLoading } = useApi();
    const principalCaller = createCaller("principal");
    const deoCaller = createCaller("deo");
    const accountsCaller = createCaller("accounts");
    const adminCaller = createCaller("admin");

    const navigate = useNavigate();

    const principalLogout = () => {
        sessionStorage.clear();
        navigate("/principal", { replace: true });
    };

    const deoLogout = () => {
        sessionStorage.clear();
        navigate("/deo", { replace: true });
    };

    const accountsLogout = () => {
        sessionStorage.clear();
        navigate("/accounts", { replace: true });
    };

    const adminLogout = () => {
        sessionStorage.clear();
        navigate("/admin", { replace: true });
    };


    return (
        <AuthContext.Provider
            value={{
                isLoading,
                navigate,
                principalLogout,
                deoLogout,
                accountsLogout,
                adminLogout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuthContext = () => useContext(AuthContext);
