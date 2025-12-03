# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/valid-palindrome-ii/description/">680. Valid Palindrome II</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Array, Two Pointers
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
   <td>03 December 2025
   </td>
  </tr>
</table>

# Problem Statement

Given a string s, return true if the string s can be a palindrome after deleting at most one character from it.

**Example 1**

Input: s = "aba" \
Output: true

**Example 2**

Input: s = "abca" \
Output: true

**Example 3**

Input: s = "abc" \
Output: false

# Approach

## Idea

You need to check if a string can become a palindrome by removing at most one character.

A normal palindrome means: s[left] === s[right] for all positions.

But here we get one chance to delete a mismatched character (either from the left or right side)

## Psuedocode

1. Use two pointers

   1. One starts at the left (0).
   2. The other starts at the right (`s.length - 1`).

2. Move inward as long as characters match 3. If `s[left] === s[right]`, move both pointers:
   - left++
   - right--
3. When characters do NOT match. This is the key part. We have one chance to delete a character. Two possible characters to delete:
   - Delete the left character → check if the substring `s[left+1...right]` is a palindrome.
   - Delete the right character → check if the substring `s[left...right-1]` is a palindrome.
4. If either substring is a palindrome → return true.

5. If we never hit a mismatch, then the string is already a palindrome → return true.

## Solution Code

```ts
function validPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right])
      return (
        isPalindrome(s.slice(left + 1, right + 1)) ||
        isPalindrome(s.slice(left, right))
      );

    left++;
    right--;
  }

  function isPalindrome(slice: string): boolean {
    return slice === slice.split("").reverse().join("");
  }

  return true;
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
   <td>Two-pointer
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
  </tr>
</table>
