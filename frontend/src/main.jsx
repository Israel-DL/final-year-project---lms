import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./screens/LoginPage";
import "./index.css";
import NotFoundPage from "./screens/NotFoundPage";
import CreateAccountPage from "./screens/CreateAccount";
import UserContextProvider from "../context/userContext";
import HomePageLayout from "./screens/HomePageLayout";
import HomePageDashboard from "./screens/HomePageDashboard";
import SkillsSelectionPage from "./screens/SkillsSelectionPage";
import HomePageSearch from "./screens/HomePageSearch";
import CoursePage from "./screens/CoursePage";
import ProfilePage from "./screens/Profile";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/skills" Component={SkillsSelectionPage} />
          <Route index path="/" Component={LoginPage} />
          <Route path="/register" Component={CreateAccountPage} />
          <Route Component={HomePageLayout}>
            <Route index path="/app" Component={HomePageDashboard} />
            <Route path="/search" Component={HomePageSearch} />
            <Route path="/courses/:id" Component={CoursePage} />
            <Route path="/profile" Component={ProfilePage} />
          </Route>
          <Route path="/*" Component={NotFoundPage} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
);
