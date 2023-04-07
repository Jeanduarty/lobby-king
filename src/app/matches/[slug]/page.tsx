import hcIcon from "../../../assets/hc.png";
import midIcon from "../../../assets/mid.png";
import offlaneIcon from "../../../assets/offlane.png";
import sup4Icon from "../../../assets/sup4.png";
import sup5Icon from "../../../assets/sup5.png";
import { HeroCard } from "@/components/HeroCard";
import { GetAllTeamPlayers } from "@/utils/GetAllTeamPlayers";

type NameTeamProps = {
  nameTeam: string;
  radiant_win: boolean;
};

function NameTeams({ nameTeam, radiant_win }: NameTeamProps) {
  const nameTeamWinner =
    nameTeam === "teamSkizo" ? "TEAM SKIZO" : "TEAM EFEMERO";
  const nameTeamLoser =
    nameTeam === "teamSkizo" ? "TEAM EFEMERO" : "TEAM SKIZO";

  const teamRadiant = radiant_win ? nameTeamWinner : nameTeamLoser;
  const teamDire = !radiant_win ? nameTeamWinner : nameTeamLoser;

  return {
    teamRadiant: teamRadiant,
    teamDire: teamDire,
    teamWinner: nameTeamWinner,
  };
}

export default async function Matches(context: any) {
  const slug = context.params.slug;

  const data = await GetAllTeamPlayers(slug);
  const nameTeams = NameTeams(data.winner);
  const colorTeam = data?.winner?.radiant_win ? "#00693E" : "#D2122E";

  return (
    <>
      <div
        className="h-full bg-[#141213]
       border-t border-[rgba(129,124,156,0.15)] flex items-center justify-center"
      >
        <div className="bg-zinc-900 p-4 rounded-md">
          <div className="flex justify-between">
            <h1 className="text-[#DDD] text-xl mb-4">
              WINNER | {""}
              <span style={{ color: colorTeam }}>{nameTeams.teamWinner}</span>
            </h1>
            <p className="text-[#AAA] hover:text-[#FFF]">{slug}</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <span className="text-[#AAA] italic">
              <span className="text-[#00693E]">RADIANT - </span>
              {nameTeams.teamRadiant}
            </span>
            <HeroCard playersData={data.teamRadiant} />
            <span className="text-white text-2xl">VS</span>
            <HeroCard playersData={data.teamDire} />
            <span className="text-[#AAA] italic">
              <span className="text-[#D2122E]">DIRE - </span>
              {nameTeams.teamDire}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
