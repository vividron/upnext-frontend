import HeroSection from "./sections/Hero.jsx"
import RoomsSection from "./sections/RoomsPreview.jsx"
import Features from "./sections/Features.jsx"
import Applications from "./sections/Applications.jsx"
import { motion } from "framer-motion"
import { fadeUp } from "../../animations/index.js"

const HomePage = () => {

  return (
    <div className="flex flex-col w-full gap-10 sm:gap-20 max-w-7xl mx-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,214,94,0.12),transparent_5%)] sm:bg-[radial-gradient(circle_at_top_left,rgba(30,214,94,0.12),transparent_10%)]" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-col lg:flex-row gap-5 lg:gap-0 justify-between"
      >
        <HeroSection />
        <div className="flex flex-1 justify-center lg:items-center">
          <RoomsSection />
        </div>
      </motion.div>

      <Features />

      <Applications />

    </div>
  )
}

export default HomePage