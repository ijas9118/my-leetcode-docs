# 643. Maximum Average Subarray I

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
    <td>Array • Sliding Window</td>
  </tr>
  <tr>
    <td><b>Date</b></td>
    <td>Invalid Date</td>
  </tr>
  <tr>
    <td><b>Problem Link</b></td>
    <td>
      <a href="https://leetcode.com/problems/maximum-average-subarray-i/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>You are given an integer array <code>nums</code> consisting of <code>n</code> elements, and an integer <code>k</code>.</p>

<p>Find a contiguous subarray whose <strong>length is equal to</strong> <code>k</code> that has the maximum average value and return <em>this value</em>. Any answer with a calculation error less than <code>10<sup>-5</sup></code> will be accepted.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> nums = [1,12,-5,-6,50,3], k = 4
<strong>Output:</strong> 12.75000
<strong>Explanation:</strong> Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> nums = [5], k = 1
<strong>Output:</strong> 5.00000
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>n == nums.length</code></li>
	<li><code>1 &lt;= k &lt;= n &lt;= 10<sup>5</sup></code></li>
	<li><code>-10<sup>4</sup> &lt;= nums[i] &lt;= 10<sup>4</sup></code></li>
</ul>


---

## 💡 Solution Approach

Before diving into the solution, let's make sure we understand what we're trying to solve. We have an array of numbers, and we need to find a continuous sequence of exactly `k` elements that has the highest average value. A continuous sequence means the elements must be next to each other in the array - we can't skip around and pick elements from different positions.

For example, if we have the array `[1, 12, -5, -6, 50, 3]` and `k = 4`, we need to look at all possible sequences of 4 consecutive numbers and find which one has the best average. The possible sequences would be: `[1, 12, -5, -6]`, `[12, -5, -6, 50]`, and `[-5, -6, 50, 3]`.

## The Intuition Behind the Solution

The most straightforward approach would be to calculate the average for every possible subarray of length `k`, keep track of the maximum average we've seen, and return it at the end. However, this would involve a lot of repeated calculations.

Think about it this way: when we move from one subarray to the next, most of the elements stay the same! For instance, when going from `[1, 12, -5, -6]` to `[12, -5, -6, 50]`, three elements (`12`, `-5`, `-6`) are present in both subarrays. Why recalculate their sum from scratch?

This is where the **sliding window technique** comes in. Imagine you're looking through a window at `k` elements at a time. As you slide this window one position to the right, you only need to:
1. Remove the element that just left the window (on the left side)
2. Add the new element that just entered the window (on the right side)

This way, we maintain a running sum that we continuously update, rather than recalculating everything from scratch each time.

## Step-by-Step Breakdown of the Algorithm

### Initialization

```typescript
let max = -Infinity;
let sum = 0
```

We start by setting up two variables:
- `max`: This will store the maximum average we've found so far. We initialize it to `-Infinity` because we want to ensure that any actual average we calculate will be larger than our starting value, even if all the numbers in the array are negative.
- `sum`: This will keep track of the current sum of our sliding window. We start it at 0.

### The Main Loop

```typescript
for (let i = 0; i < nums.length; i++) {
```

We iterate through each element in the array using index `i`. This single loop will handle both building our initial window and then sliding it across the array.

### Building and Updating the Sum

```typescript
sum += nums[i];
```

At each iteration, we add the current element to our running sum. This is the "add the new element entering the window" part of our sliding window approach.

During the first `k` iterations, we're essentially building up our initial window. We keep adding elements until we have exactly `k` elements in our window.

### Calculating Averages and Sliding the Window

```typescript
if (i >= k - 1) {
    max = Math.max(max, sum/k);
    sum -= nums[i - k + 1];
}
```

This is where the core logic happens. Let's break down the condition `i >= k - 1`:

**Why `i >= k - 1`?**
Arrays are zero-indexed, so when `i = k - 1`, we've actually looked at `k` elements (indices 0 through k-1). This is exactly when we have our first complete window of `k` elements.

For example, if `k = 4`:
- When `i = 0`: We have 1 element (not enough yet)
- When `i = 1`: We have 2 elements (not enough yet)
- When `i = 2`: We have 3 elements (not enough yet)
- When `i = 3` (which equals `k - 1`): We have 4 elements (our first complete window!)

**Calculating and Comparing the Average:**
```typescript
max = Math.max(max, sum/k);
```

Once we have a complete window, we calculate its average by dividing the sum by `k`. We then compare this average with the maximum average we've seen so far and keep whichever is larger. The `Math.max()` function makes this comparison easy.

**Sliding the Window:**
```typescript
sum -= nums[i - k + 1];
```

After we've calculated the average for the current window, we need to prepare for the next iteration. This line removes the leftmost element of the current window from our sum.

Let's understand the index calculation `i - k + 1`:
- `i` is our current position (the rightmost element of the window)
- `k` is the window size
- `i - k + 1` gives us the leftmost element of the current window

For example, if `i = 5` and `k = 4`:
- Our window includes indices: 2, 3, 4, 5 (four elements)
- The leftmost element is at index: `5 - 4 + 1 = 2`
- In the next iteration (`i = 6`), our window will include indices: 3, 4, 5, 6
- So we need to remove the element at index 2

This subtraction prepares our `sum` for the next iteration, where we'll add `nums[i+1]` to it, effectively sliding our window one position to the right.

## Walking Through an Example

Let's trace through the algorithm with a concrete example:
- `nums = [1, 12, -5, -6, 50, 3]`
- `k = 4`

**Iteration 0 (`i = 0`):**
- `sum = 0 + 1 = 1`
- `i < k - 1` (0 < 3), so we skip the if block
- We don't have a full window yet

**Iteration 1 (`i = 1`):**
- `sum = 1 + 12 = 13`
- `i < k - 1` (1 < 3), so we skip the if block
- Still building our window

**Iteration 2 (`i = 2`):**
- `sum = 13 + (-5) = 8`
- `i < k - 1` (2 < 3), so we skip the if block
- Still building our window

**Iteration 3 (`i = 3`):**
- `sum = 8 + (-6) = 2`
- `i >= k - 1` (3 >= 3), so we enter the if block!
- Window: `[1, 12, -5, -6]`, sum = 2
- Average = `2 / 4 = 0.5`
- `max = Math.max(-Infinity, 0.5) = 0.5`
- Slide window: `sum = 2 - nums[3 - 4 + 1] = 2 - nums[0] = 2 - 1 = 1`

**Iteration 4 (`i = 4`):**
- `sum = 1 + 50 = 51`
- Window: `[12, -5, -6, 50]`, sum = 51
- Average = `51 / 4 = 12.75`
- `max = Math.max(0.5, 12.75) = 12.75`
- Slide window: `sum = 51 - nums[4 - 4 + 1] = 51 - nums[1] = 51 - 12 = 39`

**Iteration 5 (`i = 5`):**
- `sum = 39 + 3 = 42`
- Window: `[-5, -6, 50, 3]`, sum = 42
- Average = `42 / 4 = 10.5`
- `max = Math.max(12.75, 10.5) = 12.75`
- Slide window: `sum = 42 - nums[5 - 4 + 1] = 42 - nums[2] = 42 - (-5) = 47`

**Result:** The maximum average is `12.75`


---

## ⏱️ Complexity Analysis

| Metric | Complexity |
|:-------|:-----------|
| **Time** | `O(n)` |
| **Space** | `O(1)` |

---

## 💻 Implementation

```typescript
function findMaxAverage(nums: number[], k: number): number {
    let max = -Infinity;
    let sum = 0

    for (let i = 0; i < nums.length; i++) {
       sum += nums[i];

       if (i >= k - 1) {
        max = Math.max(max, sum/k);
        sum -= nums[i - k + 1];
       }
    }

    return max;
};
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
