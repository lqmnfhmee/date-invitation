"use client";

import { useState } from "react";
import OpeningScreen from "../components/OpeningScreen";
import InvitationCard from "../components/InvitationCard";

export default function Home() {
  const [opened, setOpened] = useState(false);

  return (
    <main>
      {!opened ? (
        <OpeningScreen onOpen={() => setOpened(true)} />
      ) : (
        <div className="flex min-h-screen items-center justify-center bg-[#fff7f5] px-4 py-8">
          <InvitationCard />
        </div>
      )}
    </main>
  );
}