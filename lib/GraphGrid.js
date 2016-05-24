(function(exports, window) {
  'use strict';

  var Grid = function(d3svg, dimension, margin) {
    this.__d3grid = d3svg.append('g')
      .attr('id', 'signalGrid');
    this.__intWidth = d3svg.attr('width');
    this.__intHeight = d3svg.attr('height');
    this.__margin = margin;
    this.__dimension = dimension;

    this.__setDivisionGrid(10, 8);
    this.__drawLines(true);
    this.__drawLines(false);

    this.__setSubDivision(5, 5);

    this.__drawSubLines(true, 4, 8);
    this.__drawSubLines(false, 5, 8);

  };

  Grid.prototype = {
    __drawSubLines: function(isX, intLevel, intSize) {
      var scalePerpendicular = isX ?  this.__scaleY : this.__scaleX,
          scaleSub = isX ? this.__scaleSubX : this.__scaleSubY,
          min = scalePerpendicular(intLevel) - intSize / 2,
          max = scalePerpendicular(intLevel) + intSize / 2,
          data = isX ? this.__dataSubX : this.__dataSubY;

      this.__d3grid.selectAll('gride')
        .data(data())
        .enter()
        .append('line')
        .attr('class', 'gride')
        .attr('x1', isX ? scaleSub : min)
        .attr('x2', isX ? scaleSub : max)
        .attr('y1', isX ? min : scaleSub)
        .attr('y2', isX ? max : scaleSub)
        ;
    },
    __constructSubData: function(intMax, intSubMax) {
      var range = _.bind(_.range, undefined, intMax * intSubMax),
          condition = function(d) {
            return (d % intSubMax) !== 0;
          },
          filter = _.partial(_.filter, _, condition)
          ;

      return _.compose(filter, range);
    },
    __setSubDivision: function(intSubMaxX, intSubMaxY) {
      var intMaxX = this.__intMaxX,
          intMaxY = this.__intMaxY,
          margin = this.__margin,
          dimension = this.__dimension
      ;
      this.__dataSubY = this.__constructSubData(intMaxY, intSubMaxY);

      this.__dataSubX = this.__constructSubData(intMaxX, intSubMaxX);

      this.__scaleSubX = d3.scale.linear()
        .domain([0, intMaxX * intSubMaxX])
        .range([margin.left, dimension.width - margin.right]);

      this.__scaleSubY = d3.scale.linear()
        .domain([0, intMaxY * intSubMaxY])
        .range([margin.top, dimension.height - margin.bottom]);

    },
    __setDivisionGrid: function(intMaxX, intMaxY) {
      var margin = this.__margin,
          dimension = this.__dimension
      ;
      this.__intMaxX = intMaxX;
      this.__intMaxY = intMaxY;

      this.__scaleX = d3.scale.linear()
         .domain([0, intMaxX])
         .range([margin.left, dimension.width - margin.right]);
      this.__scaleY = d3.scale.linear()
         .domain([0, intMaxY])
         .range([margin.top, dimension.height - margin.bottom]);
    },
    __drawLines: function(isX) {
      var scaleX = this.__scaleX,
          scaleY = this.__scaleY,
          intMaxX = this.__intMaxX,
          intMaxY = this.__intMaxY,
          intMax = isX ? intMaxY : intMaxX
      ;

      this.__d3grid.selectAll('gride')
        .data(d3.range(intMax + 1))
        .enter()
        .append('line')
        .attr('class', 'gride')
        .attr('x1', isX ? scaleX(0) : scaleX)
        .attr('y1', isX ? scaleY : scaleY(0))
        .attr('x2', isX ? scaleX(intMaxX) : scaleX)
        .attr('y2', isX ? scaleY : scaleY(intMaxY))
        ;
    }
  };

  if (window.Graph === undefined) {
    window.Graph = {};
  }
  window.Graph.Grid = Grid;

})(this, window);
