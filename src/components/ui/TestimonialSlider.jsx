import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
// The card component we built earlier

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ReviewsCard from './ReviewsCard';

// Dummy data matching your reference names
const testimonials = [
  { id: 1, name: 'Rasel Ahamed', role: 'CTO' },
  { id: 2, name: 'Awlad Hossin', role: 'Senior Product Designer' },
  { id: 3, name: 'Nasir Uddin', role: 'CEO' },
  { id: 4, name: 'Imran Khan', role: 'Lead Developer' },
  { id: 5, name: 'Mahfuzur Rahman', role: 'Product Manager' },
];

const TestimonialSlider = () => {
  return (
    <div className="testimonial-carousel-wrapper">
      <div className="">
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={2} // Crucial for auto-calculating side slide widths
          coverflowEffect={{
            rotate: 0, // No 3D rotation, keeping them flat like the image
            stretch: 80, // Pulls the side slides closer or pushes them apart
            depth: 150, // Pushes inactive slides into the background
            modifier: 1, // Effect multiplier
            slideShadows: false, // Disables default harsh gradients
          }}
          navigation={{
            nextEl: '.custom-swiper-next',
            prevEl: '.custom-swiper-prev',
          }}
          pagination={{
            el: '.custom-swiper-pagination',
            clickable: true,
          }}
          className="w-full pt-10 pb-12"
        >
          {testimonials.map(item => (
            // Custom fixed width so slides stack perfectly with the coverflow effect
            <SwiperSlide key={item.id} className="w-85 sm:w-100 md:w-105">
              <ReviewsCard name={item.name} role={item.role} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Control Bar (Matches the layout below the active slide) */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {/* Left Arrow Button */}
          <button className="custom-swiper-prev flex items-center justify-center w-12 h-12 rounded-full bg-white text-secondary shadow-xs border border-gray-100 hover:bg-gray-50 transition-all duration-300 cursor-pointer">
            <FiArrowLeft size={20} />
          </button>

          {/* Central Pagination Dots target */}
          <div className="custom-swiper-pagination w-auto! flex items-center gap-2"></div>

          {/* Right Arrow Button (Uses your primary color highlight #CAEB66) */}
          <button className="custom-swiper-next flex items-center justify-center w-12 h-12 rounded-full bg-primary text-secondary shadow-xs hover:bg-primary/90 transition-all duration-300 cursor-pointer">
            <FiArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
