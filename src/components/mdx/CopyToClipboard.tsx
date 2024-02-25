"use client";

import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";

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
    console.log(
      btnRef.current?.closest("pre")?.querySelector("code")?.textContent,
    );

    try {
      if (!navigator?.clipboard) {
        // todo: fallback copy
        console.log("unable to access the window's clipboard");
      }

      await navigator.clipboard.writeText(
        btnRef.current?.closest("pre")?.querySelector("code")?.textContent ||
          "[err]",
      );

      setIsCopied(true);
    } catch (err) {
      console.warn("Unable to copy to clipboard");
    }
  }, [btnRef]);

  const IconToUse = isCopied ? (
    <CheckIcon className="w-4 h-4" />
  ) : (
    <ClipboardIcon className="w-4 h-4" />
  );

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={copyToClipboard}
      className={`!p-2 border ${
        isCopied
          ? "border-green-600 !bg-green-700 hover:bg-green-700 pointer-events-none text-white"
          : "border-gray-900 bg-slate-950 hover:text-white hover:border-indigo-600 text-gray-400"
      }`}
    >
      {IconToUse}
    </button>
  );
}
