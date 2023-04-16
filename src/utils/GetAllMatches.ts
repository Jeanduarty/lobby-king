type Match = {
  match_id: number;
  winner: string;
  date: number | string;
  radiant_win: boolean;
};

export type AllMatchesProps = {
  teamEfemero: Match[];
  teamSkizo: Match[];
  historic: Match[];
};

type ReduceReturnType = Omit<AllMatchesProps, "">

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_VERCEL_URL;

export async function GetAllMatches() {
  // Função para pegar todas as partidas e reorganizar em um array para
  //facilitar na hora de criar os componentes
  try {
    const data: Match[] = await fetch(`${baseUrl}/matches/api`, { next: { revalidate: 2 }, cache: "no-store" })
      .then((res) => res.json());

    const allMatches = data.reduce((acc, current) => {
      const formattedMatch = {
        match_id: current.match_id,
        winner: current.winner,
        date: new Date(current.date as number * 1000).toLocaleDateString(),
        radiant_win: current.radiant_win
      };
      acc.historic.push(formattedMatch)

      if (current.winner === "teamEfemero") {
        acc.teamEfemero.push(formattedMatch)
      }

      if (current.winner === "teamSkizo") {
        acc.teamSkizo.push(formattedMatch)
      }

      return acc
    }, { teamEfemero: [], teamSkizo: [], historic: [] } as ReduceReturnType);

    return allMatches;

  } catch (error) {
    console.log("DEU RUIM NO GETALLMATCHES");
    return { teamEfemero: [], teamSkizo: [], historic: [] } as ReduceReturnType
  }
}