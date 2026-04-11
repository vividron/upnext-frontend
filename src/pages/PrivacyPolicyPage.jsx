import {
  Shield,
  Database,
  Users,
  Server,
  Smartphone,
  Lock,
  FileText,
  AlertTriangle,
} from "lucide-react";

const sections = [
  {
    id: "intro",
    title: "Introduction",
    icon: Shield,
    content: [
      "This Privacy Policy explains how upNext collects, uses, and protects your information.",
      "By using upNext, you agree to the collection and use of information in accordance with this policy.",
    ],
  },
  {
    id: "data-collection",
    title: "Information We Collect",
    icon: Database,
    content: [
      "We may collect basic account and usage data such as user identifiers, room participation, votes, and interactions.",
      "If you connect Spotify, we may access limited account data necessary for playback control (as permitted by Spotify APIs).",
      "We may collect technical data such as device type, connection status, and logs for debugging and performance.",
    ],
  },
  {
    id: "usage",
    title: "How We Use Information",
    icon: Users,
    content: [
      "To provide and maintain the Service, including real-time room updates and queue management.",
      "To improve features, fix bugs, and enhance user experience.",
      "To detect misuse, prevent abuse, and ensure system security.",
    ],
  },
  {
    id: "spotify",
    title: "Spotify Integration",
    icon: Smartphone,
    content: [
      "upNext uses Spotify APIs for playback control.",
      "We do not store your Spotify password.",
      "Your use of Spotify is subject to Spotify’s own privacy policy and terms.",
    ],
  },
  {
    id: "sharing",
    title: "Data Sharing",
    icon: Server,
    content: [
      "We do not sell your personal data.",
      "We may share data with service providers required to operate the platform (e.g., hosting, analytics).",
      "We may disclose information if required by law or to protect our rights.",
    ],
  },
  {
    id: "security",
    title: "Data Security",
    icon: Lock,
    content: [
      "We implement reasonable security measures to protect your data.",
      "However, no system is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    icon: FileText,
    content: [
      "We retain data only as long as necessary to provide the Service.",
      "Logs and temporary session data may be deleted automatically.",
    ],
  },
  {
    id: "rights",
    title: "Your Rights",
    icon: AlertTriangle,
    content: [
      "You may request access, correction, or deletion of your data where applicable.",
      "Contact us using the details on the website for such requests.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  const updatedDate = "April 2026";

  return (
    <main className="min-h-screen bg-surface-lowest text-main">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <section id="privacy-hero" className="rounded-2xl border border-white/10 bg-surface p-8">
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <p className="mt-4 text-sub">
            This policy describes how upNext handles your data and privacy.
          </p>
          <p className="mt-2 text-muted text-sm">Effective: {updatedDate}</p>
        </section>

        <div className="mt-8 space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section key={section.id} className="rounded-xl border border-white/10 bg-surface p-6">
                <div className="flex gap-3 items-center">
                  <Icon className="text-primary" />
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                </div>
                <div className="mt-4 space-y-2 text-sub">
                  {section.content.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
