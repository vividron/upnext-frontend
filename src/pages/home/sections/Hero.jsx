const HeroSection = () => {
    return (
        <section id="hero" className="flex flex-col flex-1 gap-6 px-4 py-6">
            <div className="flex items-center gap-2 w-fit bg-surface-high px-4 py-2 rounded-full text-sm text-sub lg:text-[15px] text-sub uppercase">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Join the Room. Vote the Vibe.
            </div>

            <h1 className=" text-main text-6xl font-bold md:text-7xl lg:text-8xl lg:leading-[0.9999] tracking-tight [text-shadow:0_0_12px_rgba(229,226,225,0.4)]">
                Experience <br />
                Music <br />
                <span className="text-primary [text-shadow:0_0_18px_rgba(30,214,94,0.4)]">Together</span>, <br />
                Fairly.
            </h1>

            <p className="text-sub max-w-lg text-lg leading-relaxed">
                Create shared music rooms where hosts add songs to the queue. Users vote to shape the queue.
            </p>
        </section>
    );
}

export default HeroSection;