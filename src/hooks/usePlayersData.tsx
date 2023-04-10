"use client";

import { GetAllTeamPlayers, playersDataProps } from "@/utils/GetAllTeamPlayers";
import { createContext, useContext, useEffect, useState } from "react";

type AllPlayersDataProps = {
  matchId: string;
  teamRadiant: playersDataProps[];
  teamDire: playersDataProps[];
  winner: {
    nameTeam: string;
    radiant_win: boolean;
  };
};

type PlayersDataContextData = {
  allPlayersData: AllPlayersDataProps[];
};

type Match = {
  match_id: number;
  winner: string;
  date: number;
  radiant_win: boolean;
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_VERCEL_URL;

const PlayersDataContext = createContext({} as PlayersDataContextData);

export function PlayersDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allPlayersData, setAllPlayersData] = useState(
    [] as AllPlayersDataProps[]
  );

  useEffect(() => {
    async function allPlayersDataInitial() {
      const data: Match[] = await fetch(`${baseUrl}/matches/api`).then((res) =>
        res.json()
      );
      const allMatchesId = data.map((match) => String(match.match_id));

      const allPlayersDataInitial: AllPlayersDataProps[] = await Promise.all(
        allMatchesId.map(async (id) => {
          const data = await GetAllTeamPlayers(id);
          return data;
        })
      );
      setAllPlayersData(allPlayersDataInitial);
    }

    allPlayersDataInitial();
  }, []);

  async function UpdatePlayersData() {
    return;
  }

  return (
    <PlayersDataContext.Provider value={{ allPlayersData }}>
      {children}
    </PlayersDataContext.Provider>
  );
}

export function usePlayersData() {
  return useContext(PlayersDataContext);
}
