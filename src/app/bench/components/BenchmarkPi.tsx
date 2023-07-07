import { Typography, Button } from "@material-ui/core";
import { useState } from "react";
import { benchmarkPi } from "../lib/benchmarkPi";

const PiBenchmark = (props: { n: number }) => {
  const [message, setMessage] = useState("Waiting for you");
  const { n } = props;

  return (
    <>
      <Typography variant="h2">Raw JS</Typography>
      <Button
        onClick={async () => {
          setMessage("Running...");
          const timeTaken = await benchmarkPi(n);
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

export { PiBenchmark };
