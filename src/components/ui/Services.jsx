// You can replace this placeholder with your actual 3D icon image path
import serviceIconPlaceholder from '../../assets/homeicons/service.png';

// Service data array to keep the component clean and maintainable
const servicesData = [
  {
    id: 1,
    title: 'Express & Standard\nDelivery',
    description:
      'We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6 hours from pick-up to drop-off.',
    isActive: false,
  },
  {
    id: 2,
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48-72 hours.',
    isActive: true, // This will apply the primary color background
  },
  {
    id: 3,
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
    isActive: false,
  },
  {
    id: 4,
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
    isActive: false,
  },
  {
    id: 5,
    title: 'Corporate Service / Contract\nIn Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.',
    isActive: false,
  },
  {
    id: 6,
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
    isActive: false,
  },
];

const Services = () => {
  return (
    // Main section wrapper with secondary background color
    <section className="w-full bg-secondary rounded-3xl py-20 lg:py-24 font-sans">
      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-10">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-[#DADADA] text-base leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>

        {/* Responsive Grid Layout: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map(service => (
            <div
              key={service.id}
              // Conditional styling based on isActive property
              className={`flex flex-col items-center text-center lg:px-10 lg:py-8 rounded-3xl bg-white hover:-translate-y-1 hover:bg-primary transition-all duration-1000`}
            >
              {/* Icon Container */}
              <div className="w-20 h-20 rounded-full bg-[#F3F6FA] flex items-center justify-center mb-8">
                <img
                  src={serviceIconPlaceholder}
                  alt="Service Icon"
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* Service Title with whitespace-pre-line to respect line breaks (\n) */}
              <h3 className="text-[24px] font-semibold text-secondary mb-5 leading-snug whitespace-pre-line">
                {service.title}
              </h3>

              {/* Service Description with dynamic text color based on active state */}
              <p
                className={`text-[15px] leading-relaxed ${
                  service.isActive
                    ? 'text-secondary/80 font-medium'
                    : 'text-[#606060]'
                }`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
