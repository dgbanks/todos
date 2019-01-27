import { observable, action, computed } from "mobx";
import moment from "moment";
import Store from "./store";

class UIStore {
  @observable filter = false
  @observable range = 7

  @computed get filteredTasks() {
    return Store.data.filter(t => !(this.filter && t.complete))
  }
}

export default new UIStore();
