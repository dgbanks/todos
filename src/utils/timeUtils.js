import moment from "moment";

const DAYS = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

function ordinalize(date) {
  if (date === 0) {
    return "last";
  } else if (date > 10 && date < 20) {
    return `${date}th`;
  } else if (date % 10 === 1) {
    return `${date}st`;
  } else if (date % 10 === 2) {
    return `${date}nd`;
  } else if (date % 10 === 3) {
    return `${date}rd`;
  } else {
    return `${date}th`;
  }
}

export const formatDate = date => (
  new Date(date).setHours(23, 59, 59, 999).valueOf()
);

export const displayDate = date => {
  if (moment().diff(moment(date), "days") === 0) {
    return "Today";
  } else if (Math.abs(moment().diff(moment(date), "days")) === 1) {
    return "Tomorrow";
  } else if (Math.abs(moment().diff(moment(date), "days")) < 7) {
    return moment(date).format("dddd");
  } else if (Math.abs(moment().diff(moment(date), "days")) < 14) {
    return `Next ${moment(date).format("dddd")}`;
  } else {
    return moment(date).format("MMMM Do");
  }
};

export const displaySchedule = ({ basis, days }) => {
  if (basis === "weekly") {
    if (days.length === 7) {
      return "Every day";
    } else {
      return `Every ${days.map(d => DAYS[d]).join(", ")}`;
    }
  } else {
    return `On the ${
      days.map(d => ordinalize(d)).join(", ")
    } of each month`;
  }
};
