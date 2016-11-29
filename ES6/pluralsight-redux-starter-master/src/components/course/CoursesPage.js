import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

import RangeChart from '../charts/RangeChartPage';
import Range from '../charts/RangePage';
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
        <RangeChart onChange={this.onTitleChange} data={this.props.courses.title} />
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
        <Range onChange={this.onTitleChange} data={this.props.courses.title} />
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
