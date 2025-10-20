import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Timechart from "./pages/timechart";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/timechart",
    element: <Timechart />,
  },
]);

export { router };
