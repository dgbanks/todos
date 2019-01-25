import moment from "moment";

const DAYS = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

export const displayDate = date => (
  moment(date).format("MMMM Do, YYYY")
);

export const displayWeeklySchedule = days => (
  days.length === 7 ? "Every day" : `Every ${days.map(d => DAYS[d]).join(", ")}`
);

export const displayMonthlySchedule = dates => (
  "MONTHLY"
);

export const displaySchedule = ({ basis, days }) => {
  if (basis === "weekly") {
    if (days.length === 7) {
      return "Every day";
    } else {
      return `Every ${days.map(d => DAYS[d]).join(", ")}`;
    }
  } else {
    return "MONTHLY";
  }
};
