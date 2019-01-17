export const taskSchema = `(${[
  "id",
  "title",
  "content",
  "parentId",
  "complete",
  "completedAt",
  "dueDate"
].join(", ")})`;

export const parseUpdateTaskParams = params => {
  debugger
  const result = Object.entries(params).map(entry => (
    `${entry[0]} = ${
      [
        "complete",
        "completedAt",
        "dueDate"
      ].includes(entry[0]) ? `${entry[1]}` : `"${entry[1]}"`
    }`
  )).join(", ");
  return result;
};

export const parseCreateTaskParams = params => {
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
    params.dueDate && params.dueDate.valueOf() || null // utc datetime (integer)
  })`;
  return result;
};
