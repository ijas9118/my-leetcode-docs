# Metadata

<table>
  <tr>
   <td>Problem
   </td>
   <td><a href="https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to/">1282. Group the People Given the Group Size They Belong To</a>
   </td>
  </tr>
  <tr>
   <td>Topics
   </td>
   <td>Arrays, HashMap, Greedy
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
   <td>27 October 2025
   </td>
  </tr>
</table>

# Problem Statement

Some n people are split into some unknown number of groups. Each person is labeled with a unique ID from 0 to n - 1.

You are given an integer array groupSizes, where groupSizes[i] is the size of the group that person i is in. For example, if groupSizes[1] = 3, then person 1 must be in a group of size 3.

Return a list of groups such that each person i is in a group of size groupSizes[i].

Each person should appear in exactly one group, and every person must be in a group. If there are multiple answers, return any of them. It is guaranteed that there will be at least one valid solution for the given input.

**Example 1**

Input: groupSizes = [3,3,3,3,3,1,3] \
Output: [[5],[0,1,2],[3,4,6]]

**Example 2**

Input: groupSizes = [2,1,3,3,3,2] \
Output: [[1],[0,5],[2,3,4]]

# Approach - HashMap

## Idea

Create a map to keep track of people (by index) waiting for groups of each possible size. Also, create an array to store completed groups.

- For every person (indexed in the input array), check what size group they belong to.
- Put them into the map under their corresponding group size. If there’s no group for that size yet, start a new array for it.
- Each time you add someone, check if the array for that size has as many people as needed (i.e., if it matches the group size).
- If a group reaches the required size, add that array to your result array (meaning this group is now formed). Then, reset that size’s array in the map so you can start forming another group of the same size if needed.
- After processing all people, the result will contain all the groups, with each group having exactly the required number of people and no one left out.

## Psuedocode

```sql
FUNCTION GROUP_THE_PEOPLE(groupSizes)
  groups ← EMPTY MAP
  result ← EMPTY LIST

  FOR i ← 0 TO LENGTH(groupSizes) - 1 DO
    size ← groupSizes[i]

    IF size NOT IN groups THEN
      groups[size] ← EMPTY LIST
    END IF

    APPEND i TO groups[size]

    IF LENGTH(groups[size]) = size THEN
      APPEND groups[size] TO result
      groups[size] ← EMPTY LIST
    END IF
  END FOR

  RETURN result
END FUNCTION
```

## Solution Code

```ts
function groupThePeople(groupSizes: number[]): number[][] {
  let groups = new Map<number, number[]>();
  let result: number[][] = [];

  for (let i = 0; i < groupSizes.length; i++) {
    const size = groupSizes[i];

    if (!groups.has(size)) {
      groups.set(size, []);
    }
    groups.get(size).push(i);

    if (groups.get(size).length === size) {
      result.push(groups.get(size));
      groups.set(size, []);
    }
  }

  return result;
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
   <td>HashMap Grouping Approach
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n)
   </td>
   <td>O(n) for the hash map and result storage
   </td>
  </tr>
</table>
