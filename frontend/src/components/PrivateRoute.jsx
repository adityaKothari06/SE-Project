import { Navigate } from "react-router";
import { useAuth } from "../context/useAuth";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // If user is not logged in, redirect to login
  if (!currentUser) return <Navigate to="/Login" />;

  // Otherwise render the child component
  return children;
};

export default PrivateRoute;