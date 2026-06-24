import logo from '../assets/homeicons/logo.png';

const Logo = () => {
  return (
    <div className="flex items-center">
      <img src={logo} alt="" />
      <h3 className="text-3xl font-bold -ms-2">zapShift</h3>
    </div>
  );
};

export default Logo;
