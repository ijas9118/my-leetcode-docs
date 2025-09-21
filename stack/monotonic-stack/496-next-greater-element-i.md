## Metadata

| Field             | Value                                                                                |
| ----------------- | ------------------------------------------------------------------------------------ |
| Problem           | [496. Next Greater Element I](https://leetcode.com/problems/next-greater-element-i/) |
| Data Structure(s) | Stack                                                                                |
| Difficulty        | 🟩 Easy                                                                              |
| Pattern           | Monotonic Stack                                                                      |

### 1. Problem Summary

- Two arrays are given. num1 is a subset of num2. We need to find the next largest element in num2, of every element in num1 present in num2. If no such element exists, return `-1` for that number.

### 2. Examples / Edge Cases

```
Example 1:
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]

Example 2:
Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]

```

### 3. My Thought Process

- This needs a monotonic decreasing stack.
- While iterating through num2, if the element exist in num1, we push it to stack, provided it is less than the top of the stack.
- Once we find a larger element than the top of the stack, we need to assign it in the result array at the exact index of the top of the stack element in num1. To achieve this, we can make a hashmap mapping the values with index of num1 array.

### 4. Solution

```jsx
var nextGreaterElement = function (nums1, nums2) {
  let map = new Map(nums1.map((val, i) => [val, i]));
  let res = new Array(nums1.length).fill(-1);
  const stack = [];

  for (let n of nums2) {
    while (stack.length > 0 && n > stack.at(-1)) {
      res[map.get(stack.pop())] = n;
    }
    if (map.has(n)) {
      stack.push(n);
    }
  }
  return res;
};
```

### 5. Complexity Analysis

- Time Complexity: O(n)
- Space Complexity: O(n + m)
