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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
    if (!head) return head;

    let len = 1;
    let tail = head;

    while (tail.next) {
        tail = tail.next;
        len++;
    }

    k %= len;
    if (k === 0) return head;

    tail.next = head;

    let stepsToNewTail = len - k;
    let newTail = head;

    for (let i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next!;
    }

    const newHead = newTail.next;
    newTail.next = null;

    return newHead;
}