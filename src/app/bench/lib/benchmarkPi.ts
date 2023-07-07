const calculatePi = (n: number) => {
  let pi_over_four = 0;
  for (let i = 0; i < n; i++) {
    pi_over_four += Math.pow(-1, i) * (1 / (2 * i + 1));
  }
  return 4 * pi_over_four;
};

const benchmarkPi = async (n: number): Promise<number> => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    calculatePi(n);
    const endTime = performance.now();

    resolve(endTime - startTime);
  });
};

export { benchmarkPi };
