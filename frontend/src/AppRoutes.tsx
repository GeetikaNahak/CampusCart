// import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Layouts from "./layouts/layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
// import DetailsSection from './forms/manage-store-form/DetailsSection.tsx'
import ManageStorePage from "./pages/ManageStorePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import DetailPage from "./pages/DetailPage.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layouts showHero={true}>
            <HomePage />
          </Layouts>
        }
      />
      <Route
        path="/detail/:storeId"
        element={
          <Layouts showHero={false}>
            <DetailPage />
          </Layouts>
        }
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layouts>
              {" "}
              <UserProfilePage />{" "}
            </Layouts>
          }
        />
      </Route>
      <Route
        path="/manage-store"
        element={
          <Layouts>
            <ManageStorePage />
          </Layouts>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route
        path="/search/:storeName"
        element={
          <Layouts showHero={false}>
            <SearchPage />
          </Layouts>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
