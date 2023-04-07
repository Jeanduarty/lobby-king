import teamSkizoImage from "../../assets/teamSkizo.png";
import teamEfemeroImage from "../../assets/teamEfemero.png";

import Image from "next/image";
import { AllMatches } from "@/utils/GetAllMatches";

type ScoreProps = {
  matches: AllMatches;
};

export function Score({ matches }: ScoreProps) {
  return (
    <div className="py-1 pl-6 text-zinc-300 font-semibold mt-1">
      <div className="flex text-sm items-center gap-2 pr-2">
        <Image src={teamSkizoImage} alt="" width={24} height={24} />
        <h1 className="flex items-center justify-between w-full">
          Team Efemero <span>| {matches.teamEfemero.length}</span>
        </h1>
      </div>
      <span className="pl-16 my-1 block">X</span>
      <div className="flex text-sm items-center gap-2 pr-2">
        <Image src={teamEfemeroImage} alt="" width={24} height={24} />
        <h1 className="flex items-center justify-between w-full">
          Team Skizo <span>| {matches.teamSkizo.length}</span>
        </h1>
      </div>
    </div>
  );
}
