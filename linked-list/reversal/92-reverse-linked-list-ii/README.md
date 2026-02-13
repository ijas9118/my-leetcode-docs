# 92. Reverse Linked List II

<table width="100%">
  <tr>
    <td width="150px"><b>Difficulty</b></td>
    <td>
      <img src="https://img.shields.io/badge/Medium-F0AD4E?style=flat-square" alt="Medium">
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
    <td>Linked List</td>
  </tr>
  <tr>
    <td><b>Date</b></td>
    <td>Invalid Date</td>
  </tr>
  <tr>
    <td><b>Problem Link</b></td>
    <td>
      <a href="https://leetcode.com/problems/reverse-linked-list-ii/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>Given the <code>head</code> of a singly linked list and two integers <code>left</code> and <code>right</code> where <code>left &lt;= right</code>, reverse the nodes of the list from position <code>left</code> to position <code>right</code>, and return <em>the reversed list</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/02/19/rev2ex2.jpg" style="width: 542px; height: 222px;" />
<pre>
<strong>Input:</strong> head = [1,2,3,4,5], left = 2, right = 4
<strong>Output:</strong> [1,4,3,2,5]
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> head = [5], left = 1, right = 1
<strong>Output:</strong> [5]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the list is <code>n</code>.</li>
	<li><code>1 &lt;= n &lt;= 500</code></li>
	<li><code>-500 &lt;= Node.val &lt;= 500</code></li>
	<li><code>1 &lt;= left &lt;= right &lt;= n</code></li>
</ul>

<p>&nbsp;</p>
<strong>Follow up:</strong> Could you do it in one pass?

---

## 💡 Solution Approach

## Problem Overview

The challenge is to reverse only a portion of a linked list. You're given a linked list and two numbers: `left` and `right`. Your task is to reverse the nodes between position `left` and position `right` (inclusive), where position starts from 1.

For example, if you have `1 → 2 → 3 → 4 → 5 → null` and want to reverse between positions 2 and 4, the result should be `1 → 4 → 3 → 2 → 5 → null`. Notice that only the middle portion is reversed, while the first and last parts stay in place.

This problem combines two key ideas: navigating to the right position and reversing a section of the list.

## Solution Approach: Three-Phase Strategy

### The Core Idea

This solution breaks the problem into three clear phases:

1. **Navigate to the starting point** - find the node right before the section we need to reverse
2. **Reverse the target section** - reverse the nodes between `left` and `right`
3. **Reconnect the pieces** - stitch the reversed section back into the list

Think of it like editing a sentence: you identify the words you want to rearrange, flip their order, and reconnect them to the rest of the sentence.

### Why Use a Dummy Node?

The dummy node is crucial here. It solves a critical problem: what if the reversal starts at the head itself (when `left = 1`)? Without a dummy node, you'd need special handling. The dummy node lets you treat all cases uniformly.

## Step-by-Step Breakdown

### Phase 1: Navigate to the Reversal Start

```typescript
if (!head || left === right) return head;
let dummy = new ListNode(0, head);
let prev: ListNode = dummy;
for (let i = 1; i < left; i++)
    prev = prev.next!;
```

**What's happening:**

- **Quick exits**: If the list is empty (`!head`) or there's nothing to reverse (`left === right`), return immediately
- **Create dummy**: Like before, the dummy node points to the head
- **Find the anchor**: The `for` loop advances `prev` to the position right before where reversal begins

Think of `prev` as your bookmark. If you want to reverse positions 2-4, after this loop, `prev` will point to node at position 1 (or the dummy if reversing from position 1).

**Why `i < left` and not `i < left - 1`?** Because `i` starts at 1, and we want to move `left - 1` times. For example, to reverse from position 2, we advance once (`i = 1`), which moves `prev` to position 1.


### Phase 2: Reverse the Target Section

```typescript
let curr: ListNode | null = prev.next;
let temp: ListNode | null = null;
for (let i = 0; i < right - left + 1; i++) {
    let next = curr!.next;
    curr!.next = temp;
    temp = curr;
    curr = next;
}
```

This is the core reversal logic. Let's understand it piece by piece.

**Initial setup:**
- `curr` points to the first node of the section to reverse (the node right after `prev`)
- `temp` will track the previous node as we reverse (starts as `null` because the first node's `next` should point to `null` after reversal)

**The reversal loop:**

This loop runs exactly `right - left + 1` times. For reversing positions 2-4, that's `4 - 2 + 1 = 3` iterations, which is exactly how many nodes need to be reversed.

In each iteration:

1. **Save the next node**: `let next = curr!.next`
   - We do this first because we're about to change `curr.next`, so we need to remember where we're going next

2. **Reverse the pointer**: `curr!.next = temp`
   - Make the current node point backward instead of forward
   - In the first iteration, `temp` is `null`, so `curr` points to `null` (becoming the tail of the reversed section)
   - In subsequent iterations, `temp` is the previous node we just reversed

3. **Move forward**: `temp = curr` and `curr = next`
   - `temp` becomes the current node (for the next iteration)
   - `curr` moves to the next unprocessed node

**Visual example: Reversing 2 → 3 → 4**

Before: `1 → [2 → 3 → 4] → 5`

Iteration 1: (curr = 2)
```
temp = null
curr = 2 → temp (makes 2 → null)
temp = 2, curr = 3
```

Iteration 2: (curr = 3)
```
temp = 2
curr = 3 → temp (makes 3 → 2)
temp = 3, curr = 4
```

Iteration 3: (curr = 4)
```
temp = 3
curr = 4 → temp (makes 4 → 3)
temp = 4, curr = 5
```

After the loop: `curr` points to node 5 (the first node after the reversed section), and `temp` points to node 4 (the new head of the reversed section).



### Phase 3: Reconnect Everything

```typescript
const tail = prev.next!;
tail.next = curr;
prev.next = temp;
return dummy.next;
```

Now we stitch everything back together:

- **Find the tail**: `tail` is the first node of the section we just reversed (which is now the tail of that reversed section after reversal). This is simply `prev.next`, which we saved at the beginning.

- **Connect tail to what comes after**: `tail.next = curr`. Remember, `curr` now points to the first node after the reversed section (or `null` if reversal goes to the end). This reconnects the reversed section to the rest of the list.

- **Connect the preceding section**: `prev.next = temp`. This makes the node before the reversal section point to the new head of the reversed section (the last node we reversed).

- **Return the result**: `dummy.next` gives us the actual head of the list (which might be different from the original head if `left = 1`).


## Complete Example Walkthrough

Let's trace through reversing `1 → 2 → 3 → 4 → 5 → null` between positions 2 and 4.

### Initial State
```
dummy(0) → 1 → 2 → 3 → 4 → 5 → null
^dummy     ^         ^              ^
           1st       (2-4 to reverse) end
```

### After Phase 1: Find the anchor
Loop runs from `i = 1` to `i < 2`, so just once.
```
dummy(0) → 1 → 2 → 3 → 4 → 5 → null
^prev      ^curr
```
- `prev` points to node 1 (position 1)
- `curr` points to node 2 (position 2)

### During Phase 2: Reverse nodes 2, 3, 4

**Before reversal loop:**
- `temp = null`
- `curr` points to node 2

**Iteration 1:** (reversing node 2)
```
next = 3's node
2.next = null
temp = 2
curr = 3
```

**Iteration 2:** (reversing node 3)
```
next = 4's node
3.next = 2
temp = 3
curr = 4
```

**Iteration 3:** (reversing node 4)
```
next = 5's node
4.next = 3
temp = 4
curr = 5
```

After Phase 2:
- `temp` points to node 4 (new head of reversed section)
- `curr` points to node 5 (first node after reversed section)
- Nodes 2, 3, 4 are now pointing backward: 4 → 3 → 2 → null

### After Phase 3: Reconnect

```typescript
tail = prev.next = node 2 (the original first node of the section)
tail.next = curr = tail.next = node 5
prev.next = temp = prev.next = node 4 (the new head of reversed section)
```

Final structure:
```
dummy(0) → 1 → [4 → 3 → 2] → 5 → null
                 (reversed)
```

Return `dummy.next`, which is node 1, giving us: `1 → 4 → 3 → 2 → 5 → null` ✓


## Why This Algorithm Works

| Element | Explanation |
|---------|-------------|
| **Dummy node** | Allows uniform handling whether reversal starts at the head or middle |
| **Navigation phase** | Positions us at the right place to begin |
| **Reversal phase** | Uses the classic linked list reversal technique on a bounded section |
| **Reconnection phase** | Glues everything back together correctly |


## Edge Cases Handled

### Case 1: Reverse from the beginning (left = 1)
```
dummy(0) → [1 → 2 → 3] → 4 → null  (reverse 1-3)
^prev      ^curr (these are different nodes!)
```
The dummy node becomes the "previous" node, so `prev.next` correctly points to the new head after reversal.

### Case 2: Reverse to the end (right = length)
```
1 → [2 → 3 → 4 → 5] → null  (reverse 2-5)
^prev ^curr
```
After reversal, `curr` becomes `null`, and `tail.next = null` correctly terminates the list.

### Case 3: Reverse the entire list (left = 1, right = length)
```
dummy(0) → [1 → 2 → 3] → null  (reverse 1-3)
^prev      ^curr
```
This works because the dummy node handles the head, and the reversal correctly processes all nodes.

### Case 4: No reversal needed (left = right)
```typescript
if (left === right) return head;
```
The early return handles this instantly.

## Complexity Analysis

- **Time Complexity: O(n)** where n is the number of nodes in the list. We traverse each node at most once: once during navigation and once during reversal.

- **Space Complexity: O(1)** We only use a constant amount of extra space: the dummy node, pointers (`prev`, `curr`, `temp`), and a loop counter. We don't create a new list or use additional data structures.


## Key Insights

1. **The dummy node pattern** is powerful for problems where the head might change. It transforms an edge case into a regular case.

2. **The reversal loop** is a bounded version of the classic linked list reversal algorithm. Instead of reversing the entire list, we reverse only a specific section by controlling the loop count.

3. **Three-phase approach** makes the solution easier to understand and implement:
   - Phase 1: Navigate to the starting point
   - Phase 2: Perform the reversal
   - Phase 3: Reconnect the pieces

4. **Saving pointers** (`next`, `tail`, and using `temp`) is crucial in linked list manipulation to avoid losing references to important nodes.

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

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (!head || left === right) return head;

    let dummy = new ListNode(0, head);
    let prev: ListNode = dummy;

    for (let i = 1; i < left; i++)
        prev = prev.next!;

    let curr: ListNode | null = prev.next;
    let temp: ListNode | null = null;

    for (let i = 0; i < right - left + 1; i++) {
        let next = curr!.next;
        curr!.next = temp;
        temp = curr;
        curr = next;
    }

    const tail = prev.next!;
    tail.next = curr;
    prev.next = temp;

    return dummy.next;
};
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
