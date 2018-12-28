import { decorate, observable, action, computed } from "mobx";
import SQLite from "react-native-sqlite-storage";

const TASK = "(id, title, content, parentId, complete)";

class Store {
  tasks = null;

  constructor(){
    this.getData();
  }

  getData() {
    SQLite.openDatabase({ name: "database", location: "Library"}, db => {
      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Tasks ${TASK}`,
          [],
          (_, res) => {
            // tx.executeSql(
            //   "INSERT INTO Tasks VALUES (?, ?, ?, ?, ?)",
            //   [1, "First Task", "CONTENT", null, false]
            // )
          }
        );

        tx.executeSql(
          "SELECT * FROM Tasks",
          [],
          (_, res) => {
            this.tasks = res.rows.raw();
          }
        )
      });
    });
  }

  createTask() {

  }

}

decorate(Store, {
  tasks: observable,
  getData: action,
  createTask: action
});

export default new Store();
