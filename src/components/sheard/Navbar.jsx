import { Link, NavLink } from 'react-router';
import Logo from '../Logo';
import useAuth from '../../hooks/useAuth';
import { FiArrowUpRight, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import LoadingPage from './LoadingPage';

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/coverage'}>Coverage</NavLink>
      </li>

      <li>
        <NavLink to={'/rider'}>Be a Rider</NavLink>
      </li>
    </>
  );
  const { user, loading, logOut } = useAuth();

  const handleLogoutClick = () => {
    logOut()
      .then(() => console.log('Successfully logged out'))
      .catch(err => console.error('Logout failed:', err.message));
  };
  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="container mx-auto px-4 flex items-center">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <Logo></Logo>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center gap-4 font-sans">
            {/* 2. Conditional Authentication rendering tree */}
            {user ? (
              /* --- USER DROPDOWN MENU (If Authenticated) --- */
              <div className="dropdown dropdown-end z-50">
                {/* Dropdown Toggle Trigger Button */}
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar online border border-base-200 shadow-xs focus:ring-2 focus:ring-primary/40"
                >
                  <div className="w-10 h-10 rounded-full">
                    <img
                      src={user.photoURL || 'https://placehold.co/100'}
                      alt="User Profile"
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Dropdown Menu Container List */}
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow-md bg-base-100 rounded-2xl w-56 border border-base-200 text-secondary"
                >
                  {/* User Meta header indicator */}
                  <li className="menu-title px-4 py-2 border-b border-base-200">
                    <span className="font-extrabold block truncate text-secondary max-w-full">
                      {user.displayName || 'User Profile'}
                    </span>
                    <span className="text-[12px] text-gray-400 font-normal block truncate max-w-full">
                      {user.email}
                    </span>
                  </li>

                  <li className="mt-2">
                    <Link
                      to="/dashboard"
                      className="py-2.5 font-semibold gap-3 rounded-lg hover:bg-base-200"
                    >
                      <FiUser size={16} /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="py-2.5 font-semibold gap-3 rounded-lg hover:bg-base-200"
                    >
                      <FiSettings size={16} /> Account Settings
                    </Link>
                  </li>
                  <li className="border-t border-base-100 mt-2 pt-2">
                    <button
                      onClick={handleLogoutClick}
                      className="py-2.5 font-bold text-rose-500 gap-3 rounded-lg hover:bg-rose-50"
                    >
                      <FiLogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              /* --- VISUAL LOGIN/RIDER ACTION BUTTONS (If Unauthenticated) --- */
              <>
                {/* Sign In Outline Button Layout */}
                <Link
                  to="/login"
                  className="btn btn-outline border-gray-200 hover:bg-gray-50 hover:text-secondary text-gray-500 font-bold text-[15px] px-6 h-11 min-h-11 rounded-xl transition-all duration-300"
                >
                  Sign In
                </Link>
              </>
            )}

            {/* 3. Global Static CTA Component: "Be a rider" Button (Stays visible or hidden depending on design requirements) */}
            <Link
              to="/register-rider"
              className="flex items-center group cursor-pointer relative pr-5"
            >
              {/* Left Side Primary Capsule Layout */}
              <Link
                to={'/rider'}
                className="bg-primary text-secondary font-bold text-[15px] px-6 h-11 min-h-11 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:bg-primary/95 shadow-xs"
              >
                Be a rider
              </Link>

              {/* Right Side Overlapping Circle Arrow Indicator */}
              {/* Uses negative margin (-ml-2.5) to lock perfectly to the right side edge like your image */}
              <Link
                to={'rider'}
                className="w-11 h-11 rounded-full bg-[#1e2321] text-primary flex items-center justify-center shadow-md border-[3px] border-white -ml-2.5 transform group-hover:scale-105 transition-all duration-300 shrink-0"
              >
                <FiArrowUpRight size={18} strokeWidth={2.5} />
              </Link>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
