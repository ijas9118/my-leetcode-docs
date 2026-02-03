# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/subsets/description/">78. Subsets</a>
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
   <td>08 January 2026
   </td>
  </tr>
</table>

## Idea

The goal is to generate all possible subsets of the given array.

For each number, you have two choices:

- Exclude it from the current subset
- Include it in the current subset

We can explore these choices using backtracking, forming a decision tree.

### Step-by-step idea:

1. Start from index 0 with an empty current subset.

2. At each index:

   - First, exclude the current number and move to the next index.

   - Then, include the current number and move to the next index.

3. When the index reaches the end of the array:

   - A complete subset is formed.

   - Copy it into the result.

4. After exploring the include path:

   - Remove the last number to backtrack and try other combinations.

This guarantees that every possible subset is generated exactly once.

## Solution Code

```ts
function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const current: number[] = [];

  function backtrack(index: number) {
    if (index === nums.length) {
      result.push([...current]);
      return;
    }

    // Exclude
    backtrack(index + 1);

    // Include
    current.push(nums[index]);
    backtrack(index + 1);
    current.pop();
  }

  backtrack(0);
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
   <td>Backtracking (Include/Exclude)
   </td>
   <td>O(n × 2ⁿ)
   </td>
   <td>O(n × 2ⁿ)
   </td>
   <td>O(n × 2ⁿ)
   </td>
   <td>O(n)
   </td>
  </tr>
</table>

### Notes:

- There are 2ⁿ possible subsets.

- Each subset takes up to O(n) time to copy.

- Space complexity counts the recursion depth and the current subset (excluding output).
