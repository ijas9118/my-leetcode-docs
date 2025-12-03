# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/count-complete-subarrays-in-an-array/description/?envType=problem-list-v2&envId=sliding-window">2799. Count Complete Subarrays in an Array</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, Sliding Window
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
   <td>03 December 2025
   </td>
  </tr>
</table>

# Problem Statement

You are given an array nums consisting of positive integers.

We call a subarray of an array complete if the following condition is satisfied:

- The number of distinct elements in the subarray is equal to the number of distinct elements in the whole array.

Return the number of complete subarrays.

A subarray is a contiguous non-empty part of an array.

**Example 1**

Input: nums = [1,3,1,2,2] \
Output: 4

**Example 2**

Input: nums = [5,5,5,5] \
Output: 10

# Approach

## Idea

You move two pointers (left and right) to find subarrays that contain all unique elements present in the whole array.

First, compute how many distinct numbers exist in the entire array — call this number “uniqueCount”.

Every “complete subarray” must contain all these distinct values at least once.

### How the sliding window works

You fix a window start (left).

Then you move right forward to expand the window until it becomes complete (i.e., the window contains all “uniqueCount” distinct values).

Once the window becomes complete at some position right, then any longer subarray starting from the same left will also be complete, because adding more elements keeps all the uniques inside.

So for a given left, the number of complete subarrays is: (n-right + 1)

This counts all subarrays that start at the left and end at:

- right
- right+1
- right+2
- …
- last index (n-1)

After counting them:

- You shrink the window from the left by removing nums[left]
- Move left one step to the right
- Repeat

## Psuedocode

1. Count the total distinct numbers in the array.
2. Start left = 0, right = 0, and empty freq map.
3. Loop while left &lt; n:
   1. Expand right until the window has all distinct numbers.
   2. If impossible → stop.
   3. Add n - right + 1 to the answer.
   4. Remove nums[left] from the window.
   5. Move left forward.
4. Return the answer.

## Solution Code

```ts
function countCompleteSubarrays(nums: number[]): number {
  const n = nums.length;
  const uniqueCount = new Set(nums).size;

  let left = 0;
  let right = 0;
  let count = 0;

  let freq: Map<number, number> = new Map();

  while (left < n) {
    while (right < n && freq.size < uniqueCount) {
      freq.set(nums[right], (freq.get(nums[right]) ?? 0) + 1);
      right++;
    }

    if (freq.size < uniqueCount) break;

    count += n - right + 1;

    let leftNum = nums[left];
    let newCount = freq.get(leftNum) - 1;

    if (newCount === 0) freq.delete(leftNum);
    else freq.set(leftNum, newCount);

    left++;
  }

  return count;
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
   <td>Sliding window
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(k), k = number of distinct elements
   </td>
  </tr>
</table>
