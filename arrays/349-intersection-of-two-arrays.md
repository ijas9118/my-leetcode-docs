## Metadata

| Field             | Value                                                                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| Problem           | [349. Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/description/) |
| Data Structure(s) | Arrays, Hashset                                                                                          |
| Difficulty        | 🟩 Easy                                                                                                  |
| Pattern           | Two Pointers                                                                                             |

## Approach

### Brute Force - O(n^2)

#### Idea

Try all pairs and return the elements that occur on both arrays.

#### Pseudo-code

1. Initialize set = empty
2. For each n1 in nums1:
   1. For each n2 in nums2:
   2. If n1 == n2:
   3. Add n1 to set
3. Return elements of set as list

### Using Two Pointers

#### Idea

We can sort both arrays, and use two pointers, one for each sorted array, and iterate them together. If the elements are equal, add them to the resultant array, else if one of them is smaller, then increment that pointer, else vice versa.

#### Pseudo-code

1. Sort both arrays
2. Initialize two pointers i, j, one each for both arrays.
3. For each i, j pair:
   1. If elements at i, j are equal, push it to result array
   2. Else if, nums1[i] &lt; nums2[j], i = i + 1
   3. Else j = j + 1
4. Return result array.

### Using HashSet - O(n + m)

#### Idea

Using a hashset, we can find the elements which are common in both arrays, in O(n) time and space complexity.

- Iterate through the first array, add unique elements to the set.
- Next while iterating the second array, if the element exists in the set, add that element to the resultant array and also remove it from the set.

#### Pseudo-code

1. Initialize hashset set and result array
2. For each n1 in nums1:
   1. Add n1 into set if not exists already
3. For each n2 in nums2: 2. Check if n2 exist in set 3. If Yes, push n2 to result array and remove from set
4. Return result

## Code

### Brute Force

```js
var intersection = function (nums1, nums2) {
  let set = new Set();
  let result = [];

  for (let n1 of nums1) {
    for (let n2 of nums2) {
      if (n1 === n2) {
        set.add(n1);
      }
    }
  }
  for (num of set) {
    result.push(num);
  }

  return result;
};
```

\

###

### Using Two-Pointers

```js
var intersection = function (nums1, nums2) {
  let set = new Set();
  let result = [];

  for (let num of nums1) {
    set.add(num);
  }

  for (let num of nums2) {
    if (set.has(num)) {
      set.delete(num);
      result.push(num);
    }
  }

  return result;
};
```

### HashSet Solution

```js
var intersection = function (nums1, nums2) {
  let set = new Set();
  let result = [];

  for (let num of nums1) {
    set.add(num);
  }

  for (let num of nums2) {
    if (set.has(num)) {
      set.delete(num);
      result.push(num);
    }
  }

  return result;
};
```

## Complexity

### Brute Force:

- Time: O(n²) → Two nested loops.
- Space: O(n) → Uses hashset

### Using Two Pointers:

- Time: O(n.log(n) + m.log(m)) → Sorting two arrays
- Space: O(1)
