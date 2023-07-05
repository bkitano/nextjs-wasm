const filePath = "/wasm/multiplyMatrices.wasm";
const fetchWasm = async (filePath: string) => {
  const importObject = {
    env: {
      emscripten_date_now: () => Date.now(),
    },
  };

  const obj: WebAssembly.WebAssemblyInstantiatedSource =
    await WebAssembly.instantiateStreaming(
      fetch(filePath, {
        headers: {
          "Content-Type": "application/wasm",
        },
      }),
      importObject
    );
  return obj;
};

self.addEventListener(
  "message",
  async (
    e: MessageEvent<{
      n: number;
    }>
  ) => {
    const { n } = e.data;
    const webInstance = await fetchWasm(filePath);

    const time = webInstance.instance.exports.benchmark(n);

    self.postMessage(time);
  }
);
