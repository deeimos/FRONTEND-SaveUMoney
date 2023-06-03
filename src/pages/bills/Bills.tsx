import React from "react";
import { S } from "../styled";
import { BillList } from "../../components/bills/BillList";
import { AddBill } from "../../modals/bills/AddBill";
import { useStores } from "../../StoresProvider";
import { observer } from "mobx-react-lite";

export const Bills = observer(() => {
  const { modalStore } = useStores();

  const handleClick = () => {
    console.log(modalStore.modal.isOpened);
    modalStore.openModal(<AddBill />);
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
