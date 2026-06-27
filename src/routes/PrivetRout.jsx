import { Navigate, useLocation } from 'react-router';
import LoadingPage from '../components/sheard/LoadingPage';
import useAuth from '../hooks/useAuth';

const PrivetRout = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log('location', location);
  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  if (!user) {
    return <Navigate state={location.pathname} to={'/login'}></Navigate>;
  }

  return children;
};

export default PrivetRout;
