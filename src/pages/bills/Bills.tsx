import React from "react";
import { SPage } from "../styled";
import { BillList } from "../../components/bills/BillList";
import { AddBill } from "../../components/modals/index";
import { useStores } from "../../StoresProvider";
import { observer } from "mobx-react-lite";
import { localization } from "../../localization";

export const Bills = observer(() => {
  const { addBillModalStore } = useStores();

  const handleClick = () => {
    addBillModalStore.openModal(<AddBill />);
  };
  return (
    <SPage.Content>
      <SPage.Header>{localization.bills.bills}</SPage.Header>
      <SPage.Body>
        <BillList />
        <SPage.Button onClick={handleClick}>{localization.add}</SPage.Button>
        <AddBill />
      </SPage.Body>
    </SPage.Content>
  );
});
