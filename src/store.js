import { decorate, observable, action, computed } from "mobx";
import SQLite from "react-native-sqlite-storage";
import {
  taskSchema,
  parseUpdateTaskParams,
  parseCreateTaskParams
} from "./utils/taskUtils";

class Store {
  database = {};
  fetching = true;
  data = [];

  constructor(){
    SQLite.openDatabase({ name: "database", location: "Library"}, db => {
      // db.transaction(tx => {
        //   tx.executeSql("DROP TABLE IF EXISTS Tasks")
        // });
      this.database = db;
      db.transaction(tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Tasks ${taskSchema}`,
          [],
          (_, res) => {
            _.executeSql(
              "SELECT * FROM Tasks",
              [],
              (_, res) => {
                this.data = res.rows.raw();
                this.fetching = false;
              }
            )
          }
        );
      });
    });
  }

  get tasks() {
    return this.data.slice().sort((a,b) => a.title < b.title ? -1 : 1);
  }

  createTask(params) {
    this.database.transaction(tx => {
      tx.executeSql(
        `INSERT INTO Tasks VALUES ${parseCreateTaskParams(params)}`,
        [],
        (_, res) => {
          _.executeSql(
            "SELECT * FROM Tasks WHERE id = ?",
            [params.id],
            (_, res) => {
              this.data = this.data.concat(res.rows.raw());
            },
            (_, err) => {
            }
          )
        },
        (_, err) => {
          debugger
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
              this.data = this.data.filter(t => t.id !== taskId).concat(res.rows.raw());
            }
          );
        },
        (_, err) => {
          debugger
        }
      )
    })
  }

  deleteTask(taskId) {
    this.database.transaction(tx => {
      tx.executeSql(
        "DELETE FROM Tasks WHERE id = ?",
        [taskId],
        (_, res) => {
          this.data = this.data.filter(d => d.id !== taskId);
        }
      )
    })
  }
}

decorate(Store, {
  fetching: observable,
  data: observable,
  tasks: computed,
  database: observable,
  createTask: action,
  updateTask: action,
  deleteTask: action,
});

export default new Store();
