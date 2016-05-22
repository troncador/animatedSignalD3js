(function() {
  'use strict';

  var GraphGrid = function(d3svg, arrMargin) {
    this.__d3grid = d3svg.append('g')
      .attr('id', 'signalGrid');
    this.__intWidth = d3svg.attr('width');
    this.__intHeight = d3svg.attr('height');
    this.__arrMargin = arrMargin;

    this.__setDivisionGrid(10, 8);
    this.__drawLines(true);
    this.__drawLines(false);

    this.__setSubDivision(5, 5);

    this.__a(true, 4, 8);
    this.__a(false, 5, 8);

  };

  GraphGrid.prototype = {
    __a: function(isX, intLevel, intSize) {
      var scalePerpendicular = isX ?  this.__scaleY : this.__scaleX,
          scaleSub = isX ? this.__scaleSubX : this.__scaleSubY,
          min = scalePerpendicular(intLevel) - intSize / 2,
          max = scalePerpendicular(intLevel) + intSize / 2,
          r = isX ? this.__rx : this.__ry;

      this.__d3grid.selectAll('gride')
        .data(r())
        .enter()
        .append('line')
        .attr('class', 'gride')
        .attr('x1', isX ? scaleSub : min)
        .attr('x2', isX ? scaleSub : max)
        .attr('y1', isX ? min : scaleSub)
        .attr('y2', isX ? max : scaleSub)
        ;
    },
    __ff: function(intMax, intSubMax) {
      var f1 = _.bind(_.range, this, intMax * intSubMax),
          f2 = function(d) {
            return (d % intSubMax) !== 0;
          },
          f3 = _.partial(_.filter, _, f2),
          f4 = _.compose(f3, f1);

      return f4;
    },
    __setSubDivision: function(intSubMaxX, intSubMaxY) {
      var arrMargin = this.__arrMargin,
          intMaxX = this.__intMaxX,
          intMaxY = this.__intMaxY,
          intWidth = this.__intWidth,
          intHeight = this.__intHeight
      ;
      this.__ry = this.__ff(intMaxY, intSubMaxY);

      this.__rx = this.__ff(intMaxX, intSubMaxX);

      this.__scaleSubX = d3.scale.linear()
        .domain([0, intMaxX * intSubMaxX])
        .range([arrMargin[3], intWidth - arrMargin[1]]);

      this.__scaleSubY = d3.scale.linear()
        .domain([0, intMaxY * intSubMaxY])
        .range([arrMargin[0], intHeight - arrMargin[2]]);

    },
    __setDivisionGrid: function(intMaxX, intMaxY) {
      var arrMargin = this.__arrMargin,
          intHeight = this.__intHeight,
          intWidth  = this.__intWidth
      ;
      this.__intMaxX = intMaxX;
      this.__intMaxY = intMaxY;

      this.__scaleX = d3.scale.linear()
         .domain([0, intMaxX])
         .range([arrMargin[3], intWidth - arrMargin[1]]);
      this.__scaleY = d3.scale.linear()
         .domain([0, intMaxY])
         .range([arrMargin[0], intHeight - arrMargin[2]]);
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
    //    __createAxisY: function() {
    //      this.__axisscaleY = d3.scale.linear()
    //         .domain([-100, 100])
    //         .range([this.__intHeight - this.__intMargin, this.__intMargin]);
    //      this.__yaxis = d3.svg.axis()
    //         .scale(this.__axisscaleY)
    //         .orient('right')
    //         .ticks(5)
    //         .tickFormat(function(d) { return d != '0' ? d : ''; })
    //         ;
    //      this.__gy = this.__d3grid.append('g')
    //        .attr('class', 'y axis')
    //        .attr('transform', this.__t(this.__intMargin,0))
    //        ;
    //      this.__gy.call(this.__yaxis);
    //    }
  };

  this.GraphGrid = GraphGrid;

}.call(this));
