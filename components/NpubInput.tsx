"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NpubInput() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed.startsWith("npub1") || trimmed.length < 60) {
      setError("Please enter a valid npub (starts with npub1)");
      return;
    }
    setError("");
    router.push(`/${trimmed}`);
  }

  return (
    <form onSubmit={handleSubmit} className="npub-input-form">
      <div className="input-row">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter an npub..."
          className="npub-input"
        />
        <button type="submit" className="npub-button">
          Look up
        </button>
      </div>
      {error && <p className="npub-error">{error}</p>}
    </form>
  );
}
