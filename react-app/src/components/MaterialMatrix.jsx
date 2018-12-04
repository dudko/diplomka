import React from 'react';

export default ({ material, removeHandler }) => (
    <table className="ui table">
        <thead>
            <tr>
                <th colSpan="6">
                    <button
                        className="ui mini red icon button"
                        onClick={() => removeHandler()}
                    >
                        <i className="close icon" />
                    </button>
                </th>
            </tr>
        </thead>
        <tbody>
            {material
                .get('matrix')
                .map((row, index) => (
                    <tr key={`mat-${index}`}>
                        {row.map((cell, index) => (
                            <td key={index}>
                                {Number(cell) % 1
                                    ? Number(cell).toFixed(3)
                                    : Number(cell)}
                            </td>
                        ))}
                    </tr>
                ))}
        </tbody>
    </table>)