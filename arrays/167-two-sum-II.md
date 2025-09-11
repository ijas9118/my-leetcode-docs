## Metadata

| Field             | Value                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| Problem           | [167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) |
| Data Structure(s) | Arrays                                                                                                     |
| Difficulty        | 🟧 Medium                                                                                                  |
| Pattern           | Two Pointers                                                                                               |

### 1. Problem Summary

- We have to find the first pair of numbers in a sorted array (1-indexed) whose sum equals the given target.
- Should do with constant space complexity.

### 2. Examples / Edge Cases

- [1, 3, 4, 5, 7, 10, 11], target = 9
  - Output: [3, 4]

### 3. My Thought Process

- Initially I thought of using hashmap and storing the complement of the element while iterating the array. But realised, need O(1) space.
- Array is sorted, so we can advantage of that. Two pointers mechanism, one at the beginning and the other at the end.
  - Find the sum of the elements pointed by the pointer.
  - If greater than target, decrease 2nd pointer, else increase 1st pointer.

### 4. Solution

- Pseudocode
  1. Set i = 0, j = last index.
  2. take the sum of both elements
  3. If sum > target ⇒ j = j - 1
  4. else i = i + 1
  5. Return [i + 1, j + 1] when sum = target
- Final Code

  ```js
  var twoSum = function (numbers, target) {
    let i = 0,
      j = numbers.length - 1;

    while (i < j) {
      let sum = numbers[i] + numbers[j];
      if (sum === target) {
        return [i + 1, j + 1];
      }
      if (sum > target) {
        j--;
      } else {
        i++;
      }
    }
  };
  ```

### 5. Complexity Analysis

- Time Complexity: O(n)
- Space Complexity: O(1)
