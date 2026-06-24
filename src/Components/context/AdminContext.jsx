
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../hook/UseApi";

export const AdminContext = createContext();

const AdminProvider = (props) => {
    const { createCaller, isLoading } = useApi();
    const callApi = createCaller("admin");
    const navigate = useNavigate();

    return (
        <AdminContext.Provider
            value={{
                navigate,
                isLoading,
            }}
        >
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminProvider;
export const useAdminContext = () => useContext(AdminContext);