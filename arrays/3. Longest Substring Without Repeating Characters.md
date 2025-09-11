[🔗 Problem link](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)

### 1. Problem Summary

- The task is to find the longest subarray with no duplicate characters. (enlish letters, digits, symbols and spaces)

### 2. Examples / Edge Cases

Example 1:

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

```

Example 2:

```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

```

Example 3:

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

Example 4:

```
Input: s = "", or s = "t"
Output should be length of the string.
```

### 3. My Thought Process

- This is a classic sliding window problem. I can use a set for storing the characters.
- Iterate through the string and if the character is duplicate, reduce the window size from left and check again.
- Update max length value each time.

### 4. Solution

- Pseudocode
  1. Initialise window, i, j =0
  2. Iterate through string
  3. Add character to set if doesn’t exist.
  4. if character exist in set, i = i + 1;
  5. else j = j + 1;
  6. max = maxiumOf(max, j - i + 1)
  7. return max
- Final Code

  ```js
  var lengthOfLongestSubstring = function (s) {
    const set = new Set();
    let left = 0,
      right = 0;
    let max = 0;

    for (; right < s.length; right++) {
      while (set.has(s[right])) {
        set.delete(s[left]);
        left++;
      }
      set.add(s[right]);
      max = Math.max(max, right - left + 1);
    }
    return max;
  };
  ```

### 5. Complexity Analysis

- Time Complexity: O(n)
- Space Complexity: O(n)
