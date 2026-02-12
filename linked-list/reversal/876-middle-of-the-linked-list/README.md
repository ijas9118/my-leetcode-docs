# 876. Middle of the Linked List

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
    <td>Linked List • Two Pointers</td>
  </tr>
  <tr>
    <td><b>Date</b></td>
    <td>Invalid Date</td>
  </tr>
  <tr>
    <td><b>Problem Link</b></td>
    <td>
      <a href="https://leetcode.com/problems/middle-of-the-linked-list/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>Given the <code>head</code> of a singly linked list, return <em>the middle node of the linked list</em>.</p>

<p>If there are two middle nodes, return <strong>the second middle</strong> node.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-midlist1.jpg" style="width: 544px; height: 65px;" />
<pre>
<strong>Input:</strong> head = [1,2,3,4,5]
<strong>Output:</strong> [3,4,5]
<strong>Explanation:</strong> The middle node of the list is node 3.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/07/23/lc-midlist2.jpg" style="width: 664px; height: 65px;" />
<pre>
<strong>Input:</strong> head = [1,2,3,4,5,6]
<strong>Output:</strong> [4,5,6]
<strong>Explanation:</strong> Since the list has two middle nodes with values 3 and 4, we return the second one.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the list is in the range <code>[1, 100]</code>.</li>
	<li><code>1 &lt;= Node.val &lt;= 100</code></li>
</ul>


---

## 💡 Solution Approach

## Problem Understanding

We need to find the middle node of a singly linked list. If the list has an odd number of nodes (like 5 nodes), there's one clear middle node (the 3rd one). However, if the list has an even number of nodes (like 6 nodes), there are two middle nodes (the 3rd and 4th), and we need to return the **second middle node** (the 4th one).

The challenge with linked lists is that we can't directly access the middle element like we could with an array. We can only traverse from the beginning, following the chain of nodes one by one.

## The Approach: Two Pointers (Slow and Fast)

This solution uses a clever technique called the **"tortoise and hare" algorithm** or **"two-pointer technique"**. The idea is beautifully simple:

- We have two pointers starting at the head of the list
- One pointer (the "slow" pointer) moves **one step at a time**
- The other pointer (the "fast" pointer) moves **two steps at a time**
- When the fast pointer reaches the end of the list, the slow pointer will be at the middle

Think of it like two runners on a track. If one runner goes twice as fast as the other, by the time the fast runner finishes the track, the slow runner will be exactly halfway through.

## How the Algorithm Works

### Initialization

```typescript
let slow = head;
let fast = head;
```

We start both pointers at the head of the list. They begin their journey together from the same starting point.

### The Traversal Loop

```typescript
while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
}
```

This is the core of the algorithm. Let's break down what happens:

**The Loop Condition:**
```typescript
while (fast && fast.next)
```

We continue the loop as long as:
- `fast` is not `null` (the fast pointer hasn't gone past the end)
- `fast.next` is not `null` (the fast pointer can still take its next step)

We need to check both conditions because the fast pointer moves two steps at a time. If we only checked `fast`, we might try to access `fast.next.next` when `fast.next` is `null`, which would cause an error.

**Moving the Pointers:**
```typescript
slow = slow.next;
fast = fast.next.next;
```

In each iteration:
- The slow pointer moves **one node forward**
- The fast pointer moves **two nodes forward** (it "jumps over" one node)

This speed difference is what creates the magic. While the fast pointer is racing to the end, the slow pointer is taking its time, ensuring it lands exactly at the middle.

### Understanding Why This Works

The mathematical reasoning is straightforward:

- If the fast pointer moves at 2x speed
- And they both start at the same position
- When the fast pointer travels the full distance (reaches the end)
- The slow pointer will have traveled half the distance (be at the middle)

It's like if you and a friend start walking from the same point, and your friend walks twice as fast. When your friend reaches a destination 100 meters away, you'll be 50 meters from the start—right at the middle point.

### Return the Middle Node

```typescript
return slow;
```

When the loop ends, the fast pointer has reached (or gone past) the end of the list, which means the slow pointer is positioned at the middle node. We simply return the slow pointer.

## Visual Examples

### Example 1: Odd Number of Nodes (5 nodes)

List: `1 → 2 → 3 → 4 → 5 → null`

**Initial state:**
- `slow = 1`, `fast = 1`

**Iteration 1:**
- `slow = 2` (moved 1 step)
- `fast = 3` (moved 2 steps)

**Iteration 2:**
- `slow = 3` (moved 1 step)
- `fast = 5` (moved 2 steps)

**Iteration 3:**
- Loop condition fails because `fast.next` is `null`
- Return `slow` which is node **3** ✓

The middle node is 3, which is correct!

### Example 2: Even Number of Nodes (6 nodes)

List: `1 → 2 → 3 → 4 → 5 → 6 → null`

**Initial state:**
- `slow = 1`, `fast = 1`

**Iteration 1:**
- `slow = 2` (moved 1 step)
- `fast = 3` (moved 2 steps)

**Iteration 2:**
- `slow = 3` (moved 1 step)
- `fast = 5` (moved 2 steps)

**Iteration 3:**
- `slow = 4` (moved 1 step)
- `fast = null` (moved 2 steps, went past node 6)

**Loop ends** (because `fast` is `null`)
- Return `slow` which is node **4** ✓

For an even-length list, there are two middle nodes (3 and 4), and we correctly return the second middle node (4) as required!

### Example 3: Two Nodes

List: `1 → 2 → null`

**Initial state:**
- `slow = 1`, `fast = 1`

**Iteration 1:**
- `slow = 2` (moved 1 step)
- `fast = null` (moved 2 steps, `1.next.next` is null)

**Loop ends**
- Return `slow` which is node **2** ✓

Even with just two nodes, we correctly return the second node as the middle.

## Why the Loop Condition Matters

The condition `while (fast && fast.next)` is carefully designed:

- **`fast` check**: Ensures the fast pointer hasn't gone off the end of the list
- **`fast.next` check**: Ensures we can safely move the fast pointer two steps forward without accessing a null reference

Without the `fast.next` check, we'd try to do `fast.next.next` when `fast.next` is `null`, causing a runtime error.

## Time and Space Complexity

**Time Complexity: O(n)** where n is the number of nodes. In the worst case, we traverse through about half the list with the slow pointer (and the full list with the fast pointer), which is still linear time.

**Space Complexity: O(1)** because we only use two pointer variables regardless of the list size. We don't create any additional data structures; we just navigate through the existing list.

## Key Takeaways

The two-pointer technique is an elegant solution to finding the middle of a linked list without needing to:
1. Count the total number of nodes first (which would require two passes through the list)
2. Use extra memory to store nodes in an array

By moving one pointer twice as fast as the other, we can find the middle in a single pass with constant extra space. This technique is also useful for other linked list problems, such as detecting cycles or finding the node at a specific position from the end.

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

function middleNode(head: ListNode | null): ListNode | null {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
};
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
