# 234. Palindrome Linked List

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
    <td>Linked List • Two Pointers • Stack • Recursion</td>
  </tr>
  <tr>
    <td><b>Date</b></td>
    <td>Invalid Date</td>
  </tr>
  <tr>
    <td><b>Problem Link</b></td>
    <td>
      <a href="https://leetcode.com/problems/palindrome-linked-list/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>Given the <code>head</code> of a singly linked list, return <code>true</code><em> if it is a </em><span data-keyword="palindrome-sequence"><em>palindrome</em></span><em> or </em><code>false</code><em> otherwise</em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/03/pal1linked-list.jpg" style="width: 422px; height: 62px;" />
<pre>
<strong>Input:</strong> head = [1,2,2,1]
<strong>Output:</strong> true
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/03/pal2linked-list.jpg" style="width: 182px; height: 62px;" />
<pre>
<strong>Input:</strong> head = [1,2]
<strong>Output:</strong> false
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the list is in the range <code>[1, 10<sup>5</sup>]</code>.</li>
	<li><code>0 &lt;= Node.val &lt;= 9</code></li>
</ul>

<p>&nbsp;</p>
<strong>Follow up:</strong> Could you do it in <code>O(n)</code> time and <code>O(1)</code> space?

---

## 💡 Solution Approach

## The Problem

We're given a singly linked list and need to check whether it reads the same forwards and backwards — just like how "racecar" or "madam" are palindromes.

The tricky part? A linked list only goes **one direction**. You can't just reverse-index it like an array. So we need to be clever.

## Core Idea: Stack + Slow/Fast Pointers

The solution combines two classic techniques:

1. **Slow/Fast Pointers** — to find the *middle* of the linked list in a single pass.
2. **A Stack** — to store the *first half* of the list, so we can compare it (in reverse) against the *second half*.

## Intuition with an Analogy

Imagine reading a book out loud to someone standing behind you. You read the first half of the book, and your friend memorizes the pages in the order you read them (stacking them up). Then you continue reading the second half of the book — and your friend *un-stacks* their memorized pages one by one to check if they match what you're reading now.

If every page matches, it's a palindrome. That's exactly what this algorithm does.

---

## Step-by-Step Breakdown

### Step 1 — Handle Edge Cases

```typescript
if (!head || !head.next) return true
```

If the list is empty or has only one node, it's trivially a palindrome. We return `true` immediately.

---

### Step 2 — Initialize Two Pointers

```typescript
let slow = head, fast = head;
```

- `slow` moves **one step** at a time.
- `fast` moves **two steps** at a time.

Because `fast` is twice as fast, when `fast` reaches the end, `slow` will be right in the **middle** of the list. This is the classic "tortoise and hare" trick.


### Step 3 — Walk to the Middle, Push First Half onto Stack

```typescript
while (fast && fast.next) {
    stack.push(slow.val)
    slow = slow.next
    fast = fast.next.next
}
```

As we advance the two pointers, we push each value of `slow` onto the stack. By the time the loop ends, the stack contains the **first half** of the list — and the top of the stack is the value *closest to the middle*.

**Example:** For list `1 → 2 → 3 → 2 → 1`

| Step | slow | fast | Stack     |
|------|------|------|-----------|
| 0    | 1    | 1    | []        |
| 1    | 2    | 3    | [1]       |
| 2    | 3    | 1(end)| [1, 2]   |

Loop ends. Stack = `[1, 2]`, slow is at node `3` (the middle).


### Step 4 — Adjust for Odd-Length Lists

```typescript
if (fast) slow = slow.next
```

After the loop:
- If `fast` is **null**, the list has an **even** number of nodes. `slow` is at the start of the second half. ✅
- If `fast` still has a value (not null), the list has an **odd** number of nodes. The middle element doesn't need to be compared (a palindrome's center can be anything), so we **skip it** by advancing `slow` one more step.

**For our example `[1,2,3,2,1]`:** `fast` landed on node `1` (the last node, not null), so we skip the middle `3` and move `slow` to node `2`.

### Step 5 — Compare Stack Against Second Half

```typescript
while (slow) {
    if (stack.pop() !== slow.val) return false;
    slow = slow.next
}
return true
```

Now we walk through the **second half** of the list with `slow`, and simultaneously **pop** values off the stack. Because the stack reverses the first half, popping it gives us the first half *in reverse order* — which is exactly what should match the second half if the list is a palindrome.

**Continuing our example:**

| Pop from Stack | slow.val | Match? |
|----------------|----------|--------|
| 2              | 2        | ✅ Yes |
| 1              | 1        | ✅ Yes |

All matched → return `true`. ✅


## What Happens When It's NOT a Palindrome?

For list `1 → 2 → 3 → 4 → 5`:

- Stack after first half: `[1, 2]`
- `slow` starts at `4` (second half)

| Pop from Stack | slow.val | Match? |
|----------------|----------|--------|
| 2              | 4        | ❌ No  |

Returns `false` immediately. ✅

---

## Complexity Analysis

| | Complexity |
|-|------------|
| **Time** | O(n) — we traverse the list a constant number of times |
| **Space** | O(n/2) → O(n) — the stack holds half the list's values |


---

## ⏱️ Complexity Analysis

| Metric | Complexity |
|:-------|:-----------|
| **Time** | `O(n)` |
| **Space** | `O(n)` |

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

function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true

    let stack = [];
    let slow = head, fast = head;

    while (fast && fast.next) {
        stack.push(slow.val)
        slow = slow.next
        fast = fast.next.next
    }

    if (fast) slow = slow.next

    while (slow) {
        if (stack.pop() !== slow.val) return false;
        slow = slow.next
    }

    return true
};
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
