# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/binary-search-tree-to-greater-sum-tree/">1038. Binary Search Tree to Greater Sum Tree</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Tree, Depth-First Search, Binary Search Tree, Binary Tree
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
   <td>13 October 2025
   </td>
  </tr>
</table>

# Problem Statement

Given the root of a Binary Search Tree (BST), convert it to a Greater Tree such that every key of the original BST is changed to the original key plus the sum of all keys greater than the original key in BST.

**Example 1**

Input: root = [4,1,6,0,2,5,7, null, null, null,3, null, null, null, 8] \
Output: [30,36,21,36,35,26,15, null, null, null,33, null, null, null,8]

# Approach

## Idea

Use DFS to traverse the tree in a Reverse Inorder way. Go to the extreme right-most node. Keep a running sum of all nodes visited. For each node, add its value to the running sum and update the node. By the time you finish, each node contains the sum of all greater or equal nodes.

## Psuedocode

```sql
FUNCTION BST_TO_GST(root)
  currentSum ← 0

  FUNCTION DFS(node)
    IF node = NULL THEN
      RETURN
    END IF

    DFS(node.right)
    node.value ← node.value + currentSum
    currentSum ← node.value
    DFS(node.left)
  END FUNCTION

  DFS(root)
  RETURN root
END FUNCTION
```

## Solution Code

```sql
function bstToGst(root: TreeNode | null): TreeNode | null {
    let current = 0

    function dfs(node: TreeNode | null) {
        if (!node) return;

        dfs(node.right);
        node.val += current;
        current = node.val
        dfs(node.left);
    }
    dfs(root);
    return root;
};
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
   <td>Reverse Inorder DFS
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
