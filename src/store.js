import { observable, action, computed } from "mobx";
import SQLite from "react-native-sqlite-storage";
import moment from "moment";
import uuid from "uuid";
import NavigationUtils from "./utils/navigationUtils";
import {
  taskSchema,
  taskWithSchedule,
  parseUpdateParams,
  parseCreateParams
} from "./utils/taskUtils";

class Store {
  @observable database = {};
  @observable data = [];
  @observable fetching = true;
  @observable filter = false;
  @observable task = {};
  @observable schedule = { basis: "weekly", days: [] };
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
      .sort((a,b) => a.title < b.title ? -1 : 1)
      .map(t => {
        debugger
        if (t.schedule && typeof t.schedule === "string") {
          debugger
          return taskWithSchedule(t)
        } else {
          return t
        }
        // t.schedule ? taskWithSchedule(t) : t
      });
  }

  @action fetchTask = id => {
    this.database.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM Tasks WHERE id = ?",
        [id],
        (_, { rows: { raw } }) => {
          this.data = this.data.filter(t => t.id !== id).concat(raw());
          this.discardTaskForm();
        },
        (_, err) => {debugger}
      )
    })
  }

  @action createTask = () => {
    if (this.task.title) {
      this.task.id = uuid();
      this.database.transaction(tx => {
        tx.executeSql(
          `INSERT INTO Tasks VALUES ${parseCreateParams(this.task)}`,
          [],
          (_, res) => {this.fetchTask(this.task.id)},
          (_, err) => {debugger}
        )
      });
    } else {
      this.error = true;
    }
  }

  @action toggleComplete = task => {
    this.task = Object.assign({}, task, {
      complete: task.complete ? 0 : 1,
      completedAt: !task.complete ? new Date().valueOf() : null
    });
    this.updateTask();
  }

  @action updateTask = () => {
    this.database.transaction(tx => {
      tx.executeSql(
        `UPDATE Tasks SET ${parseUpdateParams(this.task)} WHERE id = ?`,
        [this.task.id],
        (_, res) => {this.fetchTask(this.task.id)},
        (_, err) => {debugger}
      )
    });
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

  @action saveSchedule = () => {
    if (this.schedule.days.length) {
      this.task.schedule = this.schedule;
      this.task.dueDate = null;
    }
    this.discardScheduleForm()
  }

  @action discardTaskForm = () => {
    debugger
    this.task = {};
    this.error = false;
    NavigationUtils.goBack();
  }

  @action discardScheduleForm = () => {
    this.schedule = { basis: "weekly", days: [] };
    this.error = false;
    NavigationUtils.goBack();
  }
}

export default new Store();
