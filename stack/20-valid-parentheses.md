## Metadata

| Field             | Value                                                                     |
| ----------------- | ------------------------------------------------------------------------- |
| Problem           | [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) |
| Data Structure(s) | Stack                                                                     |
| Difficulty        | 🟩 Easy                                                                   |
| Pattern           | nil                                                                       |

### 1. Problem Summary

- Check if the given string of parentheses is valid or not. All open brackets should close, and in order of latest open bracket.

### 2. Examples / Edge Cases

```
Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Example 4:
Input: s = "([])"
Output: true

Example 5:
Input: s = "("
Output: false

```

### 3. My Thought Process

- With the help of stack, we can get the latest open brackets and compare it with the latest close bracket.
- If they are equal, pop the stack, and continue this process.
- At the end, if the stack is empty, that means the string is a valid parentheses.

### 4. Solution

- Pseudocode
  1. Setup a lookup table with close → open mapping.
  2. Iterate through the string
  3. If open bracket, push to stack.
  4. Else, pop the stack and compare the value with map value of close bracket.
     1. If not equal, return false.
  5. If stack is empty, return true.
- Final Code

  ```jsx
  var isValid = function (s) {
    if (s.length <= 1) return false;

    const closeToOpen = {
      ")": "(",
      "]": "[",
      "}": "{",
    };

    const stack = [];
    const open = ["{", "(", "["];

    for (let b of s) {
      if (open.includes(b)) {
        stack.push(b);
      } else if (closeToOpen[b] !== stack.pop()) {
        return false;
      }
    }

    return stack.length === 0;
  };
  ```

### 5. Complexity Analysis

- Time Complexity: O(n)
- Space Complexity: O(n)
