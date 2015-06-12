/**
 * app.js
 * Created by dcorns on 6/12/15.
 */
'use strict';
var comps = require('./dgComponents');
console.dir(comps);
var obj = {};
obj.datalist = []; obj.filterObjects = []; obj.displayItems = [];
obj.datalist.push({name:'salmon', family: 'fish'});
obj.datalist.push({name:'collie', family: 'dog'});
comps.superSelect(obj);