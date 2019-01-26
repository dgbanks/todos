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

export const parseSchedule = schedule => {
  const array = schedule.split(",");
  return {
    [array[0]]: array[1],
    [array[2]]: array.slice(3).map(n => parseInt(n))
  };
};

export const parseUpdateParams = params => (
  Object.entries(params).map(entry => (
    `${entry[0]} = ${
      [
        "complete",
        "completedAt",
        "dueDate"
      ].includes(entry[0]) ? `${entry[1]}` : `"${
        (entry[0] === "schedule" && entry[1]) ?
        Object.entries(entry[1]) : entry[1]
      }"`
    }`
  )).join(", ")
);

export const parseCreateParams = params => `("${
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
