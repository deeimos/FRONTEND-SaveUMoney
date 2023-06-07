import React, { useMemo } from "react";
import { IActionDtString } from "../../../const/types";
import { SModal } from "../styled";
import { S } from "./styled";
import { useStores } from "../../../StoresProvider";
import { observer } from "mobx-react-lite";

type DeleteExpenseProps = {
  expense: IActionDtString;
};
export const DeleteExpense = observer(({ expense }: DeleteExpenseProps) => {
  const { deleteExpenseModalStore, expensesStore } = useStores();

  const currentDate = useMemo(() => new Date(), []);

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("ru", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(currentDate)
        .toString(),
    [currentDate]
  );
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    deleteExpenseModalStore.closeModal();
  };

  const handleClick = async () => {
    expensesStore.DelExpenseAction(expense, { date: formattedDate });
    if (expensesStore.errorMsg) alert(expensesStore.errorMsg);
    deleteExpenseModalStore.closeModal();
  };

  return deleteExpenseModalStore.modal.isOpened ? (
    <SModal.Modal onClick={closeModal}>
      <SModal.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.Header>Delete expense</S.Header>
        <div>
          <p>Удалить выбранную запись о расходе?</p>
          <button onClick={handleClick}>Да</button>
          <button onClick={() => deleteExpenseModalStore.closeModal()}>
            Нет
          </button>
        </div>
      </SModal.ModalContent>
    </SModal.Modal>
  ) : null;
});

export default DeleteExpense;
