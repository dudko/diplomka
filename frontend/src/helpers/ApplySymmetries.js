export const diagonalSymmetry = (matrix) => {
  let row = 0;
  while (row < 6) {
    let cell = row + 1;
    while (cell < 6) {
      matrix[cell][row].value = matrix[row][cell].value;
      cell += 1;
    }
    row += 1;
  }

  return matrix;
}

[
  [0, 3], [0, 4], [0, 5],
  [1, 3], [1, 4], [1, 5],
  [2, 3], [2, 4], [2, 5],
  [3, 4], [3, 5],
  [4, 5]
 ].forEach(([row, cell]) => {
   newMaterial.constants[row][cell].disabled = true;
   newMaterial.constants[row][cell].value = '0';
 });