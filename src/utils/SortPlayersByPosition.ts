import { playersDataProps } from "@/utils/GetAllMatchData";

type SortPlayersByPositionProps = playersDataProps[]

export function SortPlayersByPosition(team: SortPlayersByPositionProps) {
  const sortedTeam: playersDataProps[] = []

  team.forEach(player => {
    if (player.position === "POSITION_1") sortedTeam[0] = player
    if (player.position === "POSITION_2") sortedTeam[1] = player
    if (player.position === "POSITION_3") sortedTeam[2] = player
    if (player.position === "POSITION_4") sortedTeam[3] = player
    if (player.position === "POSITION_5") sortedTeam[4] = player
  })

  return sortedTeam
}