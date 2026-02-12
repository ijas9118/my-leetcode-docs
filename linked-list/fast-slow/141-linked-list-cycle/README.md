# 141. Linked List Cycle

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
    <td>Hash Table • Linked List • Two Pointers</td>
  </tr>
  <tr>
    <td><b>Date</b></td>
    <td>Invalid Date</td>
  </tr>
  <tr>
    <td><b>Problem Link</b></td>
    <td>
      <a href="https://leetcode.com/problems/linked-list-cycle/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>Given <code>head</code>, the head of a linked list, determine if the linked list has a cycle in it.</p>

<p>There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the&nbsp;<code>next</code>&nbsp;pointer. Internally, <code>pos</code>&nbsp;is used to denote the index of the node that&nbsp;tail&#39;s&nbsp;<code>next</code>&nbsp;pointer is connected to.&nbsp;<strong>Note that&nbsp;<code>pos</code>&nbsp;is not passed as a parameter</strong>.</p>

<p>Return&nbsp;<code>true</code><em> if there is a cycle in the linked list</em>. Otherwise, return <code>false</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist.png" style="width: 300px; height: 97px; margin-top: 8px; margin-bottom: 8px;" />
<pre>
<strong>Input:</strong> head = [3,2,0,-4], pos = 1
<strong>Output:</strong> true
<strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test2.png" style="width: 141px; height: 74px;" />
<pre>
<strong>Input:</strong> head = [1,2], pos = 0
<strong>Output:</strong> true
<strong>Explanation:</strong> There is a cycle in the linked list, where the tail connects to the 0th node.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2018/12/07/circularlinkedlist_test3.png" style="width: 45px; height: 45px;" />
<pre>
<strong>Input:</strong> head = [1], pos = -1
<strong>Output:</strong> false
<strong>Explanation:</strong> There is no cycle in the linked list.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of the nodes in the list is in the range <code>[0, 10<sup>4</sup>]</code>.</li>
	<li><code>-10<sup>5</sup> &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
	<li><code>pos</code> is <code>-1</code> or a <strong>valid index</strong> in the linked-list.</li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow up:</strong> Can you solve it using <code>O(1)</code> (i.e. constant) memory?</p>


---

## 💡 Solution Approach

## Problem Overview

You're given the head of a linked list, and you need to determine whether the list contains a cycle. A cycle exists when a node's `next` pointer points back to a previous node in the list, creating a loop. If you were to traverse the list normally, you'd end up visiting the same nodes over and over again instead of reaching the end.

## The Intuition: Two Runners on a Circular Track

The solution uses a classic algorithm called **Floyd's Cycle Detection Algorithm**, also known as the "tortoise and hare" approach. Here's the brilliant intuition behind it:

Imagine two runners on a track. One runner (the "slow" pointer) jogs at a steady pace, while the other (the "fast" pointer) sprints at twice the speed. If the track is straight with a clear finish line, the fast runner will reach the end first, and they'll never meet. However, if the track is circular (like a cycle in our linked list), the fast runner will eventually lap the slow runner, and they'll meet at some point on the track.

This same principle applies to our linked list. If there's no cycle, the fast pointer will reach the end (`null`). But if there's a cycle, the fast pointer will eventually catch up to the slow pointer because it's moving faster within the same loop.

## How the Algorithm Works

### Initialization

We start by creating two pointers, both pointing to the head of the linked list:

```typescript
let slow = head;
let fast = head;
```

At the beginning, both pointers are at the same starting position. Think of this as both runners standing at the starting line.

### The Movement Pattern

The core of the algorithm happens in a while loop that continues as long as the fast pointer and its next node exist:

```typescript
while (fast && fast.next) {
    slow = slow.next;        // Move slow pointer 1 step
    fast = fast.next.next;   // Move fast pointer 2 steps
    
    if (slow === fast) {
        return true;  // Cycle detected!
    }
}
```

In each iteration:
- The **slow pointer** moves forward by one node (`slow = slow.next`)
- The **fast pointer** moves forward by two nodes (`fast = fast.next.next`)

This creates the speed difference that makes the algorithm work.

### Step-by-Step Walkthrough

Let's walk through what happens in different scenarios:

**Scenario 1: No Cycle**

If the linked list has no cycle (it ends with a `null`), here's what happens:

1. Both pointers start at the head
2. Fast pointer moves 2 steps at a time, slow moves 1 step
3. Eventually, the fast pointer reaches the end of the list (`fast.next` becomes `null`)
4. The while loop condition fails because `fast.next` is `null`
5. We exit the loop and return `false` - no cycle detected

**Scenario 2: With a Cycle**

If the linked list has a cycle, the sequence is different:

1. Both pointers start at the head
2. Fast pointer moves 2 steps, slow moves 1 step
3. Both pointers eventually enter the cycle (the looping part of the list)
4. Once in the cycle, the fast pointer starts "catching up" to the slow pointer
5. Because the fast pointer moves 2x faster, it closes the gap by 1 node each iteration
6. Eventually, `slow === fast` becomes true - they meet at the same node
7. We immediately return `true` - cycle confirmed!

## Why This Works: The Mathematics

You might wonder: "Will the fast pointer always catch the slow pointer, or could it jump over it?"

The answer lies in the relative speed. Each iteration, the fast pointer gets one node closer to the slow pointer. If they're in a cycle, the distance between them decreases by 1 each time. Eventually, this distance reaches zero, and they must meet. The fast pointer cannot "jump over" the slow pointer because it only moves one extra step per iteration.

## Code Breakdown

```typescript
function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;
```
We initialize both pointers to the head. We're setting up our two runners at the starting line.

```typescript
    while (fast && fast.next) {
```
This condition is crucial. We need to check both `fast` and `fast.next` because:
- `fast` could be `null` if the list is empty or we've reached the end
- `fast.next` could be `null` if fast is at the last node
- We need `fast.next` to exist because we're about to do `fast.next.next`

```typescript
        slow = slow.next;
        fast = fast.next.next;
```
Move the pointers at their respective speeds. The slow pointer advances one node, while the fast pointer advances two nodes.

```typescript
        if (slow === fast) {
            return true;
        }
```
After moving, we check if the pointers meet. If they do, we've found a cycle! We can immediately return `true`.

```typescript
    }
    return false;
}
```
If we exit the while loop, it means the fast pointer reached the end of the list (`null`), which means there's no cycle. We return `false`.

## Time and Space Complexity

**Time Complexity: O(n)** where n is the number of nodes in the linked list.
- In the worst case (no cycle), the fast pointer traverses the entire list
- In the case with a cycle, both pointers will meet after at most n iterations

**Space Complexity: O(1)** - constant space.
- We only use two pointers regardless of the list size
- No additional data structures are needed

## Alternative Approaches (For Comparison)

While not part of your solution, it's worth knowing that another common approach uses a hash set to track visited nodes. However, that approach uses O(n) space, whereas the two-pointer technique uses only O(1) space, making it more efficient.

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

function hasCycle(head: ListNode | null): boolean {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) return true
    }

    return false;
};
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
