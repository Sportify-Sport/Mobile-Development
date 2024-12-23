import { useState } from "react";
import "./App.css";
import Profile from "./Components/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Profile />,
        }
      ],
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    // },
    // {
    //   path: "/register",
    //   element: <Register />,
    // },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
