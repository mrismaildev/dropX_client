import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendPercel = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: 'Document',
      parcelName: '',
    },
  });

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const serviceDuplicate = useLoaderData();
  const center = serviceDuplicate.map(c => c.region);
  const allRegion = [...new Set(center)];
  const senderRegion = useWatch({ control, name: 'senderRegion' });
  const receiverRegion = useWatch({ control, name: 'receiverRegion' });

  const districtsByRegion = region => {
    const regionDistrict = serviceDuplicate.filter(c => c.region === region);

    const districts = regionDistrict.map(d => d.district);

    return districts;
  };

  districtsByRegion('Dhaka');

  const onSubmitParcel = data => {
    console.log(data);

    // const isDocument = data.parcelType === 'Document';
    // const isSameDistric = data.senderDsitrict === data.receiverDistrict;
    // const parcelWeight = parseFloat(data.parcelWeight);

    // let cost = 0;

    // if (isDocument) {
    //   cost = isSameDistric ? 60 : 80;
    // } else {
    //   if (parcelWeight < 3) {
    //     cost = isSameDistric ? 110 : 150;
    //   } else {
    //     const minCharge = isSameDistric ? 110 : 150;
    //     const extraWeght = parcelWeight - 3;
    //     const extraCharge = isSameDistric
    //       ? extraWeght * 40
    //       : extraWeght * 40 + 40;
    //     cost = minCharge + extraCharge;
    //   }
    // }

    const isDocument = data.parcelType === 'Document';
    const isSameDistric = data.senderDsitrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistric ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistric ? 110 : 150;
      } else {
        const minCharge = isSameDistric ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistric
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    // --- INDUSTRY STANDARD SWEETALERT2 POPUP TREE ---
    Swal.fire({
      title:
        '<span class="text-xl font-black text-secondary tracking-tight uppercase">Billing Summary</span>',
      html: `
      <div className="font-sans text-left space-y-3 pt-2">
        <p className="text-[15px] font-semibold text-gray-500 flex justify-between">
          <span>Parcel Category:</span>
          <span className="text-secondary font-bold">${isDocument ? '📄 Document' : '📦 Package'}</span>
        </p>
        ${
          !isDocument
            ? `
        <p className="text-[15px] font-semibold text-gray-500 flex justify-between">
          <span>Total Weight:</span>
          <span className="text-secondary font-bold">${parcelWeight} KG</span>
        </p>
        `
            : ''
        }
        <p className="text-[15px] font-semibold text-gray-500 flex justify-between">
          <span>Shipping Area:</span>
          <span className="text-secondary font-bold">${isSameDistric ? '🏙️ Inside District' : '🚛 Inter-District'}</span>
        </p>

        <div className="w-full h-px bg-gray-100 my-4"></div>

        <p className="text-[17px] font-black text-secondary flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span>Total Delivery Fee:</span>
          <span className="text-2xl font-black text-primary-content bg-primary px-3 py-1 rounded-lg">${cost} ৳</span>
        </p>
      </div>
    `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#A3C639', // Your brand's custom neon-green/primary color
      cancelButtonColor: '#1e2321', // Your brand's secondary dark layout scale
      confirmButtonText: 'Confirm Booking',
      cancelButtonText: 'Review Details',
      background: '#ffffff',
      customClass: {
        popup: 'rounded-[24px] p-6 border border-gray-100 shadow-xl',
        confirmButton:
          'btn font-bold text-[15px] px-6 rounded-xl border-none h-11 min-h-11',
        cancelButton:
          'btn font-bold text-[15px] px-6 rounded-xl border-none h-11 min-h-11',
      },
    }).then(result => {
      if (result.isConfirmed) {
        // User accepted the price matrix
        console.log(
          'User confirmed booking. Proceeding with database registration...',
        );
        // TODO: Place your backend API fetch request or state synchronization here!

        axiosSecure.post('/parcels', data).then(res => {
          console.log('after saving parcel', res.data);
        });

        Swal.fire({
          title: 'Booking Confirmed!',
          text: 'Your delivery request is being assigned to a rider.',
          icon: 'success',
          confirmButtonColor: '#A3C639',
          customClass: { popup: 'rounded-[24px]' },
        });
      }
    });
  };

  return (
    <section className="w-full bg-white py-12 md:py-16 font-sans text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Main Section Headers --- */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-[40px] font-black text-secondary tracking-tight leading-none mb-4">
            Send A Parcel
          </h1>
          <h2 className="text-xl md:text-[22px] font-extrabold text-secondary tracking-tight">
            Enter your parcel details
          </h2>
          <div className="w-full h-px bg-gray-100 mt-5"></div>
        </div>

        {/* --- Main Interactive Form Object --- */}
        <form onSubmit={handleSubmit(onSubmitParcel)} className="space-y-8">
          {/* --- Custom Styled Radio Buttons Container --- */}
          <div className="flex items-center gap-8 py-2">
            {/* Brand New Option */}
            <label className="label cursor-pointer gap-4 justify-start p-0 select-none">
              <input
                type="radio"
                {...register('parcelType', { required: true })}
                value="Document"
                className="w-7 h-7 appearance-none rounded-full border-[6px] border-[#E0E0E0] checked:border-[#0AB010] bg-white transition-all duration-200 cursor-pointer focus:outline-none"
              />
              <span>Document</span>
            </label>

            <label className="label cursor-pointer gap-4 justify-start p-0 select-none">
              <input
                type="radio"
                {...register('parcelType', { required: true })}
                value="Not-Document"
                className="w-7 h-7 appearance-none rounded-full border-[6px] border-[#E0E0E0] checked:border-[#0AB010] bg-white transition-all duration-200 cursor-pointer focus:outline-none"
              />
              <span>Not-Document</span>
            </label>
          </div>

          {/* --- Row 1: Parcel Specs Info Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Parcel Name */}
            <div className="form-control w-full items-start">
              <label className="label py-1">
                <span className="label-text font-bold text-secondary text-[15px]">
                  Parcel Name
                </span>
              </label>
              <input
                type="text"
                placeholder="Parcel Name"
                {...register('parcelName', { required: true })}
                className="input input-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium h-12"
              />
              {errors.parcelName && (
                <span className="text-rose-500 text-xs mt-1 font-semibold">
                  Required
                </span>
              )}
            </div>

            {/* Parcel Weight */}
            <div className="form-control w-full items-start">
              <label className="label py-1">
                <span className="label-text font-bold text-secondary text-[15px]">
                  Parcel Weight (KG)
                </span>
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="Parcel Weight (KG)"
                {...register('parcelWeight', { required: true })}
                className="input input-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium h-12"
              />
              {errors.parcelWeight && (
                <span className="text-rose-500 text-xs mt-1 font-semibold">
                  Required
                </span>
              )}
            </div>
          </div>

          {/* Secondary structural line separator */}
          <div className="w-full h-px bg-gray-100 my-4"></div>

          {/* --- Two Column Address split (Sender Details vs Receiver Details) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* ================= LEFT SIDE: SENDER BLOCK ================= */}
            <div className="space-y-5">
              <h3 className="text-[17px] font-extrabold text-secondary tracking-tight mb-2">
                Sender Details
              </h3>

              {/* Sender Name */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Sender Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Sender Name"
                  {...register('senderName', { required: true })}
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium h-12"
                />
              </div>

              {/* Address */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Address
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  {...register('senderAddress', { required: true })}
                  className="input input-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium h-12"
                />
              </div>

              {/* Phone No */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Sender Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Sender Email"
                  {...register('senderEmail', { required: true })}
                  defaultValue={user?.email}
                  className="input input-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium h-12"
                />
              </div>

              {/* region Select box */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Your Region
                  </span>
                </label>
                <select
                  {...register('senderRegion', { required: true })}
                  className="select select-bordered w-full rounded-lg bg-base-100 text-gray-400 border-gray-200 focus:select-primary text-[15px] font-medium h-12"
                >
                  <option value="">Select your Region</option>
                  {allRegion.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Select box */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Your District
                  </span>
                </label>
                <select
                  {...register('senderDsitrict', { required: true })}
                  className="select select-bordered w-full rounded-lg bg-base-100 text-gray-400 border-gray-200 focus:select-primary text-[15px] font-medium h-12"
                >
                  <option value="">Select your District</option>
                  {districtsByRegion(senderRegion).map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Instruction Textarea */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Pickup Instruction
                  </span>
                </label>
                <textarea
                  placeholder="Pickup Instruction"
                  {...register('pickupInstruction')}
                  className="textarea textarea-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:textarea-primary placeholder-gray-300 text-[15px] font-medium h-28"
                />
              </div>
            </div>

            {/* ================= RIGHT SIDE: RECEIVER BLOCK ================= */}
            <div className="space-y-5">
              <h3 className="text-[17px] font-extrabold text-secondary tracking-tight mb-2">
                Receiver Details
              </h3>

              {/* Receiver Name */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Receiver Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Sender Name" // Preserved text value exactly as displayed in your image typo
                  {...register('receiverName', { required: true })}
                  className="input input-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium h-12"
                />
              </div>

              {/* Receiver Address */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Receiver Address
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Address"
                  {...register('receiverAddress', { required: true })}
                  className="input input-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium h-12"
                />
              </div>

              {/* Contact No */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Receiver Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Sender Contact No" // Preserved image text exactly
                  {...register('receiverEmail', { required: true })}
                  className="input input-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium h-12"
                />
              </div>

              {/* Receiver District Select Box */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Receiver Region
                  </span>
                </label>
                <select
                  {...register('receiverRegion', { required: true })}
                  className="select select-bordered w-full rounded-lg bg-base-100 text-gray-400 border-gray-200 focus:select-primary text-[15px] font-medium h-12"
                >
                  <option value="">Select your Region</option>

                  {allRegion.map(r => (
                    <option value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Receiver District Select Box */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Receiver District
                  </span>
                </label>
                <select
                  {...register('receiverDistrict', { required: true })}
                  className="select select-bordered w-full rounded-lg bg-base-100 text-gray-400 border-gray-200 focus:select-primary text-[15px] font-medium h-12"
                >
                  <option value="">Select your District</option>

                  {districtsByRegion(receiverRegion).map(r => (
                    <option value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Delivery Instruction Textarea */}
              <div className="form-control w-full items-start">
                <label className="label py-1">
                  <span className="label-text font-bold text-secondary text-[15px]">
                    Delivery Instruction
                  </span>
                </label>
                <textarea
                  placeholder="Delivery Instruction"
                  {...register('deliveryInstruction')}
                  className="textarea textarea-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:textarea-primary placeholder-gray-300 text-[15px] font-medium h-28"
                />
              </div>
            </div>
          </div>

          {/* --- Bottom Information Note & Actions --- */}
          <div className="pt-4 space-y-5 items-start flex flex-col">
            <p className="text-secondary font-extrabold text-[14px] tracking-tight">
              * PickUp Time 4pm-7pm Approx.
            </p>

            <button
              type="submit"
              className="btn bg-primary hover:bg-primary/90 text-secondary font-extrabold text-sm px-8 h-11 min-h-11 border-none rounded-lg shadow-xs transition-all duration-300 cursor-pointer"
            >
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SendPercel;
