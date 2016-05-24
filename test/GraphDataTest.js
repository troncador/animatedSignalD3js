(function(){
"use strict";

var assert =  chai.assert;

function insertArray(graphData, arrayData) {
  _.each(arrayData, function(i) {
    graphData.insert(i);
  });
}

describe('Graph Data', function() {
  describe('Constructor', function () {
    it('with 5 0s', function() {

      var graphData = new Graph.Data(5, {min:0, max:5}, {min:-4,max:4}),
          data = graphData.get()
          ;

      assert.deepEqual(data, [0,0,0,0,0]);
    });
  });
  describe('SET', function () {
    it('SET 1 2 5 6', function() {
      var graphData = new Graph.Data(5, {min:0, max:5}, {min:-4,max:4}),
          data = graphData.get()
          ;

      insertArray(graphData, [1, 2, 5, 6]);
      assert.deepEqual(graphData.get(), [4,4,2,1,0]);
    });
  });
  describe('SET', function () {
    it('SET -1 -2 -5 -6', function() {
      var graphData = new Graph.Data(5, {min:0, max:5}, {min:-4,max:4}),
          data = graphData.get()
          ;

      insertArray(graphData, [-1, -2, -5, -6]);
      assert.deepEqual(graphData.get(), [-4,-4,-2,-1,0]);
    });
  });
  describe('Max', function () {
    it('max 1 2 5 6 -2', function() {
      var graphData = new Graph.Data(5, {min:-4,max:4})
        ;
      insertArray(graphData, [1, 2, 5]);
      assert.equal(graphData.max(),5);
      graphData.insert(6);
      assert.equal(graphData.max(),6);
      graphData.insert(-2);
      assert.equal(graphData.max(),6);
    });
  });
  describe('Min', function () {
    it('min 1 2 5 6 -2', function() {
      var graphData = new Graph.Data(3, {min:0, max:3}, {min:-4,max:4})
        ;
        insertArray(graphData, [1, 2, 5]);
        assert.equal(graphData.min(),1);
        graphData.insert(6);
        assert.equal(graphData.min(),2);
        graphData.insert(-2);
        assert.equal(graphData.min(),-2);
    });
  });
  describe('setRangeY', function () {
    it('setRangeY 0:10 & -10:0', function() {
      var graphData = new Graph.Data(5, {min:0, max:5}, {min:-4, max:4})
        ;
        insertArray(graphData, [1, 2, 5, 6, -2]);
        graphData.setRangeY({min:0, max:10});
        assert.deepEqual(graphData.get(), [0, 6, 5, 2, 1]);
        graphData.setRangeY({min:-10, max:0});
        assert.deepEqual(graphData.get(), [-2, 0, 0, 0, 0]);
    });
  });
  describe('setRangeX', function () {
    it('setRangeY 0:10 & -10:0', function() {
      var graphData = new Graph.Data(5, {min:0, max:5}, {min:-4, max:4})
        ;
        insertArray(graphData, [1, 2, 5, 6, -2]);
        graphData.setRangeX({min:0, max:3});
        assert.deepEqual(graphData.get(), [-2, 4, 4]);
        graphData.setRangeX({min:3, max:5});
        assert.deepEqual(graphData.get(), [2, 1]);
    });
  });
});
}.call(this));
