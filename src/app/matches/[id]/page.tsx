import { Matchup } from "@/components/Matchup";
import { GetAllMatchData } from "@/utils/GetAllMatchData";

// type Match = {
//   match_id: number;
// };

export default async function Matches(context: any) {
  const id = context.params.id;
  const data = await GetAllMatchData(id);
  // console.log(context, "PARAMS");

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
