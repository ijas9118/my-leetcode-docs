# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays/">2657. Find the Prefix Common Array of Two Arrays</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Arrays, HashMap
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
   <td>28 October 2025
   </td>
  </tr>
</table>

# Problem Statement

You are given two 0-indexed integer permutations A and B of length n.

A prefix common array of A and B is an array C such that C[i] is equal to the count of numbers that are present at or before the index i in both A and B.

Return the prefix common array of A and B.

A sequence of n integers is called a permutation if it contains all integers from 1 to n exactly once.

**Example 1**

Input: A = [1,3,2,4], B = [3,1,2,4] \
Output: [0,2,3,4]

**Example 2**

Input: A = [2,3,1], B = [3,1,2] \
Output: [0,1,3]

# Approach - HashMap

## Idea

Create a map to count frequencies, a result array, and a running count of common elements.

- For every position i, examine A[i] and B[i] to update frequencies and common count.
- If both arrays have the same value at index i, add 2 to that value's frequency in one step and increment the common count by 1.
- Add 1 to A[i]'s frequency if it reaches 2 (meaning it appeared in B before), increment common count.
- Add 1 to B[i]'s frequency if it reaches 2 (meaning it appeared in A before), increment common count.
- Push the current common count to the result array for this prefix and return it at the end.

## Psuedocode

```sql
FUNCTION FIND_PREFIX_COMMON_ARRAY(A, B)
  map ← EMPTY MAP
  n ← LENGTH(A)
  result ← EMPTY LIST
  count ← 0

  FOR i ← 0 TO n - 1 DO
    IF A[i] = B[i] THEN
      map[A[i]] ← (map[A[i]] OR 0) + 2
      count ← count + 1
    ELSE
      map[A[i]] ← (map[A[i]] OR 0) + 1
      IF map[A[i]] = 2 THEN
        count ← count + 1
      END IF

      map[B[i]] ← (map[B[i]] OR 0) + 1
      IF map[B[i]] = 2 THEN
        count ← count + 1
      END IF
    END IF

    APPEND count TO result
  END FOR

  RETURN result
END FUNCTION
```

## Solution Code

```ts
function findThePrefixCommonArray(A: number[], B: number[]): number[] {
  const map = new Map<number, number>();
  const n = A.length;
  let result: number[] = [];
  let count = 0;

  for (let i = 0; i < n; i++) {
    if (A[i] === B[i]) {
      map.set(A[i], (map.get(A[i]) || 0) + 2);
      count++;
    } else {
      map.set(A[i], (map.get(A[i]) || 0) + 1);
      if (map.get(A[i]) === 2) count++;
      map.set(B[i], (map.get(B[i]) || 0) + 1);
      if (map.get(B[i]) === 2) count++;
    }
    result.push(count);
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
   <td>Hash Map Counting Approach
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n) for the hash map and result storage
   </td>
  </tr>
</table>
