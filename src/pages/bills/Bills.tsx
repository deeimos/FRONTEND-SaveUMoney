import React from "react";
import { S } from "../styled";
import { BillList } from "../../components/bills/BillList";
import { AddBill } from "../../components/modals/bills/AddBill";
import { useStores } from "../../StoresProvider";
import { observer } from "mobx-react-lite";

export const Bills = observer(() => {
  const { addBillModalStore } = useStores();

  const handleClick = () => {
    addBillModalStore.openModal(<AddBill />);
  };
  return (
    <S.Content>
      <S.Header>Bills</S.Header>
      <S.Body>
        <BillList />
        <button onClick={handleClick}>Add</button>
        <AddBill />
      </S.Body>
    </S.Content>
  );
});
