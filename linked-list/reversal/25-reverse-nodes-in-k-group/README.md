# 25. Reverse Nodes in k-Group

<table width="100%">
  <tr>
    <td width="150px"><b>Difficulty</b></td>
    <td>
      <img src="https://img.shields.io/badge/Hard-D9534F?style=flat-square" alt="Hard">
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
      <a href="https://leetcode.com/problems/reverse-nodes-in-k-group/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>Given the <code>head</code> of a linked list, reverse the nodes of the list <code>k</code> at a time, and return <em>the modified list</em>.</p>

<p><code>k</code> is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of <code>k</code> then left-out nodes, in the end, should remain as it is.</p>

<p>You may not alter the values in the list&#39;s nodes, only nodes themselves may be changed.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/reverse_ex1.jpg" style="width: 542px; height: 222px;" />
<pre>
<strong>Input:</strong> head = [1,2,3,4,5], k = 2
<strong>Output:</strong> [2,1,4,3,5]
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/10/03/reverse_ex2.jpg" style="width: 542px; height: 222px;" />
<pre>
<strong>Input:</strong> head = [1,2,3,4,5], k = 3
<strong>Output:</strong> [3,2,1,4,5]
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes in the list is <code>n</code>.</li>
	<li><code>1 &lt;= k &lt;= n &lt;= 5000</code></li>
	<li><code>0 &lt;= Node.val &lt;= 1000</code></li>
</ul>

<p>&nbsp;</p>
<p><strong>Follow-up:</strong> Can you solve the problem in <code>O(1)</code> extra memory space?</p>


---

## 💡 Solution Approach

## The Problem

Given a linked list and a number `k`, reverse the nodes in **chunks of k** at a time. If the remaining nodes at the end are fewer than `k`, leave them as-is.

**Example:** `1 → 2 → 3 → 4 → 5`, k = 2
- Reverse first group of 2: `2 → 1`
- Reverse next group of 2: `4 → 3`
- Only 1 node left (`5`), fewer than k — leave it alone
- Result: `2 → 1 → 4 → 3 → 5`

The core difficulty is that after reversing a group, you must **reconnect it** to the previous group and the next group — without losing any nodes in the process.

---

## Core Idea: Isolate → Reverse → Reconnect, Repeat

Think of the linked list like a train of carriages. You take `k` carriages at a time, **detach** them from the rest of the train, **reverse their order**, then **reattach** them — both to the carriages behind (the previous group) and to the carriages ahead (the next group). Then move forward and repeat.

The solution does exactly this in a loop, carefully tracking three things at each step:
1. **Where the current group starts** (`curr`)
2. **Where the current group ends** (`kth`)
3. **The tail of the previously reversed group** (`prevGroupTail`) — so we can stitch the groups back together

---

## The Helper Function: `reverse()`

```typescript
function reverse(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
```

This is the standard in-place linked list reversal. It walks through the list, flipping each node's `.next` pointer to point backwards. At the end, `prev` is the new head of the reversed list.

One important detail: this function reverses **until it hits `null`**. So if we want to reverse only a segment, we need to **cut the segment off** from the rest of the list first (set `kth.next = null`) before calling it.

---

## Step-by-Step Breakdown of `reverseKGroup()`

### Step 1 — Find the k-th Node

```typescript
let kth = curr;
for (let i = 1; i < k; i++) {
    if (!kth.next) {
        return head;  // fewer than k nodes remain — stop
    }
    kth = kth.next;
}
```

Starting from `curr` (the group's first node), we walk exactly `k - 1` steps forward to land on the **k-th node** (the group's last node). If we run out of nodes before completing `k` steps, there aren't enough nodes to form a full group — so we return `head` as-is, leaving the tail unchanged.

---

### Step 2 — Detach the Group

```typescript
let nextGroup = kth.next;
kth.next = null;
```

We save `kth.next` as `nextGroup` (the start of the next group), then sever the connection by setting `kth.next = null`. Now the current group is an isolated mini-list from `curr` to `kth`.

**Before detach:** `curr → ... → kth → nextGroup → ...`
**After detach:** `curr → ... → kth → null` and `nextGroup → ...` (separate)

---

### Step 3 — Reverse the Isolated Group

```typescript
let newHead = reverse(curr);
```

We call our helper on the now-isolated segment. Since it ends at `null`, `reverse()` will reverse exactly this group and return `newHead` — the node that was `kth`, now sitting at the front.

**Example group `1 → 2 → null` after reverse:** `2 → 1 → null`, `newHead = 2`

---

### Step 4 — Reconnect to the Rest of the List

```typescript
if (!prevGroupTail) {
    head = newHead;         // first group: update the overall head
} else {
    prevGroupTail.next = newHead;  // link previous group's tail to this group's new head
}
curr.next = nextGroup;     // link this group's new tail to the next group
prevGroupTail = curr;      // curr is now the tail of the reversed group
```

This is the trickiest part — four pointer updates happen here:

- If this is the **first group**, we update `head` to point to the new front of the whole list.
- Otherwise, the **tail of the previous group** (`prevGroupTail`) needs to point to this group's `newHead`.
- After reversal, `curr` (the original group start) is now the **tail** of the reversed group, so we wire `curr.next = nextGroup` to hook it up to what comes next.
- Finally, `prevGroupTail = curr` remembers this group's tail for the next iteration.

> 💡 Key insight: After reversing, the **original head** of a group becomes its **new tail**. So `curr` (which started as the group head) is always the tail after reversal — that's why `curr.next = nextGroup` correctly links the tail forward.

---

### Step 5 — Advance to the Next Group

```typescript
curr = nextGroup;
```

We move `curr` forward to where the next group begins and repeat the whole process.

---

## Full Walkthrough: `1 → 2 → 3 → 4 → 5`, k = 2

**Initial state:** `head = 1`, `prevGroupTail = null`, `curr = 1`

---

**Iteration 1:**
- Walk to k-th node: `kth = 2`
- Save `nextGroup = 3`, cut: `2 → null`
- Reverse `1 → 2`: newHead = `2`, result = `2 → 1 → null`
- No prevGroupTail → `head = 2`
- `curr.next = 3` → `1 → 3`
- `prevGroupTail = 1` (tail of first group), `curr = 3`

List so far: **`2 → 1 → 3 → 4 → 5`**

---

**Iteration 2:**
- Walk to k-th node: `kth = 4`
- Save `nextGroup = 5`, cut: `4 → null`
- Reverse `3 → 4`: newHead = `4`, result = `4 → 3 → null`
- `prevGroupTail.next = 4` → `1 → 4`
- `curr.next = 5` → `3 → 5`
- `prevGroupTail = 3`, `curr = 5`

List so far: **`2 → 1 → 4 → 3 → 5`**

---

**Iteration 3:**
- Walk to k-th node from `5`: `kth.next` is null after 0 steps → fewer than k=2 nodes remain
- Return `head` (no change to tail)

**Final result: `2 → 1 → 4 → 3 → 5`** ✅

---

## Visual Diagram

```
Start:  1 → 2 | 3 → 4 | 5
              ↑         ↑
          group 1    group 2    (remainder: leave alone)

After reversing group 1:  2 → 1
After reversing group 2:  4 → 3

Reconnected: 2 → 1 → 4 → 3 → 5
```

---

## Complexity Analysis

| | Complexity |
|-|------------|
| **Time** | O(n) — every node is visited a constant number of times |
| **Space** | O(1) — only pointer variables, no extra data structures |

---

## Summary of Each Iteration

| Phase | What Happens |
|-------|--------------|
| Find k-th | Walk k steps; bail early if not enough nodes |
| Detach | Cut group from rest of list |
| Reverse | Reverse the isolated group in-place |
| Reconnect | Stitch new head to previous tail; stitch new tail to next group |
| Advance | Move `curr` to start of next group |

The elegance of this solution is that by **isolating each group** before reversing, a simple standard reversal function works perfectly — and careful tracking of `prevGroupTail` and `curr` (which becomes the tail after reversal) keeps all the reconnections correct.

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

function reverse(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;

    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    let curr = head;
    let prevGroupTail: ListNode | null = null;

    while (curr) {
        let kth = curr;

        for (let i = 1; i < k; i++) {
            if (!kth.next) {
                return head;
            }
            kth = kth.next;
        }

        let nextGroup = kth.next;

        kth.next = null;

        let newHead = reverse(curr);

        if (!prevGroupTail) {
            head = newHead;
        } else {
            prevGroupTail.next = newHead;
        }

        curr.next = nextGroup;

        prevGroupTail = curr;
        curr = nextGroup;
    }

    return head;
}
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
