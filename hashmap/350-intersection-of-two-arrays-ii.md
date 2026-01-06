# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/intersection-of-two-arrays-ii/description/">350. Intersection of Two Arrays II</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, Two pointers, HashMap
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
   <td>06 January 2026
   </td>
  </tr>
</table>

## Idea

The goal is to return all common elements, including duplicates, between two arrays.

We can use a frequency map to track how many times each number appears.

1. Count elements in nums1

   - Use a map where the key is the number and the value is the number of times it appears.

   - This indicates the number of times each number is allowed to appear in the result.

2. Traverse nums2

   - For each number:

     - If it exists in the map and its count is greater than 0, it means this number is still available for intersection.

     - Add it to the result.

     - Decrease its count in the map to avoid using it more times than allowed.

3. Return the result

   - The result contains each common number the correct number of times.

This approach ensures duplicates are handled correctly and no extra elements are added.

## Solution Code

```ts
function intersect(nums1: number[], nums2: number[]): number[] {
  const map = new Map();
  let result = [];

  for (let n of nums1) map.set(n, (map.get(n) || 0) + 1);

  for (let n of nums2)
    if (map.has(n) && map.get(n) > 0) {
      result.push(n);
      map.set(n, map.get(n) - 1);
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
   <td>Hash Map (Frequency Map)
   </td>
   <td>O(n + m)
   </td>
   <td>O(n + m)
   </td>
   <td>O(n + m)
   </td>
   <td>O(n)
   </td>
  </tr>
</table>
