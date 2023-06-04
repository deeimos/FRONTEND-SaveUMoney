import React, { useEffect, useState } from "react";
import { BillsClient } from "../../server";
import { IBill } from "../../const/types";
import { useStores } from "../../StoresProvider";
import { observer } from "mobx-react-lite";
import { DeleteBill } from "../modals/bills/DeleteBill";
import UpdateBill from "../modals/bills/UpdateBill";

export const BillList = observer(() => {
  const { billStore, deleteBillModalStore, updateBillModalStore } = useStores();

  useEffect(() => {
    billStore.GetBillsAction();
  }, [billStore.isLoading]);
  const [currentBill, setCurrentBill] = useState<IBill>(billStore.bills[0]);

  const handleClick = (bill: IBill, action: string) => {
    setCurrentBill(bill);
    switch (action) {
      case "update":
        updateBillModalStore.openModal(<UpdateBill bill={bill}/>)
        break;
      case "delete":
        deleteBillModalStore.openModal(<DeleteBill bill={bill}/>)
        break;
      default:
        break;
    }
  };
  return (
    <div>
      {billStore.bills.map((bill) => {
        return (
          <div key={bill._id}>
            <h2>{bill.name}</h2>
            <h4>{bill.description}</h4>
            <h3>{bill.value}</h3>
            <button onClick={() => handleClick(bill, "update")}>Update</button>
            <button onClick={() => handleClick(bill, "delete")}>Delete</button>
            <DeleteBill  bill={currentBill}/>
            <UpdateBill bill={currentBill}/>
          </div>
        );
      })}
    </div>
  );
});
