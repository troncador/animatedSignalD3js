(function() {
  'use strict';
  var SVGFrame = undefined,
      Graph = undefined
    ;

  SVGFrame = function(d3svgContainer, margin, widthContainer, heightContainer) {
    this.__d3svgContainer = d3svgContainer;
    this.__margin = margin;
    this.__widthContainer = widthContainer;
    this.__heightContainer = heightContainer;
    this.__createAxisX();
    this.__createAxisY();
  };

  SVGFrame.prototype = {
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
    var linear = undefined,
        axisYScale = undefined
        ;
    this.__margin = 6;
    this.__timeRange = 30;
    this.__currentTime = 30;

    this.d3svgContainer = d3.select(svgSelector);
    this.numberPoint = numberPoint;
    this.widthContainer = this.d3svgContainer.attr('width');
    this.heightContainer = this.d3svgContainer.attr('height');

    this.svgFrame = new SVGFrame(this.d3svgContainer, this.__margin,
    this.widthContainer, this.heightContainer);
    this.__data = new CircularArray(numberPoint);

    linear = d3.scale.linear()
       .domain([0, numberPoint])
       .range([this.__margin, this.widthContainer - this.__margin])
       ;

    axisYScale = this.svgFrame.getAxisYScale();
    this.__lineFunction = d3.svg.line()
      .x(function(value, index) { return linear(index); })
      .y(function(value, index) { return axisYScale(value); })
      .interpolate('monotone')
      ;

    this.d3svgPath = this.d3svgContainer.append('path')
      .attr('d', this.__lineFunction(this.__data.get()))
      .attr('stroke', 'blue')
      .attr('stroke-width', 1)
      .attr('fill', 'none')
      .attr('transform', this.__t(this.__margin,0))
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
