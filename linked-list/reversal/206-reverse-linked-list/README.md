# 206. Reverse Linked List

<table width="100%">
  <tr>
    <td width="150px"><b>Difficulty</b></td>
    <td>
      <img src="https://img.shields.io/badge/Easy-5CB85C?style=flat-square" alt="Easy">
    </td>
  </tr>
  <tr>
    <td><b>Language</b></td>
    <td>
      <img src="https://img.shields.io/badge/typescript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="typescript">
    </td>
  </tr>
  <tr>
    <td><b>Topics</b></td>
    <td>Linked List • Recursion</td>
  </tr>
  <tr>
    <td><b>Date</b></td>
    <td>Invalid Date</td>
  </tr>
  <tr>
    <td><b>Problem Link</b></td>
    <td>
      <a href="https://leetcode.com/problems/reverse-linked-list/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg" style="width: 542px; height: 222px;" />
<pre>
<strong>Input:</strong> head = [1,2,3,4,5]
<strong>Output:</strong> [5,4,3,2,1]
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg" style="width: 182px; height: 222px;" />
<pre>
<strong>Input:</strong> head = [1,2]
<strong>Output:</strong> [2,1]
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> head = []
<strong>Output:</strong> []
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the list is the range <code>[0, 5000]</code>.</li>
	<li><code>-5000 &lt;= Node.val &lt;= 5000</code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow up:</strong> A linked list can be reversed either iteratively or recursively. Could you implement both?</p>


---

## 💡 Solution Approach

# Reverse Linked List - Solution Explanation

## Problem Understanding

Before diving into the solution, let's understand what we're trying to accomplish. We have a singly linked list, which is like a chain of nodes where each node points to the next one in sequence. Our goal is to reverse this chain so that it points in the opposite direction.

Imagine a train where each car is connected to the next one. Reversing the linked list is like turning the entire train around so that the last car becomes the first, and all the connections between cars are flipped.

## The Approach: Iterative Reversal

The solution uses an **iterative approach** with three pointers to reverse the linked list in place. This means we don't create a new list; instead, we modify the existing connections between nodes.

The key idea is to traverse through the list one node at a time, and for each node, we reverse its pointer to point backward instead of forward. We need to keep track of three things as we move through the list:

1. **Previous node** (`prev`) - The node we just processed
2. **Current node** (`curr`) - The node we're currently working on
3. **Next node** (`next`) - The node coming up after the current one

## How the Algorithm Works

### Initialization

```typescript
if (!head) return null;
let curr = head;
let prev = null;
```

First, we handle the edge case where the list is empty. If there's no head, there's nothing to reverse, so we return `null`.

Then we set up our pointers:
- `curr` starts at the head of the list (the first node)
- `prev` starts as `null` because there's nothing before the first node

### The Reversal Loop

```typescript
while (curr) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
}
```

This is where the magic happens. Let's break down what happens in each iteration:

**Step 1: Save the next node**
```typescript
let next = curr.next;
```
Before we modify anything, we need to remember where the next node is. If we don't save this reference, we'll lose the rest of the list when we reverse the current node's pointer.

Think of it like this: before you turn around a train car, you need to remember which car was behind it, or you'll lose track of the rest of the train.

**Step 2: Reverse the current node's pointer**
```typescript
curr.next = prev;
```
This is the actual reversal step. We make the current node point backward to the previous node instead of forward. Initially, `prev` is `null`, so the first node (which will become the last node) points to `null`, which is correct for the end of a list.

**Step 3: Move prev forward**
```typescript
prev = curr;
```
Now that we've processed the current node, it becomes the "previous" node for the next iteration. We're essentially moving our focus one step forward in the original list.

**Step 4: Move curr forward**
```typescript
curr = next;
```
Finally, we move to the next node in the original list (which we saved in step 1). The loop continues until `curr` becomes `null`, meaning we've processed all nodes.

### Return the New Head

```typescript
return prev;
```

When the loop ends, `curr` is `null` (we've gone past the last node), and `prev` is pointing to what was the last node in the original list. Since we've reversed all the pointers, this last node is now the first node of our reversed list, so we return `prev` as the new head.

## Visual Example

Let's walk through reversing the list: `1 → 2 → 3 → null`

**Initial state:**
- `prev = null`
- `curr = 1`
- List: `1 → 2 → 3 → null`

**Iteration 1:**
- `next = 2` (save it)
- `1.next = null` (reverse the pointer)
- `prev = 1`
- `curr = 2`
- List state: `null ← 1    2 → 3 → null`

**Iteration 2:**
- `next = 3` (save it)
- `2.next = 1` (reverse the pointer)
- `prev = 2`
- `curr = 3`
- List state: `null ← 1 ← 2    3 → null`

**Iteration 3:**
- `next = null` (save it)
- `3.next = 2` (reverse the pointer)
- `prev = 3`
- `curr = null`
- List state: `null ← 1 ← 2 ← 3`

**Loop ends** (because `curr` is `null`)
- Return `prev` (which is node 3)
- Final reversed list: `3 → 2 → 1 → null`

## Time and Space Complexity

**Time Complexity: O(n)** where n is the number of nodes in the list. We visit each node exactly once, performing constant-time operations at each node.

**Space Complexity: O(1)** because we only use three pointer variables regardless of the list size. We're reversing the list in place without using any additional data structures.

## Key Takeaways

The beauty of this solution lies in its simplicity. By carefully managing three pointers and performing one reversal at a time, we can reverse the entire linked list without needing extra space. The trick is to always save the next node before modifying the current node's pointer, ensuring we don't lose our way through the list.

---

## ⏱️ Complexity Analysis

| Metric | Complexity |
|:-------|:-----------|
| **Time** | `O(n)` |
| **Space** | `O(1)` |

---

## 💻 Implementation

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function reverseList(head: ListNode | null): ListNode | null {
    if (!head) return null;

    let curr = head;
    let prev = null;

    while (curr) {
        let next = curr.next;
        curr.next =  prev;
        prev = curr;
        curr = next;
    }

    return prev;
};
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
