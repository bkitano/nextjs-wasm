#include <stdio.h>
#include <math.h>
#include <time.h>

// pi = 4(1 - 1/3 + 1/5 - 1/7 + 1/9 ...)

double benchmark(int n) {
    int index = 0;
    float pi_over_four = 0;

    clock_t start = clock();
    while (index < n) {
        pi_over_four = pi_over_four + pow(-1.0, index) * (1.0 / (2 * index + 1 ));
        index = index + 1;

        if (index % 10000 == 0) {
            printf("%f", pi_over_four * 4);
        }

    }
    clock_t end = clock();
    double time_taken = ((double) end - start ) / CLOCKS_PER_SEC;
    return time_taken;
}