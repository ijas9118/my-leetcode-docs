## Metadata

| Field             | Value                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------- |
| Problem           | [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/description/) |
| Data Structure(s) | Arrays                                                                                                |
| Difficulty        | 🟧 Medium                                                                                             |
| Pattern           | Two Pointers                                                                                          |

## Intuition

The brute-force way is to check all pairs of lines and calculate the area, but that takes O(n²). A faster approach is the two-pointer method, start from both ends, compute the area, and move the pointer at the shorter line inward until they meet. This reduces the time to O(n).

## Approach

### Brute Force

#### Idea

Try all pairs and calculate the area.

#### Pseudo-code

1. Initialize max = 0.
2. For l from 0 to n - 2:
3. For r from l + 1 to n - 1:
   1. width = r - l
   2. height = min(height[l], height[r])
   3. area = width \* height
   4. max = max(max, area)
4. Return max.

### Optimized Solution

#### Idea

1. Start with two pointers at both ends (l=0, r=n-1).
2. At each step, calculate the area.
3. Move the pointer pointing to the smaller height inward.
4. Continue until the two pointers meet.

#### Pseudo-code

1. Initialize max = 0.
2. Set l = 0, r = n - 1.
3. While l &lt; r:
   1. width = r - l
   2. height = min(height[l], height[r])
   3. area = width \* height
   4. max = max(max, area)
   5. If height[l] &lt; height[r]: increment l.
   6. Else: decrement r.
4. Return max.

## Code

### Brute Force

```js
var maxArea = function (height) {
  let max = 0;
  for (let l = 0; l < height.length - 1; l++) {
    for (let r = l + 1; r < height.length; r++) {
      let area = (r - l) * Math.min(height[l], height[r]);
      max = Math.max(max, area);
    }
  }

  return max;
};
```

### Optimized

```js
var maxArea = function (height) {
  let max = 0;
  let l = 0,
    r = height.length - 1;

  while (l < r) {
    let area = (r - l) * Math.min(height[l], height[r]);
    max = Math.max(max, area);

    if (height[l] < height[r]) {
      l++;
    } else {
      r--;
    }
  }

  return max;
};
```

## Complexity

### Brute Force:

- Time: O(n²) → Two nested loops.
- Space: O(1) → Only uses a few variables.

### Optimized (Two Pointers):

- Time: O(n) → Single pass with two pointers.
- Space: O(1) → Only a few variables.
