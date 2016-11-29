import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
/*
* has grey color
*/
const RangeRow = (props) => {
  (function(){

      let margin ={"left":10, "top":10};
      let width =window.innerWidth;
      let height = window.innerHeight;
      let click = false;
      let clickX, clickY;
      let moveX=0, moveY=0;
      let lastMoveX=0, lastMoveY=0;

      let circleData = [
        { "cx": 20, "cy": 30, "radius": 20, "color" : "red" },
        { "cx": 20, "cy": 80, "radius": 20, "color" : "red" }];


      let rectangleData = [
        { "rx": 10, "ry": 20, "height": 20, "width": width-100, "color" : "grey" },
        { "rx": 10, "ry": 70, "height": 20, "width": width-100, "color" : "grey" }];


      let svgContainer = d3.select("body")
          .append("svg")
          .attr("width", 200)
          .attr("height", 200);

      let circles = svgContainer.selectAll("circle")
          .data(circleData)
          .enter()
          .append("circle");

      let circleAttributes = circles.attr("cx", function(d){ return d.cx; })
          .attr("cy", function(d){ return d.cy; })
          .attr("r", function(d){ return d.radius; })
          .style("fill", function(d){ return d.color; })
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

    })(window.d3);

    return (
      <div>
          <h1>Range Page</h1>
          <p>{props.data}</p>
          <button onClick={props.onTitleChange}>range row page</button>
      </div>
    );
};

export default RangeRow;
