## Metadata

| Field             | Value                                                                       |
| ----------------- | --------------------------------------------------------------------------- |
| Problem           | [74. Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) |
| Data Structure(s) | Arrays                                                                      |
| Difficulty        | 🟧 Medium                                                                   |
| Pattern           | Binary Search                                                               |

## Approach

### Brute Force - O(n^2)

#### Idea

Iterate through the matrix and check if the target is found.

#### Pseudo-code

1. For each row in matrix:
   1. For each elem in row:
   2. If row == target:
   3. Return true
2. If not found, return false

### Using Binary Search - O(m.log(n))

#### Idea

Iterate through the matrix row by row. Use binary search on each row to find the target element.

#### Pseudo-code.

1. For each row in matrix:
   1. Check if target exists in row using binary search
   2. If yes, return true
2. Return false.

### Using Double Binary Search - O(log(m) + log(n))

#### Idea

The idea is, use binary search to figure out in which row the target will exist. After finding the row, use another binary search to find the target.

## Code

### Brute Force

```js
var searchMatrix = function (matrix, target) {
  for (let row of matrix) {
    for (let elem of row) {
      if (elem === target) return true;
    }
  }
  return false;
};
```

### Using Binary Search

```js
var searchMatrix = function (matrix, target) {
  for (let row of matrix) {
    let pos = binarySearch(row, target);
    if (pos !== -1) return true;
  }
  return false;
};

const binarySearch = (arr, target) => {
  let left = 0,
    right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (target < arr[mid]) right = mid - 1;
    else left = mid + 1;
  }
  return -1;
};
```

### Using Double Binary Search

```js
var searchMatrix = function (matrix, target) {
  const ROWS = matrix.length,
    COLS = matrix[0].length;

  let top = 0,
    bot = ROWS - 1;
  while (top <= bot) {
    let mid = Math.floor((top + bot) / 2);
    if (target > matrix[mid].at(-1)) top = mid + 1;
    else if (target < matrix[mid][0]) bot = mid - 1;
    else break;
  }

  if (top > bot) return false;

  let row = Math.floor((top + bot) / 2);
  let left = 0,
    right = COLS - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (target === matrix[row][mid]) return true;
    if (target < matrix[row][mid]) right = mid - 1;
    else left = mid + 1;
  }

  return false;
};
```

## Complexity

### Brute Force:

- Time: O(n²) → Two nested loops.
- Space: O(1)

### Using Binary Search:

- Time: O(m.log(n))
- Space: O(1)

### Using Double Binary Search:

- Time: O(log(m \* n))
- Space: O(1)
