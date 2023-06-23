const multiplyMatrices = (a: number[][], b: number[][]): number[][] | undefined => {
    if (a[0].length !== b.length) return; // check matrix multiplication validity
    const result: number[][] = Array.from({ length: a.length }, () => Array.from({ length: b[0].length }, () => 0));
    
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result[0].length; j++) {
        for (let k = 0; k < a[0].length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
  
    return result;
  };
  
  export {
    multiplyMatrices
  }