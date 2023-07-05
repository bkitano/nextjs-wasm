import { benchmark } from "../bench/page";

self.addEventListener("message", async (e: MessageEvent<{ n: number }>) => {
  const { n } = e.data;

  const time = await benchmark(n);

  self.postMessage(time);
});
