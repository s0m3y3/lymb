import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Browse from "./pages/Browse.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
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
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
