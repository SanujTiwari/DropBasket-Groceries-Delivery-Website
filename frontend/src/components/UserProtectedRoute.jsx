import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const UserProtectedRoute = ({ children }) => {
    const { user } = useAppContext();

    if (!user) return <Navigate to="/" />;
    if (user.role === "admin") return <Navigate to="/seller" />;

    return children;
};

export default UserProtectedRoute;