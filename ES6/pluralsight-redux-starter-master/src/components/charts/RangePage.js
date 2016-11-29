import React, {PropTypes} from 'react';
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

      let svgContainer = d3.select("body")
          .append("svg")
          .attr("width", 200)
          .attr("height", 200);

      let g = svgContainer.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      g.selectAll(".bar")
          .append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return 3; })
              .attr("width", function(d){ return width-margin.left; })
              .attr("height", function(d) { return 5; })
              .attr("fill", function(d){ return d.color; });

     let circle = svgContainer.append("circle")
        .attr("cx", 40)
        .attr("cy", 15)
        .attr("r", 5)
        .attr("fill", "red")
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
