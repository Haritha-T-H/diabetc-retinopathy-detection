import Login from "./pages/login";
import Register from "./pages/register";
import Header from "./components/navbar";
import Home from "./pages";
import { AuthProvider } from "./context/";
import { useRoutes } from "react-router-dom";
import UploadsPage from "./pages/history";
import ResetPassword from "./pages/resetpassword";
import Display from "./pages/display";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/history",
      element: <UploadsPage />,
    },
    {
      path: "/reset",
      element: <ResetPassword />,
    },
    {
      path: "/display",
      element: <Display />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div>{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
