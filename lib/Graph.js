(function() {
  'use strict';

  var Graph = function(container, arrSize, arrMargin, numberPoint) {
    var axisXScale,
        axisYScale,
        d3svg = container
            .attr('class', 'signalGraph')
            .append('div')
            .append('div')
            .append('svg')
            .attr('width', arrSize[0])
            .attr('height', arrSize[1])
        ;
    this.__currentTime = 0;
    this.__graphGrid = new GraphGrid(d3svg, arrMargin);

    this.__d3signal = d3svg.append('g')
      .attr('id', 'signal');

    this.__arrMargin = arrMargin;
    this.numberPoint = numberPoint;
    this.__intWidth  = d3svg.attr('width');
    this.__intHeight = d3svg.attr('height');
    this.__data = new CircularArray(numberPoint);

    this.__lineFunction = d3.svg.line()
      .x(function(value, index) { return this.__axisXScale(index); })
      .y(function(value, index) { return this.__axisYScale(value); })
      .interpolate('monotone')
      ;
    this.__createScale(numberPoint);
    this.d3svgPath = this.__d3signal.append('path')
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
    __createScale: function(numberPoint) {
      var intWidth = this.__intWidth,
          intHeight = this.__intHeight,
          arrMargin = this.__arrMargin
          ;
      this.__axisXScale = d3.scale.linear()
         .domain([0, numberPoint])
         .range([arrMargin[3], intWidth - arrMargin[1]])
         ;

      this.__axisYScale = d3.scale.linear()
         .domain([-4, 4])
         .range([arrMargin[0], intHeight - arrMargin[2]])
         ;
    },
    __t: function(x,y) {
      return 'translate(' + x + ',' + y + ')';
    }
  };

  this.Graph = Graph;

}.call(this));
