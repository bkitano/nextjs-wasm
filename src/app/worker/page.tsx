"use client";

import { Button } from "@material-ui/core";
// we have to use client because we're relying on browser specific APIs

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const Page = () => {
  const workerRef = useRef<Worker>();
  const nonWasmRef = useRef<Worker>();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      workerRef.current = new Worker(new URL("./wasmTask.ts", import.meta.url));
      workerRef.current.onmessage = (e) => {
        console.log("message from worker", e.data);
      };

      nonWasmRef.current = new Worker(
        new URL("./benchTask.ts", import.meta.url)
      );
      nonWasmRef.current.onmessage = (e) => {
        console.log("message from worker", e.data);
      };
    }
  }, []);

  const handleNonWasmWork = useCallback(async () => {
    nonWasmRef.current?.postMessage({ n: 1000 });
  }, []);

  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage({ n: 1000 });
  }, []);

  return (
    <>
      <Button
        variant="contained"
        onClick={(e) => {
          console.log("clicking");
          handleWork();
        }}
      >
        Ping Wasm Worker
      </Button>
      <Button
        variant="contained"
        onClick={(e) => {
          console.log("clicking");
          handleNonWasmWork();
        }}
      >
        Ping non-wasm Worker
      </Button>
    </>
  );
};

export default Page;
