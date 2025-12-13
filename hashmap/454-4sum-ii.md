# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/4sum-ii/description/">454. 4Sum II</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, HashTable
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
   <td>12 December 2025
   </td>
  </tr>
</table>

# Problem Statement

Given four integer arrays nums1, nums2, nums3, and nums4 all of length n, return the number of tuples (i, j, k, l) such that:

`0 <= i, j, k, l < n`

`nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0`

**Example 1**

Input: nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2] \
Output: 2

# Approach

## Idea

The goal is to count how many quadruplets `a + b + c + d = 0` where:

- a comes from nums1
- b comes from nums2
- c comes from nums3
- d comes from nums4

If we try all four loops directly, it becomes `O(n⁴)` — too slow.

But notice:

`a + b + c + d = 0`

which can be rewritten as, `(a + b) = -(c + d)`

So instead of combining 4 arrays at once, we:

1. Compute all sums of A + B
2. Compute all sums of C + D
3. Count how many pairs of sums cancel each other out.

This reduces complexity from `n⁴ → n² + n² + matching.`

So the idea is:

1. Precompute all (a + b) sums and store how many times each needed value appears.
2. Precompute all (c + d) sums and store how many times each actual value appears.
3. For each needed value, if the actual value exists → multiply their frequencies.

Why multiply?

Because if a value occurs 3 times in the first map and 5 times in the second, then it contributes 3 × 5 = 15 quadruplets.

## Solution Code

```js
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  let n = nums1.length;
  let count = 0;

  let map1 = new Map();
  let map2 = new Map();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = nums1[i] + nums2[j];
      let comp = -1 * sum;

      map1.set(comp, (map1.get(comp) || 0) + 1);
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let sum = nums3[i] + nums4[j];

      map2.set(sum, (map2.get(sum) || 0) + 1);
    }
  }

  for (let [key1, val1] of map1) {
    for (let [key2, val2] of map2) {
      if (key1 === key2) count += val1 * val2;
    }
  }

  return count;
};
```

#

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
   <td>HashMap + Pair Sum Splitting
   </td>
   <td>O(n²)
   </td>
   <td>O(n²)
   </td>
   <td>O(n²)
   </td>
   <td>O(n²)
   </td>
  </tr>
</table>
