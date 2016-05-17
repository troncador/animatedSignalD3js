(function() {
  'use strict';
  var SVGFrame,
      Graph
      ;

  SVGFrame = function(d3svgContainer, margin, widthContainer, heightContainer) {
    this.__d3svgContainer = d3svgContainer;
    this.__margin = margin;
    this.__widthContainer = widthContainer;
    this.__heightContainer = heightContainer;
    this.__createAxisX();
    this.__createAxisY();

    this.__createLineGrid(8, false);
    this.__createLineGrid(10, true);
    this.__createLineGrid(4, false);

    this.__createLineGrid2(50, true, 50, 5);
  };

  SVGFrame.prototype = {
    __createLineGrid: function(intNumberDivision, isHeight) {
      if (intNumberDivision !== 0) {
        var size = (isHeight) ? this.__heightContainer : this.__widthContainer,
            start = this.__margin,
            end = this.__heightContainer - this.__margin,
            step  = (size - this.__margin * 2) * 1.0 / intNumberDivision,
            stop = end + 1,
            fun  = function(d) { return d; },
            data = d3.range(start, stop, step)
            ;

        this.__d3svgContainer
          .selectAll('gride').data(data)
          .enter()
          .append('line')
          .attr('class', 'gride')
          .attr('x1', isHeight ? fun : start)
          .attr('y1', isHeight ? start : fun)
          .attr('x2', isHeight ? fun : end)
          .attr('y2', isHeight ? end : fun)
          ;

      }
    },
    __createLineGrid2: function(intNumberDivision, isHeight, level, t) {
      if (intNumberDivision !== 0) {
        var size = (isHeight) ? this.__heightContainer : this.__widthContainer,
            start = this.__margin,
            end = this.__heightContainer - this.__margin,
            step  = (size - this.__margin * 2) * 1.0 / intNumberDivision,
            stop = end + 1,
            fun  = function(d) { return d; },
            data = d3.range(start, stop, step)
            ;

        this.__d3svgContainer
          .selectAll('gride').data(data)
          .enter()
          .append('line')
          .attr('class', 'gride')
          .attr('x1', isHeight ? fun : level - t)
          .attr('y1', isHeight ? level - t : fun)
          .attr('x2', isHeight ? fun : level + t)
          .attr('y2', isHeight ? level + t : fun)
          ;

      }
    },
    getAxisXScale: function() {
      return this.__axisXScale;
    },
    getAxisYScale: function() {
      return this.__axisYScale;
    },
    __modifyAxisY: function(floatTopDomain, floatBottomDomain) {
      this.__axisYScale.domain([floatTopDomain, floatBottomDomain]);
      this.__gy.call(this.__yaxis);
    },
    __modifyAxisX: function(lastTime) {
      this.__axisXScale.domain([lastTime - this.__timeRange, lastTime]);
      this.__gx.call(this.__xaxis);
    },
    __createAxisX: function() {
      this.__axisXScale = d3.scale.linear()
         .domain([0, this.__timeRange])
         .range([this.__margin, this.__widthContainer - this.__margin])
         ;
      // Draw
      this.__xaxis = d3.svg.axis()
        .scale(this.__axisXScale)
        .orient('bottom')
        .tickFormat(function(d) { return d != '0' ? d : ''; })
        .ticks(25)
        ;
      this.__gx = this.__d3svgContainer.append('g')
        .attr('class', 'x axis')
        .attr('transform', this.__t(0,this.__heightContainer / 2))
        ;
      this.__gx.call(this.__xaxis);
    },
    __t: function(x,y) {
      return 'translate(' + x + ',' + y + ')';
    },
    __createAxisY: function() {
      this.__axisYScale = d3.scale.linear()
         .domain([-100, 100])
         .range([this.__heightContainer - this.__margin, this.__margin]);
      this.__yaxis = d3.svg.axis()
         .scale(this.__axisYScale)
         .orient('right')
         .ticks(5)
         .tickFormat(function(d) { return d != '0' ? d : ''; })
         ;
      this.__gy = this.__d3svgContainer.append('g')
        .attr('class', 'y axis')
        .attr('transform', this.__t(this.__margin,0))
        ;
      this.__gy.call(this.__yaxis);
    }};

  Graph = function(svgSelector, numberPoint) {
    var axisXScale,
        axisYScale
        ;
    this.__margin = 20;
    this.__timeRange = 30;
    this.__currentTime = 30;

    this.d3svgContainer = d3.select(svgSelector);
    this.numberPoint = numberPoint;
    this.widthContainer = this.d3svgContainer.attr('width');
    this.heightContainer = this.d3svgContainer.attr('height');

    this.svgFrame = new SVGFrame(this.d3svgContainer, this.__margin,
    this.widthContainer, this.heightContainer);
    this.__data = new CircularArray(numberPoint);

    axisXScale = d3.scale.linear()
       .domain([0, numberPoint])
       .range([this.__margin, this.widthContainer - this.__margin])
       ;

    axisYScale = this.svgFrame.getAxisYScale();
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
