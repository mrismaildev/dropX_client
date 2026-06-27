import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { updateProfile } from 'firebase/auth';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = useAuth();

  const location = useLocation();
  console.log('in register', location);
  const navigate = useNavigate();

  const handleRegistration = data => {
    console.log(data.photo[0]);

    const profileImg = data.photo[0];
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        //store the image and get the photo url
        const formData = new FormData();
        formData.append('image', profileImg);
        const imageApiUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;

        axios.post(imageApiUrl, formData).then(res => {
          console.log('after image upload', res);
          updateProfile(loggedUser, {
            displayName: data.name,
            photoURL: res.data.data.url,
          })
            .then(() => {
              Swal.fire({
                title: 'Success!',
                text: 'Account created successfully welcome to dropX.',
                icon: 'success',
              });

              navigate(location.state || '/');
            })
            .catch(profileErr => {
              console.error('Profile update issue:', profileErr.message);
            });
        });
      })
      .catch(err => {
        console.error('Authentication server response:', err.message);
        let friendlyMessage = 'Something went wrong. Please try again.';
        if (
          err.code === 'auth/email-already-in-reply' ||
          err.code === 'auth/email-already-in-use'
        ) {
          friendlyMessage =
            'This email is already registered. Try logging in instead.';
        }

        Swal.fire({
          title: 'Registration Failed',
          text: friendlyMessage,
          icon: 'error',
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
            Create an Account
          </h1>
          <p className="text-neutral-content/80 text-[15px] font-medium">
            Register with ZapShift
          </p>
        </div>

        {/* --- Form Section using DaisyUI Form Controls --- */}
        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
          {/* User Image Circle Upload Field */}
          <div className="form-control w-full items-center justify-center my-4">
            <label className="label py-1">
              <span className="label-text font-bold text-secondary text-[15px] tracking-tight">
                Profile Picture
              </span>
            </label>

            {/* Clickable Circle Container */}
            <label className="relative flex flex-col items-center justify-center w-24 h-24 rounded-full bg-base-200 border-2 border-dashed border-gray-300 hover:border-primary text-neutral-content hover:bg-base-300 transition-all cursor-pointer group overflow-hidden">
              {/* Hidden native file input handled by React Hook Form */}
              <input
                {...register('photo', {
                  required: true,
                })}
                type="file"
                accept="image/*"
                className="hidden"
              />

              {/* Inside Circle Content (Icon and Tiny Text) */}
              <div className="flex flex-col items-center justify-center text-center p-2 select-none">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  📷
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                  Upload
                </span>
              </div>

              {/* Smooth dark overlay effect on hover */}
              <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </label>
          </div>

          {/* Validation Error Message */}
          {errors.photo && (
            <p className="text-rose-500 text-sm font-semibold mt-1 text-center w-full">
              Profile photo is required
            </p>
          )}

          {/* Name Field */}
          <div className="form-control w-full items-start">
            <label className="label py-1">
              <span className="label-text font-bold text-secondary text-[15px] tracking-tight">
                Name
              </span>
            </label>

            <input
              {...register('name', {
                required: true,
              })}
              type="text"
              placeholder="Name"
              // DaisyUI Input structure with custom colors
              className="input input-bordered w-full rounded-xl bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium"
            />
          </div>
          {errors.name?.type === 'required' && (
            <p className="text-red-500">Name is required</p>
          )}

          {/* Email Field */}
          <div className="form-control w-full items-start">
            <label className="label py-1">
              <span className="label-text font-bold text-secondary text-[15px] tracking-tight">
                Email
              </span>
            </label>
            <input
              {...register('email', {
                required: true,
              })}
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full rounded-xl bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium"
            />
          </div>
          {errors.email?.type === 'required' && (
            <p className="text-rose-500">Emial is required</p>
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
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                },
              })}
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full rounded-xl bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium"
            />
          </div>
          {errors.password?.type === 'required' && (
            <p className="text-rose-500">password is required</p>
          )}
          {errors.password?.type === 'pattern' && (
            <p className="text-rose-500">
              Password must be at least 8 characters, include uppercase,
              lowercase, number and special character.
            </p>
          )}

          {/* DaisyUI Button with your custom Primary color background override */}
          <button
            type="submit"
            className="btn w-full bg-primary text-secondary border-none font-bold text-base rounded-xl hover:bg-primary/90 mt-4 h-auto min-h-12"
          >
            Register
          </button>
        </form>

        {/* --- Footer & Authentication Options --- */}
        <div className="mt-5 text-center space-y-4">
          <p className="text-neutral-content/70 text-[15px] font-medium">
            Already have an account?{' '}
            <Link
              to={'/login'}
              state={location.state}
              className="text-[#A3C639] hover:underline font-semibold"
            >
              Login
            </Link>
          </p>

          {/* DaisyUI Divider utility class */}
          <div className="divider text-gray-400 text-[14px] font-medium my-2">
            Or
          </div>

          {/* Google Button styled dynamically with standard DaisyUI button logic */}
          <button
            type="button"
            className="btn w-full flex items-center justify-center gap-2 bg-[#EAEFF5] hover:bg-[#dee5ee] text-black border-none font-bold text-[15px] rounded-xl h-auto min-h-12"
          >
            <FcGoogle size={20} />
            Register with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
