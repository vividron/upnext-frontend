import {
  ShieldCheck,
  Music2,
  Users,
  Clock3,
  AlertTriangle,
  Server,
  Smartphone,
  FileText,
  Sparkles,
  Handshake,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: ShieldCheck,
    content: [
      "By accessing or using upNext, you agree to these Terms and Conditions and our related policies.",
      "If you do not agree, do not use the Service.",
    ],
  },
  {
    id: "service",
    title: "What upNext Does",
    icon: Music2,
    content: [
      "upNext is a virtual song voting platform for shared listening spaces such as gyms, cafés, events, and similar environments.",
      "A host can create a room, add songs from a linked playlist, and allow users to upvote or downvote songs in the queue.",
      "The Service syncs room activity in real time using websocket-based updates, including queue changes, playback state changes, presence updates, and room status.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility and Account Use",
    icon: Users,
    content: [
      "You must be legally able to agree to these Terms in your country or region.",
      "The host must have a valid Spotify Premium account to create and control a room.",
      "You are responsible for keeping your account access secure and for activity carried out through your account.",
    ],
  },
  {
    id: "rooms",
    title: "Rooms, Queue, and Voting",
    icon: Sparkles,
    content: [
      "The song queue shown in the app is virtual and may not always match the host’s Spotify queue.",
      "Users may upvote or downvote songs in the room, and the queue order may change based on votes and host actions.",
      "A host may add songs from their playlist and may control playback on connected Spotify devices.",
      "upNext does not guarantee that every requested song will be played or that playback will match a user’s preferred timing.",
    ],
  },
  {
    id: "presence",
    title: "Presence and Session Handling",
    icon: Clock3,
    content: [
      "The app may use presence checks to detect whether a user has left, lost network connectivity, or closed the app.",
      "If a user becomes unavailable, the system may remove them from the room after a short grace period.",
      "If the host leaves or becomes unavailable, the room may end automatically.",
    ],
  },
  {
    id: "integrations",
    title: "Spotify and Third-Party Services",
    icon: Smartphone,
    content: [
      "The Service depends on Spotify and other third-party services for playback control and account integration.",
      "Your use of those services is also subject to their own terms, policies, and limitations.",
      "We are not responsible for interruptions, changes, outages, or restrictions caused by third-party services.",
    ],
  },
  {
    id: "conduct",
    title: "Acceptable Use",
    icon: AlertTriangle,
    content: [
      "Do not misuse the Service, interfere with room behavior, manipulate votes unfairly, attempt to bypass limits, or disrupt playback synchronization.",
      "Do not upload or share content that is unlawful, abusive, infringing, harmful, or otherwise violates applicable law.",
      "Do not attempt unauthorized access to rooms, accounts, device controls, or backend systems.",
    ],
  },
  {
    id: "availability",
    title: "Availability and Changes",
    icon: Server,
    content: [
      "We may change, suspend, or stop any feature of the Service at any time.",
      "We may update the queue system, playback logic, supported devices, or integrations without prior notice.",
      "The Service may be unavailable during maintenance, outages, or events outside our control.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimers",
    icon: FileText,
    content: [
      "The Service is provided on an 'as is' and 'as available' basis.",
      "We do not promise uninterrupted playback, error-free syncing, or that every room action will always appear instantly.",
      "To the fullest extent permitted by law, we disclaim warranties of merchantability, fitness for a particular purpose, and non-infringement.",
    ],
  },
];

const TermsAndConditionsPage = () => {

  return (
    <main className="min-h-screen bg-surface-lowest text-main">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">

        <section id="terms-hero" className="overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-surface via-surface-container to-surface-high shadow-2xl">
          <div className="p-6 sm:p-8 lg:p-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-sub">
              <Handshake className="h-4 w-4 text-primary" />
              upNext Terms & Conditions
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-main sm:text-5xl">
              Terms and Conditions for the upNext website
            </h1>
            <p className="mt-5 text-base leading-7 text-sub sm:text-lg">
              These Terms explain how users, hosts, and guests may access and use upNext,
              including room voting, queue management, Spotify device control, presence checks,
              and real-time sync features.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-muted">Platform</p>
                <p className="mt-1 font-medium text-main">Music voting rooms</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-muted">Playback</p>
                <p className="mt-1 font-medium text-main">Host Spotify device control</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-muted">Updates</p>
                <p className="mt-1 font-medium text-main">Real-time websocket sync</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.28fr_0.72fr]">
          <nav className="hidden sm:block sticky top-16 h-fit rounded-3xl border border-white/10 bg-surface p-5 shadow-xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">
              On this page
            </p>
            <div className="mt-4 space-y-2 text-sm">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-xl px-3 py-2 text-sub transition hover:bg-white/5 hover:text-main"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-surface p-6 shadow-xl sm:p-8">
              <h2 className="text-2xl font-semibold text-main">Summary</h2>
              <p className="mt-3 leading-7 text-sub">
                upNext is built to help a host manage a shared music experience while giving
                users a fair voice through upvotes, downvotes, and playlist matching. These Terms
                describe the rules for joining rooms, controlling playback, and using third-party
                Spotify features.
              </p>
            </div>

            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="rounded-3xl border border-white/10 bg-surface p-6 shadow-xl sm:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-white/5 p-3 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-semibold text-main">{section.title}</h2>
                      <div className="mt-4 space-y-3 text-sub leading-7">
                        {section.content.map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}

            <section className="rounded-3xl border border-white/10 bg-surface p-6 shadow-xl sm:p-8">
              <h2 className="text-2xl font-semibold text-main">Contact and Notice</h2>
              <p className="mt-3 leading-7 text-sub">
                If you have questions about these Terms, contact the website owner through the
                support email, contact form, or business details published on the site.
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

export default TermsAndConditionsPage;
