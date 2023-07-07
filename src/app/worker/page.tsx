"use client";

import { Button } from "@material-ui/core";
// we have to use client because we're relying on browser specific APIs

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const WasmPi = (props: { n: number }) => {
  const { n } = props;
  const [message, setMessage] = useState("Waiting for you");
  const workerRef = useRef<Worker>();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      workerRef.current = new Worker(
        new URL("./wasmWorker.ts", import.meta.url)
      );
      workerRef.current.onmessage = (e) => {
        console.log("message from wasm worker", e.data);
      };
    }
  }, []);

  useEffect(
    () => () => {
      workerRef.current?.terminate();
    },
    []
  );

  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage({ n });
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
    </>
  );
};

const Pi = (props: { n: number }) => {
  const { n } = props;
  const nonWasmRef = useRef<Worker>();
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      nonWasmRef.current = new Worker(new URL("./worker.ts", import.meta.url));
      nonWasmRef.current.onmessage = (e) => {
        console.log("message from worker", e.data);
      };
    }
  }, []);

  const handleNonWasmWork = useCallback(async () => {
    nonWasmRef.current?.postMessage({ n });
  }, []);

  return (
    <>
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

const Page = () => {
  const n = 1_000_000_0;

  return (
    <>
      <WasmPi n={n} />
      <Pi n={n} />
    </>
  );
};

export default Page;
