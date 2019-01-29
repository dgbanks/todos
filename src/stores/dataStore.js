import { observable, action, computed } from "mobx";
import SQLite from "react-native-sqlite-storage";
import moment from "moment";
import uuid from "uuid";
import NavigationUtils from "../utils/navigationUtils";
import uiStore from "./uiStore";
import Utils from "../utils/taskUtils";

class DataStore {
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
          `CREATE TABLE IF NOT EXISTS Tasks ${Utils.schema}`,
          [],
          (_, res) => {
            _.executeSql(
              "SELECT * FROM Tasks",
              [],
              (_, res) => {
                const today = moment().startOf("day");
                const data = res.rows.raw().reduce((object, task) => {
                  const { complete, completedAt } = task;
                  if (!complete || (complete && completedAt > today)) {
                    object.yes = [...object.yes, task];
                  } else if (completedAt && completedAt < today) {
                    object.no = [...object.no, task];
                  }
                  return object;
                }, { yes: [], no: [] });

                this.data = this.formatTasks(data.yes);
                this.fetching = false;
                data.no.each(task => { // delete day old completed tasks
                  _.executeSql(
                    "DELETE FROM Tasks WHERE id = ?",
                    [task.id],
                    (_, res) => {},
                    (_, err) => {debugger}
                  )
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
    return uiStore.filteredTasks.slice()
    .filter(t => !(this.filter && t.complete))
    .sort((a,b) => {
      if (a.dueDate === b.dueDate) {
        return a.title < b.title ? -1 : 1;
      } else {
        return a.dueDate < b.dueDate ? -1 : 1;
      }
    });
  }

  @action formatTasks(tasks) {
    return tasks.map(task => {
      const schedule = task.schedule ? Utils.parseSchedule(task.schedule) : "";
      if (schedule) {
        const occurences = [];
        for (var i = 0; i < 7; i++) {
          const date = new Date().setDate(new Date().getDate() + i);
          if (schedule.days.includes(new Date(date).getDay())) {
            occurences.push(new Date(date).setHours(23,59,59,999).valueOf());
          }
        }
        return occurences.map(occurence => (
          Object.assign({}, task, { schedule, occurence })
        ));
      } else {
        return Object.assign({}, task, { schedule });
      }
    }).flat();
  }

  @action fetchTask = id => {
    this.database.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM Tasks WHERE id = ?",
        [id],
        (_, { rows: { raw } }) => {
          this.data = this.data
          .filter(t => t.id !== id)
          .concat(this.formatTasks(raw()));
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
          `INSERT INTO Tasks VALUES ${Utils.createParams(this.task)}`,
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
    if (this.task.title) {
      this.database.transaction(tx => {
        tx.executeSql(
          `UPDATE Tasks SET ${Utils.updateParams(this.task)} WHERE id = ?`,
          [this.task.id],
          (_, res) => {this.fetchTask(this.task.id)},
          (_, err) => {debugger}
        )
      });
    } else {
      this.error = true;
    }
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

export default new DataStore();
