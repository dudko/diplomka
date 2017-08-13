import React from "react";
import { BlockMath } from  "react-katex";

export default () =>
  <div className="ui text container">
    <h1 className="ui header">
      MELASA (Multi-phase ELAStic Aggregates)
      <div className="sub header">Sub Header</div>
    </h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit, veniam
      nostrum eveniet! Harum, laborum a eligendi! Sunt corporis beatae
      asperiores sapiente unde non, pariatur quo ratione, nostrum, cupiditate
      quos inventore.
      <BlockMath math='\sigma_{ij} = C_{ijkl} \epsilon_{kl}' />
    </p>
  </div>;
