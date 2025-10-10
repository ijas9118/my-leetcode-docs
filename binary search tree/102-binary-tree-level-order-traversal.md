# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/binary-tree-level-order-traversal/">102. Binary Tree Level Order Traversal</a>
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
   <td>🟧Medium
   </td>
  </tr>
  <tr>
   <td>Date
   </td>
   <td>10 October 2025
   </td>
  </tr>
</table>

# Problem Statement

Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

**Example 1**

Input: root = [3,9,20, null, null, 15,7] \
Output: [[3], [9,20], [15,7]]

**Example 2**

Input: root = [1] \
Output: [1]

# Approach

## Idea

Use the Breadth First Search algorithm to traverse the tree level order. For each iteration, collect all the nodes in a level as an array, and push this array into the resultant array.

## Psuedocode

```sql
FUNCTION LEVEL_ORDER(root)
  IF root = NULL THEN
    RETURN EMPTY LIST
  END IF
  queue ← EMPTY QUEUE
  result ← EMPTY LIST
  ENQUEUE root INTO queue


  WHILE queue IS NOT EMPTY DO
    level ← EMPTY LIST
    size ← LENGTH(queue)


    FOR i ← 1 TO size DO
      node ← DEQUEUE(queue)
      APPEND node.value TO level
      IF node.left ≠ NULL THEN
        ENQUEUE node.left INTO the queue
      END IF
      IF node.right ≠ NULL THEN
        ENQUEUE node.right INTO queue
      END IF
    END FOR
    APPEND level TO result
  END WHILE


  RETURN result
END FUNCTION
```

## Solution Code

```ts
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const queue: TreeNode[] = [];
  const result: number[][] = [];
  queue.push(root);

  while (queue.length > 0) {
    let n = queue.length;
    let level: number[] = [];

    for (let i = 0; i < n; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
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
   <td>Level Order Traversal (BFS)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n) for the queue (in the worst case, when the last level has ~n/2 nodes)
   </td>
  </tr>
</table>
