import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const SellerProtectedRoute = ({ children }) => {
    const { isSeller, isSellerLoading } = useAppContext();

    if (isSellerLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return isSeller ? children : <Navigate to="/" />;
};

export default SellerProtectedRoute;