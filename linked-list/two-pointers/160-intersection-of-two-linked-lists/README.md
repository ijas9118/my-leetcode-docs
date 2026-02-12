# 160. Intersection of Two Linked Lists

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
      <a href="https://leetcode.com/problems/intersection-of-two-linked-lists/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>Given the heads of two singly linked-lists <code>headA</code> and <code>headB</code>, return <em>the node at which the two lists intersect</em>. If the two linked lists have no intersection at all, return <code>null</code>.</p>

<p>For example, the following two linked lists begin to intersect at node <code>c1</code>:</p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/05/160_statement.png" style="width: 500px; height: 162px;" />
<p>The test cases are generated such that there are no cycles anywhere in the entire linked structure.</p>

<p><strong>Note</strong> that the linked lists must <strong>retain their original structure</strong> after the function returns.</p>

<p><strong>Custom Judge:</strong></p>

<p>The inputs to the <strong>judge</strong> are given as follows (your program is <strong>not</strong> given these inputs):</p>

<ul>
	<li><code>intersectVal</code> - The value of the node where the intersection occurs. This is <code>0</code> if there is no intersected node.</li>
	<li><code>listA</code> - The first linked list.</li>
	<li><code>listB</code> - The second linked list.</li>
	<li><code>skipA</code> - The number of nodes to skip ahead in <code>listA</code> (starting from the head) to get to the intersected node.</li>
	<li><code>skipB</code> - The number of nodes to skip ahead in <code>listB</code> (starting from the head) to get to the intersected node.</li>
</ul>

<p>The judge will then create the linked structure based on these inputs and pass the two heads, <code>headA</code> and <code>headB</code> to your program. If you correctly return the intersected node, then your solution will be <strong>accepted</strong>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/05/160_example_1_1.png" style="width: 500px; height: 162px;" />
<pre>
<strong>Input:</strong> intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
<strong>Output:</strong> Intersected at &#39;8&#39;
<strong>Explanation:</strong> The intersected node&#39;s value is 8 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [4,1,8,4,5]. From the head of B, it reads as [5,6,1,8,4,5]. There are 2 nodes before the intersected node in A; There are 3 nodes before the intersected node in B.
- Note that the intersected node&#39;s value is not 1 because the nodes with value 1 in A and B (2<sup>nd</sup> node in A and 3<sup>rd</sup> node in B) are different node references. In other words, they point to two different locations in memory, while the nodes with value 8 in A and B (3<sup>rd</sup> node in A and 4<sup>th</sup> node in B) point to the same location in memory.
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/05/160_example_2.png" style="width: 500px; height: 194px;" />
<pre>
<strong>Input:</strong> intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
<strong>Output:</strong> Intersected at &#39;2&#39;
<strong>Explanation:</strong> The intersected node&#39;s value is 2 (note that this must not be 0 if the two lists intersect).
From the head of A, it reads as [1,9,1,2,4]. From the head of B, it reads as [3,2,4]. There are 3 nodes before the intersected node in A; There are 1 node before the intersected node in B.
</pre>

<p><strong class="example">Example 3:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2021/03/05/160_example_3.png" style="width: 300px; height: 189px;" />
<pre>
<strong>Input:</strong> intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
<strong>Output:</strong> No intersection
<strong>Explanation:</strong> From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.
Explanation: The two lists do not intersect, so return null.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li>The number of nodes of <code>listA</code> is in the <code>m</code>.</li>
	<li>The number of nodes of <code>listB</code> is in the <code>n</code>.</li>
	<li><code>1 &lt;= m, n &lt;= 3 * 10<sup>4</sup></code></li>
	<li><code>1 &lt;= Node.val &lt;= 10<sup>5</sup></code></li>
	<li><code>0 &lt;= skipA &lt;= m</code></li>
	<li><code>0 &lt;= skipB &lt;= n</code></li>
	<li><code>intersectVal</code> is <code>0</code> if <code>listA</code> and <code>listB</code> do not intersect.</li>
	<li><code>intersectVal == listA[skipA] == listB[skipB]</code> if <code>listA</code> and <code>listB</code> intersect.</li>
</ul>

<p>&nbsp;</p>
<strong>Follow up:</strong> Could you write a solution that runs in <code>O(m + n)</code> time and use only <code>O(1)</code> memory?

---

## 💡 Solution Approach

# Intersection of Two Linked Lists - Detailed Solution Explanation

## Problem Overview

We need to find the node where two linked lists intersect (merge together). If they don't intersect at all, we return `null`. The key insight is that once two lists intersect, they share all remaining nodes from that point onward.

## The Two-Pointer Approach

This solution uses an elegant two-pointer technique that cleverly handles lists of different lengths. The core idea is beautifully simple: by switching pointers between the two lists, we automatically compensate for any length difference.

## How the Algorithm Works

### The Basic Strategy

Imagine two runners on two different tracks that eventually merge into one. Even if the tracks start at different distances from the merge point, if we let each runner switch to the other's starting point after finishing their track, they will meet exactly at the merge point (or both finish at the same time if there's no merge).

### Step-by-Step Breakdown

**1. Initialize Two Pointers**
```typescript
let listA = headA
let listB = headB
```
We start with one pointer at the head of each list.

**2. The Main Loop**
```typescript
while (listA !== listB) {
    listA = listA ? listA.next : headB
    listB = listB ? listB.next : headA
}
```

This is where the magic happens. Let's break down what's occurring in each iteration:

- **If `listA` is not null**: Move `listA` to the next node in list A
- **If `listA` is null**: We've reached the end of list A, so switch `listA` to start at `headB`
- **If `listB` is not null**: Move `listB` to the next node in list B  
- **If `listB` is null**: We've reached the end of list B, so switch `listB` to start at `headA`

**3. Loop Termination**

The loop continues until `listA === listB`. This happens in one of two scenarios:
- Both pointers meet at the intersection node
- Both pointers become `null` (no intersection exists)

## Why This Works - The Intuition

### Case 1: Lists Have Equal Length

If both lists are the same length, the pointers will simply traverse in parallel and meet at the intersection point (or both reach `null` simultaneously if there's no intersection).

### Case 2: Lists Have Different Lengths

This is where the brilliance shines. Let's say:
- List A has length `a` before intersection + `c` (common part)
- List B has length `b` before intersection + `c` (common part)

**First Pass:**
- Pointer A travels: `a + c` nodes, then switches to list B
- Pointer B travels: `b + c` nodes, then switches to list A

**Second Pass:**
- Pointer A (now on list B) travels: `b` more nodes to reach intersection
- Pointer B (now on list A) travels: `a` more nodes to reach intersection

**Total distance traveled:**
- Pointer A: `a + c + b`
- Pointer B: `b + c + a`

Both travel the exact same distance! They meet at the intersection after traveling `(a + c + b)` nodes, which puts them at the start of the common part.

## Concrete Example

Let's visualize with an example:

```
List A: 1 → 2 → 3 ↘
                    7 → 8 → 9 → null
List B: 4 → 5 ↗
```

**Iteration by iteration:**

| Step | listA Position | listB Position |
|------|---------------|----------------|
| 0    | 1             | 4              |
| 1    | 2             | 5              |
| 2    | 3             | 7              |
| 3    | 7             | 8              |
| 4    | 8             | 9              |
| 5    | 9             | null → switch to headA (1) |
| 6    | null → switch to headB (4) | 2 |
| 7    | 5             | 3              |
| 8    | 7             | 7              | **MATCH!**

They meet at node 7, which is the intersection point.

## Edge Cases Handled

**No Intersection:**
If the lists don't intersect, both pointers will eventually become `null` after traversing both complete lists, and the loop exits with both equal to `null`.

**One or Both Lists Empty:**
If either list is empty from the start, the first iteration will set that pointer to the head of the other list. If both are empty, both pointers are `null` and the loop doesn't execute.

## Time and Space Complexity

**Time Complexity: O(m + n)**
- In the worst case, each pointer traverses both entire lists once
- Where `m` is the length of list A and `n` is the length of list B

**Space Complexity: O(1)**
- We only use two pointer variables
- No additional data structures are needed

## Why This Solution is Elegant

Traditional approaches might use a hash set to store visited nodes (requiring O(n) space) or calculate lengths first (requiring multiple passes). This solution is elegant because:

1. It requires only a single pass through the lists (each pointer makes at most one full traversal of both lists)
2. It uses constant extra space
3. The pointer-switching mechanism automatically handles length differences without explicit calculation
4. The code is remarkably concise yet handles all edge cases

The beauty lies in recognizing that by having each pointer traverse the same total distance (its own list plus the other list), they synchronize and meet exactly at the intersection point.

---

## ⏱️ Complexity Analysis

| Metric | Complexity |
|:-------|:-----------|
| **Time** | `O(m +  n)` |
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

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    let listA = headA
    let listB = headB

    while (listA !== listB) {
        listA = listA ? listA.next : headB
        listB = listB ? listB.next : headA
    }

    return listA;
};
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
