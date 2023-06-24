#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void generate_matrix(int n, int matrix[n][n]) {
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++)
            matrix[i][j] = rand() % 10;
}

void multiply_matrices(int n, int a[n][n], int b[n][n], int result[n][n]) {
    for(int i = 0; i < n; i++)
        for(int j = 0; j < n; j++) {
            result[i][j] = 0;
            for(int k = 0; k < n; k++)
                result[i][j] += a[i][k] * b[k][j];
        }
}

double benchmark(int n) {
    int a[n][n], b[n][n], result[n][n];

    srand(time(0));  // Seed for random number generator
    generate_matrix(n, a);
    generate_matrix(n, b);

    clock_t start = clock();
    multiply_matrices(n, a, b, result);
    clock_t end = clock();
    double time_taken = ((double)end - start) / CLOCKS_PER_SEC; // in seconds

    return time_taken;
}
