# 547. Number of Provinces

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
    <td>Depth-First Search • Breadth-First Search • Union-Find • Graph Theory</td>
  </tr>
  <tr>
    <td><b>Date</b></td>
    <td>Invalid Date</td>
  </tr>
  <tr>
    <td><b>Problem Link</b></td>
    <td>
      <a href="https://leetcode.com/problems/number-of-provinces/">
        View on LeetCode →
      </a>
    </td>
  </tr>
</table>

## 📋 Problem Description

<p>There are <code>n</code> cities. Some of them are connected, while some are not. If city <code>a</code> is connected directly with city <code>b</code>, and city <code>b</code> is connected directly with city <code>c</code>, then city <code>a</code> is connected indirectly with city <code>c</code>.</p>

<p>A <strong>province</strong> is a group of directly or indirectly connected cities and no other cities outside of the group.</p>

<p>You are given an <code>n x n</code> matrix <code>isConnected</code> where <code>isConnected[i][j] = 1</code> if the <code>i<sup>th</sup></code> city and the <code>j<sup>th</sup></code> city are directly connected, and <code>isConnected[i][j] = 0</code> otherwise.</p>

<p>Return <em>the total number of <strong>provinces</strong></em>.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/24/graph1.jpg" style="width: 222px; height: 142px;" />
<pre>
<strong>Input:</strong> isConnected = [[1,1,0],[1,1,0],[0,0,1]]
<strong>Output:</strong> 2
</pre>

<p><strong class="example">Example 2:</strong></p>
<img alt="" src="https://assets.leetcode.com/uploads/2020/12/24/graph2.jpg" style="width: 222px; height: 142px;" />
<pre>
<strong>Input:</strong> isConnected = [[1,0,0],[0,1,0],[0,0,1]]
<strong>Output:</strong> 3
</pre>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= n &lt;= 200</code></li>
	<li><code>n == isConnected.length</code></li>
	<li><code>n == isConnected[i].length</code></li>
	<li><code>isConnected[i][j]</code> is <code>1</code> or <code>0</code>.</li>
	<li><code>isConnected[i][i] == 1</code></li>
	<li><code>isConnected[i][j] == isConnected[j][i]</code></li>
</ul>


---

## 💡 Solution Approach

## 🧩 The Problem

You're given an `n x n` matrix called `isConnected`, where `isConnected[i][j] = 1` means city `i` and city `j` are directly connected, and `0` means they are not. A **province** is a group of cities that are all connected to each other (directly or indirectly). Your goal is to **count how many provinces** exist.

## 💡 The Core Intuition

Think of it like a social network. If Alice knows Bob, and Bob knows Carol, then Alice, Bob, and Carol are all part of the same "friend group" (province) — even if Alice doesn't know Carol directly.

Now imagine you're a detective trying to count how many **separate** friend groups exist. Your strategy would be:

1. Pick any person you haven't visited yet.
2. Follow all their connections (and their connections' connections) until you've met everyone in that group.
3. Count that as **one group**, then repeat with the next unvisited person.

That's exactly what this solution does, using a technique called **Depth-First Search (DFS)**.

## 🗺️ Approach: DFS + Visited Array

The solution uses two main tools:

- A `visited` boolean array to track which cities have already been explored.
- A `dfs` function that "floods" through all cities reachable from a starting city.

Every time we start a fresh DFS from an unvisited city, we've found a **new province**, so we increment our `provinces` counter.

## 🔍 Step-by-Step Walkthrough

### Step 1 — Initialize

```typescript
let n = isConnected.length;       // number of cities
let provinces = 0;                // our answer counter
let visited: boolean[] = new Array(n).fill(false); // all unvisited at start
```

We set up a `visited` array of size `n`, all starting as `false` because we haven't explored any city yet.


### Step 2 — Loop Through All Cities

```typescript
for (let i = 0; i < n; i++) 
    if (!visited[i]) {
        dfs(i);
        provinces++;
    }
```

We loop through every city `i` from `0` to `n-1`. If city `i` has **not been visited yet**, it means it belongs to a new, undiscovered province. We:

1. Call `dfs(i)` to explore the entire province starting from city `i`.

2. Increment `provinces` by 1, because we just found a new one.

If city `i` **was already visited**, it means we already explored it as part of a previous province, so we skip it.

### Step 3 — The DFS Function

```typescript
function dfs(city: number) {
    visited[city] = true;
    for (let neighbor = 0; neighbor < n; neighbor++) 
        if (isConnected[city][neighbor] === 1 && !visited[neighbor])
            dfs(neighbor)
}
```

This is the heart of the solution. When we call `dfs(city)`:

1. **Mark the city as visited** — `visited[city] = true`. This prevents us from visiting it again and getting into an infinite loop.

2. **Check all potential neighbors** — We loop through every other city `neighbor` (from `0` to `n-1`).

3. **Recurse if connected and unvisited** — If `isConnected[city][neighbor] === 1` (there's a direct connection) AND `!visited[neighbor]` (we haven't been there yet), we call `dfs(neighbor)` to continue exploring.

This recursive process keeps going deeper and deeper until it has visited every city in the current province. Only then does it return, and we move on to find the next unvisited city in our main loop.


## 📊 Visual Example

Suppose `n = 4` and the connection matrix looks like this:

```
     C0  C1  C2  C3
C0 [  1,  1,  0,  0 ]
C1 [  1,  1,  0,  0 ]
C2 [  0,  0,  1,  1 ]
C3 [  0,  0,  1,  1 ]
```

- **City 0 and City 1** are connected → one province.
- **City 2 and City 3** are connected → another province.

Here's how the algorithm runs:

| Step | Action | `visited` | `provinces` |
|------|--------|-----------|-------------|
| i=0 | City 0 unvisited → start DFS | [F,F,F,F] | 0 |
| DFS(0) | Mark 0 visited, find neighbor 1 | [T,F,F,F] | 0 |
| DFS(1) | Mark 1 visited, no new neighbors | [T,T,F,F] | 0 |
| Back to loop | DFS done, provinces++ | [T,T,F,F] | **1** |
| i=1 | City 1 already visited → skip | [T,T,F,F] | 1 |
| i=2 | City 2 unvisited → start DFS | [T,T,F,F] | 1 |
| DFS(2) | Mark 2 visited, find neighbor 3 | [T,T,T,F] | 1 |
| DFS(3) | Mark 3 visited, no new neighbors | [T,T,T,T] | 1 |
| Back to loop | DFS done, provinces++ | [T,T,T,T] | **2** |
| i=3 | City 3 already visited → skip | — | 2 |

**Result: 2 provinces** ✅

## ⏱️ Complexity Analysis

| | Complexity | Reason |
|---|---|---|
| **Time** | O(n²) | We visit every cell of the `n × n` matrix at least once. |
| **Space** | O(n) | The `visited` array is size `n`, and the DFS call stack can go at most `n` levels deep. |


## ✅ Summary

This solution is a classic **connected components** problem solved with DFS. The key ideas are:

- Use a `visited` array to avoid re-processing cities.
- Each time you start a DFS from an unvisited city, you've found a new province.
- The DFS function recursively explores the entire network of connected cities, marking them all as visited before returning.

The elegance of this approach is that DFS naturally handles the "transitivity" of connections — if A connects to B, and B connects to C, DFS will find all three as part of the same province even if A and C have no direct link.

---

## ⏱️ Complexity Analysis

| Metric | Complexity |
|:-------|:-----------|
| **Time** | `O(n^2)` |
| **Space** | `O(n)` |

---

## 💻 Implementation

```typescript
function findCircleNum(isConnected: number[][]): number {
    let n = isConnected.length;
    let provinces = 0;
    let visited: boolean[] = new Array(n).fill(false);

    for (let i = 0; i < n; i++) 
        if (!visited[i]) {
            dfs(i);
            provinces++;
        }

    function dfs(city: number) {
        visited[city] = true;

        for (let neighbor = 0; neighbor < n; neighbor++) 
            if (isConnected[city][neighbor] === 1 && !visited[neighbor])
                dfs(neighbor)
    }

    return provinces;
};
```

---

<div align="center">
  <sub>Auto-generated by <a href="https://github.com/ijas9118/leetcode-github-sync-tool">LeetCode Github Sync Tool</a></sub>
</div>
