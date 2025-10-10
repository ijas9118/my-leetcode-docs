# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/kth-smallest-element-in-a-bst/">230. Kth Smallest Element in a BST</a>
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
   <td>🟧Medium
   </td>
  </tr>
  <tr>
   <td>Date
   </td>
   <td>09 October 2025
   </td>
  </tr>
</table>

# Problem Statement

Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.

**Example 1**

Input: root = [3,1,4,null,2], k = 1 \
Output: 1

**Example 2**

Input: root = [5,3,6,2,4,null,null,1], k = 3 \
Output: 3

# Approach 1: In-Order Traversal

## Idea

Traverse through the binary tree using the in-order tree traversal concept and push the values to an array.

- The array will be sorted, hence we can return the element at the kth index.

## Psuedocode

```sql
FUNCTION INORDER_TRAVERSAL(node, array)
  IF node = NULL THEN
    RETURN
  END IF
  INORDER_TRAVERSAL(node.left, array)
  APPEND node.value TO array
  INORDER_TRAVERSAL(node.right, array)
END FUNCTION
FUNCTION KTH_SMALLEST(root, k)
  array ← EMPTY LIST
  INORDER_TRAVERSAL(root, array)
  RETURN array[k - 1]
END FUNCTION
```

## Solution Code

```ts
function kthSmallest(root: TreeNode | null, k: number): number {
  const arr: number[] = [];
  inorder(root, arr);
  return arr[k - 1];
}

function inorder(node: TreeNode | null, arr: number[]) {
  if (!node) return null;

  inorder(node.left, arr);
  arr.push(node.val);
  inorder(node.right, arr);
}
```

## Complexity

<table>
  <tr>
   <td>Complexity
   </td>
   <td>Value
   </td>
  </tr>
  <tr>
   <td>Time Complexity
   </td>
   <td>O(n)
   </td>
  </tr>
  <tr>
   <td>Space Complexity
   </td>
   <td>O(n)
   </td>
  </tr>
</table>

# Approach 2: Iterative

## Idea

Perform an in-order DFS of the tree. While popping each node from the stack, keep incrementing a count variable. If the count is equal to the target index, return the node’s value.

## Psuedocode

```sql
FUNCTION KTH_SMALLEST(root, k)
  stack ← EMPTY STACK
  count ← 0
  current ← root
  WHILE current ≠ NULL OR stack IS NOT EMPTY DO
    WHILE current ≠ NULL DO
      PUSH current INTO stack
      current ← current.left
    END WHILE
    current ← POP(stack)
    count ← count + 1
    IF count = k THEN
      RETURN current.value
    END IF
    current ← current.right
  END WHILE
  RETURN -1
END FUNCTION
```

## Solution Code

```ts
function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let n: number = 0;
  let curr = root;

  while (curr || stack.length > 0) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    curr = stack.pop();
    n += 1;
    if (k === n) return curr.val;

    curr = curr.right;
  }

  return -1;
}
```

## Complexity

<table>
  <tr>
   <td>Complexity
   </td>
   <td>Value
   </td>
  </tr>
  <tr>
   <td>Time Complexity
   </td>
   <td>O(n)
   </td>
  </tr>
  <tr>
   <td>Space Complexity
   </td>
   <td>O(h), h is the height of the tree
   </td>
  </tr>
</table>

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
   <td>Inorder Traversal (Recursive)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n) array + O(h) recursion stack 
<p>
(≈ O(n) worst case)
   </td>
  </tr>
  <tr>
   <td>Iterative Inorder Traversal (Stack-based)
   </td>
   <td>O(k)
   </td>
   <td>O(k)
   </td>
   <td>O(n)
   </td>
   <td>O(h) stack (≈ O(n) worst case, O(log n) for balanced tree)
   </td>
  </tr>
</table>
