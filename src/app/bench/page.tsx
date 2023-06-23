"use client";

import { Typography } from "@material-ui/core";
import { generateMatrix } from "./lib/generateMatrix";
import { multiplyMatrices } from "./lib/multiplyMatrices";
import { useEffect } from "react";

const MatrixMultiplicationBenchmark = (props: { matrixSize: number }) => {
  const { matrixSize } = props;
  const a = generateMatrix(matrixSize);
  const b = generateMatrix(matrixSize);

  const startTime = performance.now();
  const resultMatrix = multiplyMatrices(a, b);
  const endTime = performance.now();

  const timeTaken = endTime - startTime;

  useEffect(() => {
    console.log(`Time taken: ${timeTaken} ms`);
  }, []);

  return (
    <>
      <Typography variant="h2">Raw JS</Typography>
      <Typography variant="h3">{`Time taken: ${timeTaken} ms`}</Typography>
    </>
  );
};

const Bench = () => {
  return (
    <>
      <Typography variant="h1">Bench</Typography>
      <Typography variant="h4">1000 x 1000 matrix multiplication</Typography>
      <MatrixMultiplicationBenchmark
        {...{
          matrixSize: 1000,
        }}
      />
    </>
  );
};

export default Bench;
