import ApplicationCard from "../../../components/ApplicationCard.jsx"

const Applications = () => {
    return (
        <section id="applications" className="space-y-10 sm:space-y-20 px-4">

            <ApplicationCard
                title="Cafés & Music-Driven Spaces"
                description="Let customers shape the café atmosphere by matching their playlists or voting on songs, creating a shared, interactive vibe where everyone hears what they love."
                imageUrl="/images/cafe.png"
            />

            <ApplicationCard
                reverse
                title="Fitness Spaces & Gyms"
                description="In gyms or group workout sessions, music plays a huge role in motivation. With upNext, members can influence the playlist while working out, ensuring
                high-energy tracks stay and less engaging ones get skipped. The queue evolves based on what keeps people energized. making workouts more immersive and enjoyable."
                imageUrl="/images/gym.png"
            />

            <ApplicationCard
                title="Parties & Social Hangouts"
                description="Make every party collaborative. Guests vote for what plays next, ensuring everyone hears something they enjoy. without playlist conflicts and endless
                skips."
                imageUrl="/images/party.png"
            />

        </section>
    )
}

export default Applications