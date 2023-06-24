import { useEffect, useState } from "react";

function useWasm(filePath: string) {
  const [loading, setLoading] = useState(true);
  const [wasm, setWasm] = useState<any | null>(null);

  useEffect(() => {
    const fetchWasm = async () => {
      const obj: WebAssembly.WebAssemblyInstantiatedSource =
        await WebAssembly.instantiateStreaming(
          fetch(filePath, {
            headers: {
              "Content-Type": "application/wasm",
            },
          }),
          {
            env: {
              emscripten_date_now: () => Date.now(),
            },
          }
        );
      return obj.instance;
    };
    const webInstance = fetchWasm();
    webInstance.then((instance) => {
      setWasm(instance);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    wasm,
  };
}

export { useWasm };
