# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/trapping-rain-water/description/">42. Trapping Rain Water</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, Two Pointers, Dynamic Programming
   </td>
  </tr>
  <tr>
   <td>Difficulty
   </td>
   <td>🟥 Hard
   </td>
  </tr>
  <tr>
   <td>Date
   </td>
   <td>07 January 2026
   </td>
  </tr>
</table>

# Approach - Prefix & Suffix Max Arrays (DP)

## Idea

The amount of water trapped at any position depends on the tallest bar to its left and the tallest bar to its right.

For each index i:

- <code><em>Water trapped = min(max height on left, max height on right) − height[i]</em></code>

We can precompute these values to avoid repeated scanning (Dynamic Programming memoization).

### Step-by-step idea:

1. Build maxLeft array

   - maxLeft[i] stores the tallest bar from index 0 to i.

   - This tells us how high water can be held from the left side.

2. Build maxRight array

   - maxRight[i] stores the tallest bar from index i to n - 1.

   - This tells us how high water can be held from the right side.

3. Calculate trapped water

   - For each index:

     - The water level is limited by the shorter of the two walls.

     - Subtract the current bar height to get trapped water.

   - Add this value to the total.

This approach ensures every index is processed efficiently with no redundant work.

## Solution Code

```ts
function trap(height: number[]): number {
  const n = height.length;
  const maxLeft: number[] = new Array(n);
  const maxRight: number[] = new Array(n);

  maxLeft[0] = height[0];
  for (let i = 1; i < n; i++) maxLeft[i] = Math.max(maxLeft[i - 1], height[i]);

  maxRight[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--)
    maxRight[i] = Math.max(maxRight[i + 1], height[i]);

  let water = 0;
  for (let i = 0; i < n; i++)
    water += Math.min(maxLeft[i], maxRight[i]) - height[i];

  return water;
}
```

## Complexity Analysis

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
   <td>Prefix & Suffix Max Arrays
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
  </tr>
</table>
