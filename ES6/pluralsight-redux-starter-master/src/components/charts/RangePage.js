import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
/*
* has grey color
*/
class RangeRow extends React.Component {
    constructor(props, context){
        super(props, context);

        this.state = {
          course: {incremental:"",capture:""}
        };

        this.drawGreyRange = this.drawGreyRange.bind(this);
        this.updateGreyRange = this.updateGreyRange.bind(this);
    }

    componentDidMount() {
        this.drawGreyRange(this.props.id, this.props.data);
    }

    componentDidUpdate() {
        this.updateGreyRange(this.props.id, this.props.data);
    }

    render(){
        return (
          <div>
              <h1 className="rangetitle">{this.props.title}</h1>
              <span id={this.props.id}></span>
              <span>{this.props.data}</span>
              <span className="noticeText">{this.props.subtitle}</span>
          </div>
        );
    }

    drawGreyRange(id, item){

      let _self = this;
      let d_node = document.getElementById(id);
      while(d_node.hasChildNodes()){
          d_node.removeChild(d_node.lastChild);
      }
      let margin ={"left":10, "top":10};
      let width =window.innerWidth;
      let height = window.innerHeight;
      let click = false;
      let clickX, clickY;
      let moveX=0, moveY=0;
      let lastMoveX=0, lastMoveY=0;

      let circleData = [
        { "cx": 20, "cy": 30, "radius": 20, "color" : "#fff" }];

      let rectangleData = [
        { "rx": 10, "ry": 20, "height": 20, "width": width-100, "color" : "#B2BABB" }];

      let svgContainer = d3.select("#"+id)
          .append("svg")
          .attr("width", width-500)
          .attr("height", 50);

      let rectangles = svgContainer.selectAll("rect")
        .data(rectangleData)
        .enter()
        .append("rect");

      let rectangleAttributes = rectangles
        .attr("x", function(d){ return d.rx; })
        .attr("y", function(d){ return d.ry; })
        .attr("height", function(d){ return d.height; })
        .attr("width", function(d){ return d.width; })
        .style("fill", function(d){ return d.color; });

      let circles = svgContainer.selectAll("circle")
          .data(circleData)
          .enter()
          .append("circle");

      let circleAttributes = circles.attr("cx", function(d){ return d.cx; })
          .attr("cy", function(d){ return d.cy; })
          .attr("r", function(d){ return d.radius; })
          .style("fill", function(d){ return d.color; })
          .style("stroke", "#B2BABB")
          .on("mousedown", function(){
              let evt = d3.event;
              evt.preventDefault(); // Needed for Firefox to allow dragging correctly
              click=true;
              clickX = evt.clientX;
              clickY = evt.clientY;
              evt.target.setAttribute("fill","green");
          })
          .on("mouseup", function(){
              let evt = d3.event;
              click=false;
              lastMoveX = moveX;
              lastMoveY = moveY;
              evt.target.setAttribute("fill","gray");
              let newState = {};
              if(_self.props.id=="range1"){
                newState.incremental=evt.clientX;
              }else{
                if(_self.props.id=="range2") newState.capture=evt.clientX;
              }
              _self.props.dispatch(courseActions.updateCourse(newState));
          })
          .on("mouseout", function(){
              let evt = d3.event;
              click=false;
              lastMoveX = moveX;
              lastMoveY = moveY;
              evt.target.setAttribute("fill","gray");
          })
          .on("mousemove", function(){
            let evt = d3.event;
            evt.preventDefault();
            if(click){
                moveX = lastMoveX + ( evt.clientX - clickX );
                moveY = lastMoveY;
                evt.target.setAttribute("transform", "translate(" + moveX + "," + moveY + ")");

            }
          });

    }

    updateGreyRange(id, item){
      let _self = this;
      if(typeof item === undefined){
        item = 20;
      }
      //redraw the chart
      let d_node = document.getElementById(id);
      while(d_node.hasChildNodes()){
          d_node.removeChild(d_node.lastChild);
      }

      let margin ={"left":10, "top":10};
      let width =window.innerWidth;
      let height = window.innerHeight;
      let click = false;
      let clickX, clickY;
      let moveX=0, moveY=0;
      let lastMoveX=0, lastMoveY=0;

      let circleData = [
        { "cx": item, "cy": 30, "radius": 20, "color" : "red" }];

      let rectangleData = [
        { "rx": 10, "ry": 20, "height": 20, "width": width-100, "color" : "#B2BABB" }];

      let svgContainer = d3.select("#"+id)
          .append("svg")
          .attr("width", width-500)
          .attr("height", 50);

      let rectangles = svgContainer.selectAll("rect")
        .data(rectangleData)
        .enter()
        .append("rect");

      let rectangleAttributes = rectangles
        .attr("x", function(d){ return d.rx; })
        .attr("y", function(d){ return d.ry; })
        .attr("height", function(d){ return d.height; })
        .attr("width", function(d){ return d.width; })
        .style("fill", function(d){ return d.color; });

      let circles = svgContainer.selectAll("circle")
          .data(circleData)
          .enter()
          .append("circle");

      let circleAttributes = circles.attr("cx", function(d){ return d.cx; })
          .attr("cy", function(d){ return d.cy; })
          .attr("r", function(d){ return d.radius; })
          .style("fill", "white")
          .style("stroke", "#B2BABB")
          .on("mousedown", function(){
              let evt = d3.event;
              evt.preventDefault(); // Needed for Firefox to allow dragging correctly
              click=true;
              clickX = evt.clientX;
              clickY = evt.clientY;
          })
          .on("mouseup", function(){
              let evt = d3.event;
              click=false;
              lastMoveX = moveX;
              lastMoveY = moveY;

              let newState = {};
              if(_self.props.id=="range1"){
                newState.incremental=evt.clientX;
              }else{
                if(_self.props.id=="range2") newState.capture=evt.clientX;
              }
              _self.props.dispatch(courseActions.updateCourse(newState));
          })
          .on("mouseout", function(){
              let evt = d3.event;
              click=false;
              lastMoveX = moveX;
              lastMoveY = moveY;
          })
          .on("mousemove", function(){
              let evt = d3.event;
              evt.preventDefault();
              //note: moving state cannot set store state
              if(click){
                  moveX = lastMoveX + ( evt.clientX - clickX );
                  moveY = lastMoveY;
                  evt.target.setAttribute("transform", "translate(" + moveX + "," + moveY + ")");
              }

          });
    }

}

function mapStateToProps(state, ownProps){
  return {
    courses:state.courses
  };
}
export default connect(mapStateToProps)(RangeRow);
