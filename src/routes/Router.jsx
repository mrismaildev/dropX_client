import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/home/Home';
import Coverage from '../pages/coverage/Coverage';
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
]);
