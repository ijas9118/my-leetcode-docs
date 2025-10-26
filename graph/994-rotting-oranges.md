# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/rotting-oranges/">994. Rotting Oranges</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>BFS, Graph
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
   <td>25 October 2025
   </td>
  </tr>
</table>

# Problem Statement

You are given an m x n grid where each cell can have one of three values:

- 0 representing an empty cell,
- 1 representing a fresh orange, or
- 2 representing a rotten orange.

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

# Approach - BFS

## Idea

The idea is that every minute, all rotten oranges make their adjacent fresh oranges (up, down, left, right) rotten.

We start by adding all the rotten oranges to a queue and use BFS (Breadth-First Search) to spread the rot level by level, where each level equals one minute.

We continue until no fresh oranges are left or no more can rot; if some remain, the answer is -1.

## Psuedocode

```sql
FUNCTION ORANGES_ROTTING(grid)
  rows ← NUMBER OF ROWS IN grid
  cols ← NUMBER OF COLUMNS IN grid
  queue ← EMPTY QUEUE
  time ← 0
  fresh ← 0

  // Count fresh oranges and enqueue all initially rotten ones
  FOR i ← 0 TO rows - 1 DO
    FOR j ← 0 TO cols - 1 DO
      IF grid[i][j] = 1 THEN
        fresh ← fresh + 1
      ELSE IF grid[i][j] = 2 THEN
        ENQUEUE (i, j) INTO queue
      END IF
    END FOR
  END FOR

  // BFS: spread rot level by level (each level = 1 minute)
  WHILE queue IS NOT EMPTY AND fresh > 0 DO
    size ← LENGTH(queue)

    FOR k ← 1 TO size DO
      (r, c) ← DEQUEUE(queue)

      CALL ROT(r + 1, c)
      CALL ROT(r - 1, c)
      CALL ROT(r, c + 1)
      CALL ROT(r, c - 1)
    END FOR

    time ← time + 1
  END WHILE

  FUNCTION ROT(r, c)
    IF r < 0 OR r ≥ rows OR c < 0 OR c ≥ cols OR grid[r][c] ≠ 1 THEN
      RETURN
    END IF

    grid[r][c] ← 2
    ENQUEUE (r, c) INTO queue
    fresh ← fresh - 1
  END FUNCTION

  IF fresh = 0 THEN
    RETURN time
  ELSE
    RETURN -1
  END IF
END FUNCTION
```

## Solution Code

```ts
function orangesRotting(grid: number[][]): number {
  let n = grid.length,
    m = grid[0].length;
  let time = 0;
  let fresh = 0;
  let queue: number[][] = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) fresh++;
      if (grid[i][j] === 2) queue.push([i, j]);
    }
  }

  while (queue.length > 0 && fresh > 0) {
    let len = queue.length;
    for (let i = 0; i < len; i++) {
      let [row, col] = queue.shift();
      bfs(row + 1, col);
      bfs(row - 1, col);
      bfs(row, col + 1);
      bfs(row, col - 1);
    }
    time++;
  }

  function bfs(row, col) {
    if (row < 0 || row >= n || col < 0 || col >= m || grid[row][col] !== 1)
      return;

    grid[row][col] = 2;
    queue.push([row, col]);
    fresh--;
  }

  return fresh === 0 ? time : -1;
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
   <td>BFS on 2D Grid (Multi-source BFS)
   </td>
   <td>O(n × m)
   </td>
   <td>O(n × m)
   </td>
   <td>O(n × m)
   </td>
   <td>O(n × m) for the queue (in the worst case, all cells are rotten or fresh)
   </td>
  </tr>
</table>
