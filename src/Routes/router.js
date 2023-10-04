import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home/home";
import RomainEasy from "../pages/Jeux1/romainEasy";
import App from "../App";
import Flo from "../pages/Jeux2/flo";
import { userLoader } from "../loaders/userLoader";
import { Signin } from "../pages/SignIn/SignIn";
import { Signup } from "../pages/SignUp/SignUp";
import { Classement } from "../pages/Classement/Classement";
import { ProtectedRoute } from "../components/ProtectedRoute.js/ProtectedRoute";
import { Jeux } from "../pages/Jeux/Jeux";
import { Profil } from "../pages/Profil/Profil";
import ForgotPassword from "../pages/ForgotPassword";
import MentionCgu from "../pages/MentionCgu/MentionCgu";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userLoader,
    children: [
      {
        path: "/SignIn",
        element: <Signin />,
      },
      {
        path: "/SignUp",
        element: <Signup />,
      },
      {
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        path: "/",
      },
      {
        path: "/RomainEasy",
        element: <RomainEasy />,
      },
      {
        path: "/FLo",
        element: <Flo />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "/Classement",
        element: <Classement />,
      },
      {
        path: "/Jeux",
        element: <Jeux />,
      },
      {
        path: "/MentionCgu",
        element: <MentionCgu />,
      },
      {
        path: "/Profil",
        element: (
          <ProtectedRoute>
            <Profil />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
