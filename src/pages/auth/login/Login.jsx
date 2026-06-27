import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, useLocation, useNavigate } from 'react-router';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  console.log('in the login page', location);

  const { signInUser, googleSignIn } = useAuth();

  const handleLogin = data => {
    console.log('Attempting login with:', data.email);

    signInUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log('Authenticated user metadata:', user);

        // 1. Clear form fields on successful authentication
        reset();

        // 2. User Feedback: Show a clean success confirmation
        Swal.fire({
          title: 'Welcome Back!',
          text: 'Login successful processing your dashboard access.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(location.state || '/');

        // 3. Routing Control: Redirect the user to their target path instantly
      })
      .catch(err => {
        console.error('Firebase auth runtime error:', err.code);

        // 4. Error Mapping: Translate confusing Firebase server strings into human-friendly text
        let errorMessage =
          'Invalid email or password. Please verify your credentials.';

        if (err.code === 'auth/invalid-credential') {
          errorMessage = 'The email or password you entered is incorrect.';
        } else if (err.code === 'auth/user-not-found') {
          errorMessage = 'No account exists with this email address.';
        } else if (err.code === 'auth/too-many-requests') {
          errorMessage =
            'This account has been temporarily locked due to multiple failed attempts. Reset your password or try again later.';
        }

        // 5. Visual Notification: Display the safe, clear error message to the user
        Swal.fire({
          title: 'Login Failed',
          text: errorMessage,
          icon: 'error',
          confirmButtonColor: '#secondary', // Matches your design color system
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(res => {
        const user = res.user;
        console.log('Google authentication success', user.email);
        navigate(location.state || '/');
      })

      .catch(err => {
        console.error('Google Popup closed or blocked:', err.code);

        // 4. Error Mapping for Social Authentication
        let friendlyMessage =
          'Google sign-in was cancelled or failed. Please try again.';

        if (err.code === 'auth/popup-closed-by-user') {
          friendlyMessage =
            'The login popup window was closed before completing the authentication.';
        } else if (err.code === 'auth/popup-blocked') {
          friendlyMessage =
            'Your browser blocked the authentication popup. Please enable popups for this site.';
        } else if (
          err.code === 'auth/account-exists-with-different-credential'
        ) {
          friendlyMessage =
            'An account already exists with this email but using a different login method (e.g., password).';
        }

        Swal.fire({
          title: 'Authentication Error',
          text: friendlyMessage,
          icon: 'warning',
          confirmButtonColor: '#secondary',
        });
      });
  };

  return (
    <div className="max-w-lg">
      {/* DaisyUI Card Component wrapper */}
      <div className="card">
        {/* --- Header Section --- */}
        <div className="text-left mb-6">
          <h1 className="text-3xl md:text-[36px] font-black text-base-content tracking-tight leading-none mb-2">
            Welcome Back
          </h1>
          <p className="text-secondary text-[15px] font-medium">
            Login with DropX
          </p>
        </div>

        {/* --- Form Section using DaisyUI Form Controls --- */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* Email Field */}
          <div className="form-control w-full items-start">
            <label className="label py-1">
              <span className="label-text font-bold text-secondary text-[15px] tracking-tight">
                Email
              </span>
            </label>
            <input
              {...register('email', { required: true })}
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full rounded-xl bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium"
            />
          </div>
          {errors.email?.type === 'required' && (
            <p className="text-rose-500">Email is required</p>
          )}

          {/* Password Field */}
          <div className="form-control w-full items-start">
            <label className="label py-1">
              <span className="label-text font-bold text-secondary text-[15px] tracking-tight">
                Password
              </span>
            </label>
            <input
              {...register('password', {
                required: true,
                minLength: 6,
              })}
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full rounded-xl bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium"
            />
          </div>
          {errors.password?.type === 'required' && (
            <p className="text-rose-500">Password is required</p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-rose-500">
              Password must be 6 character or longer
            </p>
          )}

          <span className=" underline cursor-pointer">Forget Password</span>

          {/* DaisyUI Button with your custom Primary color background override */}
          <button
            type="submit"
            className="btn w-full bg-primary text-secondary border-none font-bold text-base rounded-xl hover:bg-primary/90 mt-4 h-auto min-h-12"
          >
            login
          </button>
        </form>

        {/* --- Footer & Authentication Options --- */}
        <div className="mt-5 text-center space-y-4">
          <p className="text-neutral-content/70 text-[15px] font-medium">
            Don't have an account?{' '}
            <Link
              to={'/register'}
              state={location.state}
              className="text-[#A3C639] hover:underline font-semibold"
            >
              Register
            </Link>
          </p>

          {/* DaisyUI Divider utility class */}
          <div className="divider text-gray-400 text-[14px] font-medium my-2">
            Or
          </div>

          {/* Google Button styled dynamically with standard DaisyUI button logic */}
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn w-full flex items-center justify-center gap-2 bg-[#EAEFF5] hover:bg-[#dee5ee] text-black border-none font-bold text-[15px] rounded-xl h-auto min-h-12"
          >
            <FcGoogle size={20} />
            Login with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
