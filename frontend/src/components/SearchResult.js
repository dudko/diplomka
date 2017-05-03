import React from 'react';
import { MATERIALS_PROJECT } from '../constants/URLs';

const SearchResult = ({material, setElasticity}) => (
  <article className='card'
    onClick={() =>
      setElasticity(material['elasticity.elastic_tensor'], material['spacegroup.crystal_system'])}
    style={{
      cursor: 'pointer'
    }}
  >
    <header>
      <h3>
        <a
          href={`${MATERIALS_PROJECT}/materials/${material.task_ids[0]}`}
          target='_blank'
        >
          {material.task_ids[0]}
        </a>
      </h3>
      <h3>{material.pretty_formula}</h3>
      <h3>{material['spacegroup.crystal_system']}</h3>
    </header>
    <footer>
      <table
        style={{
          tableLayout:'fixed',
          width:'100%'
        }}
        className='tooltip-top'
        data-tooltip='Use this result by clicking on it.'
      >
        <tbody>
          {material['elasticity.elastic_tensor'].map((row, index) =>
            <tr key={index}>
              {row.map((cell, index) =>
              <td key={index}>{cell}</td>)}
            </tr>
          )}
        </tbody>
      </table>          
    </footer>
  </article>
);

export default SearchResult;