"use client";

import { ReactNode } from "react";
import * as TP from "@radix-ui/react-tooltip";

type TooltipProps = {
  children: ReactNode;
  title: string;
};

export function Tooltip({ children, title }: TooltipProps) {
  return (
    <TP.Provider>
      <TP.Root>
        <TP.Trigger asChild>{children}</TP.Trigger>
        <TP.Portal>
          <TP.Content
            sideOffset={5}
            side="bottom"
            className="text-xs text-center bg-[#DDD] py-1 px-2 rounded"
          >
            {title}
            <TP.Arrow className="text-[#DDD]" />
          </TP.Content>
        </TP.Portal>
      </TP.Root>
    </TP.Provider>
  );
}
