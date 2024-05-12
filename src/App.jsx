import React, { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "./RestrictedRoute";
import { refreshUser } from "./redux/auth/operations";
import { Layout } from "./components/Layout";
import { selectIsLoggedIn, selectIsRefreshing } from "./redux/auth/selectors";
import PrivateRoute from "./components/PrivateRoute";

const ContactsPage = lazy(() => import("./pages/ContactsPage/ContactsPage"));
const MainPage = lazy(() => import("./pages/mainPage/mainPage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationForm")
);
const LoginPage = lazy(() => import("./pages/loginPage/LoginForm"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>Loading...</div>
  ) : (
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegistrationPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />

        </Routes>
      </Layout>
  );
};

export default App;
