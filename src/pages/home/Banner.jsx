import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import bannerImg1 from '../../assets/banner/banner1.png';
import bannerImg2 from '../../assets/banner/banner2.png';
import bannerImg3 from '../../assets/banner/banner3.png';
import HeroContent from '../../components/ui/HeroContent';

const Banner = () => {
  return (
    <div className="w-full rounded-2xl overflow-hidden transform-[translateZ(0)] shadow-sm">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        <div className="relative w-full lg:min-h-125">
          <img
            src={bannerImg1}
            alt="Delivery Background"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-27.5 left-22 z-20 w-full max-w-4xl px-4 text-left">
            <HeroContent
              primaryBtnText="Track Your Parcel"
              secondaryBtnText="Be A Rider"
              onPrimaryClick={() => console.log('Track button clicked!')}
              onSecondaryClick={() => console.log('Rider button clicked!')}
            />
          </div>
        </div>
        <div className="relative w-full lg:min-h-125">
          <img
            src={bannerImg2}
            alt="Delivery Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-27.5 left-22 z-20 w-full max-w-4xl px-4 text-left">
            <HeroContent
              primaryBtnText="Track Your Parcel"
              secondaryBtnText="Be A Rider"
              onPrimaryClick={() => console.log('Track button clicked!')}
              onSecondaryClick={() => console.log('Rider button clicked!')}
            />
          </div>
        </div>
        
        <div className="relative w-full lg:min-h-125">
          <img
            src={bannerImg3}
            alt="Delivery Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-27.5 left-22 z-20 w-full max-w-4xl px-4 text-left">
            <HeroContent
              primaryBtnText="Track Your Parcel"
              secondaryBtnText="Be A Rider"
              onPrimaryClick={() => console.log('Track button clicked!')}
              onSecondaryClick={() => console.log('Rider button clicked!')}
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
