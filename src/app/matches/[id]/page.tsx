"use client";

import { Matchup } from "@/components/Matchup";

export default function Matches({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div
      className="h-full bg-[#141213]
         border-t border-[rgba(129,124,156,0.15)] flex items-center justify-center max-h-[575px] rounded-br-2xl"
    >
      <Matchup matchId={id} />
    </div>
  );
}
