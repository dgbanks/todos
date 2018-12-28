import { decorate, observable, action, computed } from "mobx";
import SQLite from "react-native-sqlite-storage";

const TASK = "(id, title, content, parentId, complete)";
const parseUpdateParams = (params) => (
  Object.entries(params).map(entry => (
    `${entry[0]} = "${entry[1]}"`
  )).join(", ")
);

class Store {
  fetching = true;
  tasks = [];
  database = {};

  constructor(){
    this.getData();
  }

  getData() {
    SQLite.openDatabase({ name: "database", location: "Library"}, db => {
      this.database = db;
      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Tasks ${TASK}`,
          [],
          (_, res) => {}
        );

        tx.executeSql(
          "SELECT * FROM Tasks",
          [],
          (_, res) => {
            this.tasks = res.rows.raw();
            this.fetching = false;
          }
        )
      });
    });
  }

  createTask() {

  }

  updateTask(taskId, params) {
    debugger
    this.database.transaction(tx => {
      tx.executeSql(
        `UPDATE Tasks SET ${parseUpdateParams(params)} WHERE id = ${taskId}`,
        [],
        (_, res) => {
          debugger
        },
        (_, err) => {
          debugger
        }
      )
    })
  }

}

decorate(Store, {
  fetching: observable,
  tasks: observable,
  database: observable,
  getData: action,
  createTask: action,
  updateTask: action
});

export default new Store();
