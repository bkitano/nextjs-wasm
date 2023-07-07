const multiplyMatrices = (
  a: number[][],
  b: number[][]
): number[][] | undefined => {
  if (a[0].length !== b.length) return; // check matrix multiplication validity
  const result: number[][] = Array.from({ length: a.length }, () =>
    Array.from({ length: b[0].length }, () => 0)
  );

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[0].length; j++) {
      for (let k = 0; k < a[0].length; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return result;
};

const generateMatrix = (n: number): number[][] => {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 10))
  );
};

export { generateMatrix };

const benchmarkMatrixMultiplication = (matrixSize: number): Promise<number> => {
  return new Promise((resolve, reject) => {
    const a = generateMatrix(matrixSize);
    const b = generateMatrix(matrixSize);

    const startTime = performance.now();
    const resultMatrix = multiplyMatrices(a, b);
    const endTime = performance.now();

    const timeTaken = endTime - startTime;
    resolve(timeTaken);
  });
};

export { benchmarkMatrixMultiplication };
