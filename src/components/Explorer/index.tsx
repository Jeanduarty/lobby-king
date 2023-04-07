"use client";

import { Gamepad2 } from "lucide-react";
import { Folder } from "./Folder";
import { File } from "./File";

import { AllMatches } from "@/utils/GetAllMatches";
import { useExploreFiles } from "@/hooks/useExploreFiles";
import { Score } from "./Score";

type ExplorerProps = {
  allMatches: AllMatches;
};

export function Explorer({ allMatches }: ExplorerProps) {
  const { matches: contextMatches } = useExploreFiles();

  const matches = !!Object.keys(contextMatches).length
    ? contextMatches
    : allMatches;

  return (
    <>
      <nav className="flex flex-col h-full">
        {!!Object.keys(matches).length ? (
          <>
            <Folder title="Team Skizo">
              {matches.teamSkizo.map((match) => (
                <File href={`/matches/${match.match_id}`} key={match.match_id}>
                  <Gamepad2 size={16} />
                  {match.date}
                </File>
              ))}
            </Folder>

            <Folder title="Team Efemero">
              {matches.teamEfemero.map((match) => (
                <File href={`/matches/${match.match_id}`} key={match.match_id}>
                  <Gamepad2 size={16} />
                  {match.date}
                </File>
              ))}
            </Folder>

            <Folder title="Histórico">
              {matches.historic.map((match) => (
                <File href={`/matches/${match.match_id}`} key={match.match_id}>
                  <Gamepad2 size={16} />
                  {match.date}
                </File>
              ))}
            </Folder>

            <Folder title="Score">
              <Score matches={matches}/>
            </Folder>
          </>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
}
