import Image from "next/image";

import hcIcon from "../../assets/hc.png";
import midIcon from "../../assets/mid.png";
import offlaneIcon from "../../assets/offlane.png";
import sup4Icon from "../../assets/sup4.png";
import sup5Icon from "../../assets/sup5.png";

import { Spinner } from "../Spinner";
import { Tooltip } from "../Tooltip";
import { Coins } from "lucide-react";

type playersDataProps = {
  playerId: number;
  nameHero: string;
  kda: { kills: number; deaths: number; assists: number };
  isRadiant: boolean;
  netWorth: string;
  nickname: string;
  position: Positions;
};

type HeroCardProps = {
  playersData: playersDataProps[];
};

const positions = {
  POSITION_1: hcIcon,
  POSITION_2: midIcon,
  POSITION_3: offlaneIcon,
  POSITION_4: sup4Icon,
  POSITION_5: sup5Icon,
};

type Positions =
  | "POSITION_1"
  | "POSITION_2"
  | "POSITION_3"
  | "POSITION_4"
  | "POSITION_5";

export function HeroCard({ playersData }: HeroCardProps) {
  function setRole(position: Positions) {
    const icon = positions[position];
    return icon;
  }

  return (
    <div className="flex gap-2 items-center">
      {playersData.length > 1 ? (
        playersData.map((player) => (
          <a
            key={player.playerId}
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
              className="w-full rounded-tl-md rounded-tr-md h-[50px]"
              priority
            />
            <div className="flex flex-col items-center gap-2">
              <Image src={setRole(player.position)} alt="" width={16} />
              <span className="text-[#DDD] text-sm font-bold">{`${player.kda.kills} / ${player.kda.deaths} / ${player.kda.assists}`}</span>
              <div className="flex items-center gap-2 mt-1">
                <Coins size={14} color="#FFD700" />
                <span className="text-[#FFD700] text-xs font-bold font-mono">
                  {player.netWorth}
                </span>
              </div>
              <Tooltip title={player.nickname}>
                <span
                  className="text-[#DDD] text-xs border-t-2 border-zinc-900 p-2 text-ellipsis whitespace-nowrap
                     w-[95px] overflow-hidden text-center"
                >
                  {player.nickname}
                </span>
              </Tooltip>
            </div>
          </a>
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}
