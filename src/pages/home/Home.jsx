import Brands from '../../components/ui/Brands';
import FeatureList from '../../components/ui/FeatureList';
import HowItWorks from '../../components/ui/HowItWorks';
import Services from '../../components/ui/Services';
import Banner from './Banner';
import TestimonialSlider from '../../components/ui/TestimonialSlider';
const reviewsPromise = fetch('/reviews.json').then(res => res.json());

const Home = () => {
  return (
    <>
      <div className=" container mx-auto px-4">
        <div className="mt-8 rounded-2xl overflow-hidden">
          <Banner></Banner>
        </div>
        <HowItWorks></HowItWorks>
        <Services></Services>
      </div>
      <Brands></Brands>
      <div className=" container mx-auto px-4 py-10">
        <FeatureList></FeatureList>
        <TestimonialSlider reviewsPromise={reviewsPromise}></TestimonialSlider>
      </div>
    </>
  );
};

export default Home;
