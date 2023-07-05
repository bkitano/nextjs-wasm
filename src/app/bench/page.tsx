"use client";

import { Button, Grid, TextField, Typography } from "@material-ui/core";
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
  const [n, setN] = useState(1000);
  return (
    <>
      <Typography variant="h1">Bench</Typography>
      <TextField
        label="Matrix size"
        value={n}
        style={{
          backgroundColor: "white",
        }}
        variant="standard"
        onChange={(e) => {
          setN(parseInt(e.target.value));
        }}
      />
      <Grid container>
        <Grid item xs={6}>
          <MatrixMultiplicationBenchmark
            {...{
              matrixSize: 32000,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <WasmBench n={32000} />
        </Grid>
      </Grid>
    </>
  );
};

export default Bench;
