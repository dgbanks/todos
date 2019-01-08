import moment from "moment";

export const displayDate = date => (
  moment(date).format("MMMM Do, YYYY")
);
