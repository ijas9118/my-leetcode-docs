# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/number-of-provinces/">547. Number of Provinces</a>
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
   <td>23 October 2025
   </td>
  </tr>
</table>

# Problem Statement

There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

# Approach - DFS

## Idea

Use a visited array. For each city not yet seen, start a traversal to mark all cities in its province, then increment your answer.

## Psuedocode

```sql
FUNCTION FIND_CIRCLE_NUM(isConnected)
  n ← LENGTH(isConnected)
  visited ← ARRAY OF n ELEMENTS INITIALIZED TO FALSE
  count ← 0

  FOR city ← 0 TO n - 1 DO
    IF visited[city] = FALSE THEN
      count ← count + 1
      DFS(city, isConnected, visited)
    END IF
  END FOR

  RETURN count
END FUNCTION

FUNCTION DFS(city, isConnected, visited)
  visited[city] ← TRUE

  FOR j ← 0 TO LENGTH(isConnected) - 1 DO
    IF isConnected[city][j] = 1 AND visited[j] = FALSE THEN
      DFS(j, isConnected, visited)
    END IF
  END FOR
END FUNCTION
```

## Solution Code

```ts
function findCircleNum(isConnected: number[][]): number {
  const n = isConnected.length;
  let visited: boolean[] = new Array<boolean>(n).fill(false);
  let count: number = 0;

  for (let city = 0; city < n; city++) {
    if (!visited[city]) {
      count++;
      dfs(city, isConnected, visited);
    }
  }

  return count;
}

function dfs(city: number, isConnected: number[][], visited: boolean[]): void {
  for (let j = 0; j < isConnected.length; j++) {
    if (isConnected[city][j] === 1 && !visited[j]) {
      visited[j] = true;
      dfs(j, isConnected, visited);
    }
  }
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
   <td>DFS on Adjacency Matrix
   </td>
   <td>O(n²)
   </td>
   <td>O(n²)
   </td>
   <td>O(n²)
   </td>
   <td>O(n) recursion stack + O(n) visited array → O(n) total
   </td>
  </tr>
</table>
