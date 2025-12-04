# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/count-number-of-nice-subarrays/">1248. Count Number of Nice Subarrays</a>
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
   <td>04 December 2025
   </td>
  </tr>
</table>

# Problem Statement

Given an array of integers nums, and an integer k. A continuous subarray is called nice if it contains k odd numbers.

Return the number of nice sub-arrays.

**Example 1**

Input: nums = [1,1,2,1,1], k = 3 \
Output: 2

**Example 2**

Input: nums = [2,4,6], k = 1 \
Output: 0

**Example 3**

Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2 \
Output: 16

# Approach

## Idea

We want to count all subarrays that contain exactly k odd numbers.

We use a sliding window to scan the array only once.

- Move the right pointer and count how many odd numbers enter the window.

- If the window ever has more than k odds, move the left pointer until it has exactly k or fewer again.
- When the window has exactly k odds, we look from the left side and skip over all leading even numbers.
- Each even number we skip creates another valid starting point, because even numbers don't affect the odd count.
- If m is the position of the first odd from the left, then (m - l + 1) is the number of valid subarrays ending at the current right position.

## Solution Code

```ts
function numberOfSubarrays(nums: number[], k: number): number {
  let l = 0;
  let r = 0;
  let m = 0;
  let result = 0;
  let oddCount = 0;

  for (; r < nums.length; r++) {
    if (nums[r] % 2) oddCount++;

    while (oddCount > k) {
      if (nums[l] % 2) oddCount--;
      l++;
      m = l;
    }

    if (oddCount === k) {
      while (!(nums[m] % 2)) m++;

      result += m - l + 1;
    }
  }

  return result;
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
   <td>Sliding Window (Two Pointers)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(1)
   </td>
  </tr>
</table>
