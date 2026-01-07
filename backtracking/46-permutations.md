# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/permutations/description/">46. Permutations</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, Backtracking
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
   <td>07 January 2026
   </td>
  </tr>
</table>

## Idea

The goal is to generate all possible permutations of the given numbers.

We can use backtracking, which means: build a solution step by step, and undo choices when they no longer work.

### Step-by-step idea:

1. Start with an empty temporary array (temp) that represents the current permutation being built.

2. At each step, try to add every number that is not already used in temp.

3. After adding a number:

   - Recursively continue building the permutation.

4. When temp reaches the same length as nums:

   - A complete permutation is formed.

   - Make a copy and store it in the result. \

5. After the recursive call:

   - Remove the last number (pop) to try a different choice.

This process explores all possible orderings of the numbers.

## Solution Code

```ts
function permute(nums: number[]): number[][] {
  let result: number[][] = [];

  backtrack(result, [], nums);
  return result;
}

function backtrack(result: number[][], temp: number[], nums: number[]) {
  if (temp.length === nums.length) {
    result.push(temp.slice());
    return;
  }

  for (let n of nums)
    if (!temp.includes(n)) {
      temp.push(n);
      backtrack(result, temp, nums);
      temp.pop();
    }
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
   <td>Backtracking
   </td>
   <td>O(n × n!)
   </td>
   <td>O(n × n!)
   </td>
   <td>O(n × n!)
   </td>
   <td>O(n)
   </td>
  </tr>
</table>

### Notes:

- There are n! Permutations.
- Each permutation takes O(n) time to copy into the result.
- Space complexity counts the recursion stack and temporary array (excluding output).
