import clsx from "clsx"

const ApplicationCard = ({
    title,
    description,
    imageUrl,
    reverse = false
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-25 items-center py-12 md:py-16">
            <div className={clsx(
                "h-full flex flex-col gap-10 justify-center",
                reverse ? "md:order-1" : "md:order-2")}
            >
                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                    {title}
                </h2>

                {/* Description */}
                <p className="text-lg text-sub max-w-md leading-relaxed">
                    {description}
                </p>

            </div>

            <div className={clsx(
                "rounded-2xl overflow-hidden bg-surface-high",
                "aspect-5/6 sm:aspect-square md:aspect-video",
                reverse ? "md:order-2" : "md:order-1")}
            >
                <img
                    src={imageUrl}
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}

export default ApplicationCard