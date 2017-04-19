import React from 'react';
import { createScene } from 'gl-plot3d';
import createScatter3d from 'gl-scatter3d';

const scene = createScene();

const initParams = {
  gl: scene.gl,
  position: [ [1, 0, -1], [0, 1, -1], [0, 0, 1], [1,1,-1], [1,0,1], [0,1,1] ],
  color: [ [0,1,0], [0,0,1], [1,1,0], [1,0,1], [0,1,1], [0,0,0] ],
  size: 12,
  orthographic: true
}

const scatter = createScatter3d(initParams);
scene.add(scatter);