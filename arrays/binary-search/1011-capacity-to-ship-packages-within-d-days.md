# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description">1011. Capacity To Ship Packages Within D Days</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, Binary Search
   </td>
  </tr>
  <tr>
   <td>Difficulty
   </td>
   <td>🟧 Medium
   </td>
  </tr>
  <tr>
   <td>Date
   </td>
   <td>05 December 2025
   </td>
  </tr>
</table>

# Approach

## Idea

Your goal is to find the smallest ship capacity that allows all packages to be shipped within the given number of days. A ship must load weights in order, and each day it can take packages until adding another would exceed its capacity.

To start, you set the minimum possible capacity to the heaviest single package, because the ship must at least be able to carry that one package. You set the maximum possible capacity to the sum of all weights, because with that capacity, you could ship everything in one day.

Then you use binary search between these two limits. You pick a middle value and pretend this is the ship’s capacity. Next, you simulate loading packages day by day: add weights until the capacity is exceeded, then start a new day. This tells you how many days that capacity would require.

If the number of days needed is more than allowed, it means the chosen capacity is too small, so you increase the lower bound. If the number of days is within the limit, the capacity might still be larger than necessary, so you try lowering it by adjusting the upper bound.

The binary search continues until both bounds meet. At that moment, the value is the smallest capacity that still lets you ship everything in the required number of days.

## Solution Code

```ts
function shipWithinDays(weights: number[], days: number): number {
  let minCap = Math.max(...weights);
  let maxCap = weights.reduce((acc, curr) => acc + curr, 0);

  while (minCap < maxCap) {
    let mid = Math.floor((minCap + maxCap) / 2);

    let day = 1;
    let sum = 0;
    for (let w of weights) {
      if (sum + w > mid) {
        day++;
        sum = 0;
      }
      sum += w;
    }

    if (day > days) minCap = mid + 1;
    else maxCap = mid;
  }

  return minCap;
}
```

# Complexity Analysis

<table>
  <tr>
   <td><strong>Approach</strong>
   </td>
   <td><strong>Best TC</strong>
   </td>
   <td><strong>Average TC</strong>
   </td>
   <td><strong>Worst TC</strong>
   </td>
   <td><strong>Space Complexity</strong>
   </td>
  </tr>
  <tr>
   <td>Binary Search on Capacity
   </td>
   <td>O(n log n)
   </td>
   <td>O(n log n)
   </td>
   <td>O(n log n)
   </td>
   <td>O(1)
   </td>
  </tr>
</table>
