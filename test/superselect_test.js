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

  describe('Throw Exception when argument is missing or invalid', function(){
    it('should throw an error if invoked without an object argument', function(){
      chai.expect(function(){comp.superSelect();}).to.throw('superSelect Requires an object argument');
    });
    it('should throw an error if the object argument has less than two object array properties', function(){
      chai.expect(function(){
        comp.superSelect({});}).to.throw('object argument requires two array properties');
      chai.expect(function(){
        comp.superSelect({prop:'1'});
      }).to.throw('object argument requires two array properties');
      chai.expect(function(){
        comp.superSelect({prop:'1', prop2:'2'});
      }).to.throw('object argument requires two array properties');
      chai.expect(function(){
        comp.superSelect({aryProp:[{prop: '1'}], prop2:'2'});
      }).to.throw('object argument requires two array properties');
      //chai.expect(function(){
      //  comp.superSelect({aryProp:[{prop: '1'}], aryProp2:[{prop2:'2'}]});
      //}).to.throw('object argument requires two array properties');
    });
  });

});