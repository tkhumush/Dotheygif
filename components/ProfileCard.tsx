import { NostrProfile } from "@/lib/nostr";

interface Props {
  profile: NostrProfile | null;
  npub: string;
}

export default function ProfileCard({ profile, npub }: Props) {
  const displayName =
    profile?.display_name || profile?.name || npub.slice(0, 16) + "...";
  const truncatedNpub = npub.slice(0, 20) + "..." + npub.slice(-8);

  return (
    <div className="profile-card">
      {profile?.picture && (
        <img
          src={profile.picture}
          alt={displayName}
          className="profile-avatar"
        />
      )}
      <div className="profile-info">
        <h2 className="profile-name">{displayName}</h2>
        {profile?.about && <p className="profile-about">{profile.about}</p>}
        {profile?.nip05 && (
          <p className="profile-nip05">{profile.nip05}</p>
        )}
        <p className="profile-npub">{truncatedNpub}</p>
      </div>
    </div>
  );
}
