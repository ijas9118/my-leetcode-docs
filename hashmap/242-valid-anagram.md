## Metadata

- Problem: [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)
- Data-structure: Hashmap
- Difficulty: 🟩 Easy
- Pattern: nil

### 1. Problem Summary

- Check if the two strings are anagram or not.

### 2. Examples / Edge Cases

```
Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false
```

### 3. My Thought Process

- Create hashmap and iterate through the strings.
- For the first string, increment count
- For the second string, decrement count.
- At the end, we can compare the values in the hashmap, and if non-zero value exists, return false, otherwise, it is anagram and return true.

### 4. Solution

- Pseudocode
  1. map → Hashmap
  2. If s.length ≠ t.length, return false
  3. iterate through strings, s and t:
     1. for char(s) → increment map[char(s)]
     2. for char(t) → Decrement map[char(t)]
  4. Check for non-zero value in map:
     1. If yes, return false
  5. Return true.
- Final Code

  ```js
  var isAnagram = function (s, t) {
    let map = new Map();

    if (s.length !== t.length) return false;

    for (let i = 0; i < s.length; i++) {
      map.set(s[i], (map.get(s[i]) || 0) + 1);
      map.set(t[i], (map.get(t[i]) || 0) - 1);
    }

    for (let val of map.values()) {
      if (val) return false;
    }

    return true;
  };
  ```

### 5. Complexity Analysis

- Time Complexity: O(n)
- Space Complexity: O(n)
