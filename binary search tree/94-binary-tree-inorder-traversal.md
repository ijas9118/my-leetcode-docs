## Metadata

1. Problem: [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
2. Topics: Arrays, Two Pointers, Hashset
3. Difficulty: Easy
4. Date: 17 Sept, 2025

| Field             | Value                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------- |
| Problem           | [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/) |
| Data Structure(s) | Binary Tree, Stack                                                                                |
| Difficulty        | 🟩 Easy                                                                                           |
| Pattern           | nil                                                                                               |

## Approach

### Recursive Approach

#### Idea

Make a function to traverse. Start from the root. Go to the left child if it exists. Then print the root value, and finally go to the right child if it exists. This is how inorder works. We can store the result as an array representation of the binary tree and return it.

#### Pseudo-code

1. Create an empty result array res.
2. Write a helper function traverse(node):
   1. If the node is null, return.
   2. Call traverse(node.left)
   3. Push node.val into res
   4. Call traverse(node.right)
3. Call traverse(root)
4. Return res

#### Code

```js
var inorderTraversal = function(root) {
   const result = [];

   const traverse = (node) => {
       if (!node) {
           return;
       }
       traverse(node.left);
       result.push(node.val);
       traverse(node.right);
   }

   traverse(root);
   return result;
};
```

#### Complexity

- Time Complexity: O(n)
- Space Complexity: O(n)

### Iterative Approach

#### Idea

Use a custom stack to store the nodes. Traverse till the left most node is found. Pop the top of the stack and push the value of that node to the array and start traversing its right side.

#### Pseudo-code

1. Initialize an empty array res (result).
2. Initialize an empty stack.
3. Set current = root.
4. While current is not null or stack is not empty: 5. While current exists: 1. Push current to stack. 2. Move current = current.left 6. Pop from stack, call it node. 7. Push node.val into res. 8. Move current = node.right
5. Return res.

#### Code

```js
var inorderTraversal = function(root) {
   const res = []
   const stack = []
   let current = root;

   while (current || stack.length > 0) {
       while (current) {
           stack.push(current);
           current = current.left
       }
       current = stack.pop();
       res.push(current.val);
       current = current.right;
   }

   return res;
};
```

#### Complexity

- Time: O(n)
- Space: O(n)
