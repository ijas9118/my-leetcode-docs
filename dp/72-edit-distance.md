# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/edit-distance/description/">72. Edit Distance</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>String, Dynamic Programming
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
   <td>20 December 2025
   </td>
  </tr>
</table>

# Problem Statement

Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

- Insert a character
- Delete a character
- Replace a character

**Example 1**

Input: word1 = "horse", word2 = "ros" \
Output: 3

#

# Approach

## Idea

This problem involves finding the minimum number of edits required to transform one word into another.

- An edit can be inserting a character, deleting a character, or replacing a character.
- The key idea is to break down this large problem into smaller subproblems and build the answer step by step.

The approach used here is called dynamic programming.

- Instead of trying all possible ways to edit the word (which would be very slow), we store the results of smaller comparisons and reuse them.
- We imagine a table where rows represent prefixes of the first word and columns represent prefixes of the second word.
- Each cell answers the question: “What is the minimum number of edits needed to convert the first i characters of word1 into the first j characters of word2?”

We start by handling the simplest cases.

- Converting an empty string into a word of length j requires j insertions.
- Similarly, converting a word of length i into an empty string requires i deletions.
- These values fill the first row and first column of the table and act as our base cases.

Then we fill the table one cell at a time.

- For each position, we compare the current characters from both words.
- If the characters are the same, no edit is needed, so we just copy the value from the diagonal cell (which represents the previous characters).
- If the characters are different, we consider three possible actions: replace (diagonal), insert (left), or delete (top). We take the smallest of these three values and add one edit to it.

By the time the table is filled, the bottom-right cell contains the minimum number of edits needed to convert the entire first word into the entire second word. This method works efficiently because it ensures every smaller comparison is solved once and reused, leading to a clear and optimal solution.

## Solution Code

```ts
function minDistance(word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;

  const mat = Array.from({ length: m + 1 }, () => new Array(n + 1));

  for (let i = 0; i <= n; i++) mat[0][i] = i;
  for (let i = 0; i <= m; i++) mat[i][0] = i;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1.charAt(i - 1) === word2.charAt(j - 1))
        mat[i][j] = mat[i - 1][j - 1];
      else {
        let topLeft = mat[i - 1][j - 1];
        let left = mat[i][j - 1];
        let top = mat[i - 1][j];

        mat[i][j] = Math.min(topLeft, left, top) + 1;
      }
    }
  }

  return mat[m][n];
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
   <td>Dynamic Programming + Memoization
   </td>
   <td>O(m x n)
   </td>
   <td>O(m x n)
   </td>
   <td>O(m x n)
   </td>
   <td>O(m x n)
   </td>
  </tr>
</table>
