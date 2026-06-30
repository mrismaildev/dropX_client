import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiCreditCard, FiDollarSign } from 'react-icons/fi';

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: parcel, isLoading } = useQuery({
    queryKey: ['parcel', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  console.log(parcel);

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };
    const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div className="">
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="w-full   bg-base-100 rounded-2xl border border-base-200 p-6 font-sans text-left shadow-xs transition-all hover:shadow-md">
      {/* --- Main Info Content Block --- */}
      <div className="flex items-start gap-4 mb-6">
        {/* Animated Accent Icon Holder */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 animate-pulse">
          <FiDollarSign size={24} />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
            Secure Checkout
          </span>
          <h3 className="text-lg font-extrabold text-secondary tracking-tight leading-snug">
            Payment for:{' '}
            <span className="text-black font-black">
              {parcel?.parcelName || 'Unnamed Parcel'}
            </span>
          </h3>
        </div>
      </div>

      {/* --- Price Matrix Display Section --- */}
      <div className="bg-base-200/50 rounded-xl p-4 border border-base-200/60 mb-6 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-500">
          Total Payable Amount:
        </span>
        <div className="flex items-baseline gap-0.5">
          <span className="text-2xl font-black text-secondary">
            {parcel?.cost || 0}
          </span>
          <span className="text-sm font-black text-secondary">৳</span>
        </div>
      </div>

      {/* --- Action Button with Interactive Loading Layout --- */}
      <button
        onClick={handlePayment}
        className="btn w-full bg-primary hover:bg-primary/90 text-secondary border-none font-black text-[15px] rounded-xl tracking-wide shadow-xs active:scale-98 transition-all h-12 min-h-12 flex items-center justify-center gap-2 cursor-pointer"
      >
        <FiCreditCard size={18} />
        Pay Now
      </button>

      {/* --- Bottom Trust Badge --- */}
      <p className="text-[11px] text-center text-gray-400 font-bold tracking-tight mt-3 uppercase">
        🔒 Encrypted 256-bit SSL transaction gateway
      </p>
    </div>
  );
};

export default Payment;
