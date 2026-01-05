# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/merge-sorted-array/description/">88. Merge Sorted Array</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, Two pointers, Sorting
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

Both arrays are already sorted, and nums1 has extra space at the end to hold all elements from nums2.

Instead of merging from the front, we merge from the back to avoid overwriting useful values in nums1.

1. Start from the end

   - We use a pointer last that starts at the last index of nums1 (m + n - 1).

2. Compare the largest remaining elements.

   - Compare the last valid element of nums1 (nums1[m - 1]) with the last element of nums2 (nums2[n - 1]).
   - Place the larger one at nums1[last].

3. Move pointers backward

   - If the element came from nums1, decrease m.
   - If it came from nums2, decrease n.
   - Always move last backward.

4. Copy remaining elements from nums2 (if any)

   - If nums2 still has elements left, copy them into nums1.
     (No need to copy remaining elements from nums1 because they are already in the correct place.)

## Solution Code

```ts
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let last = m + n - 1;

  while (m > 0 && n > 0) {
    if (nums1[m - 1] > nums2[n - 1]) {
      nums1[last] = nums1[m - 1];
      m--;
    } else {
      nums1[last] = nums2[n - 1];
      n--;
    }
    last--;
  }

  while (n > 0) {
    nums1[last] = nums2[n - 1];
    last--;
    n--;
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
   <td>Two pointers (merge from the end)
   </td>
   <td>O(m + n)
   </td>
   <td>O(m + n)
   </td>
   <td>O(m + n)
   </td>
   <td>O(1)
   </td>
  </tr>
</table>
