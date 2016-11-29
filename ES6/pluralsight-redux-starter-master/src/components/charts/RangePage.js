import React, {PropTypes} from 'react';
import rd3 from 'react-d3';
const BarChart = rd3.BarChart;
const barData = [
{
  "name": "Series A",
  "values": [
    { "x": 1, "y":  91},
    { "x": 2, "y": 290},
    { "x": 3, "y": -25},
  ]
},
{
  "name": "Series B",
  "values": [
    { "x": 1, "y":  9},
    { "x": 2, "y": 49},
    { "x": 3, "y": -20},
  ]
},
{
  "name": "Series C",
  "values": [
    { "x": 1, "y":  14},
    { "x": 2, "y": 77},
    { "x": 3, "y": -70},
  ]
}
];
const Range = (props) => {

    return (
      <div>
          <h1>Range Page</h1>
          <BarChart
            data={barData}
            width={500}
            height={300}
            title={"Bar Chart"}
            xAxisLabel="Value"
            yAxisLabel="Label"
          />
          <p>{props.data}</p>
          <button onClick={props.onTitleChange}>range page</button>
      </div>
    );
};

export default Range;
