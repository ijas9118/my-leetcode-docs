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

function isPalindrome(head: ListNode | null): boolean {
    if (!head || !head.next) return true

    let stack = [];
    let slow = head, fast = head;

    while (fast && fast.next) {
        stack.push(slow.val)
        slow = slow.next
        fast = fast.next.next
    }

    if (fast) slow = slow.next

    while (slow) {
        if (stack.pop() !== slow.val) return false;
        slow = slow.next
    }

    return true
};