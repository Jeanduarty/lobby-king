type Match = {
  match_id: number;
  winner: string;
  date: number | string;
  radiant_win: boolean;
};

export type AllMatches = {
  teamEfemero: Match[];
  teamSkizo: Match[];
  historic: Match[];
};

const baseUrl = process.env.BASE_URL
  ? process.env.BASE_URL
  : process.env.NEXT_PUBLIC_VERCEL_URL;

export async function GetAllMatches() {
  // Função para pegar todas as partidas e reorganizar em um array para
  //facilitar na hora de criar os componentes
  const formattedAllMatches: AllMatches = {
    teamEfemero: [],
    teamSkizo: [],
    historic: [],
  };

  const data = await fetch(`https://${baseUrl}/matches/api`)
    .then((res) => res.json());

  data.forEach((match: Match) => {
    const formattedMatch = {
      match_id: match?.match_id,
      winner: match?.winner,
      date: new Date(match?.date as number * 1000).toLocaleDateString(),
      radiant_win: match?.radiant_win
    };
    formattedAllMatches?.historic.push(formattedMatch);

    if (match?.winner === "teamEfemero") {
      return formattedAllMatches.teamEfemero.push(formattedMatch);
    }

    if (match?.winner === "teamSkizo") {
      return formattedAllMatches.teamSkizo.push(formattedMatch);
    }
  });
  return formattedAllMatches;
}