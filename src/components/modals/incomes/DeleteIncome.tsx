import React from "react";
import { IActionDtString } from "../../../const/types";
import { SModal } from "../styled";
import { S } from "./styled";
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
        <S.Header>Delete bill</S.Header>
        <div>
          <p>Удалить выбранную запись о доходе?</p>
          <button onClick={handleClick}>Да</button>
          <button onClick={() => deleteIncomeModalStore.closeModal()}>
            Нет
          </button>
        </div>
      </SModal.ModalContent>
    </SModal.Modal>
  ) : null;
});

export default DeleteIncome;
