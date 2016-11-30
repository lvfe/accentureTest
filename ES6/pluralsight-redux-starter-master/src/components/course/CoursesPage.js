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

      this.onTitleChange = this.onTitleChange.bind(this);
      this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChange(event) {
      const course = this.state.course;
      course.title = event.target.value;
      this.setState({course: course});
  }

  onClickSave() {
    this.props.dispatch(courseActions.createCourse(this.state.course));
  }

  courseRow(course, index) {
    return <div key={index}>{course.title}</div>;
  }

  render() {
    return (
      <div>
        <LegendChart />
        <h1>Course</h1>
        <input
          type="text"
          onChange={this.onTitleChange}
          value={this.props.courses.title}
        />

      <RangeChart onChange={this.onTitleChange} data={this.props.courses.title} title="# of codes found" id="rangechart1" subtitle="$20M" />
      <RangeChart onChange={this.onTitleChange} data={this.props.courses.title} title="cost/chart" id="rangechart2" subtitle="$10M" />
      <RangeChart onChange={this.onTitleChange} data={this.props.courses.title} title="processing time" id="rangechart3" subtitle="+2charts/h" />
      <RangeChart onChange={this.onTitleChange} data={this.props.courses.title} title="# of codes found" id="rangechart4" subtitle="$1M" />
      <RangeChart onChange={this.onTitleChange} data={this.props.courses.title} title="cost/chart" id="rangechart5" subtitle="$15M" />
      <RangeChart onChange={this.onTitleChange} data={this.props.courses.title} title="processing time" id="rangechart6" subtitle="4charts/h"/>

      <h2>Add Course</h2>
        <input
          type="text"
          onChange = {this.onTitleChange}
          value={this.state.course.title}
        />
        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave}/>
        <RangeRow onChange={this.onTitleChange} data={this.props.courses.title} title="INCREMETAL VALUE" id="range1" subtitle="$150M" />
        <RangeRow onChange={this.onTitleChange} data={this.props.courses.title} title="%CAPTURE" id="range2" subtitle="39%" />
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
