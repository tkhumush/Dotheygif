import { npubToHex, fetchRelayList, fetchProfile, fetchNotes, countGifs } from "@/lib/nostr";
import ProfileCard from "@/components/ProfileCard";
import GifPieChart from "@/components/GifPieChart";
import NpubInput from "@/components/NpubInput";
import Link from "next/link";

interface Props {
  params: Promise<{ npub: string }>;
}

export default async function DashboardPage({ params }: Props) {
  const { npub } = await params;

  let pubkeyHex: string;
  try {
    pubkeyHex = npubToHex(npub);
  } catch {
    return (
      <main className="dashboard">
        <div className="error-card">
          <h2>Invalid npub</h2>
          <p>The npub in the URL is not valid. Please check and try again.</p>
          <Link href="/">Go home</Link>
        </div>
      </main>
    );
  }

  const relays = await fetchRelayList(pubkeyHex);
  const [profile, notes] = await Promise.all([
    fetchProfile(pubkeyHex, relays),
    fetchNotes(pubkeyHex, relays),
  ]);
  const gifStats = countGifs(notes);

  return (
    <main className="dashboard">
      <NpubInput />
      <ProfileCard profile={profile} npub={npub} />
      <GifPieChart
        withGif={gifStats.withGif}
        withoutGif={gifStats.withoutGif}
        total={gifStats.total}
      />
    </main>
  );
}
