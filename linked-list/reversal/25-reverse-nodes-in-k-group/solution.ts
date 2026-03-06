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

function reverse(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;

    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    let curr = head;
    let prevGroupTail: ListNode | null = null;

    while (curr) {
        let kth = curr;

        for (let i = 1; i < k; i++) {
            if (!kth.next) {
                return head;
            }
            kth = kth.next;
        }

        let nextGroup = kth.next;

        kth.next = null;

        let newHead = reverse(curr);

        if (!prevGroupTail) {
            head = newHead;
        } else {
            prevGroupTail.next = newHead;
        }

        curr.next = nextGroup;

        prevGroupTail = curr;
        curr = nextGroup;
    }

    return head;
}