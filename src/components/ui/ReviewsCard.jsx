import { FaQuoteLeft } from 'react-icons/fa';

const ReviewsCard = ({ rev }) => {
  console.log(rev);
  return (
    <div className="card bg-white w-full max-w-150 rounded-4xl p-8 md:p-10 shadow-xs border border-gray-100/50 font-sans">
      {/* Top Section: Quote Icon */}
      {/* Using dynamic opacity matching the lighter teal tone in the design */}
      <div className="text-[#A3E0E9] mb-4 text-left">
        <FaQuoteLeft size={36} />
      </div>

      {/* Middle Section: Testimonial Text */}
      <div className="text-left">
        <p className="text-gray-500 text-base md:text-[17px] leading-relaxed tracking-normal font-normal">
          A posture corrector works by providing support and gentle alignment to
          your shoulders, back, and spine, encouraging you to maintain proper
          posture throughout the day.
        </p>
      </div>

      {/* Divider: Thin horizontal dashed line */}
      <div className="my-6 border-t border-dashed border-[#AABCBF]/60 w-full"></div>

      {/* Bottom Section: Author Profile Info */}
      <div className="flex items-center gap-4 text-left">
        {/* Avatar Container using DaisyUI 'avatar' wrapper */}
        <div className="avatar">
          <div className="w-14 h-14 rounded-full bg-secondary">
            {rev ? (
              <img
                src={rev.user_photoURL}
                alt="Awlad Hossin"
                className="object-cover"
              />
            ) : (
              // Fallback background matching your secondary dark teal tone
              <div className="w-full h-full bg-secondary rounded-full" />
            )}
          </div>
        </div>

        {/* Name and Designation Info Column */}
        <div className="flex flex-col gap-0.5">
          <h4 className="text-[19px] font-extrabold text-secondary tracking-tight leading-tight">
            Awlad Hossin
          </h4>
          <p className="text-gray-400 text-[14px] font-medium leading-none">
            Senior Product Designer
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
