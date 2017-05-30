export const addToComposite = matrix => ({
  type: 'ADD_TO_COMPOSITE',
  matrix,
});

export const updateCompared = results => ({
  type: 'UPDATE_COMPARED',
  results,
});
