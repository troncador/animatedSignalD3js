(function(){
"use strict";
// Establish the root object, `window` in the browser, or `exports` on the server.
// Strategy copied from underscore


function CircularArray(intSize, value){
  var defaultValue = (value) ? value : 0;
  this.__data = new Array(intSize);
  for ( i=0; i< this.__data.length; i++){
    this.__data[i] = defaultValue;
  }
  this.__maxValue = 0;
  this.__maxPosition = 0;
  this.__minValue = 0;
  this.__minPosition = 0;
};
CircularArray.prototype = {
  insert : function (intValue) {
    this.__data.pop();
    this.__data.unshift(intValue);

    // Min determine the min value
    if (intValue <= this.__minValue ) {
      this.__minPosition = 0;
      this.__minValue = intValue;
    } else {
      this.__minPosition++;
    }

    if (this.__minPosition >= this.__data.length) {
      this.__minPosition = 0;
      this.__minValue = this.__data[0];
      for(var i in this.__data){
        if(this.__data[i] < this.__minValue){
          this.__minPosition = i;
          this.__minValue = this.__data[i];
        }
      }
    }
    // MAX determine the max value
    if (intValue >= this.__maxValue ) {
      this.__maxPosition = 0;
      this.__maxValue = intValue;
    } else {
      this.__maxPosition++;
    }
    if (this.__maxPosition >= this.__data.length) {
      this.__maxPosition = 0;
      this.__maxValue = this.__data[0];

      for(var i in this.__data){
        if(this.__data[i] > this.__maxValue){
          this.__maxPosition = i;
          this.__maxValue = this.__data[i];
        }
      }
    }
  },
  get: function(){
    return this.__data;
  },
  max: function(){
    return this.__maxValue;
  },
  min: function(){
    return this.__minValue;
  },
  toString: function(){
    return this.__data.toString();
  },
  loop: function(fun){
    for(var i=0; i< this.__data.length; i++) {
      fun(this.__data[i], i);
    }
  }
};

/***
** necessary for the module
**/

var root = this;

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = CircularArray;
  }
  exports.CircularArray = CircularArray;
} else {
  root.CircularArray = CircularArray;
}

if (typeof define === 'function' && define.amd) {
  define('CircularArray', [], function() {
    return CircularArray;
  });
}
}.call(this));
