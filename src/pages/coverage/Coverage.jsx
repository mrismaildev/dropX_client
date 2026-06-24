import 'leaflet/dist/leaflet.css';
import { useRef, useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLoaderData } from 'react-router';

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenter = useLoaderData();
  const mapRef = useRef();
  const [seachQuery, setSearchQuery] = useState('');
  // const mapRef = useRef();
  // console.log(serviceCenter);
  const handleSearchSubmit = e => {
    e.preventDefault();
    console.log(seachQuery);
    // 1. Sanitize the input: trim spaces and check if empty

    const sanitizedQuery = seachQuery.trim().toLowerCase();
    if (!sanitizedQuery) {
      alert('Please enter a distric name.');
      return;
    }
    // 2. Find matching centers (using modern matching) and remove extra spcaing
    const matchedCenter = serviceCenter.find(c =>
      c.district
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(sanitizedQuery.replace(/\s+/g, '')),
    );

    console.log(matchedCenter);

    if (matchedCenter && mapRef.current) {
      const coord = [
        parseFloat(matchedCenter.latitude),
        parseFloat(matchedCenter.longitude),
      ];

      mapRef.current.flyTo(coord, 14, {
        animate: true,
        duraion: 1.5,
      });
    }

    // old way
    // const locations = e.target.location.value;
    // const district = serviceCenter.find(c =>
    //   c.district.toLowerCase().includes(locations.toLowerCase()),
    // );
    // if (district) {
    //   const coord = [district.latitude, district.longitude];
    //   mapRef.current.flyTo(coord, 14);
    // }

    // console.log(district);
    // console.log('submites');
  };

  return (
    <section className="w-full bg-white py-16 lg:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Top Header Section --- */}
        <div className="text-left mb-6">
          <h2 className="text-3xl md:text-[40px] font-bold text-secondary">
            We are available in 64 districts
          </h2>
        </div>

        {/* --- Search Bar Container --- */}
        <form onSubmit={handleSearchSubmit} className="max-w-md w-full mb-10">
          <div className="relative flex items-center bg-[#F3F6FA] rounded-full pl-5  transition-all">
            {/* Search Icon */}
            <span className="text-gray-400 mr-3 shrink-0">
              <FiSearch size={20} />
            </span>

            {/* Input Field */}
            <input
              // name="location"
              onChange={e => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search here"
              className="w-full bg-transparent text-secondary placeholder-[#CBD5E1] text-[15px] font-medium outline-none border-none py-2"
            />

            {/* Search Action Button */}
            <button
              type="submit"
              className="bg-primary text-secondary font-bold text-[15px] px-8 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-300 cursor-pointer shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        {/* --- Subtle Horizontal Separator Line --- */}
        <div className="w-full h-px bg-gray-100 mb-10"></div>

        {/* --- Sub-Header Section --- */}
        <div className="text-left mb-8">
          <h3 className="text-3xl md:text-[40px] font-bold text-secondary">
            We deliver almost all over Bangladesh
          </h3>
        </div>

        {/* --- Simple Placeholder Map Container --- */}
        {/* You can easily swap this entire div out for your dynamic interactive Map component */}
        <div className="w-full h-80 md:h-112.5 lg:h-125 bg-slate-100 rounded-2xl overflow-hidden relative border border-gray-100 shadow-xs group">
          {/* Mock Map Texture Effect */}

          <MapContainer
            ref={mapRef}
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenter.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <strong>{center.district}</strong> <br />{' '}
                  {center.covered_area.join(',')}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
