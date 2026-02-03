# 1234. Replace the Substring for Balanced String

**Difficulty**: 🟧 Medium  
**Topics**: String, Sliding Window  
**Link**: [LeetCode](https://leetcode.com/problems/replace-the-substring-for-balanced-string/)

---

## Problem Description

You are given a string s of length n containing only four kinds of characters: &#39;Q&#39;, &#39;W&#39;, &#39;E&#39;, and &#39;R&#39;.

A string is said to be balanced if each of its characters appears n / 4 times where n is the length of the string.

Return the minimum length of the substring that can be replaced with any other string of the same length to make s balanced. If s is already balanced, return 0.

&nbsp;
Example 1:


Input: s = &quot;QWER&quot;
Output: 0
Explanation: s is already ba...

[View full problem on LeetCode](https://leetcode.com/problems/replace-the-substring-for-balanced-string/)

---

## Solution Approach

Approach

The problem is typically solved using a sliding window technique.
First, count the frequency of each character and determine how many extra occurrences exceed n / 4. Then, use a sliding window to find the smallest substring that, when replaced, removes all excess characters and makes the remaining string balanced.

Time Complexity

O(n)
Each character is processed a constant number of times: once during frequency counting and once while expanding/shrinking the sliding window.


**Time Complexity**: O(n)


---

## Solution Code

```typescript
function main() {
  console.log("Hello worls")
}
```

---

*Auto-generated using [LeetCode Documentation Tool](https://github.com/ijas9118/leetcode-github-sync-tool)*
