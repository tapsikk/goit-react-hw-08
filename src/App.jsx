import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes, } from 'react-router-dom';
import { RestrictedRoute } from './RestrictedRoute';
import { fetchContacts } from './redux/contacts/operations';
// import HomePage from './components/homePage/HomePage';
import { Layout } from './components/Layout';
import { selectIsLoggedIn } from './redux/auth/selectors';

const ContactsPage = lazy(() => import('./pages'));
const MainPage = lazy(() => import('./components/mainPage/mainPage'))
const RegisterPage = lazy(() => import('./pages/homePage/RegisterForm'));
const LoginPage = lazy(() => import('./pages/homePage/loginPage/LoginForm'));

// const TasksPage = lazy(() => import('../components/TasksPage/TasksPage'));

export const App = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <PrivateRoute path="/home" element={<HomePage />} /> */}
        <Route
          path="/home"
          element={
           isLoggedIn ? <HomePage/> : <Navigate to={'/'} />
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/home" component={<RegisterPage />} />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/home" component={<LoginPage />} />
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
