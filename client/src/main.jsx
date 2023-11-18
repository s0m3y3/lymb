import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navtab.jsx";
import Interval from "./pages/Interval.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <App />
      </div>
    ),
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/interval",
        element: <Interval />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
