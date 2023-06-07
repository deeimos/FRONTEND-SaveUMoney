import React, { useContext } from "react";
import { Formik, FormikProps, Form, Field } from "formik";
import * as yup from "yup";

import { IAddBill, IBill } from "../../../const/types";
import { SModal } from "../styled";
import { S } from "./styled";
import { useStores } from "../../../StoresProvider";
import { observer } from "mobx-react-lite";

type DeleteBillProps = {
  bill: IBill;
};
export const DeleteBill = observer(({ bill }: DeleteBillProps) => {
  const { deleteBillModalStore, billsStore } = useStores();

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    deleteBillModalStore.closeModal();
  };

  const handleClick = async () => {
    billsStore.DelBillAction(bill);
    if (billsStore.errorMsg) alert(billsStore.errorMsg);
    deleteBillModalStore.closeModal();
  };

  return deleteBillModalStore.modal.isOpened ? (
    <SModal.Modal onClick={closeModal}>
      <SModal.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Header>Delete bill</S.Header>
        <div>
          <p>Удалить счет {bill.name}?</p>
          <button onClick={handleClick}>Да</button>
          <button onClick={() => deleteBillModalStore.closeModal()}>Нет</button>
        </div>
      </SModal.ModalContent>
    </SModal.Modal>
  ) : null;
});

export default DeleteBill;
