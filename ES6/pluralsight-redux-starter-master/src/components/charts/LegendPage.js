import React, {PropTypes} from 'react';
import {Legend} from 'react-d3-core';

const LegendChart = (props) => {

  let width = 500,
    height = 400,
    margins = {top: 40, right: 50, bottom: 40, left: 50},
    legendClassName = "test-legend-class",
    legendPosition = 'left',
    legendOffset = 90,
    chartSeries = [
      {
        field: 'Medicare',
        name: 'Medicare',
        color: '#1ABC9C'
      },
      {
        field: 'Commercial',
        name: 'Commercial',
        color: '#1f77b4'
      },
      {
        field: 'AI4BackOffice',
        name: 'AI4BackOffice',
        color: '#FF1493'
      },
    ];

    return (
      <div>
          <Legend
            width= {width}
            height= {height}
            margins= {margins}
            legendClassName= {legendClassName}
            legendPosition= {legendPosition}
            legendOffset= {legendOffset}
            chartSeries = {chartSeries}
          />
      </div>
    );
};

export default LegendChart;
