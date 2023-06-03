import { ModalStore } from "./ModalStore";
import { UserStore } from "./UserStore";

export class RootStore {
  userStore: UserStore = new UserStore();
  modalStore: ModalStore = new ModalStore();
}

export const rootStore: RootStore = new RootStore();