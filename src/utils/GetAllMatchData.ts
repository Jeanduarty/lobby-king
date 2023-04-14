import client from "@/graphql/client";
import { GET_DATA } from "@/graphql/queries";
import { GET_DATA_Props } from "@/graphql/types";
import { SortPlayersByPosition } from "./SortPlayersByPosition";

export type playersDataProps = {
  playerId: number;
  nameHero: string;
  kda: { kills: number; deaths: number; assists: number };
  isRadiant: boolean;
  netWorth: string;
  nickname: string;
  position: Positions
};

type Positions = | "POSITION_1"
  | "POSITION_2"
  | "POSITION_3"
  | "POSITION_4"
  | "POSITION_5"

type matchDataProps = {
  match_id: number;
  winner: string;
  date: number | string;
  radiant_win: boolean;
};

type ReduceReturnType = {
  teamRadiantPlayers: playersDataProps[];
  teamDirePlayers: playersDataProps[];
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_VERCEL_URL;

export async function GetAllMatchData(id: string) {
  const data: GET_DATA_Props = await client.request(GET_DATA(Number(id)));

  const matchData: matchDataProps = await fetch(`${baseUrl}/matches/api/${id}`).then(
    (res) => res.json()
  );

  const playerData = data.match.players.reduce((acc, current) => {
    //faço esse replace pra obter o nome exato do hero para buscar a imagem
    const nameHero = current.hero.name.replace("npc_dota_hero_", "");
    const imageUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${nameHero}.png?`;

    const playerData = {
      playerId: current.steamAccount.id,
      nickname: current.steamAccount.name,
      nameHero: imageUrl,
      kda: {
        kills: current.kills,
        deaths: current.deaths,
        assists: current.assists,
      },
      position: current.position as Positions,
      isRadiant: current.isRadiant,
      netWorth: new Intl.NumberFormat().format(current.networth),
    };

    if (playerData.isRadiant) {
      acc.teamRadiantPlayers.push(playerData);
    }

    if (!playerData.isRadiant) {
      acc.teamDirePlayers.push(playerData);
    }

    return acc
  }, { teamRadiantPlayers: [], teamDirePlayers: [] } as ReduceReturnType)

  const allMatchData = {
    matchId: id,
    teamRadiant: SortPlayersByPosition(playerData.teamRadiantPlayers),
    teamDire: SortPlayersByPosition(playerData.teamDirePlayers),
    winner: {
      nameTeam: matchData.winner,
      radiant_win: data.match.didRadiantWin
    },
  }

  return allMatchData
}

