"use client";

import { Gamepad2 } from "lucide-react";
import { Folder } from "./Folder";
import { File } from "./File";

import { useMatchesData } from "@/hooks/useMatchesData";
import { Spinner } from "../Spinner";
// import { Score } from "./Score";

export function Explorer() {
  const { allMatchesForExplorer: allMatches } = useMatchesData();
  console.log(allMatches)


  return (
    <>
      <nav className="flex flex-col h-full">
        <>
          <Folder title="Team Skizo">
            {allMatches?.teamSkizo?.length > 0 ? (
              allMatches.teamSkizo.map((match) => (
                <File href={`/matches/${match.match_id}`} key={match.match_id}>
                  <Gamepad2 size={16} />
                  {match.date}
                </File>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
          </Folder>

          <Folder title="Team Efemero">
            {allMatches?.teamEfemero?.length > 0 ? (
              allMatches.teamEfemero.map((match) => (
                <File href={`/matches/${match.match_id}`} key={match.match_id}>
                  <Gamepad2 size={16} />
                  {match.date}
                </File>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
          </Folder>

          <Folder title="Histórico">
            {allMatches?.historic?.length > 0 ? (
              allMatches.historic.map((match) => (
                <File href={`/matches/${match.match_id}`} key={match.match_id}>
                  <Gamepad2 size={16} />
                  {match.date}
                </File>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
          </Folder>

          {/* <Folder title="Score">
              <Score matches={matches}/>
            </Folder> */}
        </>
      </nav>
    </>
  );
}
