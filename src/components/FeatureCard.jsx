import clsx from "clsx"
import { motion } from "framer-motion"
import { slideRight, slideLeft, popUp } from "../animations";

const FeatureCard = ({
    title,
    description,
    tag,
    videoUrl,
    reverse = false,
    children
}) => {
    const textAnimation = reverse ? slideRight : slideLeft;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-25 items-center py-12 md:py-16">
            <motion.div
                variants={textAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={clsx(
                    "flex flex-col w-full h-full gap-10 md:gap-5 justify-between",
                    reverse ? "md:order-1" : "md:order-2")}
            >
                {/* Tag */}
                {tag && (
                    <p className="text-primary opacity-95 text-sm tracking-widest uppercase font-semibold">
                        {tag}
                    </p>
                )}

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-lg text-sub max-w-md leading-relaxed mb-2">
                    {description}
                </p>

                {children}
            </motion.div>

            <motion.div
                variants={popUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={clsx("rounded-2xl border border-white/10 sm:px-5 bg-surface",
                    reverse ? "md:order-2" : "md:order-1")}
            >
                <div className="rounded-2xl sm:rounded-none overflow-hidden aspect-16:9 md:aspect-5/3">
                    <video
                        preload="none"
                        src={videoUrl}
                        autoPlay
                        playsInline
                        loop
                        muted
                        className="w-full h-full object-cover shrink-0"
                    />
                </div>
            </motion.div>
        </div >
    )
}

export default FeatureCard