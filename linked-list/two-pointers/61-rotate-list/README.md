# 61. Rotate List

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
    <td>Linked List • Two Pointers</td>
  </tr>
  <tr>
    <td><b>Date</b></td>
    <td>Invalid Date</td>
  </tr>
  <tr>
    <td><b>Problem Link</b></td>
    <td>
      <a href="https://leetcode.com/problems/rotate-list/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>Given the <code>head</code> of a linked&nbsp;list, rotate the list to the right by <code>k</code> places.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/rotate1.jpg" style="width: 450px; height: 191px;" />
<pre>
<strong>Input:</strong> head = [1,2,3,4,5], k = 2
<strong>Output:</strong> [4,5,1,2,3]
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/11/13/roate2.jpg" style="width: 305px; height: 350px;" />
<pre>
<strong>Input:</strong> head = [0,1,2], k = 4
<strong>Output:</strong> [2,0,1]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the list is in the range <code>[0, 500]</code>.</li>
	<li><code>-100 &lt;= Node.val &lt;= 100</code></li>
	<li><code>0 &lt;= k &lt;= 2 * 10<sup>9</sup></code></li>
</ul>


---

## 💡 Solution Approach

## Problem Summary

Given the head of a singly linked list and an integer `k`, rotate the list to the **right** by `k` places and return the new head.

**Example:**

```
Input:  1 → 2 → 3 → 4 → 5,  k = 2
Output: 4 → 5 → 1 → 2 → 3
```

## Core Intuition

Think of the linked list as a **circle of train cars**. Rotating right by `k` means the last `k` cars become the front of the train, and the remaining cars follow behind.

Instead of physically moving nodes one step at a time (which would be very slow), this solution takes a smarter approach:

1. **Close the list into a circle** by connecting the tail back to the head.
2. **Find the new breaking point** — the exact spot where the circle needs to be cut open again to form the rotated list.
3. **Cut the circle** at that point to get the final rotated list.


## Step-by-Step Breakdown

### Step 1 — Handle the Edge Case

```typescript
if (!head) return head;
```

If the list is empty, there's nothing to rotate. Return immediately.


### Step 2 — Find the Length and the Tail

```typescript
let len = 1;
let tail = head;
while (tail.next) {
    tail = tail.next;
    len++;
}
```

We walk through the entire list using `tail`, counting each node. When the loop ends:
- `len` holds the total number of nodes.
- `tail` points to the **very last node** in the list.

This is important because we'll need the tail to form a circle.



### Step 3 — Reduce k Using Modulo

```typescript
k %= len;
if (k === 0) return head;
```

Rotating a list of 5 nodes by 5 is the same as not rotating at all. Rotating by 7 is the same as rotating by 2 (since 7 % 5 = 2).

By computing `k = k % len`, we reduce unnecessary work and also catch the case where `k` is a multiple of the list length — in which case the list is unchanged and we return early.



### Step 4 — Form a Circle

```typescript
tail.next = head;
```

We connect the last node's `next` pointer back to `head`. The list is now a **circular linked list**.

Visualizing our example after this step:
```
1 → 2 → 3 → 4 → 5
↑               |
└───────────────┘
```


### Step 5 — Find the New Tail

```typescript
let stepsToNewTail = len - k;
let newTail = head;
for (let i = 1; i < stepsToNewTail; i++) {
    newTail = newTail.next!;
}
```

After rotation, the list breaks into two parts:
- The **last `k` nodes** become the new front.
- The **first `len - k` nodes** become the new back.

So we need to walk `len - k` steps from the head to reach the **new tail** (the last node of the final list). The loop runs `stepsToNewTail - 1` times because `newTail` starts at node 1 (index 0), and we need it to land on node number `len - k`.

**Example with `len = 5`, `k = 2`:**
- `stepsToNewTail = 5 - 2 = 3`
- We walk 2 more steps from node 1 → end up at node 3
- Node 3 is the new tail ✅


### Step 6 — Cut the Circle

```typescript
const newHead = newTail.next;
newTail.next = null;
return newHead;
```

- `newTail.next` is currently pointing to node 4 (the new head).
- We save it as `newHead`.
- We sever the connection by setting `newTail.next = null`, breaking the circle and forming a proper list again.
- Return `newHead`.

**Final result for our example:**
```
4 → 5 → 1 → 2 → 3 → null
```


## Full Walkthrough — Visual Example

```
List: 1 → 2 → 3 → 4 → 5    k = 2

1. len = 5, tail = node(5)
2. k = 2 % 5 = 2  (no early return)
3. Form circle: 5.next = 1
   ┌─────────────────┐
   1 → 2 → 3 → 4 → 5 ↺

4. stepsToNewTail = 5 - 2 = 3
   Walk: head(1) → 2 → 3   ← newTail

5. newHead = newTail.next = 4
   Cut: 3.next = null

Result: 4 → 5 → 1 → 2 → 3
```



## Complexity Analysis

| | |
|---|---|
| **Time Complexity** | O(n) — we traverse the list at most twice: once to find the length, and once to find the new tail. |
| **Space Complexity** | O(1) — no extra data structures are used, only a few pointers. |


## Why This Approach Is Elegant

A naive approach might rotate the list `k` times one step at a time — that would be O(n × k) in the worst case. Instead, by temporarily forming a circle and cutting it at exactly the right place, we solve the whole problem in a single, clean O(n) pass. The modulo trick also ensures correctness even when `k` is larger than the list length.

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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head) return head;

    let len = 1;
    let tail = head;

    while (tail.next) {
        tail = tail.next;
        len++;
    }

    k %= len;
    if (k === 0) return head;

    tail.next = head;

    let stepsToNewTail = len - k;
    let newTail = head;

    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next!;
    }

    const newHead = newTail.next;
    newTail.next = null;

    return newHead;
}
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
