import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { RestrictedRoute } from './RestrictedRoute';
import { refreshUser } from './redux/auth/operations';
import { Layout } from './components/Layout';
import { selectIsLoggedIn, selectIsRefreshing } from './redux/auth/selectors';

const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const MainPage = lazy(() => import('./pages/mainPage/mainPage'));
const RegisterPage = lazy(() => import('./pages/RegistrationPage/RegistrationForm'));
const LoginPage = lazy(() => import('./pages/loginPage/LoginForm'));

export const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    const persistedToken = localStorage.getItem('token');
    if (persistedToken) {
      dispatch(refreshUser());
    }
  }, [dispatch]);

  return (
    <div>
      {isRefreshing ? (
        <div>Loading...</div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Layout isLoggedIn={isLoggedIn}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/home" element={isLoggedIn ? <ContactsPage /> : <Navigate to="/" />} />
              <Route path="/register" element={<RestrictedRoute redirectTo="/home" component={<RegisterPage />} />} />
              <Route path="/login" element={<RestrictedRoute redirectTo="/home" component={<LoginPage />} />} />
              <Route path="*" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            </Routes>
          </Layout>
        </Suspense>
      )}
    </div>
  );
};

export default App;