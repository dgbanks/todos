import { decorate, observable, action, computed } from "mobx";
import SQLite from "react-native-sqlite-storage";
import {
  taskSchema,
  parseUpdateTaskParams,
  parseCreateTaskParams
} from "./utils/taskUtils";

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
          `CREATE TABLE IF NOT EXISTS Tasks ${taskSchema}`,
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

  createTask(params) {
    this.database.transaction(tx => {
      tx.executeSql(
        `INSERT INTO Tasks VALUES ${parseCreateTaskParams(params)}`,
        [],
        (_, res) => {
          debugger
          // this.tasks.push()
        }
      )
    })
  }

  updateTask(taskId, params) {
    this.database.transaction(tx => {
      tx.executeSql(
        `UPDATE Tasks SET ${parseUpdateTaskParams(params)} WHERE id = ?`,
        [taskId],
        (_, res) => {
          _.executeSql(
            "SELECT * FROM Tasks WHERE id = ?",
            [taskId],
            (_, res) => {
              this.tasks = this.tasks.filter(t => t.id !== taskId).concat(res.rows.raw());
            }
          );
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
