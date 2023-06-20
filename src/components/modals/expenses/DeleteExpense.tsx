import React from "react";
import { IActionDtString } from "../../../const/types";
import { SModal } from "../styled";
import { useStores } from "../../../StoresProvider";
import { observer } from "mobx-react-lite";

type DeleteExpenseProps = {
  expense: IActionDtString;
  date: string;
};
export const DeleteExpense = observer(
  ({ expense, date }: DeleteExpenseProps) => {
    const { deleteExpenseModalStore, expensesStore } = useStores();

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      deleteExpenseModalStore.closeModal();
    };

    const handleClick = async () => {
      expensesStore.DelExpenseAction(expense, { date: date });
      if (expensesStore.errorMsg) alert(expensesStore.errorMsg);
      deleteExpenseModalStore.closeModal();
    };

    return deleteExpenseModalStore.modal.isOpened ? (
      <SModal.Modal onClick={closeModal}>
        <SModal.ModalContent onClick={(e) => e.stopPropagation()}>
          <SModal.HeaderInfoModal>
            Удалить выбранную запись о расходе?
          </SModal.HeaderInfoModal>
          <SModal.ControlInfoModal>
            <SModal.Button onClick={handleClick}>Да</SModal.Button>
            <SModal.Button onClick={() => deleteExpenseModalStore.closeModal()}>
              Нет
            </SModal.Button>
          </SModal.ControlInfoModal>
        </SModal.ModalContent>
      </SModal.Modal>
    ) : null;
  }
);

export default DeleteExpense;
