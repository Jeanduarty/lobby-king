"use client";

import { ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useOpenFiles } from "@/hooks/useOpenFiles";

interface FileProps extends LinkProps {
  children: ReactNode[];
}

export function File(props: FileProps) {
  const { markFileAsOpen } = useOpenFiles();
  const pathName = usePathname();

  const isCurrentActive = pathName === props.href;

  return (
    <Link
      data-active={isCurrentActive}
      onClick={() => markFileAsOpen(props.href.toString())}
      className="flex text-sm items-center gap-2 py-1 px-4 pl-10 text-[#A9A9A9]
       hover:bg-[#754436] data-[active=true]:bg-[#754436]
        data-[active=true]:text-[#FFF]"
      {...props}
    />
  );
}
