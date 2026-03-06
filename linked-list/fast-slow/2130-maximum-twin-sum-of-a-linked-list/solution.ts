/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function pairSum(head: ListNode | null): number {
    if (!head) return 0;

    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let prev: ListNode | null = null;
    while (slow) {
        const nextNode = slow.next;
        slow.next = prev;
        prev = slow;
        slow = nextNode;
    }

    let maxSum = -Infinity;
    let firstHalf: ListNode | null = head;
    let secondHalf: ListNode | null = prev;

    while (secondHalf && firstHalf) {
        const twinSum = firstHalf.val + secondHalf.val;
        maxSum = Math.max(maxSum, twinSum);

        firstHalf = firstHalf.next;
        secondHalf = secondHalf.next;
    }

    return maxSum;
}