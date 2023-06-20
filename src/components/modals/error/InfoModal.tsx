import React from "react";
import { SModal } from "../styled";
import { useStores } from "../../../StoresProvider";
import { observer } from "mobx-react-lite";

type MessageProps = {
  message: string;
};
export const InfoModal = observer(({ message }: MessageProps) => {
  const { infoModalStore } = useStores();

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    infoModalStore.closeModal();
    console.log(infoModalStore.modal.isOpened);
  };

  return infoModalStore.modal.isOpened ? (
    <SModal.Modal onClick={closeModal}>
      <SModal.ModalContent onClick={(e) => e.stopPropagation()}>
        <SModal.HeaderInfoModal>{message}</SModal.HeaderInfoModal>
        <SModal.Button onClick={closeModal}>Ок</SModal.Button>
      </SModal.ModalContent>
    </SModal.Modal>
  ) : (
    <></>
  );
});

export default InfoModal;
