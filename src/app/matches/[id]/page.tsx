import { Matchup } from "@/components/Matchup";
import { GetAllMatchData } from "@/utils/GetAllMatchData";
import { GetAllMatches } from "@/utils/GetAllMatches";

type Match = {
  match_id: number;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_VERCEL_URL;

export default async function Matches({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await GetAllMatchData(id);

  return (
    <>
      <div
        className="h-full bg-[#141213]
         border-t border-[rgba(129,124,156,0.15)] flex items-center justify-center max-h-[575px] rounded-br-2xl"
      >
        <Matchup dataMatch={data} />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const matches: Match[] = await fetch(`${baseUrl}/matches/api`, {
    next: { revalidate: 2 },
  }).then((res) => res.json());

  const pages = matches.map((match) => ({
    id: String(match.match_id),
  }));

  return pages;
}
