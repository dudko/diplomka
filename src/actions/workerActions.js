export const add1Action = n => ({
  type: "ADD_1",
  meta: {
    WebWorker: true // This line specifies that the worker should show up and do the job
  },
  payload: {
    num: n
  }
});
