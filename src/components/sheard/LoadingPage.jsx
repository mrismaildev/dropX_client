const LoadingPage = () => {
  return (
    // Fixed full screen overlay blocking any broken background UI
    <div className="fixed inset-0 min-h-screen w-full bg-[#F3F6FA] flex flex-col items-center justify-center font-sans z-50">
      <div className="text-center flex flex-col items-center max-w-sm px-4">
        {/* --- Modern Geometric Premium Pulse Loader --- */}
        {/* Creating a beautiful custom layout using your primary neon and dark secondary colors */}
        <div className="relative w-24 h-24 flex items-center justify-center mb-8">
          {/* Outer ripples */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping duration-1000"></div>
          <div className="absolute w-16 h-16 rounded-full bg-secondary/10 animate-pulse duration-700"></div>

          {/* Core spinning delivery ring */}
          <div className="absolute w-12 h-12 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>

          {/* Center pinpoint */}
          <div className="absolute w-3 h-3 rounded-full bg-secondary"></div>
        </div>

        {/* --- Branding Typography Section --- */}
        <div className="space-y-2">
          {/* Heavy weight tracking matches the main header density */}
          <h2 className="text-3xl font-black text-secondary tracking-[0.25em]  animate-pulse">
            Drop_X
          </h2>

          {/* Clean system feedback */}
          <p className="text-[14px] text-gray-500 font-bold tracking-tight">
            Connecting delivery nodes...
          </p>
        </div>

        {/* --- Fine Micro-loader bar --- */}
        <div className="w-32 mt-6 h-1 bg-gray-200 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-primary w-1/2 rounded-full animate-[infinity-load_1.5s_infinite_ease-in-out]"></div>
        </div>
      </div>

      {/* Embedded tiny custom animation keyframe to make the bar load infinitely */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes infinity-load {
          0% { left: -50%; width: 30%; }
          50% { width: 60%; }
          100% { left: 100%; width: 30%; }
        }
      `,
        }}
      />
    </div>
  );
};

export default LoadingPage;
