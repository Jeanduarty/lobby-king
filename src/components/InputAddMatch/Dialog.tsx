"use client";

import * as D from "@radix-ui/react-dialog";
import { Check, Send, X } from "lucide-react";
import { RadioGroup } from "./RadioGroup";

type DialogProps = {
  handleChangeTeamWinner: (teamWinner: string) => void;
  handleClickCheckMatchId: () => void;
  isOkToOpenDialog: boolean;
  handleCloseDialog: () => void;
  handleClickConfirmAddMatch: () => void;
  loading: boolean;
  handleChangePassword: (value: string) => void;
};

export function Dialog({
  handleChangeTeamWinner,
  handleClickCheckMatchId,
  isOkToOpenDialog,
  handleCloseDialog,
  handleClickConfirmAddMatch,
  handleChangePassword,
}: DialogProps) {
  return (
    <D.Root open={isOkToOpenDialog} onOpenChange={handleCloseDialog}>
      <D.Trigger asChild>
        <Send
          size={18}
          className="rotate-45 cursor-pointer text-[#A9A9A9] hover:text-[#FFF]"
          onClick={handleClickCheckMatchId}
        />
      </D.Trigger>

      <D.Portal>
        <D.Overlay className="DialogOverlay" />
        <D.Content className="DialogContent">
          <D.Title className="text-[#CCC] font-bold">Quem venceu?</D.Title>
          <div className="flex justify-center mt-4">
            <RadioGroup handleChangeTeamWinner={handleChangeTeamWinner} />
          </div>

          <D.Close asChild>
            <button
              className="text-[#CCC] absolute top-4 right-6"
              aria-label="Close"
            >
              <X />
            </button>
          </D.Close>

          <div className="mt-8 flex">
            <input
              type="password"
              onChange={(e) => handleChangePassword(String(e.target.value))}
              placeholder="password"
              className="bg-transparent border border-[#A9A9A9] max-w-[150px] px-2 py-[2px] rounded-lg text-sm 
                focus:border-[#FFF] outline-none text-white text-center"
            />
            <button
              className="text-[#EEE] text-sm bg-green-900 hover:bg-green-700 font-bold px-3 py-2
                 rounded-md flex items-center gap-1 ml-auto"
              aria-label="Close"
              onClick={handleClickConfirmAddMatch}
            >
              Confirmar
              <Check size={18} />
            </button>
          </div>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
