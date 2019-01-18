import { observable, action, computed } from "mobx";
import SQLite from "react-native-sqlite-storage";
import moment from "moment";
import uuid from "uuid";
import NavigationUtils from "./utils/navigationUtils";
import {
  taskSchema,
  parseUpdateTaskParams,
  parseCreateTaskParams
} from "./utils/taskUtils";

class Store {
  @observable database = {};
  @observable data = [];
  @observable fetching = true;
  @observable filter = false;
  @observable task = {};
  @observable schedule = null;
  @observable error = false;

  constructor(){
    SQLite.openDatabase({ name: "database", location: "Library"}, db => {
      // db.transaction(tx => tx.executeSql("DROP TABLE IF EXISTS Tasks"));
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
                const today = moment().startOf("day");
                this.data = res.rows.raw().filter(t => (
                  !t.complete || (t.complete && t.completedAt > today)
                ));
                this.fetching = false;
                // delete day old completed tasks
                res.rows.raw().filter(t => (
                  t.completedAt && t.completedAt < today
                )).each(t => {
                  _.executeSql(
                    "DELETE FROM Tasks WHERE id = ?",
                    [t.id],
                    (_, res) => {},
                    (_, err) => {debugger}
                  );
                });
              },
              (_, err) => {debugger}
            );
          },
          (_, err) => {debugger}
        );
      });
    });
  }

  @computed get tasks() {
    return this.data.slice()
    .filter(t => !(this.filter && t.complete))
    .sort((a,b) => a.title < b.title ? -1 : 1);
  }

  @action createTask = () => {
    if (this.task.title) {
      this.task.id = uuid();
      this.database.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Tasks VALUES ${parseCreateTaskParams(this.task)}`,
          [],
          (_, res) => {
            _.executeSql(
              "SELECT * FROM Tasks WHERE id = ?",
              [this.task.id],
              (_, res) => {
                this.data = this.data.concat(res.rows.raw());
                this.discardForm();
              },
              (_, err) => {debugger}
            )
          },
          (_, err) => {debugger}
        )
      })
    } else {
      this.error = true;
    }
  }

  @action updateTask(taskId, params) {
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
            },
            (_, err) => {debugger}
          );
        },
        (_, err) => {debugger}
      )
    })
  }

  @action deleteTask = taskId => {
    this.database.transaction(tx => {
      tx.executeSql(
        "DELETE FROM Tasks WHERE id = ?",
        [taskId],
        (_, res) => {this.data = this.data.filter(d => d.id !== taskId)},
        (_, err) => {debugger}
      )
    })
  }

  @action discardForm = () => {
    this.task = {};
    this.error = false;
    NavigationUtils.goBack();
  }
}

export default new Store();
