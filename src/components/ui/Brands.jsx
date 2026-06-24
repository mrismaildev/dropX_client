import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles (required if not already imported globally)
import 'swiper/css';

// Import brand images
import amzon from '../../assets/brands/amazon.png';
import casio from '../../assets/brands/casio.png';
import moonstar from '../../assets/brands/moonstar.png';
import randstad from '../../assets/brands/randstad.png';
import star from '../../assets/brands/star.png';
import start_people from '../../assets/brands/start_people.png';

const Brands = () => {
  return (
    // Wrapper with padding and overflow hidden
    <div className="w-full py-24 overflow-hidden ">
      <div className="text-center mb-10 font-bold text-xl text-secondary">
        <h3>We've helped thousands of sales teams</h3>
      </div>
      <div className="">
        <Swiper
          // Register the Autoplay module
          modules={[Autoplay]}
          // Enable infinite loop
          loop={true}
          // The duration of the transition (adjust this to make it faster/slower)
          speed={3000}
          // Delay: 0 is the magic number for a continuous marquee
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          // Prevent user swiping to maintain the continuous flow
          allowTouchMove={false}
          spaceBetween={40}
          // Responsive breakpoints for different screen sizes
          breakpoints={{
            320: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          // We add a custom class here to target the wrapper in CSS
          className="brand-marquee"
        >
          {/* Slide 1 */}
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={amzon}
              alt="Amazon"
              className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={casio}
              alt="Casio"
              className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={moonstar}
              alt="Moonstar"
              className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={randstad}
              alt="Randstad"
              className=" object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </SwiperSlide>

          {/* Slide 5 */}
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={star}
              alt="Star"
              className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </SwiperSlide>

          {/* Slide 6 */}
          <SwiperSlide className="flex items-center justify-center">
            <img
              src={start_people}
              alt="Start People"
              className="h-8 object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
