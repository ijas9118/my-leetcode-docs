# 1343. Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

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
    <td>Array • Sliding Window</td>
  </tr>
  <tr>
    <td><b>Date</b></td>
    <td>Invalid Date</td>
  </tr>
  <tr>
    <td><b>Problem Link</b></td>
    <td>
      <a href="https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>Given an array of integers <code>arr</code> and two integers <code>k</code> and <code>threshold</code>, return <em>the number of sub-arrays of size </em><code>k</code><em> and average greater than or equal to </em><code>threshold</code>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<pre>
<strong>Input:</strong> arr = [2,2,2,2,5,5,5,8], k = 3, threshold = 4
<strong>Output:</strong> 3
<strong>Explanation:</strong> Sub-arrays [2,5,5],[5,5,5] and [5,5,8] have averages 4, 5 and 6 respectively. All other sub-arrays of size 3 have averages less than 4 (the threshold).
</pre>

<p><strong class="example">Example 2:</strong></p>

<pre>
<strong>Input:</strong> arr = [11,13,17,23,29,31,7,5,2,3], k = 3, threshold = 5
<strong>Output:</strong> 6
<strong>Explanation:</strong> The first 6 sub-arrays of size 3 have averages greater than 5. Note that averages are not integers.
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= arr.length &lt;= 10<sup>5</sup></code></li>
	<li><code>1 &lt;= arr[i] &lt;= 10<sup>4</sup></code></li>
	<li><code>1 &lt;= k &lt;= arr.length</code></li>
	<li><code>0 &lt;= threshold &lt;= 10<sup>4</sup></code></li>
</ul>


---

## 💡 Solution Approach

# Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold

## Problem Understanding

Before diving into the solution, let's make sure we understand what we're trying to accomplish. We have an array of numbers, and we need to find how many "windows" of size `k` have an average that meets or exceeds our `threshold` value.

For example, if we have `arr = [2, 2, 2, 2, 5, 5, 5, 8]`, `k = 3`, and `threshold = 4`:
- The first window `[2, 2, 2]` has an average of 2 (doesn't qualify)
- The second window `[2, 2, 5]` has an average of 3 (doesn't qualify)
- The third window `[2, 5, 5]` has an average of 4 (qualifies!)
- And so on...

## The Approach: Sliding Window Technique

This solution uses a clever technique called the **sliding window approach**. Think of it like a physical window that you slide across your array, one position at a time. Instead of recalculating everything from scratch for each position, we smartly update our running sum by removing the element that's leaving the window and adding the element that's entering.

This is much more efficient than the naive approach of recalculating the sum for every sub-array independently.

## Step-by-Step Breakdown

### Step 1: Initialize Variables

```javascript
let result = 0;
let sum = 0;
```

We start by setting up two important variables:
- `result`: This counter will track how many valid sub-arrays we find
- `sum`: This will hold our running sum of the current window

### Step 2: Build the Initial Window

```javascript
for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
```

We iterate through each element in the array, adding it to our running sum. At each step, we're growing our window by including the current element.

### Step 3: Check When Window Reaches Size K

```javascript
if (i >= (k - 1)) {
    let avg = sum / k;
    if (avg >= threshold) result++;
```

This is where the magic happens! The condition `i >= (k - 1)` tells us when our window has reached the desired size of `k` elements.

**Why `k - 1`?** Because arrays are zero-indexed. When `i = k - 1`, we've actually accumulated `k` elements (elements at indices 0, 1, 2, ..., k-1).

Once we have a full window:
- We calculate the average by dividing our sum by `k`
- If this average meets or exceeds the threshold, we increment our result counter

### Step 4: Slide the Window

```javascript
    sum -= arr[i - (k - 1)];
}
```

After checking the current window, we need to prepare for the next iteration. We "slide" the window by removing the leftmost element from our sum.

**Understanding `i - (k - 1)`:** This gives us the index of the element that's about to leave the window. 

For example, if `k = 3` and `i = 2`:
- Our current window includes indices 0, 1, 2
- On the next iteration (`i = 3`), we'll include indices 1, 2, 3
- So we need to remove the element at index `2 - (3 - 1) = 0`

## Visual Example

Let's trace through an example: `arr = [2, 2, 2, 2, 5, 5, 5, 8]`, `k = 3`, `threshold = 4`

```
i=0: sum=2,   window not ready yet
i=1: sum=4,   window not ready yet
i=2: sum=6,   window=[2,2,2], avg=2, doesn't qualify, remove arr[0], sum=4
i=3: sum=6,   window=[2,2,2], avg=2, doesn't qualify, remove arr[1], sum=4
i=4: sum=9,   window=[2,2,5], avg=3, doesn't qualify, remove arr[2], sum=7
i=5: sum=12,  window=[2,5,5], avg=4, QUALIFIES! result=1, remove arr[3], sum=10
i=6: sum=15,  window=[5,5,5], avg=5, QUALIFIES! result=2, remove arr[4], sum=10
i=7: sum=18,  window=[5,5,8], avg=6, QUALIFIES! result=3, remove arr[5], sum=13
```

Final answer: 3 sub-arrays qualify

## Time and Space Complexity

**Time Complexity: O(n)** - We visit each element in the array exactly once. Even though we're examining multiple windows, we're doing constant work for each element (adding it, potentially checking average, potentially removing an old element).

**Space Complexity: O(1)** - We only use a fixed amount of extra space (the variables `result`, `sum`, `i`, and `avg`) regardless of the input size.

## Why This Approach is Efficient

The naive approach would recalculate the sum for each window from scratch:
- Window 1: sum elements at indices 0, 1, 2
- Window 2: sum elements at indices 1, 2, 3
- Window 3: sum elements at indices 2, 3, 4
- And so on...

This would give us O(n × k) time complexity because for each of the n positions, we'd sum k elements.

The sliding window technique is brilliant because it recognizes that consecutive windows share most of their elements. By maintaining a running sum and just updating it (subtract one element, add one element), we reduce the work per window to O(1), giving us overall O(n) time complexity.

## Key Takeaways

1. **Sliding window** is perfect for problems involving consecutive elements or sub-arrays
2. Instead of recalculating everything, we **incrementally update** our running calculations
3. The pattern is: grow the window, check conditions when it reaches the right size, then slide by removing the oldest element
4. This transforms a potentially quadratic solution into a linear one

---

## ⏱️ Complexity Analysis

| Metric | Complexity |
|:-------|:-----------|
| **Time** | `O(n)` |
| **Space** | `O(1)` |

---

## 💻 Implementation

```typescript
function numOfSubarrays(arr: number[], k: number, threshold: number): number {
    let result = 0;
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];

        if (i >= k - 1) {
            let avg = sum / k;
            if (avg >= threshold) result++;

            sum -= arr[i - (k - 1)];
        }
    }

    return result;
};
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
