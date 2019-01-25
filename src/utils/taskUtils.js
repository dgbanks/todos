export const taskSchema = `(${[
  "id",
  "title",
  "content",
  "parentId",
  "complete",
  "completedAt",
  "dueDate",
  "schedule"
].join(", ")})`;

export const taskWithSchedule = task => {
  const array = task.schedule.split(",");
  debugger
  return Object.assign({}, task, {
    schedule: {
      [array[0]]: array[1],
      [array[2]]: array.slice(3).map(n => parseInt(n))
    }
  });
};

export const parseUpdateParams = params => {
  debugger
  const result = Object.entries(params).map(entry => (
    `${entry[0]} = ${
      [
        "complete",
        "completedAt",
        "dueDate"
      ].includes(entry[0]) ? `${entry[1]}` : `"${
        (entry[0] === "schedule" && entry[1]) ? Object.entries(entry[1]) : entry[1] || ""
      }"`
    }`
  )).join(", ");
  debugger;
  return result;
};

export const parseCreateParams = params => {
  debugger
  const result = `("${
    params.id // string
  }", "${
    params.title // string
  }", "${
    params.content || "" // string
  }", "${
    params.parentId || "" // string (default: "")
  }", ${
    params.complete || 0 // boolean (integer)
  }, ${
    params.completedAt || null // utc datetime (integer)
  }, ${
    params.dueDate ? params.dueDate.valueOf() : null // utc datetime (integer)
  }, "${
    params.schedule ? `${Object.entries(params.schedule)}` : ""
}")`;
  debugger
  return result;
};
