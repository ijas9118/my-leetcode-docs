# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/number-of-islands/">200. Number of Islands</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>DFS, Graph
   </td>
  </tr>
  <tr>
   <td>Difficulty
   </td>
   <td>🟧 Medium
   </td>
  </tr>
  <tr>
   <td>Date
   </td>
   <td>24 October 2025
   </td>
  </tr>
</table>

# Problem Statement

Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are surrounded by water.

# Approach - DFS

## Idea

The idea is to go through each cell in the grid and whenever a land cell ("1") is found, it means a new island has been discovered. From that cell, a depth-first search (DFS) is performed to explore and mark all connected land cells as visited ("0"), ensuring they aren’t counted again. Each time this process starts, it indicates the completion of one island, and the island count is incremented.

## Psuedocode

```sql
FUNCTION NUM_ISLANDS(grid)
  n ← NUMBER OF ROWS IN grid
  m ← NUMBER OF COLUMNS IN grid
  count ← 0

  FUNCTION DFS(i, j)
    IF i < 0 OR i ≥ n OR j < 0 OR j ≥ m OR grid[i][j] ≠ '1' THEN
      RETURN
    END IF

    grid[i][j] ← '0'   // Mark as visited

    DFS(i + 1, j)
    DFS(i - 1, j)
    DFS(i, j + 1)
    DFS(i, j - 1)
  END FUNCTION

  FOR i ← 0 TO n - 1 DO
    FOR j ← 0 TO m - 1 DO
      IF grid[i][j] = '1' THEN
        count ← count + 1
        DFS(i, j)
      END IF
    END FOR
  END FOR

  RETURN count
END FUNCTION
```

## Solution Code

```ts
function numIslands(grid: string[][]): number {
  let n = grid.length;
  let m = grid[0].length;
  let count = 0;

  function dfs(i: number, j: number) {
    if (i >= n || i < 0 || j >= m || j < 0 || grid[i][j] !== "1") return;

    grid[i][j] = "0";
    dfs(i, j + 1);
    dfs(i, j - 1);
    dfs(i + 1, j);
    dfs(i - 1, j);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === "1") {
        count++;
        dfs(i, j);
      }
    }
  }

  return count;
}
```

# Complexity Analysis

<table>
  <tr>
   <td><strong>Approach</strong>
   </td>
   <td><strong>Best TC</strong>
   </td>
   <td><strong>Average TC</strong>
   </td>
   <td><strong>Worst TC</strong>
   </td>
   <td><strong>Space Complexity</strong>
   </td>
  </tr>
  <tr>
   <td>DFS on 2D Grid (Flood Fill)
   </td>
   <td>O(n × m)
   </td>
   <td>O(n × m)
   </td>
   <td>O(n × m)
   </td>
   <td>O(n × m) recursion stack in worst case (when the entire grid is land)
   </td>
  </tr>
</table>
