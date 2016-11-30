import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

import RangeChart from '../charts/RangeChartPage';
import RangeRow from '../charts/RangePage';
import LegendChart from '../charts/LegendPage';

class CoursesPage extends React.Component {
  constructor(props, context) {
      super(props, context);

      this.state = {
        course: {title:""}
      };

      this.onDataChange = this.onDataChange.bind(this);
      this.onCaptureChange = this.onCaptureChange.bind(this);
      this.onClickSave = this.onClickSave.bind(this);
  }

  onDataChange(event) {
      const course = this.state.course;
      course.incremental = event.target.value;
      this.setState({course: course});
  }
  onCaptureChange(event) {
      const course = this.state.course;
      course.capture = event.target.value;
      this.setState({course: course});
  }

  onClickSave() {
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  render() {
    const lines = [
      {"Medicare":40, "BackOffice":60},
      {"Medicare":20, "BackOffice":60},
      {"Medicare":40, "BackOffice":60},
      {"Commercial":20, "BackOffice":60},
      {"Commercial":40, "BackOffice":70},
      {"Commercial":20, "BackOffice":55}];
    return (
      <div>
          <LegendChart />
          <div className="container-fluid">
          	<div className="row">
          		<div className="col-md-4">
                <RangeChart onChange={this.onDataChange} data={this.props.courses.incremental} lineData={lines[0]} title="# of codes found" id="rangechart1" subtitle="$20M" />
          		</div>
          		<div className="col-md-4">
                <RangeChart onChange={this.onDataChange} data={this.props.courses.incremental} lineData={lines[1]} title="cost/chart" id="rangechart2" subtitle="$10M" />
          		</div>
          		<div className="col-md-4">
                <RangeChart onChange={this.onDataChange} data={this.props.courses.incremental} lineData={lines[2]} title="processing time" id="rangechart3" subtitle="+2charts/h" />
          		</div>
          	</div>

          	<div className="row">
          		<div className="col-md-4">
                <RangeChart onChange={this.onDataChange} data={this.props.courses.incremental} lineData={lines[3]} title="# of codes found" id="rangechart4" subtitle="$1M" />
          		</div>
          		<div className="col-md-4">
                <RangeChart onChange={this.onDataChange} data={this.props.courses.incremental} lineData={lines[4]} title="cost/chart" id="rangechart5" subtitle="$15M" />
          		</div>
          		<div className="col-md-4">
                <RangeChart onChange={this.onDataChange} data={this.props.courses.incremental} lineData={lines[5]} title="processing time" id="rangechart6" subtitle="4charts/h"/>
          		</div>
          	</div>

          	<div className="row">
          		<div className="col-md-12">
                <RangeRow onChange={this.onDataChange} data={this.props.courses.incremental} title="INCREMETAL VALUE" id="range1" subtitle="$150M" />
          		</div>
          	</div>

          	<div className="row">
          		<div className="col-md-12">
                <RangeRow onChange={this.onCaptureChange} data={this.props.courses.capture} title="%CAPTURE" id="range2" subtitle="39%" />
          		</div>
          	</div>
          </div>

          <h2>Set initial</h2>
          <input
            type="text"
            onChange = {this.onDataChange}
            value={this.state.course.incremental}
          />
          <input
            type="text"
            onChange = {this.onCaptureChange}
            value={this.state.course.capture}
          />
          <input
            type="submit"
            value="Save"
            onClick={this.onClickSave}/>
      </div>
    );
  }
}

CoursesPage.propType = {
  dispatch:PropTypes.func.isRequired,
  courses:PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps){
  return {
    courses:state.courses
  };
}

export default connect(mapStateToProps)(CoursesPage);
