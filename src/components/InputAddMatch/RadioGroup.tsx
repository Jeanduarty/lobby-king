"use client";

import * as R from "@radix-ui/react-radio-group";

import teamEfemero from "../../assets/teamEfemero.png";
import teamSkizo from "../../assets/teamSkizo.png";
import Image from "next/image";

type RadioGroupProps = {
  handleChangeTeamWinner: (teamWinner: string) => void;
};

export function RadioGroup({ handleChangeTeamWinner }: RadioGroupProps) {
  return (
    <R.Root
      orientation="horizontal"
      className="flex gap-8 items-center"
      defaultValue="teamEfemero"
      onValueChange={(value) => handleChangeTeamWinner(value)}
    >
      <div className="flex flex-col items-center gap-2 ">
        <span className="text-[#A9A9A9] font-bold italic">Team Efêmero</span>
        <label className="cursor-pointer" htmlFor="r1">
          <Image src={teamEfemero} alt="" width={80} />
        </label>
        <R.Item className="RadioGroupItem" value="teamEfemero" id="r1">
          <R.Indicator className="RadioGroupIndicator" />
        </R.Item>
      </div>

      <div className="flex flex-col items-center gap-2">
        <span className="text-[#A9A9A9] font-bold italic">Team Skizo</span>
        <label className="cursor-pointer" htmlFor="r2">
          <Image src={teamSkizo} alt="" width={86} />
        </label>
        <R.Item className="RadioGroupItem" value="teamSkizo" id="r2">
          <R.Indicator className="RadioGroupIndicator" />
        </R.Item>
      </div>
    </R.Root>
  );
}
