import { FiArrowUpRight } from 'react-icons/fi';

const HeroContent = ({
  primaryBtnText,
  secondaryBtnText,
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <div className="flex flex-col items-start text-left max-w-2xl font-sans">


      <div className="mt-8 flex flex-wrap items-center gap-5">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onPrimaryClick}
          role="button"
          tabIndex={0}
        >
          <div className="bg-primary text-secondary font-bold text-[17px] px-8 py-3.5 rounded-full transition-transform duration-300 group-hover:-translate-y-0.5">
            {primaryBtnText}
          </div>
          <div className="bg-[#222222] text-primary p-3.5 rounded-full transition-transform duration-300 group-hover:rotate-45">
            <FiArrowUpRight size={22} strokeWidth={2.5} />
          </div>
        </div>

        <button
          onClick={onSecondaryClick}
          className="bg-white text-secondary border border-[#E5E7EB] font-bold text-[17px] px-8 py-3.5 rounded-full hover:border-gray-400 hover:shadow-sm transition-all duration-300"
        >
          {secondaryBtnText}
        </button>
      </div>
    </div>
  );
};

export default HeroContent;
