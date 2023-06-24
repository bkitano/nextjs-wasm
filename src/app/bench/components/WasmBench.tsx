"use client";

import { useEffect, useState } from "react";
import { useWasm } from "../hooks/useWasm";
import { Button } from "@material-ui/core";

const WasmBench = () => {
  const { wasm, loading } = useWasm("/wasm/multiplyMatrices.wasm");

  const runBenchmarkAsync = async (n: number): Promise<number> => {
    return new Promise((resolve, reject) => {
      const time = wasm.exports.benchmark(n);
      resolve(time);
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
            const runtime = await runBenchmarkAsync(1000);
            console.log({ runtime });
          }}
        >
          Run benchmark
        </Button>
      </>
    );
  }
};

export { WasmBench };
