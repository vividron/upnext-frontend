import HeroSection from "./sections/Hero.jsx"
import RoomsSection from "./sections/RoomsPreview.jsx"
import Features from "./sections/Features.jsx"
import Applications from "./sections/Applications.jsx"

const HomePage = () => {
  return (
    <div className="flex flex-col w-full gap-10 sm:gap-20 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between">
        <HeroSection />
        <div className="flex flex-1 justify-center lg:items-center">
          <RoomsSection />
        </div>
      </div>
      <Features />
      <Applications />
    </div>
  )
}

export default HomePage