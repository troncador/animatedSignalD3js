(function() {
  'use strict';

  var Graph = function(d3svgContainer, margin, numberPoint) {
    var axisXScale,
        axisYScale
        ;
    this.__margin = margin;
    this.__timeRange = 30;
    this.__currentTime = 30;

    this.d3svgContainer = d3svgContainer;
    this.numberPoint = numberPoint;
    this.widthContainer = this.d3svgContainer.attr('width');
    this.heightContainer = this.d3svgContainer.attr('height');

    this.__data = new CircularArray(numberPoint);

    axisXScale = d3.scale.linear()
       .domain([0, numberPoint])
       .range([this.__margin, this.widthContainer - this.__margin])
       ;

    axisYScale = d3.scale.linear()
             .domain([-100, 100])
             .range([this.heightContainer - this.__margin, this.__margin]);
    this.__lineFunction = d3.svg.line()
      .x(function(value, index) { return axisXScale(index); })
      .y(function(value, index) { return axisYScale(value); })
      .interpolate('monotone')
      ;

    this.d3svgPath = this.d3svgContainer.append('path')
      .attr('d', this.__lineFunction(this.__data.get()))
      .attr('class', 'signal')
      .attr('transform', this.__t(0,0))
      ;
  };
  Graph.prototype = {
    step: function(y, dx) {
      this.__currentTime += dx;
      this.__data.insert(y);
      this.d3svgPath.attr('d', this.__lineFunction(this.__data.get()))
      ;
    },

    __t: function(x,y) {
      return 'translate(' + x + ',' + y + ')';
    }
  };

  /***
  ** necessary for the module
  **/
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = Graph;
    }
    exports.Graph = Graph;
  } else {
    this.Graph = Graph;
  }

  if (typeof define === 'function' && define.amd) {
    define('Graph', [], function() {
      return Graph;
    });
  }

}.call(this));
