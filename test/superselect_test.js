/**
 * superselect_test
 * Created by dcorns on 8/2/15.
 */
'use strict';
var should = require('chai').should();
var chai = require('chai');

describe('superSelect', function(){
  var comp;
  before(function(){
    comp = require('../dgComponents');
  });
  describe('Require Object Argument', function(){
    it('should throw an error if invoked without an object argument', function(){
      chai.expect(function(){comp.superSelect();}).to.throw('superSelect Requires an object argument');
    });
  });

});