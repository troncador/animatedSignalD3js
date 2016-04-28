(function(){
"use strict";

var assert = require('chai').assert;
var CircularArray = require('../js/CircularArray.js');

describe('CircularArray', function() {
  describe('Constructor', function () {
    it('with 5 0s', function() {
      var c = new CircularArray(5),
          a = c.get()
        ;
      assert.deepEqual(a, [0,0,0,0,0]);
    });
    it('with 6 1s', function() {
      var c = new CircularArray(6,1);
      assert.deepEqual(c.get(), [1,1,1,1,1,1]);
    });
  });
  describe('SET', function () {
    it('SET 1 2 5 6', function() {
      var c = new CircularArray(5)
        ;
      c.insert(1);
      c.insert(2);
      c.insert(5);
      c.insert(6);
      assert.deepEqual(c.get(), [6,5,2,1,0]);
    });
  });
  describe('Max', function () {
    it('max 1 2 5 6 -2', function() {
      var c = new CircularArray(5)
        ;
      c.insert(1);
      c.insert(2);
      c.insert(5);
      assert.equal(c.max(),5);
      c.insert(6);
      assert.equal(c.max(),6);
      c.insert(-2);
      assert.equal(c.max(),6);
    });
  });
  describe('Min', function () {
    it('min 1 2 5 6 -2', function() {
      var c = new CircularArray(3)
        ;
        c.insert(1);
        c.insert(2);
        c.insert(5);
        assert.equal(c.min(),1);
        c.insert(6);
        assert.equal(c.min(),2);
        c.insert(-2);
        assert.equal(c.min(),-2);
    });
  });
  describe('String', function () {
    it('toString 1 2 5 6 -2', function() {
      var c = new CircularArray(5)
        ;
        c.insert(1);
        c.insert(2);
        c.insert(5);
        c.insert(6);
        c.insert(-2);
        assert.equal(c.toString(),'-2,6,5,2,1');
    });
  });
  describe('loop', function () {
    it('loop 1 2 5 6 -2', function() {
      var c = new CircularArray(5),
          a = [1,2,5,6,-2],
          count = 0
        ;
      for (var i in a) {
        c.insert(a[i]);
      }

      c.loop(function(val, i){
          assert.equal(val, a.pop());
          assert.equal(i, count++);
        }
      );
    });
  });
});
}.call(this));
