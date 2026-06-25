import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = data => {
    console.log(data);
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

        {/* --- Profile Image Upload Placeholder using DaisyUI Avatar --- */}
        <div className="text-left mb-6">
          <div className="avatar placeholder relative group cursor-pointer">
            <div className="w-16 h-16 rounded-full bg-base-200 text-neutral-content hover:bg-base-300 transition-colors">
              <span className="text-2xl">👤</span>
            </div>
            {/* Custom overlay badge matching your primary theme color placement */}
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[10px] text-secondary font-bold shadow-xs">
              ↑
            </span>
          </div>
        </div>

        {/* --- Form Section using DaisyUI Form Controls --- */}
        <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
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
            <a
              href="/login"
              className="text-[#A3C639] hover:underline font-semibold"
            >
              Login
            </a>
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
