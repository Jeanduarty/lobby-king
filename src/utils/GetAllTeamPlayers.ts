type playersDataProps = {
  playerId: number;
  nameHero: string;
  kda: { kills: number; deaths: number; assists: number };
  isRadiant: boolean;
  netWorth: number;
  nickname: string;
};

type matchDataProps = {
  match_id: number;
  winner: string;
  date: number | string;
  radiant_win: boolean;
};

export async function GetAllTeamPlayers(slug: string) {
  const ApiOpendotaData = await fetch(`https://api.opendota.com/api/matches/${slug}`).then(
    (res) => res.json()
  );

  const matchData: matchDataProps = await fetch(`http://localhost:3000/matches/api/${slug}`).then(
    (res) => res.json()
  );

  const heroesOpendotaData: any[] = await fetch(
    "https://api.opendota.com/api/heroes"
  ).then((res) => res.json());

  const teamRadiantPlayers: playersDataProps[] = [];
  const teamDirePlayers: playersDataProps[] = [];

  ApiOpendotaData?.players.forEach((player: any) => {
    const heroData = heroesOpendotaData.find(
      (hero: any) => player?.hero_id === hero.id
    );

    const nameHero = heroData.name.replace("npc_dota_hero_", ""); //faço esse replace pra obter o nome exato do hero para buscar a imagem
    const imageUrl = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${nameHero}.png?`;

    const playerData: playersDataProps = {
      playerId: player?.account_id,
      nameHero: imageUrl,
      kda: {
        kills: player?.kills,
        deaths: player?.deaths,
        assists: player?.assists,
      },
      isRadiant: player?.isRadiant,
      netWorth: player?.net_worth,
      nickname: player?.personaname,
    };

    if (playerData.isRadiant) {
      teamRadiantPlayers.push(playerData);
    }

    if (!playerData.isRadiant) {
      teamDirePlayers.push(playerData);
    }
  });

  const finalDataTeamPlayers = {
    teamRadiant: teamRadiantPlayers,
    teamDire: teamDirePlayers,
    winner: {
      nameTeam: matchData?.winner,
      radiant_win: ApiOpendotaData?.radiant_win as boolean
    },
  }

  return finalDataTeamPlayers
}