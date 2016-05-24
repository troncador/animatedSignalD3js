(function(exports, window) {
  'use strict';

  var Graph = function(container, dimension, margin, refreshInterval) {
    var d3svg = container
            .classed('signalGraph', true)
            .classed('styleRetro', true)
            .append('div')
            .append('div')
            .append('svg')
            .attr('width', dimension.width)
            .attr('height', dimension.height),
        d3signal = d3svg.append('g')
            .attr('id', 'signal'),
        d3svgPath = d3signal.append('path')
            .attr('class', 'signal'),
        numberPoint = 270
        ;

    this.__margin = margin;
    this.__transformationRangeX = {base: 0, mult: 1};
    this.__transformationRangeY = {base: 0, mult: 1};
    this.__baseRangeX = {
      min: Math.round(numberPoint / 2 - 15),
      max: Math.round(numberPoint / 2 + 15)
    };

    this.__baseRangeY = {min:-4, max: 4};
    this.__refreshInterval = refreshInterval;
    this.__indexRefreshInterval = 0;

    this.__dimension = dimension;

    new Graph.Grid(d3svg, dimension, margin);
    this.__data = new Graph.Data(numberPoint, this.__baseRangeX,
      this.__baseRangeY);

    this.__d3svgPath = d3svgPath;
    this.changeYScale(this.__baseRangeY);
    this.changeXScale(this.__baseRangeX);
    this.updateLine();
  };
  Graph.prototype = {
    step: function(y, dx) {
      this.__indexRefreshInterval++;
      this.__data.insert(y);
      if (this.__indexRefreshInterval > this.__refreshInterval) {
        this.__indexRefreshInterval = 0;
        this.updateLine();
      }
    },
    changeVoltsByDiv: function(value) {
      var trans = this.__transformationRangeY,
          range;
      trans.mult = value;

      range = {
        min: this.__baseRangeY.min * trans.mult + trans.base * trans.mult,
        max: this.__baseRangeY.max * trans.mult + trans.base * trans.mult
      };

      this.changeYScale(range);
      this.__data.setRangeY(range);
    },
    changeVoltsOffset: function(value) {
      var trans = this.__transformationRangeY,
          range;
      trans.base = value;

      range = {
        min: this.__baseRangeY.min * trans.mult + trans.base * trans.mult,
        max: this.__baseRangeY.max * trans.mult + trans.base * trans.mult
      };

      this.changeYScale(range);
      this.__data.setRangeY(range);
    },
    changeTimeByDiv: function(value) {
      var trans = this.__transformationRangeX,
          middle = (this.__baseRangeX.max + this.__baseRangeX.min) / 2,
          width = this.__baseRangeX.max - this.__baseRangeX.min,
          range
          ;
      trans.mult = value;
      range = {
        min: middle - trans.mult / 2 * width + trans.base * width,
        max: middle + trans.mult / 2 * width + trans.base * width
      };

      this.changeXScale(range);
      this.__data.setRangeX(range);
    },
    changeTimeOffset: function(value) {
      var trans = this.__transformationRangeX,
          middle = (this.__baseRangeX.max + this.__baseRangeX.min) / 2,
          width = this.__baseRangeX.max - this.__baseRangeX.min,
          range
          ;
      trans.base = value;

      range = {
        min: middle - trans.mult / 2 * width + trans.base * width,
        max: middle + trans.mult / 2 * width + trans.base * width
      };

      this.changeXScale(range);
      this.__data.setRangeX(range);
    },
    updateLine: function() {
      var _this = this,
          interpolation = d3.svg.line()
            .x(function(value, index) { return _this.__axisXScale(index); })
            .y(function(value, index) { return _this.__axisYScale(value); })
            .interpolate('monotone'),
          data = this.__data.get()
          ;
      this.__d3svgPath.attr('d', interpolation(data));
    },
    changeYScale: function(domain) {
      var dimension = this.__dimension,
          margin = this.__margin
          ;
      this.__axisYScale = d3.scale.linear()
         .domain([domain.max, domain.min])
         .range([margin.top, dimension.height - margin.bottom])
         ;
    },
    changeXScale: function(domain) {
      var dimension = this.__dimension,
          margin = this.__margin
          ;
      this.__axisXScale = d3.scale.linear()
        .domain([0, domain.max - domain.min - 1])
        .range([margin.left, dimension.width - margin.right])
        ;
    }
  };

  window.Graph = Graph;

})(this, window);
