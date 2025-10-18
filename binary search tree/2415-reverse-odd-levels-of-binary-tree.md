# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/reverse-odd-levels-of-binary-tree/">2415. Reverse Odd Levels of a Binary Tree</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Tree, BFS, Binary Tree
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
   <td>14 October 2025
   </td>
  </tr>
</table>

# Problem Statement

Given the root of a perfect binary tree, reverse the node values at each odd level of the tree.

Return the root of the reversed tree.

**Example 1**

Input: root = [2,3,5,8,13,21,34] \
Output: [2,5,3,8,13,21,34]

**Example 2**

Input: root = [7,13,11] \
Output: [7,11,13]

# Approach 1 - BFS

## Idea

Traverse the binary tree level by level using a queue (BFS), and at each odd-numbered level, reverse the node values to achieve the desired order.

## Psuedocode

```sql
FUNCTION REVERSE_ODD_LEVELS(root)
  IF root = NULL THEN
    RETURN NULL
  END IF
  queue ← LIST CONTAINING root
  level ← 0

  WHILE queue IS NOT EMPTY DO
    size ← LENGTH(queue)
    IF level MOD 2 ≠ 0 THEN
      i ← 0
      j ← size - 1
      WHILE i < j DO
        SWAP queue[i].value WITH queue[j].value
        i ← i + 1
        j ← j - 1
      END WHILE
    END IF

    FOR k ← 1 TO size DO
      node ← REMOVE_FIRST(queue)
      IF node.left ≠ NULL THEN
        APPEND node.left TO queue
      END IF
      IF node.right ≠ NULL THEN
        APPEND node.right TO queue
      END IF
    END FOR
    level ← level + 1
  END WHILE

  RETURN root
END FUNCTION
```

## Solution Code

```ts
function reverseOddLevels(root: TreeNode | null): TreeNode | null {
  let queue = [root];
  let level = 0;

  while (queue.length) {
    let length = queue.length;
    if (level % 2 !== 0) {
      let i = 0,
        j = length - 1;

      while (i < j) {
        [queue[i].val, queue[j].val] = [queue[j].val, queue[i].val];
        i++;
        j--;
      }
    }

    for (let i = 0; i < length; i++) {
      const curr = queue.shift();
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);
    }

    level++;
  }

  return root;
}
```

# Approach 2 - DFS

## Idea

Use recursion to traverse symmetric pairs of nodes from the same level but opposite sides, and swap their values when you’re at an odd level. At any level, you can recursively process `left.left` with `right.right` and `left.right` with `right.left`. When the current level is odd, swap their values.

## Psuedocode

```sql
FUNCTION REVERSE_ODD_LEVELS(root)
  FUNCTION DFS(left, right, level)
    IF left = NULL OR right = NULL THEN
      RETURN
    END IF

    IF level MOD 2 ≠ 0 THEN
      SWAP left.value WITH right.value
    END IF

    DFS(left.left,  right.right, level + 1)
    DFS(left.right, right.left,  level + 1)
  END FUNCTION

  DFS(root.left, root.right, 1)
  RETURN root
END FUNCTION
```

## Solution Code

```ts
function reverseOddLevels(root: TreeNode | null): TreeNode | null {
  function dfs(left: TreeNode | null, right: TreeNode | null, level: number) {
    if (!left || !right) return;

    if (level % 2 !== 0) {
      [left.val, right.val] = [right.val, left.val];
    }

    dfs(left.left, right.right, level + 1);
    dfs(left.right, right.left, level + 1);
  }

  dfs(root.left, root.right, 1);
  return root;
}
```

#

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
   <td>BFS (Level Order Traversal)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(w) queue (≈ O(n) worst case, O(n/2) for full binary tree)
   </td>
  </tr>
  <tr>
   <td>DFS (Recursive, Mirror Traversal)
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
