export const DEFAULT_ELATE = [
  "<tr><th>Averaging scheme</th><th>Bulk modulus</th><th>Young&apos;s modulus</th><th>Shear modulus</th><th>Poisson&apos;s ratio</th></tr>\n<tr><td>Voigt</td><td><em>K</em><sub>V</sub> =  </td><td><em>E</em><sub>V</sub> =   </td><td><em>G</em><sub>V</sub> =    </td><td><em>&#x3BD;</em><sub>V</sub> = </td></tr>\n<tr><td>Reuss</td><td><em>K</em><sub>R</sub> =  </td><td><em>E</em><sub>R</sub> =  </td><td><em>G</em><sub>R</sub> =  </td><td><em>&#x3BD;</em><sub>R</sub> = </td></tr>\n<tr><td>Hill</td><td><em>K</em><sub>H</sub> =   </td><td><em>E</em><sub>H</sub> =   </td><td><em>G</em><sub>H</sub> =   </td><td><em>&#x3BD;</em><sub>H</sub> = </td></tr>\n",
  "<tr>\n  <th>&#x3BB;<sub>1</sub></th>\n  <th>&#x3BB;<sub>2</sub></th>\n  <th>&#x3BB;<sub>3</sub></th>\n  <th>&#x3BB;<sub>4</sub></th>\n  <th>&#x3BB;<sub>5</sub></th>\n  <th>&#x3BB;<sub>6</sub></th>\n  </tr><tr>\n<td>      </td><td>      </td><td>      </td><td>      </td><td>      </td><td>     </td>\n</tr>",
  '\n            <tr><td></td><th colspan="2">Young&apos;s modulus</th><th colspan="2">Linear compressibility</th>\n            <th colspan="2">Shear modulus</th><th colspan="2">Poisson&apos;s ratio</th><th></th></tr>\n            <td></td><th><em>E</em><sub>min</sub></th><th><em>E</em><sub>max</sub></th>\n            <th>&#x3B2;<sub>min</sub></th><th>&#x3B2;<sub>max</sub></th><th><em>G</em><sub>min</sub></th><th><em>G</em><sub>max</sub></th>\n            <th>&#x3BD;<sub>min</sub></th><th>&#x3BD;<sub>max</sub></th><th></th>\n<tr><td>Value</td><td>  </td><td>    </td><td>    TPa<sup>&#x2013;1</sup></td><td>   <sup>&#x2013;1</sup></td><td>      </td><td>      </td><td></td><td></td><td>Value</td></tr>\n<tr><td>Anisotropy</td><td colspan="2">   </td><td colspan="2">  </td><td colspan="2">   </td><td colspan="2"> </td><td>Anisotropy</td></tr>\n<tr><td>Axis</td>\n<td><br><br></td>\n<td><br><br></td>\n<td><br><br></td>\n<td><br><br></td>\n<td><br><br></td>\n<td><br><br></td>\n<td><br><br></td>\n<td><br><br></td>\n<td>Axis</td></tr>\n<tr><td></td><td></td><td></td><td></td><td></td>\n<td><br><br></td>\n<td><br><br></td>\n<td><br><br></td>\n<td><br><br></td>\n<td>Second axis</td></tr>',
];
export const DEFAULT_ELASTICITY_EXTENDED = [0, 1, 2, 3, 4, 5].map(row =>
  [0, 1, 2, 3, 4, 5].map(cell => ({ value: 0, disabled: false }))
);
export const DEFAULT_ELASTICITY = [0, 1, 2, 3, 4, 5].map(row =>
  [0, 1, 2, 3, 4, 5].map(cell => 0)
);
export const SCHEMES = [
  "pairs",
  "Greys",
  "Greens",
  "Bluered",
  "Hot",
  "Picnic",
  "Portland",
  "Jet",
  "RdBu",
  "Blackbody",
  "Earth",
  "Electric",
  "YIOrRd",
  "YIGnBu",
];
