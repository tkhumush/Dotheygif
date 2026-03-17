import { nip19, SimplePool, Event } from "nostr-tools";

const BOOTSTRAP_RELAYS = [
  "wss://relay.damus.io",
  "wss://relay.nostr.band",
  "wss://nos.lol",
  "wss://purplepag.es",
];

const POOL_TIMEOUT = 8000;

export function npubToHex(npub: string): string {
  const decoded = nip19.decode(npub);
  if (decoded.type !== "npub") throw new Error("Invalid npub");
  return decoded.data as string;
}

export async function fetchRelayList(pubkeyHex: string): Promise<string[]> {
  const pool = new SimplePool();
  try {
    const event = await Promise.race([
      pool.get(BOOTSTRAP_RELAYS, {
        kinds: [10002],
        authors: [pubkeyHex],
      }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), POOL_TIMEOUT)),
    ]);

    if (!event) return BOOTSTRAP_RELAYS;

    const relays = event.tags
      .filter((t) => t[0] === "r" && (!t[2] || t[2] === "write"))
      .map((t) => t[1]);

    return relays.length > 0 ? relays : BOOTSTRAP_RELAYS;
  } finally {
    pool.close(BOOTSTRAP_RELAYS);
  }
}

export interface NostrProfile {
  name?: string;
  display_name?: string;
  picture?: string;
  about?: string;
  nip05?: string;
}

export async function fetchProfile(
  pubkeyHex: string,
  relays: string[]
): Promise<NostrProfile | null> {
  const pool = new SimplePool();
  try {
    const event = await Promise.race([
      pool.get(relays, {
        kinds: [0],
        authors: [pubkeyHex],
      }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), POOL_TIMEOUT)),
    ]);

    if (!event) return null;
    return JSON.parse(event.content);
  } catch {
    return null;
  } finally {
    pool.close(relays);
  }
}

export async function fetchNotes(
  pubkeyHex: string,
  relays: string[]
): Promise<Event[]> {
  const pool = new SimplePool();
  try {
    const events = await Promise.race([
      pool.querySync(relays, {
        kinds: [1],
        authors: [pubkeyHex],
        limit: 1000,
      }),
      new Promise<Event[]>((resolve) => setTimeout(() => resolve([]), POOL_TIMEOUT * 4)),
    ]);

    return events || [];
  } finally {
    pool.close(relays);
  }
}

const GIF_REGEX = /https?:\/\/\S+\.gif(\?\S*)?/i;
const GIF_SERVICE_REGEX = /https?:\/\/\S*(giphy\.com|tenor\.com|gfycat\.com|imgur\.com\/\S*gifv?)\S*/i;

export function countGifs(events: Event[]): {
  withGif: number;
  withoutGif: number;
  total: number;
} {
  let withGif = 0;
  for (const e of events) {
    if (GIF_REGEX.test(e.content) || GIF_SERVICE_REGEX.test(e.content)) withGif++;
  }
  return { withGif, withoutGif: events.length - withGif, total: events.length };
}
