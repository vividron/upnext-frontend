import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import SpotifyLoader from "./SpotifyLoader.jsx";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <SpotifyLoader />
  }

  return (
    isAuthenticated ? <Outlet /> : <Navigate to='/auth/callback' replace />
  )
}

export default ProtectedRoute