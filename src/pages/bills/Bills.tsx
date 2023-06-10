import React, { useState } from "react";
import { SPage } from "../styled";
import { BillList } from "../../components/bills/BillList";
import { AddBill, DeleteBill, UpdateBill } from "../../components/modals/index";
import { useStores } from "../../StoresProvider";
import { observer } from "mobx-react-lite";
import { localization } from "../../localization";
import { IBill } from "../../const/types";
import { S } from "./styled";


export const Bills = observer(() => {
  const { addBillModalStore, updateBillModalStore, deleteBillModalStore } =
    useStores();
  const [currentBill, setCurrentBill] = useState<IBill>({
    _id: "",
    name: "",
    value: 0,
    description: "",
  });

  const handleClick = () => {
    addBillModalStore.openModal(<AddBill />);
  };

  const onButtonClick = (income: IBill, action: string) => {
    setCurrentBill(income);
    switch (action) {
      case "update":
        updateBillModalStore.openModal(<UpdateBill bill={currentBill} />);
        break;
      case "delete":
        deleteBillModalStore.openModal(<DeleteBill bill={currentBill} />);
        break;
      default:
        break;
    }
  };

  return (
    <SPage.Content>
      <SPage.Header>
        <SPage.Title>{localization.bills.bills}</SPage.Title>
      </SPage.Header>
      <SPage.Body>
        <BillList onButtonClick={onButtonClick} />
      </SPage.Body>
      <S.Button onClick={handleClick}>{localization.add}</S.Button>
      <AddBill />
      <UpdateBill bill={currentBill} />
      <DeleteBill bill={currentBill} />
    </SPage.Content>
  );
});
