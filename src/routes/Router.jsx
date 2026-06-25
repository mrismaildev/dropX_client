import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/home/Home';
import Coverage from '../pages/coverage/Coverage';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'coverage',
        loader: () => fetch('/warehouses.json').then(res => res.json()),
        element: <Coverage></Coverage>,
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
]);
