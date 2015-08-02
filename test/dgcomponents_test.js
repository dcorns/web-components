/**
 * dgcomponents_test.js
 * Created by dcorns on 8/1/15.
 */
'use strict';
var should = require('chai').should();
describe('webcomponents', function(){
  var obj;
  before(function(){
    obj = require('../dgComponents');
  });
  it('should export an object', function(){
    obj.should.be.a('object');
  });
  it('should have a superSelectProperty', function(){
    obj.hasOwnProperty('superSelect').should.be.true;
  });
});