# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/longest-balanced-subarray-i/">3719. Longest Balanced Subarray I</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array | Hash Table | Divide and Conquer | Segment Tree | Prefix Sum | Weekly Contest 472
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
   <td>06 November 2025
   </td>
  </tr>
</table>

# Problem Statement

You are given an integer array nums.

A subarray is called balanced if the number of distinct even numbers in the subarray is equal to the number of distinct odd numbers.

Return the length of the longest balanced subarray.

**Example 1**

Input: nums = [2,5,4,3] \
Output: 4

**Example 2**

Input: nums = [3,2,2,5,4] \
Output: 5

# Approach - HashSets

## Idea

- Iterate over all possible subarrays using two nested loops.
- For each subarray, keep track of distinct even and odd numbers using two sets.
- Add the current element to either the even or odd set, depending on its parity.
- Whenever the sizes of the two sets match, update the answer with the length of this subarray.
- At the end, return the maximum length found.

# Psuedocode

```sql
FUNCTION longestBalanced(nums):
    SET ans = 0

    FOR i FROM 0 TO length(nums) - 1:
        CREATE empty set even
        CREATE empty set odd

        FOR j FROM i TO length(nums) - 1:
            IF nums[j] is even:
                ADD nums[j] TO even
            ELSE:
                ADD nums[j] TO odd

            IF SIZE(even) == SIZE(odd):
                ans = MAX(ans, j - i + 1)

    RETURN ans
```

## Solution Code

```ts
function longestBalanced(nums: number[]): number {
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    let even = new Set<number>();
    let odd = new Set<number>();
    for (let j = i; j < nums.length; j++) {
      if (nums[j] % 2 === 0) even.add(nums[j]);
      else odd.add(nums[j]);

      if (even.size === odd.size) ans = Math.max(ans, j - i + 1);
    }
  }

  return ans;
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
   <td>Brute Force with Sets
   </td>
   <td>O(n²)
   </td>
   <td>O(n²)
   </td>
   <td>O(n²)
   </td>
   <td>O(n) for even and odd sets per iteration
   </td>
  </tr>
</table>
