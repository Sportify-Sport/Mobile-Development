import { useState } from "react";
import "./App.css";
import Profile from "./Components/Profile";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root";
import Login from "./Components/LogIn"; // Import Login component
import Register from "./Components/Register";

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
    {
      path: "/login",  
      element: <Login />, 
    },
    {
      path: "/Register",  
      element: <Register />,
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />  {/* Render the router provider */}
    </div>
  );
}

export default App;
