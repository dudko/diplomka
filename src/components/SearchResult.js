import React from 'react'

const SearchResult = ({ material, setMatrix }) => (
  <table
    className="ui aligned table tooltip-top handPointer"
    data-tooltip="Use this result by clicking on it."
    onClick={() => setMatrix(material.elasticity.elastic_tensor)}
  >
    <thead>
      <tr>
        <th colSpan="1">
          <a
            href={`https://www.materialsproject.org/materials/${
              material.task_ids[0]
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3>{material.pretty_formula}</h3>
          </a>
        </th>
        <th colSpan="1" />

        <th colSpan="2">
          <h3>{material.spacegroup.crystal_system}</h3>
        </th>

        <th colSpan="2" style={{ textAlign: 'right' }}>
          <button
            className="ui mini green button"
            onClick={() => setMatrix(material.elasticity.elastic_tensor)}
          >
            <i className="plus icon" /> Use
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      {material.elasticity.elastic_tensor.map((row, index) => (
        <tr key={index}>
          {row.map((cell, index) => <td key={index}>{cell}</td>)}
        </tr>
      ))}
    </tbody>
  </table>
)

export default SearchResult
