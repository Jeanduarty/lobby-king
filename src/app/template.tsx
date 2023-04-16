import { Explorer } from "@/components/Explorer";
import { InputAddMatch } from "@/components/InputAddMatch";
import { OpenFilesTabs } from "@/components/OpenFilesTabs";

import { OpenFilesProvider } from "@/hooks/useOpenFiles";
import { GetAllMatches } from "@/utils/GetAllMatches";

import Image from "next/image";
import bgDota from "../assets/bg-dota.jpg";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("renderizei");

  const allMatches = await GetAllMatches();
  const allFilesForTabInitial = allMatches.historic.map((item) => ({
    date: String(item.date),
    match_id: String(item.match_id),
    winner: item.winner,
    path: `/matches/${item.match_id}`,
  }));

  return (
    <OpenFilesProvider>
      <div className="grid grid-cols-[200px,1fr] h-full">
        <div
          className="bg-gradient-to-b from-[#161214] via-[#754436] to-[#161214]
       rounded-bl-2xl rounded-tl-2xl pt-14 flex flex-col justify-between"
        >
          <Explorer allMatches={allMatches} />

          <InputAddMatch />
        </div>

        <div className="h-full relative flex flex-col">
          <Image
            src={bgDota}
            alt=""
            fill={true}
            quality={100}
            priority
            className="object-cover rounded-br-2xl rounded-tr-2xl -z-10 w-full"
          />
          <OpenFilesTabs allFilesForTabInitial={allFilesForTabInitial} />
          <div className="h-full object-fill">{children}</div>
        </div>
      </div>
    </OpenFilesProvider>
  );
}
