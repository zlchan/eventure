import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
import Settings from "./Pages/Settings/Settings"

import { AuthProvider, useAuth } from "./contexts/AuthContext"; 

// Create a wrapper component to handle protected routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Navigate to="/home" replace />
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),     
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "/home", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/events", element: <Event /> },
      { path: "/favorites", element: <Favourites /> },
      { path: "/about", element: <About /> },
      { path: "/help", element: <Help /> },
      { path: "/account", element: <Account /> },
      { path: "/settings", element: <Settings /> },
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
