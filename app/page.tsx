'use client';

export const dynamic = "force-dynamic";

import Image from "next/image";
import mermaid from "mermaid";
import { Suspense, use, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  return (
    <main className="flex min-h-screen min-w-screen">
      <div className="">
        <Suspense>
          <Mermaid />
        </Suspense>
      </div>
    </main>
  );
}

const HELLO = `graph TD
    A[Hello] --> B[World]`;

function Mermaid() {

  const [isLoaded, setIsLoaded] = useState(false);

  const searchParams = useSearchParams();

  const graphCode = searchParams?.get("graph_code");
  const isFull = searchParams?.get("full");

  useEffect(() => {

    if (isLoaded || !graphCode) {
      return;
    }

    mermaid.initialize({
      startOnLoad: true
    });
    mermaid.contentLoaded();

    setIsLoaded(true);
  }, [graphCode, isLoaded]);

  return <>
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className={`flex flex-col items-center justify-center ${isFull ? `` : `w-[300px] h-[300px]`} ${isFull ? "" : "cursor-pointer"} overflow-auto`}
        onClick={() => {
          if (isFull) {
            return;
          }

          const href = window.location.href;
          window.open(href + (href.includes("?") ? "&" : "?") + "full=true", "_blank");
        }}
      >
        <div className={`flex flex-col items-center justify-center mermaid transition w-screen duration-500 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`} suppressHydrationWarning>
          {graphCode ? graphCode : HELLO}
        </div>
      </div>
    </div>
  </>
}
