import { observable, action, computed } from "mobx";
import moment from "moment";
import dataStore from "./dataStore";

class UIStore {
  @observable activeItem = ""
  @observable filter = false
  @observable range = 7

  @computed get filteredTasks() {
    return dataStore.data.filter(t => !(this.filter && t.complete))
  }
}

export default new UIStore();
