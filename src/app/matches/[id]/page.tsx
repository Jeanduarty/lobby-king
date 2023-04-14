import { Matchup } from "@/components/Matchup";
import { GetAllMatchData } from "@/utils/GetAllMatchData";

type Match = {
  match_id: number;
};

export default async function Matches(context: any) {
  const id = context.params.id;
  const data = await GetAllMatchData(id);
  console.log(context, "PARAMS");

  return (
    <>
      <div
        className="h-full bg-[#141213]
         border-t border-[rgba(129,124,156,0.15)] flex items-center justify-center"
      >
        <Matchup dataMatch={data} />
      </div>
    </>
  );
}

// export async function generateStaticParams() {
//   const matches: Match[] = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/matches/api`
//   ).then((res) => res.json());

//   const pages = matches.map((match) => ({
//     id: String(match.match_id),
//   }));

//   return pages;
// }
