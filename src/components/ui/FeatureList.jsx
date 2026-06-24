// Import your illustration placeholders here
// You can replace these with your actual SVG or PNG paths
import trackingImg from '../../assets/homeicons/live-tracking.png';
import supportImg from '../../assets/homeicons/dman.png';
import safeDeliveryImg from '../../assets/homeicons/dman.png';

// Array of feature data to keep the component clean and maintainable
const featureData = [
  {
    id: 1,
    title: 'Live Parcel Tracking',
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    imgSrc: trackingImg,
  },
  {
    id: 2,
    title: '100% Safe Delivery',
    description:
      'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    imgSrc: safeDeliveryImg,
  },
  {
    id: 3,
    title: '24/7 Call Center Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    imgSrc: supportImg,
  },
];

const FeatureList = () => {
  return (
    <section className="w-full py-16 lg:py-24 font-sans overflow-hidden border-dashed border-y border-secondary ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Main wrapper with large vertical gaps between features */}
        <div className=" grid grid-cols-1 lg:grid-rows-3 gap-6">
          {featureData.map(feature => (
            <div
              key={feature.id}
              // Flex row for desktop (side-by-side), Flex col for mobile (stacked)
              className="bg-white flex flex-wrap items-center gap-8 rounded-2xl p-7 lg:p-0"
            >
              {/* Left Column: Illustration Container */}
              <div className="">
                <img
                  src={feature.imgSrc}
                  alt={feature.title}
                  className="w-full max-w-55 object-contain bg-transparent p-7"
                />
              </div>

              {/* Middle Column: Vertical Dashed Divider */}
              {/* Hidden on mobile, visible on medium screens and up */}
              <div className="hidden md:flex flex-col items-center justify-center shrink-0">
                {/* The height is fixed to match the design's specific line length */}
                <div className="h-25 lg:h-30 w-px border-l-[1.5px] border-dashed border-[#AABCBF]"></div>
              </div>

              {/* Right Column: Text Content */}
              <div className="w-full md:w-auto flex-1 text-center md:text-left">
                <h3 className="text-2xl lg:text-[28px] font-bold text-secondary mb-3 lg:mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-[15px] lg:text-[17px] leading-relaxed max-w-[700px] mx-auto md:mx-0">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureList;
