import React from 'react';
import {Legend} from 'react-d3-core';
import {Link} from 'react-router'
import DotChart from '../charts/DotChartPage';


class DashPage extends React.Component {
  constructor(props, context) {
      super(props, context);

  }


  render() {
    const width = 500,
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
      ];
    const dots = [
      {"Medicare":300000, "Commercial":10000},
      {"Medicare":20000, "Commercial":6000},
      {"Medicare":350000000, "Commercial":50000},
      {"Medicare":20000, "Commercial":600000}];

    return (
      <div>
          <div className="container-fluid">
          	<div className="row">
          		<div className="col-md-12">
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
          	</div>
          	<div className="row">
          		<div className="col-md-3">
                <DotChart data={dots[0]} title="Total members" />
          		</div>
          		<div className="col-md-3">
                <DotChart data={dots[1]} title="Total Charts Chased"/>
          		</div>
          		<div className="col-md-3">
                <DotChart data={dots[2]} title="Total Rev"/>
          		</div>
              <div className="col-md-3">
                <DotChart data={dots[3]} title="Total Cost Rev"/>
          		</div>
          	</div>
          </div>
          <div><a href="/courses" className="calc">calculate</a></div>
      </div>
    );
  }
}

export default DashPage;
