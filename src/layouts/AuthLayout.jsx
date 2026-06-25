'react-router';
import { Outlet } from 'react-router';
import Logo from '../components/Logo';
import authImage from '../assets/homeicons/authImage.png';

const AuthLayout = () => {
  return (
    <div className="bg-white">
      <div className=" container mx-auto px-4">
        <Logo></Logo>
        <div className="flex items-center justify-center">
          <div className=" flex-1">
            <Outlet></Outlet>
          </div>
          <div className="flex-1 bg-[#FAFDF0] min-h-screen">
            <img src={authImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
