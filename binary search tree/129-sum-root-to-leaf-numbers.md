# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/sum-root-to-leaf-numbers/">129. Sum Root to Leaf Numbers</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Tree, DFS, Binary Tree
   </td>
  </tr>
  <tr>
   <td>Difficulty
   </td>
   <td>🟧Medium
   </td>
  </tr>
  <tr>
   <td>Date
   </td>
   <td>11 October 2025
   </td>
  </tr>
</table>

# Problem Statement

You are given the root of a binary tree containing digits from 0 to 9 only.

Each root-to-leaf path in the tree represents a number.

- For example, the root-to-leaf path 1 -> 2 -> 3 represents the number 123.

Return the total sum of all root-to-leaf numbers. Test cases are generated so that the answer will fit in a 32-bit integer.

A leaf node is a node with no children.

**Example 1**

Input: root = [1,2,3] \
Output: 25

**Example 2**

Input: root = [4,9,0,5,1]

Output: 1026

# Approach: Recursive DFS

## Idea

Use DFS recursively and keep track of the sum. At each node, multiply the current sum by 10 and add the node’s value to form the new number. When a leaf node is reached, return this number as one complete root-to-leaf path value. Finally, sum the results from the left and right subtrees to get the total sum of all root-to-leaf numbers.

## Psuedocode

```sql
FUNCTION SUM_NUMBERS(root)
  RETURN FIND_SUM(root, 0)
END FUNCTION

FUNCTION FIND_SUM(node, currentSum)
  IF node = NULL THEN
    RETURN 0
  END IF

  currentSum ← currentSum * 10 + node.value

  IF node.left = NULL AND node.right = NULL THEN
    RETURN currentSum
  END IF

  RETURN FIND_SUM(node.left, currentSum) + FIND_SUM(node.right, currentSum)
END FUNCTION
```

## Solution Code

```ts
function sumNumbers(root: TreeNode | null): number {
  let sum = 0;
  return findSumOfNodes(root, sum);
}

function findSumOfNodes(node: TreeNode | null, sum: number) {
  if (!node) return 0;

  sum = sum * 10 + node.val;
  if (!node.left && !node.right) return sum;

  return findSumOfNodes(node.left, sum) + findSumOfNodes(node.right, sum);
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
   <td>Recursive DFS
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(h) recursion stack (≈ O(n) worst case, O(log n) for balanced tree)
   </td>
  </tr>
</table>
