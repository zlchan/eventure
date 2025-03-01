import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css"; 
import Home from "./Pages/Home/Home";
import Layout from "./common/Layout/Layout";
import './assets/styles/global.css';
import './common/SideMenuBar/SideMenuBar';

import Login from './Pages/Auth/Login/Login';
import Explore from './Pages/Explore/Explore';
import Event from "./Pages/Events/Events";
import Favourites from "./Pages/Favourites/Favourites";
import About from "./Pages/About/About";
import Help from "./Pages/Help/Help";
import Account from "./Pages/Account/Account";

// ✅ Import AuthProvider
import { AuthProvider } from "./contexts/AuthContext"; 

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/events", element: <Event /> },
      { path: "/favorites", element: <Favourites /> },
      { path: "/about", element: <About /> },
      { path: "/help", element: <Help /> },
      { path: "/account", element: <Account /> },
    ],
  },
]);

function App() {
  return (
    // ✅ Wrap RouterProvider inside AuthProvider
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
