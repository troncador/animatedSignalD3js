(function(exports, window) {
'use strict';

var Data = function(intSize, rangeX, rangeY) {
  var defaultValue = 0,
      _this = this
      ;
  this.__rangeX = rangeX;
  this.__rangeY = rangeY;
  this.__data = new Array(intSize);

  _.each(_.range(intSize), function(value, number) {
    _this.insert(defaultValue);
  });
};

Data.prototype = {
  insert: function(intValue) {
    this.__data.pop();
    this.__data.unshift(intValue);
  },
  __constrainData: function(intValue) {
    var min = this.__rangeY.min,
        max = this.__rangeY.max
        ;
    if (intValue > max) {
      intValue = max;
    }
    if (intValue < min) {
      intValue = min;
    }
    return intValue;
  },
  get: function() {
    var min = this.__rangeX.min,
        max = this.__rangeX.max
        ;
    return _.map(this.__data.slice(min, max), this.__constrainData, this);
  },
  max: function() {
    return _.max(this.__data);
  },
  min: function() {
    return _.min(this.__data);
  },
  setRangeY: function(rangeY) {
    if (rangeY.max < rangeY.min) {
      throw new Error('range Y incorrect');
    }
    this.__rangeY = rangeY;
  },
  setRangeX: function(rangeX) {
    if (rangeX.max < rangeX.min ||
        rangeX.min < 0 ||
        rangeX.max > this.__data.length) {
      throw new Error('range X incorrect');
    }
    this.__rangeX = rangeX;
  }
};

if (window.Graph === undefined) {
  window.Graph = {};
}
window.Graph.Data = Data;

})(this, window);
