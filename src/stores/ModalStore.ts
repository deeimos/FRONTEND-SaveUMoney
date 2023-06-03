import { makeAutoObservable } from 'mobx';

interface Modal {
  isOpened: boolean;
  body: JSX.Element | null;
}

export class ModalStore {
  modal: Modal = {
    isOpened: false,
    body: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (content: JSX.Element) => {
    this.modal.isOpened = true;
    this.modal.body = content;
  };

  closeModal = () => {
    this.modal.isOpened = false;
    this.modal.body = null;
  };
}
