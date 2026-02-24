import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const SellerProtectedRoute = ({ children }) => {
    const { isSeller, isSellerLoading } = useAppContext();

    if (isSellerLoading) return <div>Loading...</div>;

    if (!isSeller) return <Navigate to="/seller" />;

    return children;
};

export default SellerProtectedRoute;
