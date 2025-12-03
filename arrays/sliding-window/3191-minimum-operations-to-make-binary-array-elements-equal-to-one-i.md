# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i/">3191. Minimum Operations to Make Binary Array Elements Equal to One I</a>
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

You are given a binary array nums.

You can do the following operation on the array any number of times (possibly zero):

- Choose any 3 consecutive elements from the array and flip all of them.
- Flipping an element means changing its value from 0 to 1, and from 1 to 0.

Return the minimum number of operations required to make all elements in nums equal to 1. If it is impossible, return -1.

**Example 1**

Input: nums = [0,1,1,1,0,0] \
Output: 3

**Example 2**

Input: nums = [0,1,1,1] \
Output: -1

# Approach

## Idea

You scan the array from the beginning.

Whenever you see a 0, you must flip starting at that position, because it's your last chance to fix that zero using an operation involving index i.

Why? Because the operation affects exactly 3 consecutive positions (i, i+1, i+2). Once you move past index i, you can never flip it again.

So the logic becomes: If the current element is 0 → perform a flip on this index. This ensures that the current 0 becomes 1.

We may flip the next two elements, too (which is unavoidable).

## Psuedocode

1. Start from index 0 and move right.
2. For each position up to n - 3:
   1. If it's 0 → perform the flip on i, i+1, i+2
   2. Count the operation.
3. After finishing the loop, only the last two positions might not have been fully controllable.
4. Check if the last two elements are 1: 3. If both are 1 → return the number of flips 4. Otherwise → impossible → return -1

## Solution Code
```ts
function minOperations(nums: number[]): number {
    let count = 0;

    function flip(index) {
        nums[index] === 0 ? nums[index] = 1 : nums[index] = 0;
    }

    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] === 0) {
            count++;
            flip(i);
            flip(i + 1);
            flip(i + 2);
        }
    }

    if (!nums.at(-1) || !nums.at(-2)) return -1;

    return count;
};
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
   <td>Greedy left-to-right flipping
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
