"use client";

import { Gamepad2 } from "lucide-react";
import { Folder } from "./Folder";
import { File } from "./File";

import { AllMatchesProps } from "@/utils/GetAllMatches";
import { Score } from "./Score";
import { usePathname } from "next/navigation";

type ExplorerProps = {
  allMatches: AllMatchesProps;
};

export function Explorer({ allMatches }: ExplorerProps) {
  const pathName = usePathname();

  const isOpenFolderTeamSkizo = allMatches.teamSkizo.find((match) =>
    pathName.includes(String(match.match_id))
  )
    ? true
    : false;

  const isOpenFolderTeamEfemero = allMatches.teamEfemero.find((match) =>
    pathName.includes(String(match.match_id))
  )
    ? true
    : false;

  return (
    <>
      <nav className="flex flex-col h-full">
        {!!Object.keys(allMatches).length ? (
          <>
            <Folder title="Team Skizo" defaultOpen={isOpenFolderTeamSkizo}>
              {allMatches.teamSkizo.map((match) => (
                <File href={`/matches/${match.match_id}`} key={match.match_id}>
                  <Gamepad2 size={16} />
                  {match.date}
                </File>
              ))}
            </Folder>

            <Folder title="Team Efemero" defaultOpen={isOpenFolderTeamEfemero}>
              {allMatches.teamEfemero.map((match) => (
                <File href={`/matches/${match.match_id}`} key={match.match_id}>
                  <Gamepad2 size={16} />
                  {match.date}
                </File>
              ))}
            </Folder>

            <Folder title="Histórico">
              {allMatches.historic.map((match) => (
                <File href={`/matches/${match.match_id}`} key={match.match_id}>
                  <Gamepad2 size={16} />
                  {match.date}
                </File>
              ))}
            </Folder>

            {/* <Folder title="Score">
              <Score matches={matches}/>
            </Folder> */}
          </>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
}
