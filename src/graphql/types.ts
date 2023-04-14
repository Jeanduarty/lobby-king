type Player = {
  hero: {
    name: string
  },
  kills: number,
  deaths: number,
  assists: number,
  level: number,
  networth: number,
  position: string,
  isRadiant: boolean,
  steamAccount: {
    id: number,
    name: string
    avatar: string
  }
}

type Match = {
  didRadiantWin: boolean,
  startDateTime: number,
  durationSeconds: number,
  players: Player[]
}


export type GET_DATA_Props = {
  match: Match
}