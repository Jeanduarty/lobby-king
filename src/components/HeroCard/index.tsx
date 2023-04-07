import Image from "next/image";
import hcIcon from "../../assets/hc.png";
import { Spinner } from "../Spinner";

type playersDataProps = {
  playerId: number;
  nameHero: string;
  kda: { kills: number; deaths: number; assists: number };
  isRadiant: boolean;
  netWorth: number;
  nickname: string;
};

type HeroCardProps = {
  playersData: playersDataProps[];
};

export function HeroCard({ playersData }: HeroCardProps) {
  return (
    <div className="flex gap-2 items-center">
      {playersData.length > 1 ? (
        playersData.map((player) => (
          <a
            target="_blank"
            href={`https://www.opendota.com/players/${player.playerId}`}
            className="flex flex-col items-center gap-2 bg-zinc-800 rounded-md
            hover:scale-105 cursor-pointer transition ease-in-out duration-200"
          >
            <Image
              alt=""
              src={player?.nameHero}
              width={80}
              height={80}
              className="w-full rounded-tl-md rounded-tr-md"
              priority
            />
            <div className="flex flex-col items-center gap-2">
              <Image src={hcIcon} alt="" width={16} />
              <span className="text-[#DDD] text-sm font-bold">{`${player.kda.kills} / ${player.kda.deaths} / ${player.kda.assists}`}</span>
              <span
                className="text-[#DDD] text-xs border-t-2 border-zinc-900 p-2 text-ellipsis whitespace-nowrap
                     w-[95px] overflow-hidden text-center"
              >
                {player.nickname}
              </span>
            </div>
          </a>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}
