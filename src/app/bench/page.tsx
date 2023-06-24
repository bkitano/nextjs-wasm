"use client";

import { Button, Grid, Typography } from "@material-ui/core";
import { generateMatrix } from "./lib/generateMatrix";
import { multiplyMatrices } from "./lib/multiplyMatrices";
import { useEffect, useState } from "react";

import { WasmBench } from "./components/WasmBench";

const benchmark = (matrixSize: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const a = generateMatrix(matrixSize);
    const b = generateMatrix(matrixSize);

    const startTime = performance.now();
    const resultMatrix = multiplyMatrices(a, b);
    const endTime = performance.now();

    const timeTaken = endTime - startTime;
    resolve(timeTaken);
  });
};

const MatrixMultiplicationBenchmark = (props: { matrixSize: number }) => {
  const [message, setMessage] = useState("Waiting for you");
  const { matrixSize } = props;

  return (
    <>
      <Typography variant="h2">Raw JS</Typography>
      <Button
        onClick={async () => {
          setMessage("Running...");
          const timeTaken = await benchmark(matrixSize);
          setMessage("Time taken: " + timeTaken + "ms");
        }}
        variant="contained"
      >
        Run benchmark
      </Button>
      <Typography variant="h3">{message}</Typography>
    </>
  );
};

const Bench = () => {
  return (
    <>
      <Typography variant="h1">Bench</Typography>
      <Typography variant="h4">1000 x 1000 matrix multiplication</Typography>
      <Grid container>
        <Grid item xs={6}>
          <MatrixMultiplicationBenchmark
            {...{
              matrixSize: 1000,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <WasmBench />
        </Grid>
      </Grid>
    </>
  );
};

export default Bench;
