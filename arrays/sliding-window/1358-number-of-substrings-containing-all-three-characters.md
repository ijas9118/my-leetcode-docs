# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/description">1358. Number of Substrings Containing All Three Characters</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>String, Sliding Window, HashMap
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
   <td>04 December 2025
   </td>
  </tr>
</table>

# Problem Statement

Given a string s consisting only of characters a, b, and c.

Return the number of substrings containing at least one occurrence of all these characters: a, b, and c.

**Example 1**

Input: s = "abcabc" \
Output: 10

**Example 2**

Input: s = "aaacb" \
Output: 3

**Example 3**

Input: s = "abc" \
Output: 1

# Approach

## Idea

We want to count how many substrings contain all three characters: 'a', 'b', and 'c'.

Instead of checking every possible substring (which is slow), we use a clever sliding window to count them efficiently.

We keep a window that expands to the right as we scan the string.

As soon as the window contains at least one of each character, we know something important:

- Every substring starting at the window’s left edge and ending anywhere from the current right edge to the end of the string is valid.

- This is because extending the substring further to the right cannot remove characters—it only makes it longer.

Once we find a window that contains all three characters, we try to shrink it from the left to see if a smaller valid window exists.

- Shrinking continues until the window no longer contains all three characters.

- During this shrinking, each time the window is valid, we count how many substrings can be made using the current left boundary.

If the window becomes valid at position r (right pointer), then every substring starting at l and ending at any index from r to the end is valid.

- So we add: total substrings = total length − r
- This avoids enumerating substrings one by one.

## Solution Code

```ts
function numberOfSubstrings(s: string): number {
  let l = 0;
  let r = 0;
  let freq = new Map();
  let count = 0;

  for (; r < s.length; r++) {
    freq.set(s[r], (freq.get(s[r]) ?? 0) + 1);

    while (freq.size === 3) {
      count += s.length - r;
      freq.set(s[l], freq.get(s[l]) - 1);
      if (freq.get(s[l]) === 0) freq.delete(s[l]);
      l++;
    }
  }
  return count;
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
   <td>Sliding Window (Two Pointers)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(1)
   </td>
  </tr>
</table>
