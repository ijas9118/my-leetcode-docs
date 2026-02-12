function numOfSubarrays(arr: number[], k: number, threshold: number): number {
    let result = 0;
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];

        if (i >= k - 1) {
            let avg = sum / k;
            if (avg >= threshold) result++;

            sum -= arr[i - (k - 1)];
        }
    }

    return result;
};