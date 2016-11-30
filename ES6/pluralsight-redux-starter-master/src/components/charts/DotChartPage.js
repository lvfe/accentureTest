import React, {PropTypes} from 'react';

const DotChart = (props) => {

    return (

      <div>
          <p className="dashTitle">{props.title}</p>
          <svg height="150" width="200">
            <circle cx="50" cy="50" r={(props.data.Medicare>6000)?"30":"50"} stroke="#1ABC9C" stroke-width="3" fill="#1ABC9C" />
            <text x="100" y="50" fill="grey" >{props.data.Medicare}</text>
          </svg>
          <br />
          <svg height="150" width="200">
            <circle cx="50" cy="80" r={(props.data.Commercial>6000)?"10":"15"} stroke="#1f77b4" stroke-width="3" fill="#1f77b4" />
            <text x="100" y="80" fill="grey" >{props.data.Commercial}</text>
          </svg>

      </div>
    );
};

export default DotChart;
