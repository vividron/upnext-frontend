import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx"
import SpotifyLoader from "./components/SpotifyLoader.jsx";
import AppLayout from "./components/layout/AppLayout.jsx";
import RoomPage from "./pages/RoomPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

function App() {

  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='h-screen w-screen'>
        <SpotifyLoader />
      </div>
    )
  }

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "/auth/callback", element: <AuthCallbackPage /> },
      ],
    },

    /* Protected routes */
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/room/:roomId",
          element: <RoomPage />,
        },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    }
  ]);

  return <RouterProvider router={routes} />
}

export default App
