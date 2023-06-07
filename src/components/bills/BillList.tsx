import React, { useEffect, useState } from "react";
import { IBill } from "../../const/types";
import { useStores } from "../../StoresProvider";
import { observer } from "mobx-react-lite";
import { UpdateBill, DeleteBill } from "../modals/index";
import { localization } from "../../localization";
import { SComponents } from "../styled";
import { S } from "./styled";

export const BillList = observer(() => {
  const { billsStore, deleteBillModalStore, updateBillModalStore } =
    useStores();

  useEffect(() => {
    billsStore.GetBillsAction();
  }, [billsStore]);
  const [currentBill, setCurrentBill] = useState<IBill>(billsStore.bills[0]);

  const handleClick = (bill: IBill, action: string) => {
    setCurrentBill(bill);
    switch (action) {
      case "update":
        updateBillModalStore.openModal(<UpdateBill bill={bill} />);
        break;
      case "delete":
        deleteBillModalStore.openModal(<DeleteBill bill={bill} />);
        break;
      default:
        break;
    }
  };
  return (
    <SComponents.Body>
      {billsStore.bills.map((bill) => {
        return (
          <SComponents.Item key={bill._id}>
            <SComponents.ItemInfo>
              <SComponents.ItemConst>
                <S.Name>{localization.bills.name + ": "}</S.Name>
                <S.Description>
                  {localization.bills.description + ": "}
                </S.Description>
                <S.Value>{localization.bills.value + ": "}</S.Value>
              </SComponents.ItemConst>
              <SComponents.ItemValue>
                <S.Name>{bill.name}</S.Name>
                <S.Description>{bill.description}</S.Description>
                <S.Value>{bill.value}</S.Value>
              </SComponents.ItemValue>
            </SComponents.ItemInfo>
            <SComponents.Control>
              <SComponents.Button onClick={() => handleClick(bill, "update")}>
                {localization.update}
              </SComponents.Button>
              <SComponents.Button onClick={() => handleClick(bill, "delete")}>
                {localization.delete}
              </SComponents.Button>
            </SComponents.Control>
            <DeleteBill bill={currentBill} />
            <UpdateBill bill={currentBill} />
          </SComponents.Item>
        );
      })}
    </SComponents.Body>
  );
});
