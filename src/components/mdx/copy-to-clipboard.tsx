"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";

export function CopyToClipBoard({}: {}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  const copyToClipboard = useCallback(async () => {
    console.log(btnRef.current?.closest("pre")?.querySelector("code")?.textContent);

    try {
      if (!navigator?.clipboard) {
        // todo: fallback copy
        console.log("unable to access the window's clipboard");
      }

      await navigator.clipboard.writeText(
        btnRef.current?.closest("pre")?.querySelector("code")?.textContent || "[err]",
      );

      setIsCopied(true);
    } catch (err) {
      console.warn("Unable to copy to clipboard");
    }
  }, [btnRef]);

  const IconToUse = isCopied ? (
    <CheckIcon className="h-4 w-4" />
  ) : (
    <ClipboardIcon className="h-4 w-4" />
  );

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={copyToClipboard}
      className={`border !p-2 ${
        isCopied
          ? "pointer-events-none border-green-600 !bg-green-700 text-white hover:bg-green-700"
          : "border-gray-900 bg-slate-950 text-gray-400 hover:border-indigo-600 hover:text-white"
      }`}
    >
      {IconToUse}
    </button>
  );
}
