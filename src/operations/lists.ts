export function itensInList1AreInList2(list1: unknown[], list2: unknown[]){
    return list1.every((itemList1)=>
        list2.includes(itemList1)
    )
}