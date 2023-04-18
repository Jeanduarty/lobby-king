"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useOpenFiles } from "@/hooks/useOpenFiles";
import { useMatchesData } from "@/hooks/useMatchesData";

import { CloseFileButton } from "./CloseFileButton";
import { Gamepad2 } from "lucide-react";

export function OpenFilesTabs() {
  const { allFilesForTab } = useMatchesData();
  const { openFiles } = useOpenFiles();

  const pathName = usePathname();

  return (
    <div className="h-9 text-transparent text-sm flex flex-row mt-14">
      {openFiles?.map((openFile, index) => {
        const isActive = pathName === openFile;

        const file = allFilesForTab.find((file) => file.path === openFile);

        if (!file) {
          return <div key={index}></div>;
        }

        return (
          <div
            key={index}
            data-active={isActive}
            className="h-full flex items-center gap-[6px] pl-[10px] hover:bg-[#817c9c26]
             hover:text-[#908caa] data-[active=true]:bg-[#141213]
              data-[active=true]:text-white data-[active=true]:border-b-2 border-[#754436]"
          >
            <Link href={openFile} className="flex gap-[6px] items-center ">
              <span className="text-white">{<Gamepad2 size={16} />}</span>
              <span
                data-active={isActive}
                className="text-[#908caa] data-[active=true]:text-[#e0def4] "
              >
                {file.match_id}
              </span>
            </Link>
            <span className="w-7 flex items-center">
              <CloseFileButton isActive={isActive} index={index} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
