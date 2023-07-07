import { Typography, Button } from "@material-ui/core";
import { useState } from "react";
import { benchmarkMatrixMultiplication } from "../lib/benchmarkMatrixMultiplication";

const MatrixMultiplicationBenchmark = (props: { matrixSize: number }) => {
  const [message, setMessage] = useState("Waiting for you");
  const { matrixSize } = props;

  return (
    <>
      <Typography variant="h2">Raw JS</Typography>
      <Button
        onClick={async () => {
          setMessage("Running...");
          const timeTaken = await benchmarkMatrixMultiplication(matrixSize);
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

export { MatrixMultiplicationBenchmark };
