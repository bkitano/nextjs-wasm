import { useEffect, useState } from "react";

function useWasm(filePath: string) {
  const [loading, setLoading] = useState(true);
  const [wasm, setWasm] =
    useState<WebAssembly.WebAssemblyInstantiatedSource | null>(null);

  useEffect(() => {
    const fetchWasm = async () => {
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
