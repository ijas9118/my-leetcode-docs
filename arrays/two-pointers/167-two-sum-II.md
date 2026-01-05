# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/">167. Two Sum II - Input Array Is Sorted</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, Two pointers
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
   <td>05 January 2026
   </td>
  </tr>
</table>

## Idea

The array is already sorted, and this is the key insight your solution uses.

You place:

- one pointer (left) at the start of the array

- another pointer (right) at the end of the array

At each step:

1. Add the two numbers pointed to by left and right.

2. If the sum matches the target → you’ve found the answer.

3. If the sum is too small, move the left pointer to the right to increase the sum.

4. If the sum is too large, move the right pointer to the left to decrease the sum.

Since the array is sorted, moving the pointers in this direction always brings the sum closer to the target.

Each pointer only moves in one direction, so every element is checked at most once.

This makes the solution both efficient and simple.

## Solution Code

```ts
function twoSum(numbers: number[], target: number): number[] {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    let sum = numbers[left] + numbers[right];

    if (sum === target) return [left + 1, right + 1];

    if (sum < target) left++;
    else right--;
  }

  return [-1, -1];
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
   <td>Two Pointers (Sorted)
   </td>
   <td>O(1)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(1)
   </td>
  </tr>
</table>
