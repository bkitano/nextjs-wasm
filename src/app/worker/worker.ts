import { benchmarkPi } from "../bench/lib/benchmarkPi";

self.addEventListener("message", async (e: MessageEvent<{ n: number }>) => {
  const { n } = e.data;

  const time = await benchmarkPi(n);

  self.postMessage(time);
});
