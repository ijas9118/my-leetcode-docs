# 203. Remove Linked List Elements

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
      <a href="https://leetcode.com/problems/remove-linked-list-elements/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>Given the <code>head</code> of a linked list and an integer <code>val</code>, remove all the nodes of the linked list that has <code>Node.val == val</code>, and return <em>the new head</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/06/removelinked-list.jpg" style="width: 500px; height: 142px;" />
<pre>
<strong>Input:</strong> head = [1,2,6,3,4,5,6], val = 6
<strong>Output:</strong> [1,2,3,4,5]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> head = [], val = 1
<strong>Output:</strong> []
</pre>

<p><strong class="example">Example 3:</strong></p>

<pre>
<strong>Input:</strong> head = [7,7,7,7], val = 7
<strong>Output:</strong> []
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the list is in the range <code>[0, 10<sup>4</sup>]</code>.</li>
	<li><code>1 &lt;= Node.val &lt;= 50</code></li>
	<li><code>0 &lt;= val &lt;= 50</code></li>
</ul>


---

## 💡 Solution Approach

## Problem Overview

The task is to remove all nodes from a linked list where the node's value equals a given target value. For example, if you have a list `1 → 2 → 3 → 2 → null` and want to remove all `2`s, the result should be `1 → 3 → null`.

The tricky part is handling edge cases, like when the head node itself needs to be removed.

## Solution Approach: Dummy Node Technique

### The Core Idea

This solution uses a clever technique called the **dummy node pattern**. Think of it like this: imagine you're holding a chain of beads, and you need to remove certain beads. It's easier if you hold the chain from a fixed anchor point (the dummy node) rather than directly holding the first bead, because then you never have to worry about losing track of the beginning.

A dummy node is a temporary node that points to the head of the original list. This dummy node doesn't contain meaningful data, it just serves as an anchor point. By using it, we can handle all nodes uniformly, including the head node, without special cases.

### Why Not Handle the Head Separately?

Without a dummy node, you'd need to check if the head itself should be removed, and if so, update the head variable. With many nodes to remove, this gets messy. The dummy node solves this elegantly by ensuring every node (including the first one) can be processed the same way.

---

## Step-by-Step Walkthrough

### Setup Phase

```typescript
let dummy = new ListNode(0, head)
let prev = dummy;
let curr = head;
```

Here's what happens:

1. **Create a dummy node** with a value of `0` (any value works since we ignore it) that points to the original head

2. **Set `prev` to the dummy node** - this will track the last node we want to keep

3. **Set `curr` to the head** - this will scan through all nodes

At this point, your structure looks like: `dummy(0) → head → ... → rest of list`

### Traversal and Removal Logic

```typescript
while (curr) {
    let next = curr.next;
    if (curr.val === val) prev.next = next;
    else prev = curr
    curr = next
}
```

This loop is the heart of the algorithm. Let's break down what happens in each iteration:

**Step 1: Save the next node**
```typescript
let next = curr.next;
```
We store `curr.next` before we do anything else. This is crucial because if we remove `curr`, we need to know where to continue. It's like bookmarking your spot before turning a page.

**Step 2: Check if the current node should be removed**
```typescript
if (curr.val === val) prev.next = next;
else prev = curr
```

There are two cases:

- **If `curr.val === val`** (we want to remove this node): We make `prev` skip over `curr` by setting `prev.next = next`. Think of it as cutting a bead out of the chain—the previous bead now points directly to the next one, completely skipping the bead we're removing.

- **If `curr.val !== val`** (we want to keep this node): We move `prev` forward to `curr`. We're now saying "this node is the last one we want to keep, remember it for next time."

**Step 3: Move to the next node**
```typescript
curr = next;
```
We advance to the next node using the bookmark we saved earlier.

### Return the Result

```typescript
return dummy.next;
```

After the loop finishes, `dummy.next` points to the new head of the list (which might be different from the original head if we removed head nodes). We return this, ignoring the dummy node itself.

---

## Example Walkthrough

Let's trace through an example: Remove all `2`s from `1 → 2 → 3 → 2 → null`

**Initial state:**
```
dummy(0) → 1 → 2 → 3 → 2 → null
^prev     ^curr
```

**Iteration 1:** `curr = 1` (value is 1, not 2)
- `1 ≠ 2`, so we keep this node
- `prev` moves to `1`
```
dummy(0) → 1 → 2 → 3 → 2 → null
           ^prev  ^curr
```

**Iteration 2:** `curr = 2` (value is 2, target found!)
- `2 === 2`, so we remove this node
- `prev.next` skips over the `2` and points to `3`
```
dummy(0) → 1 → 3 → 2 → null
           ^prev ^curr (but curr.next = 3 now)
```

**Iteration 3:** `curr = 3` (value is 3, not 2)
- `3 ≠ 2`, so we keep this node
- `prev` moves to `3`
```
dummy(0) → 1 → 3 → 2 → null
                ^prev ^curr
```

**Iteration 4:** `curr = 2` (value is 2, target found!)
- `2 === 2`, so we remove this node
- `prev.next` skips over the `2` and points to `null`
```
dummy(0) → 1 → 3 → null
                ^prev (prev.next now points to null)
```

**Loop ends:** Return `dummy.next`, which is `1 → 3 → null`

---

## Why This Solution Is Elegant

| Aspect | Benefit |
|--------|---------|
| **Single pass through the list** | O(n) time complexity—very efficient |
| **No special case for the head** | The dummy node handles it automatically |
| **Simple to understand** | Once you grasp the dummy node idea, the logic flows naturally |
| **No extra space for storing removed nodes** | O(1) space complexity (ignoring the dummy node) |

---

## Handling Edge Cases

### Case 1: Remove the head node
If the first node has the target value, the dummy node ensures it's handled correctly:
```
dummy(0) → 2 → 1 → null  (remove all 2s)
```
- When `curr = 2`, we set `prev.next = next`, which makes dummy point to `1`
- Return `dummy.next = 1`

### Case 2: Remove all nodes
If every node matches the target value:
```
dummy(0) → 2 → 2 → 2 → null  (remove all 2s)
```
- Each node is skipped over
- `dummy.next` becomes `null`
- Return `null`

### Case 3: Empty list
If the original list is `null`:
```
dummy(0) → null
```
- The while loop never runs
- Return `dummy.next = null`

---

## Time and Space Complexity

- **Time Complexity: O(n)** where n is the number of nodes. We visit each node exactly once.
- **Space Complexity: O(1)** We only use a constant amount of extra space (the dummy node, plus `prev` and `curr` pointers). We don't create a new list or use additional data structures.

---

## Key Takeaway

The dummy node pattern is a powerful technique for linked list problems, especially when the head might change. Instead of handling edge cases separately, the dummy node lets you treat all nodes uniformly. This makes the code cleaner and less error-prone.

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

function removeElements(head: ListNode | null, val: number): ListNode | null {
    let dummy = new ListNode(0, head)
    let prev = dummy;
    let curr = head;

    while (curr) {
        let next = curr.next;

        if (curr.val === val) prev.next = next;
        else prev = curr

        curr = next
    }

    return dummy.next;
};
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
