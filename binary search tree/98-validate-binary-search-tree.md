# Daily Leetcode

Submitted By: Ijas Ahammed

# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/validate-binary-search-tree/">98. Validate Binary Search Tree</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Tree, Depth-First Search,  Binary Search Tree, Binary Tree
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
   <td>08 October 2025
   </td>
  </tr>
</table>

# Problem Statement

Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

- The left subtree of a node contains only nodes with keys strictly less than the node's key.
- The right subtree of a node contains only nodes with keys strictly greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

**Example 1**

Input: root = [2,1,3] \
Output: true

**Example 2**

Input: root = [5,1,4,null,null,3,6] \
Output: false \
Explanation: The root node's value is 5, but its right child's value is 4.

# Approach 1: In-Order Traversal

## Idea

Traverse through the binary tree using the in-order tree traversal concept and push the values to an array.

- If the array is sorted, that means that the given tree is a binary search tree.
- If not, it is a normal binary tree.

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
FUNCTION IS_VALID_BST(root) RETURNS BOOLEAN
  array ← EMPTY LIST
  INORDER_TRAVERSAL(root, array)
  FOR i ← 1 TO LENGTH(array) - 1
    IF array[i - 1] ≥ array[i] THEN
      RETURN FALSE
    END IF
  END FOR
  RETURN TRUE
END FUNCTION
```

## Solution Code

```ts
function helper(node: TreeNode | null, arr: number[]) {
  if (node === null) return;

  helper(node.left, arr);
  arr.push(node.val);
  helper(node.right, arr);
}

function isValidBST(root: TreeNode | null): boolean {
  const arr = [];

  helper(root, arr);

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] >= arr[i]) return false;
  }

  return true;
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

# Approach 2: Recursive

## Idea

This approach checks if the given binary tree is a valid BST by recursively checking whether all the values of the nodes lie between a valid range.

Starting with -∞ and +∞ as the limits, each recursive call narrows the allowed range: the left child must be less than the current node’s value, and the right child must be greater. If any node violates these bounds, it returns false; otherwise, if all nodes satisfy their constraints, the tree is a valid BST.

## Psuedocode

```sql
FUNCTION IS_VALID_BST(root) RETURNS BOOLEAN
  RETURN VALIDATE(root, -∞, +∞)
END FUNCTION
FUNCTION VALIDATE(node, min, max) RETURNS BOOLEAN
  IF node = NULL THEN
    RETURN TRUE
  END IF
  IF node.value ≤ min OR node.value ≥ max THEN
    RETURN FALSE
  END IF
  RETURN VALIDATE(node.left, min, node.value)
         AND VALIDATE(node.right, node.value, max)
END FUNCTION
```

## Solution Code

```ts
function isValidBST(root: TreeNode | null): boolean {
  return isValid(root, -Infinity, Infinity);
}

function isValid(node: TreeNode | null, min: number, max: number) {
  if (!node) return true;

  if (node.val <= min || node.val >= max) return false;

  return (
    isValid(node.left, min, node.val) && isValid(node.right, node.val, max)
  );
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
   <td>In-Order Traversal Approach
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
   <td>Recursive Range Check Approach
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(h) recursion stack 
<p>
(≈ O(n) worst case, 
<p>
O(log n) for balanced tree)
   </td>
  </tr>
</table>
