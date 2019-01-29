import { observable, action, computed } from "mobx";
import moment from "moment";
import dataStore from "./dataStore";

class UIStore {
  @observable activeItem = null
  @observable filter = false
  @observable range = 7

  @computed get filteredTasks() {
    return dataStore.data.filter(t => !(this.filter && t.complete))
  }

  @action toggleFilter = () => {
    this.filter = !this.filter;
  }

  @action activateItem = node => {
    this.activeItem = node;
  }

  @action deactivateItem = () => {
    if (this.activeItem) {
      this.activeItem.snapTo({ index: 0 })
      this.activeItem = null
    }
  }
}

export default new UIStore();
