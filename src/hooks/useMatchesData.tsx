"use client";

import { GetAllMatchData, playersDataProps } from "@/utils/GetAllMatchData";
import { AllMatchesProps, GetAllMatches } from "@/utils/GetAllMatches";
import { createContext, useContext, useEffect, useState } from "react";

export type AllPlayersDataProps = {
  matchId: string;
  teamRadiant: playersDataProps[];
  teamDire: playersDataProps[];
  winner: {
    nameTeam: string;
    radiant_win: boolean;
  };
};

type allFilesForTabProps = {
  date: string;
  match_id: string;
  winner: string;
  path: string;
};

type MatchesDataContextData = {
  allMatchesData: AllPlayersDataProps[];
  UpdatePlayersData: () => Promise<void>;
  allMatchesForExplorer: AllMatchesProps;
  allFilesForTab: allFilesForTabProps[];
};

const MatchesDataContext = createContext({} as MatchesDataContextData);

export function MatchesDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allMatchesData, setAllMatchesData] = useState(
    [] as AllPlayersDataProps[]
  );
  const [allFilesForTab, setAllFilesForTab] = useState(
    [] as allFilesForTabProps[]
  );
  const [allMatchesForExplorer, setAllMatchesForExplorer] = useState(
    {} as AllMatchesProps
  );

  async function getAllMatchesData() {
    const data = await GetAllMatches();
    setAllMatchesForExplorer(data);

    const allFilesForTab = data.historic.map((item) => ({
      date: String(item.date),
      match_id: String(item.match_id),
      winner: item.winner,
      path: `/matches/${item.match_id}`,
    }));
    setAllFilesForTab(allFilesForTab);

    const allMatchesOnlyIdAndWinner = data.historic.map((match) => ({
      matchId: String(match.match_id),
      winner: match.winner,
    }));
    const allMatchesData: AllPlayersDataProps[] = await Promise.all(
      allMatchesOnlyIdAndWinner.map(async (match) => {
        const data = await GetAllMatchData(match.matchId, match.winner);
        return data;
      })
    );
    setAllMatchesData(allMatchesData);
  }

  useEffect(() => {
    getAllMatchesData();
  }, []);

  async function UpdatePlayersData() {
    await getAllMatchesData();
    return;
  }

  return (
    <MatchesDataContext.Provider
      value={{
        allFilesForTab,
        allMatchesData,
        UpdatePlayersData,
        allMatchesForExplorer,
      }}
    >
      {children}
    </MatchesDataContext.Provider>
  );
}

export function useMatchesData() {
  return useContext(MatchesDataContext);
}
