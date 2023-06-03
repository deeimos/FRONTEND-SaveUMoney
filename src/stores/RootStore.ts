import { UserStore } from "./UserStore";

export class RootStore {
  userStore: UserStore = new UserStore();
}

export const rootStore: RootStore = new RootStore();