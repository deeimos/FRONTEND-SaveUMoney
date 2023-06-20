import React from "react";
import { IActionDtString } from "../../../const/types";
import { SModal } from "../styled";
import { useStores } from "../../../StoresProvider";
import { observer } from "mobx-react-lite";

type DeleteIncomeProps = {
  income: IActionDtString;
  date: string;
};
export const DeleteIncome = observer(({ income, date }: DeleteIncomeProps) => {
  const { deleteIncomeModalStore, incomesStore } = useStores();

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    deleteIncomeModalStore.closeModal();
  };

  const handleClick = async () => {
    incomesStore.DelIncomeAction(income, { date: date });
    if (incomesStore.errorMsg) alert(incomesStore.errorMsg);
    deleteIncomeModalStore.closeModal();
  };

  return deleteIncomeModalStore.modal.isOpened ? (
    <SModal.Modal onClick={closeModal}>
      <SModal.ModalContent onClick={(e) => e.stopPropagation()}>
        <SModal.HeaderInfoModal>
          Удалить выбранную запись о доходе?
        </SModal.HeaderInfoModal>
        <SModal.ControlInfoModal>
          <SModal.Button onClick={handleClick}>Да</SModal.Button>
          <SModal.Button onClick={() => deleteIncomeModalStore.closeModal()}>
            Нет
          </SModal.Button>
        </SModal.ControlInfoModal>
      </SModal.ModalContent>
    </SModal.Modal>
  ) : null;
});

export default DeleteIncome;
