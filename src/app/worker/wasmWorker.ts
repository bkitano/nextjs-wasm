const filePath = "/wasm/calculatePi.wasm";
const fetchWasm = async (filePath: string) => {
  const importObject = {
    wasi_snapshot_preview1: {
      fd_write: console.log,
    },
    env: {
      emscripten_date_now: () => Date.now(),
      emscripten_memcpy_big: (dest: any, src: any, num: any) => {
        const heap8 = new Uint8Array();
        heap8.set(heap8.subarray(src, src + num), dest);
      },
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
    const module = await WebAssembly.compileStreaming(fetch(filePath));
    self.postMessage(WebAssembly.Module.exports(module));

    const { n } = e.data;
    const webInstance = await fetchWasm(filePath);

    const time = webInstance.instance.exports.benchmark(n);

    self.postMessage(time);
  }
);
