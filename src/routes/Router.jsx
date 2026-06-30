import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/home/Home';
import Coverage from '../pages/coverage/Coverage';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import LoadingPage from '../components/sheard/LoadingPage';
import PrivetRout from './PrivetRout';
import Rider from '../pages/rider/Rider';
import SendPercel from '../pages/sendParcel/SendPercel';
import DashboardLayout from '../layouts/DashboardLayout';
import Myparcels from '../pages/dashboard/myparcels/Myparcels';
import Payment from '../pages/dashboard/payment/Payment';
import PaymentSuccess from '../pages/dashboard/payment/PaymentSuccess';
import PaymentCanceld from '../pages/dashboard/payment/PaymentCanceld';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    hydrateFallbackElement: <LoadingPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/sendPercel',
        loader: () => fetch('/warehouses.json').then(res => res.json()),
        element: (
          <PrivetRout>
            <SendPercel></SendPercel>
          </PrivetRout>
        ),
      },
      {
        path: '/rider',
        element: (
          <PrivetRout>
            <Rider></Rider>
          </PrivetRout>
        ),
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

  {
    path: '/dashboard',
    element: (
      <PrivetRout>
        <DashboardLayout></DashboardLayout>
      </PrivetRout>
    ),
    children: [
      {
        path: 'my-parcels',
        Component: Myparcels,
      },
      {
        path: 'payment/:parcelId',
        Component: Payment,
      },

      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCanceld,
      },
    ],
  },
]);
