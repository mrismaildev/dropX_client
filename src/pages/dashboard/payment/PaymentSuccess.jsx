import { FiArrowRight, FiCheckCircle, FiDownload } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-base-100 font-sans p-4 text-left">
      {/* --- Main Success Container Card --- */}
      <div className="w-full max-w-md bg-white border border-base-200 rounded-4xl p-8 text-center shadow-xs transition-all hover:shadow-md">
        {/* --- Big Animated Green Success Checked Badge --- */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-bounce">
            <FiCheckCircle size={44} className="stroke-[2.5]" />
          </div>
        </div>

        {/* --- Headers --- */}
        <span className="text-xs font-black text-primary tracking-widest uppercase bg-primary/10 px-3 py-1 rounded-full">
          Transaction Complete
        </span>

        <h2 className="text-3xl md:text-[36px] font-black text-secondary tracking-tight leading-none mt-4 mb-3">
          Payment Successful!
        </h2>

        <p className="text-[15px] text-gray-400 font-medium max-w-xs mx-auto leading-relaxed">
          Thank you for choosing ZapShift. Your parcel delivery booking is now
          fully funded and assigned for dispatch.
        </p>

        {/* --- Stripe Session Tracker Card --- */}
        {sessionId && (
          <div className="bg-base-200/50 rounded-xl p-3 border border-base-200/60 my-6 text-left">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Stripe Reference ID:
            </span>
            <code className="text-xs font-mono font-bold text-secondary break-all bg-base-100 px-2 py-1 rounded border border-base-200 block">
              {sessionId.substring(0, 24)}...
            </code>
          </div>
        )}

        {/* Horizontal separation line */}
        <div className="w-full h-px bg-gray-100 my-6"></div>

        {/* --- Action Redirect Buttons --- */}
        <div className="flex flex-col gap-3">
          {/* Primary Action Redirecting into Dashboard Tracking list */}
          <Link
            to="/dashboard/my-parcels"
            className="btn w-full bg-primary hover:bg-primary/90 text-secondary border-none font-black text-[15px] rounded-xl tracking-wide shadow-xs h-12 min-h-12 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
          >
            Track My Parcels
            <FiArrowRight size={16} />
          </Link>

          {/* Secondary Action for Receipt Download Simulators */}
          <button
            onClick={() => console.log('Downloading invoice context...')}
            className="btn w-full bg-[#EAEFF5] hover:bg-[#dee5ee] text-black border-none font-bold text-[15px] rounded-xl h-12 min-h-12 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiDownload size={16} />
            Download Invoice
          </button>
        </div>

        {/* Secure Transaction footer note */}
        <p className="text-[11px] text-gray-400 font-semibold tracking-tight mt-6 uppercase">
          ⚡ ZapShift logistics network authorization verified
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
