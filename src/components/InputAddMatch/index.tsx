"use client";

import { useState } from "react";
import { Dialog } from "./Dialog";
import { Spinner } from "../Spinner";
import { useExploreFiles } from "@/hooks/useExploreFiles";
import { useRouter } from "next/navigation";
import { useOpenFiles } from "@/hooks/useOpenFiles";
import axios from "axios";
import { usePlayersData } from "@/hooks/usePlayersData";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.NEXT_PUBLIC_VERCEL_URL;

export function InputAddMatch() {
  const [teamWinner, setTeamWinner] = useState("teamEfemero");
  const [matchId, setMatchId] = useState("");
  const [isOkToOpenDialog, setIsOkToOpenDialog] = useState(false);
  const [dataMatch, setDataMatch] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const { UpdateMatches } = useExploreFiles();
  const { whenAddNewFile } = useOpenFiles();
  const { push } = useRouter();

  function handleChangeTeamWinner(teamWinner: string) {
    setTeamWinner(teamWinner);
  }

  function handleChangePassword(password: string) {
    setPassword(password);
  }

  function handleCloseDialog() {
    setIsOkToOpenDialog(false);
  }

  async function handleClickCheckMatchId() {
    setLoading(true);

    try {
      const isMatchExist = await axios
        .get(`${baseUrl}/matches/api/${matchId}`)
        .then((res) => res.data);
      console.log(isMatchExist, "asdsa");

      if (!!isMatchExist) {
        return setLoading(false);
      }

      const responseOpenDotaMatchId = await axios.get(
        `https://api.opendota.com/api/matches/${matchId}`
      );

      const status = responseOpenDotaMatchId.status;

      if (status === 200) {
        const data = await responseOpenDotaMatchId.data;
        setDataMatch(data);
        setIsOkToOpenDialog(true);
      }
      return setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("MATCH HAS NOT FOUND");
      return console.log(error);
    }
  }

  async function handleClickConfirmAddMatch() {
    if (password === process.env.NEXT_PUBLIC_PASSWORD) {
      try {
        await axios.post(`${baseUrl}/matches/api`, {
          match_id: Number(matchId),
          winner: teamWinner,
          date: dataMatch.start_time,
          radiant_win: dataMatch?.radiant_win,
        });

        UpdateMatches();
        setMatchId("");
        setIsOkToOpenDialog(false);
        whenAddNewFile(`/matches/${matchId}`);
        return push(`/matches/${matchId}`);
      } catch (error) {
        console.log(error);
      }
    }
    alert("SENHA INCORRETA!");
  }

  return (
    <div className="flex items-center gap-1 pl-3 py-4 text-white">
      <input
        value={matchId}
        type="number"
        className="bg-transparent border border-[#A9A9A9] max-w-[150px] px-2 py-[2px] rounded-lg text-sm 
        focus:border-[#FFF] outline-none"
        placeholder="Match ID"
        onChange={(e) => setMatchId(e.target.value)}
      />

      {loading ? (
        <Spinner />
      ) : (
        <Dialog
          handleChangeTeamWinner={handleChangeTeamWinner}
          handleClickCheckMatchId={handleClickCheckMatchId}
          isOkToOpenDialog={isOkToOpenDialog}
          handleCloseDialog={handleCloseDialog}
          handleClickConfirmAddMatch={handleClickConfirmAddMatch}
          loading={loading}
          handleChangePassword={handleChangePassword}
        />
      )}
    </div>
  );
}
