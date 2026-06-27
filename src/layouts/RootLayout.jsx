import { Outlet } from 'react-router';
import Navbar from '../components/sheard/Navbar';

const RootLayout = () => {
  return (
    <div className="">

        <Navbar />
    
      <Outlet></Outlet>
      {/* <Footer /> */}
    </div>
  );
};

export default RootLayout;
