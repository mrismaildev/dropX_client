import { useForm, Watch } from 'react-hook-form';
import { useLoaderData } from 'react-router';

const SendPercel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      parcelType: 'Document',
      parcelName: '',
    },
  });

  const serviceDuplicate = useLoaderData();
  const center = serviceDuplicate.map(c => c.region);
  const allRegion = [...new Set(center)];
  const senderRegion = watch('senderRegion');

  const districtsByRegion = region => {
    const regionDistrict = serviceDuplicate.filter(c => c.region === region);

    const districts = regionDistrict.map(d => d.district);

    console.log('this is your distric', districts);

    return districts;
  };

  districtsByRegion('Dhaka');

  const onSubmitParcel = data => {
    console.log('this is percel data', data);
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
                    Sender Phone No
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="Sender Phone No"
                  {...register('senderPhone', { required: true })}
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
                    Receiver Contact No
                  </span>
                </label>
                <input
                  type="tel"
                  placeholder="Sender Contact No" // Preserved image text exactly
                  {...register('receiverPhone', { required: true })}
                  className="input input-bordered w-full rounded-lg bg-base-100 text-secondary border-gray-200 focus:input-primary placeholder-gray-300 text-[15px] font-medium h-12"
                />
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
                  <option value="dhaka">Dhaka</option>
                  <option value="chattogram">Chattogram</option>
                  <option value="sylhet">Sylhet</option>
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
