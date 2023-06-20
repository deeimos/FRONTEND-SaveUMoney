import React from "react";
import { IBill } from "../../../const/types";
import { SModal } from "../styled";
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
        <SModal.HeaderInfoModal>
          Удалить счет {bill.name}?
        </SModal.HeaderInfoModal>
        <SModal.ControlInfoModal>
          <SModal.Button onClick={handleClick}>Да</SModal.Button>
          <SModal.Button onClick={() => deleteBillModalStore.closeModal()}>
            Нет
          </SModal.Button>
        </SModal.ControlInfoModal>
      </SModal.ModalContent>
    </SModal.Modal>
  ) : null;
});

export default DeleteBill;
