/**
 * app.js
 * Created by dcorns on 6/12/15.
 */
'use strict';
var comps = require('./dgComponents');
console.dir(comps);
var obj = {};
obj.datalist = []; obj.filterObjects = []; obj.displayItems = ['name', 'family', 'legs'];
obj.datalist.push({name:'salmon', family: 'fish', legs: 'none'});
obj.datalist.push({name:'collie', family: 'dog', legs: 'four'});
obj.datalist.push({name:'collie', family: 'dog', legs: 'four'});
obj.datalist.push({name:'collie', family: 'dog', legs: 'four'});
obj.datalist.push({name:'collie', family: 'dog', legs: 'four'});
obj.datalist.push({name:'collie', family: 'dog', legs: 'four'});
obj.datalist.push({name:'collie', family: 'dog', legs: 'four'});
obj.datalist.push({name:'collie', family: 'dog', legs: 'four'});
obj.datalist.push({name:'collie', family: 'dog', legs: 'four'});
obj.datalist.push({name:'collie', family: 'dog', legs: 'four'});
obj.datalist.push({name:'collie', family: 'dog', legs: 'four'});
comps.superSelect(obj);