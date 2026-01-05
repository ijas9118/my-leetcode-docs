# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/squares-of-a-sorted-array/description/">977. Squares of a Sorted Array</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, Two pointers, Sorting, Weekly Contest 120
   </td>
  </tr>
  <tr>
   <td>Difficulty
   </td>
   <td>🟩 Easy
   </td>
  </tr>
  <tr>
   <td>Date
   </td>
   <td>05 January 2026
   </td>
  </tr>
</table>

## Idea

The array is already sorted, but it contains negative numbers. \
When we square the numbers, large values can come from either end of the array.

1. Use two pointers,

   - left starts at the beginning (the most negative number).
   - right starts at the end (the largest positive number).

2. Compare squares

   - Square nums[left] and nums[right].
   - The larger square should go later in the sorted result.

3. Build the result

   - Insert the larger square at the front of the result array.
   - Move the corresponding pointer (left or right).

4. Repeat until all elements are used
   - Continue until the left passes the right.

## Solution Code

```ts
function sortedSquares(nums: number[]): number[] {
  let result: number[] = [];
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    if (nums[left] * nums[left] > nums[right] * nums[right]) {
      result.unshift(nums[left] * nums[left]);
      left++;
    } else {
      result.unshift(nums[right] * nums[right]);
      right--;
    }
  }

  return result;
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
   <td>Two pointers (compare squares from both ends)
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
