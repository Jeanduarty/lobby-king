import { AllPlayersDataProps, useMatchesData } from "@/hooks/useMatchesData";
import { Spinner } from "../Spinner";
import { HeroCard } from "./HeroCard";

type NameTeamProps = {
  nameTeam: string;
  radiant_win: boolean;
};

type MatchupProps = {
  matchId: string;
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

export function Matchup({ matchId }: MatchupProps) {
  const { allMatchesData } = useMatchesData();

  const dataMatch = allMatchesData.find(match => match.matchId === matchId)

  if (!dataMatch) {
    return (
      <div
        className="bg-[#141213] h-full w-full flex items-center justify-center rounded-br-2xl
        border-t border-[rgba(129,124,156,0.15)]"
      >
        <Spinner />
        <span className="text-sm pl-4 text-[#EEE]">
          this page is being loaded.
        </span>
      </div>
    );
  }

  const nameTeams = NameTeams(dataMatch?.winner);
  const colorTeam = dataMatch.winner.radiant_win ? "#00693E" : "#D2122E";

  return (
    <div className="bg-zinc-900 p-4 rounded-md">
      <div className="flex justify-between">
        <h1 className="text-[#DDD] text-xl mb-4">
          WINNER | {""}
          <span style={{ color: colorTeam }}>{nameTeams.teamWinner}</span>
        </h1>
        <p className="text-[#AAA] hover:text-[#FFF]">{dataMatch.matchId}</p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-[#AAA] italic">
          <span className="text-[#00693E]">RADIANT - </span>
          {nameTeams.teamRadiant}
        </span>
        <HeroCard playersData={dataMatch.teamRadiant} />
        <span className="text-white text-2xl">VS</span>
        <HeroCard playersData={dataMatch.teamDire} />
        <span className="text-[#AAA] italic">
          <span className="text-[#D2122E]">DIRE - </span>
          {nameTeams.teamDire}
        </span>
      </div>
    </div>
  );
}
