import React from 'react';
import { connect } from 'react-redux';
import Plot from '../components/Plot';

const Comparator = ({ toCompare }) => {
  // let minX, maxX, minY, maxY, minZ, maxZ, minYoung, maxYoung, minCompress, maxCompress;
  let minYoung = toCompare.map(result => Math.min(...result.youngs));

  minYoung = Math.min(...minYoung);

  let maxYoung = toCompare.map(result => Math.max(...result.youngs));
  maxYoung = Math.max(...maxYoung);

  return (
    <div
      className='flex two'
    >
      {toCompare.map((result, index) =>
        <Plot
          key={`${index}-youngs`}
          points={result}
          redraw={true}
          propertyName={'youngs'}
          cmin={minYoung}
          cmax={maxYoung}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  toCompare: state
});

export default connect(mapStateToProps)(Comparator);
