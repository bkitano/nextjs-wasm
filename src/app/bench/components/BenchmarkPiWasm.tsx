"use client";

import { useEffect, useState } from "react";
import { useWasm } from "../hooks/useWasm";
import { Button, Typography } from "@material-ui/core";

const WasmBench = (props: { n: number }) => {
  const { n } = props;
  const { wasm, loading } = useWasm("/wasm/calculatePi.wasm");
  const [message, setMessage] = useState("Waiting for you");

  const runBenchmarkAsync = async (n: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      if (wasm) {
        const { instance, module } = wasm;
        const time = instance.exports.benchmark(n);
        resolve(time);
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <>
        <h1>Wasm Bench</h1>
        <Button
          variant="contained"
          onClick={async () => {
            setMessage("Running...");
            const runtime = await runBenchmarkAsync(n);
            setMessage("Time taken: " + runtime + "seconds");
          }}
        >
          Run
        </Button>
        <Typography variant="h3">{message}</Typography>
      </>
    );
  }
};

export { WasmBench };
