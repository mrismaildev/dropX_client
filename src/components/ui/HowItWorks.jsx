import { TbTruckDelivery } from 'react-icons/tb';

const features = [
  {
    id: 1,
    title: 'Booking Pick & Drop',
    description:
      'From personal packages to business shipments — we deliver on time, every time.',
    icon: TbTruckDelivery,
  },
  {
    id: 2,
    title: 'Cash On Delivery',
    description:
      'From personal packages to business shipments — we deliver on time, every time.',
    icon: TbTruckDelivery,
  },
  {
    id: 3,
    title: 'Delivery Hub',
    description:
      'From personal packages to business shipments — we deliver on time, every time.',
    icon: TbTruckDelivery,
  },
  {
    id: 4,
    title: 'Booking SME & Corporate',
    description:
      'From personal packages to business shipments — we deliver on time, every time.',
    icon: TbTruckDelivery,
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full py-16 lg:py-24 font-sans">
      <div className="">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-12 lg:mb-16 tracking-tight text-left">
          How it Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {features.map(feature => (
            <div
              key={feature.id}
              className="flex flex-col items-start text-left bg-white px-8 py-8 rounded-3xl"
            >
              <div className="mb-6 text-secondary">
                <feature.icon size={52} strokeWidth={1.2} />
              </div>

              <h3 className="text-xl font-bold text-secondary mb-3 leading-snug tracking-tight">
                {feature.title}
              </h3>

              <p className="text-gray-500 text-[15px] leading-relaxed pr-4 xl:pr-8">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
