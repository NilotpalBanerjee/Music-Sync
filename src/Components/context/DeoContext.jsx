
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hook/UseApi";

export const DeoContext = createContext();

const DeoProvider = (props) => {
    const { createCaller, isLoading } = useApi();
    const callApi = createCaller("deo");
    const navigate = useNavigate();

    return (
        <DeoContext.Provider
            value={{
                navigate,
                isLoading,
            }}
        >
            {props.children}
        </DeoContext.Provider>
    );
};

export default DeoProvider;
export const useDeoContext = () => useContext(DeoContext);