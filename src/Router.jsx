import React from "react";
import { Route, Routes } from "react-router";
import ActivityDetail from "./Pages/activity/ActivityDetail.jsx";
import ActivityFeed from "./Pages/activity/ActivityFeed.jsx";
import Archive from "./Pages/archive/Archive.jsx";
import { Navigate } from "react-router-dom";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/activities" />} />
      <Route path="/activities" element={<ActivityFeed />}></Route>
      <Route path="/archive" element={<Archive />}></Route>
      <Route path="/activities/:id" element={<ActivityDetail />}></Route>
    </Routes>
  );
};

export default Router;
