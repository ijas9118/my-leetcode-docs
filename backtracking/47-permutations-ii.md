# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/permutations-ii/description/">47. Permutations II</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, Backtracking, Sorting
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

The goal is to generate all unique permutations, even when the input contains duplicate numbers.

### Step-by-step idea:

1. Sort the array first

   - Sort groups with duplicate numbers together.

   - This enables the detection and skipping of duplicate permutations.

2. Track used elements by index

   - A used[] array marks whether a number at a specific index is already part of the current permutation.

   - This prevents the reuse of the same element position more than once.

3. Build permutations using backtracking

   - At each step, try to add any number that is not yet used.

   - Mark it as used, recurse, then undo the choice.

4. Skip duplicate choices

   ```ts
   if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
   ```

   - This ensures that duplicate numbers are used in a fixed order.
   - If the previous identical number hasn’t been used, choosing the current one would create a duplicate permutation, so it’s skipped.

5. Store complete permutations

6. When the temporary array reaches full length, copy it into the result.

## Solution Code

```ts
function permuteUnique(nums: number[]): number[][] {
  let result: number[][] = [];
  nums.sort((a, b) => a - b);

  backtrack(result, [], nums, Array(nums.length).fill(false));
  return result;
}

function backtrack(
  result: number[][],
  temp: number[],
  nums: number[],
  used: boolean[],
) {
  if (temp.length === nums.length) {
    result.push(temp.slice());
    return;
  }

  for (let i = 0; i < nums.length; i++) {
    if (used[i]) continue;

    if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

    used[i] = true;
    temp.push(nums[i]);

    backtrack(result, temp, nums, used);

    used[i] = false;
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

- Sorting takes O(n log n) but is dominated by permutation generation.

- Duplicate skipping reduces unnecessary branches but does not change the worst-case bound.

- Space complexity counts recursion stack and used[] (excluding output).
