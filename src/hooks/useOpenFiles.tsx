"use client";

import { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";

type OpenFilesContextProps = {
  openFiles: string[];
  markFileAsOpen: (tab: string) => void;
  closeFile: (tabIndex: number) => void;
};

const OpenFilesContext = createContext({} as OpenFilesContextProps);

export function OpenFilesProvider({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();

  const [openFiles, setOpenFiles] = useState<string[]>(() => {
    if (pathName) {
      if (pathName === "/") {
        return [];
      }
      return [pathName];
    }
    return [];
  });

  const markFileAsOpen = (file: string) => {
    if (openFiles.includes(file)) {
      return;
    }

    setOpenFiles([...openFiles, file]);
  };

  const closeFile = (fileIndex: number) => {
    const newOpenFiles = openFiles.filter((_, index) => index !== fileIndex);

    setOpenFiles(newOpenFiles);
  };

  return (
    <OpenFilesContext.Provider value={{ openFiles, markFileAsOpen, closeFile }}>
      {children}
    </OpenFilesContext.Provider>
  );
}

export function useOpenFiles(): OpenFilesContextProps {
  return useContext(OpenFilesContext);
}
