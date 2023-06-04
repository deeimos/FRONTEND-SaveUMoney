import { BillStore } from "./BillsStore";
import { ModalStore } from "./ModalStore";
import { UserStore } from "./UserStore";

export class RootStore {
  userStore: UserStore = new UserStore();
  addBillModalStore: ModalStore = new ModalStore();
  deleteBillModalStore: ModalStore = new ModalStore();
  updateBillModalStore: ModalStore = new ModalStore();
  billStore: BillStore = new BillStore();
}

export const rootStore: RootStore = new RootStore();