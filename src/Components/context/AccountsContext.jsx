
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hook/UseApi";

export const AccountsContext = createContext();

const AccountsProvider = (props) => {
    const { createCaller, isLoading } = useApi();
    const callApi = createCaller("accounts");
    const navigate = useNavigate();

    return (
        <AccountsContext.Provider
            value={{
                navigate,
                isLoading,
            }}
        >
            {props.children}
        </AccountsContext.Provider>
    );
};

export default AccountsProvider;
export const useAccountsContext = () => useContext(AccountsContext);