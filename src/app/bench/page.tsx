"use client";

import { Grid, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

import { WasmBench } from "./components/BenchmarkPiWasm";
import { PiBenchmark } from "./components/BenchmarkPi";

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
          <PiBenchmark n={n} />
        </Grid>
        <Grid item xs={6}>
          <WasmBench n={n} />
        </Grid>
      </Grid>
    </>
  );
};

export default Bench;
