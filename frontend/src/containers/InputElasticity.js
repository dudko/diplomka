import React, { Component } from 'react';
// import InputConstant from '../components/InputConstant'
import _ from 'lodash';
import { DEFAULT_ELASTICITY_EXTENDED } from '../constants/defaults';

const COLORS = ['#ff9800', '#ffc107', '#ffeb3b', '#cddc39', '#8bc34a', '#4caf50', '#82390d'];

const diagonalSymmetry = (matrix) => {
  let row = 0;
  while (row < 6) {
    let cell = row + 1;
    while (cell < 6) {
      matrix[cell][row].value = matrix[row][cell].value;
      matrix[cell][row].disabled = true;
      cell += 1;
    }
    row += 1;
  }

  return matrix;
};

const removeDisabledAndColors = matrix => matrix.map(row =>
  row.map((cell) => {
    delete cell.color;
    cell.disabled = false;
    return cell;
  }));

const setZerosAndDisabled = (matrix, zeros) => {
  zeros.forEach((index) => {
    matrix[index[0]][index[1]].value = 0;
    matrix[index[0]][index[1]].disabled = true;
  });
  return matrix;
};

const setColors = (matrix, colorRules) => {
  colorRules.forEach((colorRule, colorIndex) =>
    colorRule.forEach(([row, col]) =>
      matrix[row][col].color = COLORS[colorIndex]),
  );
  return matrix;
};

const setC66Disabled = (matrix, disabled) => {
  disabled.forEach(index => matrix[index[0]][index[1]].disabled = true);
  return matrix;
};

const setC66 = (matrix, c66) => {
  const c66Value = 0.5 * (matrix[0][0].value - matrix[0][1].value);
  c66.forEach(index => matrix[index[0]][index[1]].value = c66Value);
  return matrix;
};

const applyOposite = (matrix, oposite, rowIndex, colIndex) => {
  oposite[`${rowIndex}${colIndex}`].forEach(index =>
    matrix[index[0]][index[1]].value = -matrix[index[0]][index[1]].value);
  return matrix;
};

const setOposite = (matrix) => {
  const sign1 = matrix[0][3].value && matrix[0][3].value >= 0 ? 1 : -1;
  const sign2 = matrix[1][3].value && matrix[1][3].value >= 0 ? 1 : -1;

  if (sign1 !== sign2) {
    matrix[1][3].value *= 1;
  }
  return matrix;
};

const applySymmetryPlanes = (matrix, symmetryPlanes, rowIndex, colIndex) => {
  symmetryPlanes[`${rowIndex}${colIndex}`].forEach(index =>
    matrix[index[0]][index[1]].value = matrix[rowIndex][colIndex].value);
  return matrix;
};

const rules = {
  triclinic: {
    diagonalSymmetry: true,
  },
  orthotropic: {
    zeros: [
      [0, 3], [0, 4], [0, 5],
      [1, 3], [1, 4], [1, 5],
      [2, 3], [2, 4], [2, 5],
      [3, 4], [3, 5],
      [4, 5],
    ],
    diagonalSymmetry: true,
  },
  trigonal: {
    zeros: [
      [0, 4], [0, 5],
      [1, 4], [1, 5],
      [2, 3], [2, 4], [2, 5],
      [3, 4], [3, 5],
    ],
    colors: [
      [[0, 0], [1, 1]],
      [[0, 1]],
      [[2, 2]],
      [[0, 2], [1, 2]],
      [[0, 3], [1, 3], [4, 5]],
      [[3, 3], [4, 4]],
      [[5, 5]],
    ],
    symmetryPlanes: {
      '00': [[1, 1]],
      '11': [[0, 0]],
      '02': [[1, 2]],
      '12': [[0, 2]],
      '03': [[1, 3], [4, 5]],
      '13': [[0, 3], [4, 5]],
      '45': [[0, 3], [1, 3]],
      '33': [[4, 4]],
      '44': [[3, 3]],
    },
    oposite: {
      '03': [[1, 3]],
      '13': [[0, 3], [4, 5]],
      '45': [[1, 3]],
    },
    c66: [
      [5, 5],
    ],
  },
  tetragonal: {
    zeros: [
      [0, 3], [0, 4], [0, 5],
      [1, 3], [1, 4], [1, 5],
      [2, 3], [2, 4], [2, 5],
      [3, 4], [3, 5],
      [4, 5],
    ],
    symmetryPlanes: {
      '00': [[1, 1]],
      '11': [[0, 0]],
      '02': [[1, 2]],
      '12': [[0, 2]],
      '33': [[4, 4]],
      '44': [[3, 3]],
    },
    colors: [
      [[0, 0], [1, 1]],
      [[0, 1]],
      [[2, 2]],
      [[0, 2], [1, 2]],
      [[3, 3], [4, 4]],
      [[5, 5]],
    ],
  },
  hexagonal: {
    zeros: [
      [0, 3], [0, 4], [0, 5],
      [1, 3], [1, 4], [1, 5],
      [2, 3], [2, 4], [2, 5],
      [3, 4], [3, 5],
      [4, 5],
    ],
    symmetryPlanes: {
      '00': [[1, 1]],
      '11': [[0, 0]],
      '02': [[1, 2]],
      '12': [[0, 2]],
      '33': [[4, 4]],
      '44': [[3, 3]],
    },
    colors: [
      [[0, 0], [1, 1]],
      [[0, 1]],
      [[2, 2]],
      [[0, 2], [1, 2]],
      [[3, 3], [4, 4]],
      [[5, 5]],
    ],
    c66: [
      [5, 5],
    ],
  },
  cubic: {
    zeros: [
      [0, 3], [0, 4], [0, 5],
      [1, 3], [1, 4], [1, 5],
      [2, 3], [2, 4], [2, 5],
      [3, 4], [3, 5],
      [4, 5],
    ],
    symmetryPlanes: {
      '00': [[1, 1], [2, 2]],
      '11': [[0, 0], [2, 2]],
      '22': [[0, 0], [1, 1]],
      '01': [[0, 2], [1, 2]],
      '02': [[0, 1], [1, 2]],
      '12': [[0, 1], [0, 2]],
      '33': [[4, 4], [5, 5]],
      '44': [[3, 3], [5, 5]],
      '55': [[3, 3], [4, 4]],
    },
    colors: [
      [[0, 0], [1, 1], [2, 2]],
      [[0, 1], [0, 2], [1, 2]],
      [[3, 3], [4, 4], [5, 5]],
    ],
  },
  isotropic: {
    zeros: [
      [0, 3], [0, 4], [0, 5],
      [1, 3], [1, 4], [1, 5],
      [2, 3], [2, 4], [2, 5],
      [3, 4], [3, 5],
      [4, 5],
    ],
    symmetryPlanes: {
      '00': [[1, 1], [2, 2]],
      '11': [[0, 0], [2, 2]],
      '22': [[0, 0], [1, 1]],
      '01': [[0, 2], [1, 2]],
      '02': [[0, 1], [1, 2]],
      '12': [[0, 1], [0, 2]],
      '33': [[4, 4], [5, 5]],
      '44': [[3, 3], [5, 5]],
      '55': [[3, 3], [4, 4]],
    },
    colors: [
      [[0, 0], [1, 1], [2, 2]],
      [[0, 1], [0, 2], [1, 2]],
      [[3, 3], [4, 4], [5, 5]],
    ],
    c66: [
      [3, 3], [4, 4], [5, 5],
    ],
  },
  monoclinic: {},
};

export default class InputElasticity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elasticity: DEFAULT_ELASTICITY_EXTENDED,
      crystalSystem: this.props.crystalSystem,
    };

    this.applyRules = this.applyRules.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let nextElasticity = _.cloneDeep(this.state.elasticity);
    nextElasticity = removeDisabledAndColors(nextElasticity);

    nextProps.elasticity.forEach((row, rowIndex) =>
      row.forEach((value, colIndex) => nextElasticity[rowIndex][colIndex].value = value));

    if (nextProps.crystalSystem !== 'any') {
      const { zeros, colors, c66, oposite } = rules[nextProps.crystalSystem];
      nextElasticity = zeros ? setZerosAndDisabled(nextElasticity, zeros) : nextElasticity;
      nextElasticity = colors ? setColors(nextElasticity, colors) : nextElasticity;
      nextElasticity = c66 ? setC66Disabled(nextElasticity, c66) : nextElasticity;
      nextElasticity = c66 ? setC66(nextElasticity, c66) : nextElasticity;
      nextElasticity = oposite ? setOposite(nextElasticity) : nextElasticity;
      nextElasticity = diagonalSymmetry(nextElasticity);
    }

    this.setState({
      elasticity: nextElasticity,
      crystalSystem: nextProps.crystalSystem,
    });
  }

  applyRules(value, rowIndex, colIndex) {
    const { elasticity, crystalSystem } = this.state;
    let nextElasticity = _.cloneDeep(elasticity);

    nextElasticity[rowIndex][colIndex].value = value;
    if (crystalSystem !== 'any' && rules[crystalSystem]) {
      const { symmetryPlanes, c66, oposite } = rules[crystalSystem];
      nextElasticity = (symmetryPlanes && symmetryPlanes[`${rowIndex}${colIndex}`]) ?
        applySymmetryPlanes(nextElasticity, symmetryPlanes, rowIndex, colIndex) : nextElasticity;
      nextElasticity = c66 ? setC66(nextElasticity, c66) : nextElasticity;
      nextElasticity = (oposite && oposite[`${rowIndex}${colIndex}`]) ? applyOposite(nextElasticity, oposite, rowIndex, colIndex) : nextElasticity;
      nextElasticity = diagonalSymmetry(nextElasticity);
    }

    this.setState({
      elasticity: nextElasticity,
    });
  }

  render() {
    const { elasticity, crystalSystem } = this.state;
    const crystalSystems = ['any', 'cubic', 'hexagonal', 'triclinic',
      'orthotropic', 'trigonal', 'tetragonal', 'isotropic', 'monoclinic'];

    return (
      <div>
        <h4>Select crystal symmetry:</h4>
        <select
          value={crystalSystem}
          onChange={e => this.props.setCrystalSystem(e.target.value)}
        >
          {crystalSystems.map(system =>
            <option
              key={system}
              value={system}
            >
              {system}
            </option>)}
        </select>

        <h4>Enter elastic constants (stiffness matrix):</h4>
        <div
          className="six"
        >
          {elasticity.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            <input
              key={`${rowIndex}${colIndex}`}
              value={cell.value}
              disabled={cell.disabled}
              onChange={e => this.applyRules(e.target.value, rowIndex, colIndex)}
              style={{
                textAlign: 'center',
                background: cell.color,
              }}
              onBlur={() => this.props.setElasticity(
                elasticity.map(row => row.map(cell => cell.value)))}
            />,
        ))}
        </div>
      </div>
    );
  }
}
