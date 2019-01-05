export const taskSchema = "(id, title, content, parentId, complete)";

export const parseUpdateTaskParams = params => {
  const result = Object.entries(params).map(entry => (
    `${entry[0]} = ${entry[0] === "complete" ? `${entry[1]}` : `"${entry[1]}"`}`
  )).join(", ");
  return result;
};

export const parseCreateTaskParams = params => {
  const result = `("${
    params.id // string
  }", "${
    params.title // string
  }", "${
    params.content // string
  }", "${
    params.parentId // string
  }", ${
    params.complete // boolean (integer)
  })`
  return result;
};
