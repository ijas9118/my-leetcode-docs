# 2130. Maximum Twin Sum of a Linked List

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
    <td>Linked List • Two Pointers • Stack</td>
  </tr>
  <tr>
    <td><b>Date</b></td>
    <td>Invalid Date</td>
  </tr>
  <tr>
    <td><b>Problem Link</b></td>
    <td>
      <a href="https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>In a linked list of size <code>n</code>, where <code>n</code> is <strong>even</strong>, the <code>i<sup>th</sup></code> node (<strong>0-indexed</strong>) of the linked list is known as the <strong>twin</strong> of the <code>(n-1-i)<sup>th</sup></code> node, if <code>0 &lt;= i &lt;= (n / 2) - 1</code>.</p>

<ul>
	<li>For example, if <code>n = 4</code>, then node <code>0</code> is the twin of node <code>3</code>, and node <code>1</code> is the twin of node <code>2</code>. These are the only nodes with twins for <code>n = 4</code>.</li>
</ul>

<p>The <strong>twin sum </strong>is defined as the sum of a node and its twin.</p>

<p>Given the <code>head</code> of a linked list with even length, return <em>the <strong>maximum twin sum</strong> of the linked list</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/12/03/eg1drawio.png" style="width: 250px; height: 70px;" />
<pre>
<strong>Input:</strong> head = [5,4,2,1]
<strong>Output:</strong> 6
<strong>Explanation:</strong>
Nodes 0 and 1 are the twins of nodes 3 and 2, respectively. All have twin sum = 6.
There are no other nodes with twins in the linked list.
Thus, the maximum twin sum of the linked list is 6. 
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/12/03/eg2drawio.png" style="width: 250px; height: 70px;" />
<pre>
<strong>Input:</strong> head = [4,2,2,3]
<strong>Output:</strong> 7
<strong>Explanation:</strong>
The nodes with twins present in this linked list are:
- Node 0 is the twin of node 3 having a twin sum of 4 + 3 = 7.
- Node 1 is the twin of node 2 having a twin sum of 2 + 2 = 4.
Thus, the maximum twin sum of the linked list is max(7, 4) = 7. 
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/12/03/eg3drawio.png" style="width: 200px; height: 88px;" />
<pre>
<strong>Input:</strong> head = [1,100000]
<strong>Output:</strong> 100001
<strong>Explanation:</strong>
There is only one node with a twin in the linked list having twin sum of 1 + 100000 = 100001.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the list is an <strong>even</strong> integer in the range <code>[2, 10<sup>5</sup>]</code>.</li>
	<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
</ul>


---

## 💡 Solution Approach

## The Problem

In a linked list of **even length**, every node `i` is "twins" with node `n - 1 - i` (0-indexed). So the first node pairs with the last, the second pairs with the second-to-last, and so on.

We need to find the **maximum** sum among all twin pairs.

**Example:** `4 → 2 → 5 → 1`
- Twin pairs: (4, 1) → sum 5, and (2, 5) → sum 7
- Answer: **7**

The challenge — again — is that a linked list only goes *forward*. To pair node `i` with node `n-1-i`, we'd normally need to reach the end first, which feels impossible in one pass without extra storage. This solution solves that cleverly with **O(1) extra space**.

---

## Core Idea: Find Middle → Reverse Second Half → Walk Both Halves Together

Instead of storing values in an array or stack, this solution **physically reverses the second half** of the linked list in-place. Once reversed, the second half's nodes are in the right order to be paired directly with the first half — just by walking both halves forward simultaneously.

Think of it like folding a piece of paper in half. After folding, the first character on the left naturally lines up with the first character on the right — you just read across the fold.

---

## Step-by-Step Breakdown

### Step 1 — Find the Middle with Slow/Fast Pointers

```typescript
let slow: ListNode | null = head;
let fast: ListNode | null = head;
while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
}
```

`slow` moves one step at a time, `fast` moves two. When `fast` falls off the end, `slow` is sitting right at the **start of the second half**.

Since the problem guarantees an even-length list, `fast` will always land exactly at `null` (never on the last node), so `slow` lands precisely at the midpoint.

**Example:** `4 → 2 → 5 → 1`

| Step | slow | fast |
|------|------|------|
| Start| 4    | 4    |
| 1    | 2    | 5    |
| 2    | 5    | null |

Loop ends. `slow` is at node `5` — the start of the second half. ✅

---

### Step 2 — Reverse the Second Half In-Place

```typescript
let prev: ListNode | null = null;
while (slow) {
    const nextNode = slow.next;
    slow.next = prev;
    prev = slow;
    slow = nextNode;
}
```

This is the standard **linked list reversal** technique. We walk through the second half, flipping each node's `next` pointer to point *backwards* instead of forwards.

The variable `prev` always holds the "new head" of the reversed portion so far. After the loop, `prev` is the head of the fully reversed second half.

**Tracing the reversal for `5 → 1 → null`:**

| Step | slow | prev (reversed head) | Action              |
|------|------|----------------------|---------------------|
| Start| 5    | null                 |                     |
| 1    | 1    | 5 → null             | 5.next = null       |
| 2    | null | 1 → 5 → null         | 1.next = 5          |

After reversal: `prev` = `1 → 5 → null` ✅

Now our list looks like two separate chains:
- First half: `4 → 2 → ...`
- Second half (reversed): `1 → 5 → null`

---

### Step 3 — Walk Both Halves Together, Track Maximum Twin Sum

```typescript
let firstHalf: ListNode | null = head;
let secondHalf: ListNode | null = prev;
while (secondHalf && firstHalf) {
    const twinSum = firstHalf.val + secondHalf.val;
    maxSum = Math.max(maxSum, twinSum);
    firstHalf = firstHalf.next;
    secondHalf = secondHalf.next;
}
```

Now we walk both chains forward at the same pace. At each step:
- `firstHalf` is on node `i` (from the start)
- `secondHalf` is on node `n-1-i` (from the end, because we reversed it)

So their values naturally form the correct twin pairs!

**Walking through our example:**

| Step | firstHalf.val | secondHalf.val | Twin Sum | Max So Far |
|------|---------------|----------------|----------|------------|
| 1    | 4             | 1              | 5        | 5          |
| 2    | 2             | 5              | 7        | **7**      |

Return `7`. ✅

---

## Why Reverse Instead of Using a Stack?

The previous palindrome problem (LC 234) used a **stack** to reverse the first half — simple, but it costs O(n) extra space. Here, we reverse the second half **in-place** by rewiring the `.next` pointers. No extra data structure is needed. This brings space complexity down to **O(1)**.

The trade-off is that the original list structure is modified. In an interview, it's good practice to mention this and offer to restore the list afterwards if needed.

---

## Visual Summary

```
Original:   4 → 2 → 5 → 1
                    ↑
                  middle (slow stops here)

After reversal of second half:
First half:  4 → 2
Second half: 1 → 5   (was 5 → 1, now reversed)

Walk together:
  4 + 1 = 5
  2 + 5 = 7  ← maximum

Answer: 7
```

---

## Complexity Analysis

| | Complexity |
|-|------------|
| **Time** | O(n) — three linear passes: find middle, reverse, compare |
| **Space** | O(1) — only a handful of pointer variables, no extra data structures |

---

## Summary of Steps

| Step | What Happens |
|------|--------------|
| 1 | Use slow/fast pointers to locate the start of the second half |
| 2 | Reverse the second half in-place using pointer rewiring |
| 3 | Walk first and reversed second half simultaneously, tracking max twin sum |

This solution is a great example of how **in-place pointer manipulation** can eliminate the need for extra memory — at the cost of temporarily mutating the input structure.

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

function pairSum(head: ListNode | null): number {
    if (!head) return 0;

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let prev: ListNode | null = null;
    while (slow) {
        const nextNode = slow.next;
        slow.next = prev;
        prev = slow;
        slow = nextNode;
    }

    let maxSum = -Infinity;
    let firstHalf: ListNode | null = head;
    let secondHalf: ListNode | null = prev;

    while (secondHalf && firstHalf) {
        const twinSum = firstHalf.val + secondHalf.val;
        maxSum = Math.max(maxSum, twinSum);

        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }

    return maxSum;
}
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
