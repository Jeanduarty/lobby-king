"use client";

import { AllMatches, GetAllMatches } from "@/utils/GetAllMatches";
import { createContext, useContext, useState } from "react";

type ExploreFilesContextData = {
  UpdateMatches: () => void;
  matches: AllMatches;
  allFilesForTab: OpenFilesTabsProps[];
};

type OpenFilesTabsProps = {
  match_id: string;
  winner: string;
  date: string;
  path: string;
};

const ExploreFilesContext = createContext({} as ExploreFilesContextData);

export function ExploreFilesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [matches, setMatches] = useState({} as AllMatches);
  const [allFilesForTab, setAllFilesForTab] = useState(
    [] as OpenFilesTabsProps[]
  );

  async function UpdateMatches() {
    const updatingData = await GetAllMatches();

    const allFilesFormattedForTab = updatingData.historic.map((item) => ({
      date: String(item.date),
      match_id: String(item.match_id),
      winner: item.winner,
      path: `/matches/${item.match_id}`,
    }));

    setMatches(updatingData);
    setAllFilesForTab(allFilesFormattedForTab);
  }

  return (
    <ExploreFilesContext.Provider
      value={{ UpdateMatches, matches, allFilesForTab }}
    >
      {children}
    </ExploreFilesContext.Provider>
  );
}

export function useExploreFiles() {
  return useContext(ExploreFilesContext);
}
