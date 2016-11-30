import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
/*
* has Multi color
*/

class RangeChart extends React.Component {
    constructor(props, context){
        super(props, context);
        this.drawColorRange = this.drawColorRange.bind(this);
        this.updateColorRange = this.updateColorRange.bind(this);
    }

    componentDidMount() {
         let parameter = this.props.data;
         let data =100*parameter/(window.innerWidth-500);

        this.drawColorRange(this.props.id, data);
    }
    componentDidUpdate() {
        let parameter = this.props.data;
        let data =100*parameter/(window.innerWidth-500);
        this.updateColorRange(this.props.id, data);
    }

    render(){
        return (
          <div>
              <h1 className="chartTitle">{this.props.title}</h1>
              <div id={this.props.id}></div>
              <p>{this.props.data}</p>
              <p className="chartSubtitle">{this.props.subtitle}</p>
          </div>
        );
    }
    drawColorRange(id, item){
        let _self = this;
        let dataset = [];
        let lineData = this.props.lineData;
        for(let key in lineData){
            switch(key){
              case "Commercial":
                dataset.push({"x":lineData[key], "y":5, "height":5, "color":"#1f77b4"});
                break;
              case "BackOffice":
                dataset.push({"x":lineData[key], "y":5, "height":5,  "color":"#FF1493"});
                break;
              case "Medicare":
                dataset.push({"x":lineData[key], "y":5, "height":5,  "color":"#1ABC9C"});
                break;
              default:
                break;
            }
        }
        dataset.push({});
        dataset[0].width = dataset[0].x;
        dataset[0].x = 0;
        dataset[2].width = 100-dataset[1].x;
        dataset[2].x = dataset[1].x;
        dataset[2].color = dataset[1].color;
        dataset[1].width = dataset[2].x-dataset[0].width;
        dataset[1].x = dataset[0].width;
        dataset[1].color = "#B2BABB";
        dataset[2].y = 5;
        dataset[2].height = 5;
        dataset.push({});dataset.push({});
        dataset[3]={"x":dataset[1].x,"y":2, "width":2, "height":10, "color":"#B2BABB"};
        dataset[4]={"x":dataset[2].x,"y":2, "width":2, "height":10, "color":"#B2BABB"};
        let margin = {"gap":10, "top":10, "left":10};
        let width=Math.floor(window.innerWidth/3-margin.gap);
        let click = false;
        let clickX, clickY;
        let moveX=0, moveY=0;
        let lastMoveX=0, lastMoveY=0;

        let svgContainer = d3.select("#"+id)
            .append("svg")
            .attr("width", width)
            .attr("height", 50);

        let g = svgContainer.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        g.selectAll(".bar")
            .data(dataset)
            .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; })
                .attr("width", function(d){ return d.width; })
                .attr("height", function(d) { return d.height; })
                .attr("fill", function(d){ return d.color; });

       let circle = svgContainer.append("circle")
          .attr("cx", 10)
          .attr("cy", 18)
          .attr("r", 8)
          .attr("fill", "white")
          .attr("stroke", "#B2BABB")
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
            let tmp =  evt.clientX;
            newState.incremental = tmp;
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
            	if(click){
            	    moveX = lastMoveX + ( evt.clientX - clickX );
            	    moveY = lastMoveY;
          	      evt.target.setAttribute("transform", "translate(" + moveX + "," + moveY + ")");
              }
          });
    }

    updateColorRange(id, item){
        let _self = this;
        if(typeof item === undefined){
          item = 20;
        }
        //redraw the chart
        let d_node = document.getElementById(id);
        while(d_node.hasChildNodes()){
            d_node.removeChild(d_node.lastChild);
        }

        let dataset = [];
        let lineData = this.props.lineData;
        for(let key in lineData){
            switch(key){
              case "Commercial":
                dataset.push({"x":lineData[key],"y":5, "height":5, "color":"#1f77b4"});
                break;
              case "BackOffice":
                dataset.push({"x":lineData[key],"y":5, "height":5, "color":"#FF1493"});
                break;
              case "Medicare":
                dataset.push({"x":lineData[key],"y":5, "height":5, "color":"#1ABC9C"});
                break;
              default:
                break;
            }
        }
        dataset.push({});
        dataset[0].width = dataset[0].x;
        dataset[0].x = 0;
        dataset[2].width = 100-dataset[1].x;
        dataset[2].x = dataset[1].x;
        dataset[2].color = dataset[1].color;
        dataset[1].width = dataset[2].x-dataset[0].width;
        dataset[1].x = dataset[0].width;
        dataset[1].color = "#B2BABB";
        dataset[2].y = 5;
        dataset[2].height = 5;
        dataset.push({});dataset.push({});
        dataset[3]={"x":dataset[1].x,"y":2, "width":2, "height":10, "color":"#B2BABB"};
        dataset[4]={"x":dataset[2].x,"y":2, "width":2, "height":10, "color":"#B2BABB"};
        let margin = {"gap":10, "top":10, "left":10};
        let width=Math.floor(window.innerWidth/3-margin.gap);
        let click = false;
        let clickX, clickY;
        let moveX=0, moveY=0;
        let lastMoveX=0, lastMoveY=0;

        let svgContainer = d3.select("#"+id)
            .append("svg")
            .attr("width", width)
            .attr("height", 50);

        let g = svgContainer.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        g.selectAll(".bar")
            .data(dataset)
            .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return d.x; })
                .attr("y", function(d) { return d.y; })
                .attr("width", function(d){ return d.width; })
                .attr("height", function(d) { return d.height; })
                .attr("fill", function(d){ return d.color; });

       let circle = svgContainer.append("circle")
         .attr("cx", item)
         .attr("cy", 18)
         .attr("r", 8)
          .attr("fill", "#fff")
          .attr("stroke", "#B2BABB")
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
              let tmp = evt.clientX;
              newState.incremental = tmp;
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
export default connect(mapStateToProps)(RangeChart);
