## Metadata

| Field             | Value                                                                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Problem           | [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) |
| Data Structure(s) | Arrays                                                                                                                                                |
| Difficulty        | 🟧 Medium                                                                                                                                             |
| Pattern           | Binary Search                                                                                                                                         |

## Approach

### Brute Force - O(n)

#### Idea

Iterate through the array, find the first occurrence of the target number, and keep note of the index. Next, start iterating from that index till you find a number not equal to the target number. Return both indices.

#### Pseudo-code

1. For each n in nums:
   1. If n = target
   2. Break the loop and store the index i
2. For each n in nums from index i: 3. If n != target 4. Break the loop 5. Return the indices
3. If not found, return [-1, -1]

### Using Binary Search - O(log(n))

#### Idea

To find the first and last position of a target in a sorted array:

1. Use binary search to look for the target, but keep searching left to find the first position.
2. Use binary search again, but keep searching right to find the last position.
3. Return both positions as [first, last].
4. If the target is not found, return [-1, -1].

## Code

### Brute Force

```js
var searchRange = function(nums, target) {
    let i = 0;
    for (; i < nums.length; i++) {
        if (nums[i] === target) break;
    }

    let start = i;
    for (; i < nums.length; i++) {
        if (nums[i] !== target) break
    }

    if (start !== i) return [start, i - 1];
    return [-1, -1]
};
```

### Using Binary Search

```js
var searchRange = function(nums, target) {
   return [binarySearch(nums, target, true), binarySearch(nums, target, false)];
};

const binarySearch = (nums, target, leftBias) => {
   let left = 0, right = nums.length - 1;
   let i = -1;

   while (left <= right) {
       let mid = Math.floor((left + right)/2)
       if (target < nums[mid]) right = mid - 1;
       else if (target > nums[mid]) left = mid + 1;
       else {
           i = mid;
           if (leftBias) right = mid - 1;
           else left = mid + 1
       }
   }
   return i;
}
```

## Complexity

### Brute Force:

- Time: O(n).
- Space: O(1)

### Using Binary Search:

- Time: O(log(n))
- Space: O(1)
