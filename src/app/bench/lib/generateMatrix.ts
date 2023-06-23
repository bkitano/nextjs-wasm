const generateMatrix = (n: number): number[][] => {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 10))
  );
};

export { generateMatrix };
