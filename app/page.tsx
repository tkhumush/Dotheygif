import NpubInput from "@/components/NpubInput";

export default function Home() {
  return (
    <main className="landing">
      <h1 className="landing-title">Do They GIF?</h1>
      <p className="landing-subtitle">
        See how many .gif links a Nostr user shares in their notes.
      </p>
      <NpubInput />
    </main>
  );
}
