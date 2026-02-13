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

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (!head || left === right) return head;

    let dummy = new ListNode(0, head);
    let prev: ListNode = dummy;

    for (let i = 1; i < left; i++)
        prev = prev.next!;

    let curr: ListNode | null = prev.next;
    let temp: ListNode | null = null;

    for (let i = 0; i < right - left + 1; i++) {
        let next = curr!.next;
        curr!.next = temp;
        temp = curr;
        curr = next;
    }

    const tail = prev.next!;
    tail.next = curr;
    prev.next = temp;

    return dummy.next;
};