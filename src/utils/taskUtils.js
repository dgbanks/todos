export const taskSchema = "(id, title, content, parentId, complete)";

export const parseUpdateTaskParams = params => (
  Object.entries(params).map(entry => (
    `${entry[0]} = ${entry[0] === "complete" ? entry[1] : "${entry[1]}"}`
  )).join(", ")
);

export const parseCreateTaskParams = params => (
  `("${params.id}", "${params.title}", "${params.content}", "${params.parentId}", ${params.complete})`
);
