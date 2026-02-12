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

function removeElements(head: ListNode | null, val: number): ListNode | null {
    let dummy = new ListNode(0, head)
    let prev = dummy;
    let curr = head;

    while (curr) {
        let next = curr.next;

        if (curr.val === val) prev.next = next;
        else prev = curr

        curr = next
    }

    return dummy.next;
};