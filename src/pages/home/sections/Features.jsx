import FeatureCard from "../../../components/FeatureCard.jsx"
import FeatureBenefits from "../../../components/FeatureBenefits.jsx"
import { ArrowDown, ArrowUp } from "lucide-react"

const Features = () => {
    return (
        <section id="features" className="space-y-10 sm:space-y-20 px-4">

            <FeatureCard
                tag="realtime-sync"
                title="Zero-Latency Room Sync."
                description="Experience instant updates across all users in the room. Every vote, queue shift, and playback action reflects in real time with seamless synchronization between host and participants."
                videoUrl="/videos/realtime-sync.mp4"
            >
                <FeatureBenefits
                    benefits={[
                        "WebSocket-powered live updates",
                        "Instant queue reordering based on votes",
                        "Real-time playback state sync",
                        "Auto-reconnect and Presence detection"
                    ]}
                />
            </FeatureCard>

            <FeatureCard
                reverse
                tag="match-playlist"
                title="Auto-Upvote Songs You Love."
                description="Skip manual voting. Upload your playlist and let the system automatically detect and upvote songs already in the queue that match your taste."
                videoUrl="/videos/match-playlist.mp4"
            >
                <FeatureBenefits
                    benefits={[
                        "Upload personal Spotify playlist",
                        "Auto-detect matching songs in the room queue",
                        "Auto-upvote matching tracks",
                    ]}
                />
            </FeatureCard>

            <FeatureCard
                tag="host control"
                title="Play Anywhere, Control Seamlessly."
                description="The host controls playback from the app while the actual music plays on a connected Spotify device, keeping the experience seamless and flexible."
                videoUrl="/videos/host-control.mp4"
            >
                <FeatureBenefits
                    benefits={[
                        "Works with any Spotify-connected device",
                        "Sync between app player and Spotify player state",
                        "Player sync errors are detection"
                    ]}
                />
            </FeatureCard>

            <FeatureCard
                reverse
                tag="crowd-voting"
                title="Democratic Queue System."
                description="Let the room decide what plays next. Users can upvote or downvote songs, dynamically shaping the queue based on collective preference."
                videoUrl="/videos/vote-songs.mp4"
            >
                <div className="flex justify-center w-full h-full gap-3 mt-2">
                    <div className="flex flex-1 gap-2 items-center justify-center bg-surface-container px-4 py-4 rounded-lg text-sm">
                        <ArrowUp className="size-4 sm:size-8 text-primary" />
                        <span className="text-sm sm:text-xl"> Upvote</span>
                    </div>
                    <div className="flex flex-1 gap-2 items-center justify-center bg-surface-container px-4 py-4 rounded-lg text-sm">
                        <ArrowDown className="size-4 sm:size-8 text-red-400" />
                        <span className="text-sm sm:text-xl">Downvote</span>
                    </div>
                </div>
            </FeatureCard>

        </section>
    )
}

export default Features