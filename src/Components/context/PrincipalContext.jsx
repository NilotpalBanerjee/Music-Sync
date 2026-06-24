
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hook/UseApi";

export const PrincipalContext = createContext();

const PrincipalProvider = (props) => {
    const { createCaller, isLoading } = useApi();
    const callApi = createCaller("principal");
    const navigate = useNavigate();

    return (
        <PrincipalContext.Provider
            value={{
                navigate,
                isLoading,
            }}
        >
            {props.children}
        </PrincipalContext.Provider>
    );
};

export default PrincipalProvider;
export const usePrincipalContext = () => useContext(PrincipalContext);