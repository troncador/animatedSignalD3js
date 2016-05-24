(function(){
"use strict";

var assert =  chai.assert;

function createElement() {
  var container = d3.select('body')
          .append('div')
          .attr('id', 'container')
      ;

  return new Graph(container, {width:350, height:300},
          { top:20, right:20, bottom:20, left:20 }, 2);
}

function removeElement() {
  //d3.select('#container').remove()
}

describe('Graph', function() {
  describe('Constructor', function () {
    it('t1', function() {
      var graph = createElement();
      graph.step(2);
      graph.step(2);
      graph.step(2);
      graph.step(2);
      graph.step(2);
      removeElement();

    });
  });
});
}.call(this));
