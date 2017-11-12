import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import zCoordinateSystem from "../assets/z-coordinateSystem.png";
import figure2 from "../assets/figure2.png";

const Cij = `
C_{ij} =
\\begin{pmatrix}
C_{11} & C_{12} & C_{13} & C_{14} & C_{15} & C_{16} \\\\
C_{21} & C_{22} & C_{23} & C_{24} & C_{25} & C_{26} \\\\
C_{31} & C_{32} & C_{33} & C_{34} & C_{35} & C_{36} \\\\
C_{41} & C_{42} & C_{43} & C_{44} & C_{45} & C_{46} \\\\
C_{51} & C_{52} & C_{53} & C_{54} & C_{55} & C_{56} \\\\
C_{61} & C_{62} & C_{63} & C_{64} & C_{65} & C_{66}
\\end{pmatrix}
`;

const Pij = `
P_{ij} =
\\begin{pmatrix}
1 & 0 & 0 & 0 & 0 & 0 \\\\
0 & 1 & 0 & 0 & 0 & 0 \\\\
C_{31} & C_{32} & C_{33} & C_{34} & C_{35} & C_{36} \\\\
C_{41} & C_{42} & C_{43} & C_{44} & C_{45} & C_{46} \\\\
C_{51} & C_{52} & C_{53} & C_{54} & C_{55} & C_{56} \\\\
0 & 0 & 0 & 0 & 0 & 1
\\end{pmatrix}
`;

export default () => (
  <div className="ui text container">
    <h1 className="ui header">
      MELASA
      <div className="sub header">Multi-phase ELAStic Aggregates</div>
    </h1>
    <p>
      Our software tool MELASA computes <b>anisotropic elastic properties</b> of
      a specific type of layered composites consisting of{" "}
      <b>elastically anisotropic phases</b>. Below we will explain the method in
      the case of two different phases but MELASA represents a generalization of
      the original method by Grimsditch and Nizzoli (as described in their
      paper:{" "}
      <a
        href="https://journals.aps.org/prb/abstract/10.1103/PhysRevB.33.5891"
        target="_blank"
      >
        Effective elastic-constants of superlattices of any symmetry. Physical
        Review B 33 (1986) 5891)
      </a>{" "}
      and <b>can handle more than two phases</b>. The derivation below expects
      that the composite is a stacking of two (or more) phases, one on top of
      the other, along the <b>z-coordinate of a global coordinate system:</b>
    </p>
    <div className="ui">
      <img
        className="ui centered big image"
        src={zCoordinateSystem}
        alt="z-coordinate of a global coordinate system"
      />
    </div>
    <div className="ui" />
    <p>
      The phases are infinite within the <InlineMath math="(x,y)" /> plane and{" "}
      <b>
        within the interface <InlineMath math="(x,y)" /> plane the strains are
        bound to be equal in both phases
      </b>. The original method was derived by Grimsditch and Nizzoli for
      so-called superlattices - systems where atomic planes of one material
      coherently continue from one phase through the interface to the other (see
      red and blue circles representing atoms in the figure above).
    </p>
    <p>
      Each phase is described by a 6x6 matrix of elastic constants{" "}
      <InlineMath math="C_{ij}" />:
    </p>
    <BlockMath math={Cij} />
    <p>
      as a 2-dimensional representation of a 4-dimensional tensor of elastic
      constants <InlineMath math="C_{ijkl}" />.
    </p>
    <h4>
      MELASA computes a 6x6 matrix of elastic constants of the whole composite.
    </h4>
    <p>
      Each phase has a molar fraction <InlineMath math="f" /> from the interval{" "}
      <InlineMath math="[0, 1]" /> and the sum of molar fractions of all phases
      is equal to 1. For the two-phase case we have{" "}
      <InlineMath math="f_{1} + f_{2} = 1" />. The calculation of the overall
      anisotropic elasticity of the composite proceeds as follows. The
      elasticity of both phases 1 and 2 are described by matrices{" "}
      <InlineMath math="C_{ij}^1" /> and <InlineMath math="C_{ij}^2" /> of their
      elastic constants in the form as mentioned above. For each phase, the
      following matrix <InlineMath math="P" /> is derived from the original
      matrix of elastic constants <InlineMath math="C_{ij}" />:
    </p>
    <BlockMath math={Pij} />
    <p>
      Having these matrices for both phases, <InlineMath math="P_{ij}^1" /> and
      <InlineMath math="P_{ij}^2" /> (derived from their matrices{" "}
      <InlineMath math="C_{ij}^1" /> and <InlineMath math="C_{ij}^2" /> ,
      respectively), a matrix <InlineMath math="M" /> is computed as the product
      of the inverse of matrix <InlineMath math="P_{ij}^1" /> and the matrix{" "}
      <InlineMath math="P_{ij}^2" />:{" "}
    </p>
    <BlockMath math="M = ((P_{ij}^1)^{-1})P^2_{ij}" />
    <p>
      The matrix of elastic constants <InlineMath math="C_{ij}^{12}" /> of the
      whole composites is:
    </p>
    <BlockMath math="C_{ij}^{12} = (f_{1} C_{ij}^1 M + f_{2} C_{ij}^2)(f_{1} M + f_{2} I)^{-1}" />
    <p>
      Where the identity matrix <InlineMath math="I" /> appears in the second
      bracket. Importantly,{" "}
      <b>
        all matrices mentioned above must be in the same global coordinate
        system
      </b>{" "}
      (see it in black in the first figure). MELASA allows for describing the
      situation when the individual phases have their internal coordinate
      systems rotated (see the example below when the phase 1 is rotated):
    </p>
    <div className="ui">
      <img className="ui centered big image" src={figure2} alt="" />
    </div>
    <div className="ui" />
    <p>
      Considering the example in the figure immediately above, the input matrix
      of elastic constants of phase 1 must be transformed from the local rotated
      coordinate system of phase 1 into the global coordinate system. It is
      often so that the matrix of elastic constants is known only in the most{" "}
      <i>“natural”</i> coordinate system when the axes coincide with the main
      crystallographic directions (and the matrix is then particularly simple).
      MELASA computes the rotated matrix of elastic constants for the user
      considering two degrees of freedom defining the local rotated coordinate
      system. First, the user can specify the direction of z-axis of the local
      rotated system in the global coordinate system in the form of three Miller
      indices (in the global coordinate system) and can also additionally add an
      anti-clockwise rotation around the local z-axes. MELASA computes and
      displays the new matrix of elastic constants for the user and use it in
      the calculation steps summarized above.{" "}
    </p>
    <div className="ui" />
  </div>
);
