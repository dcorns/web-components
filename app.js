/**
 * app.js
 * Created by dcorns on 6/12/15.
 */
'use strict';
var comps = require('./dgComponents');
require('webcomponents.js');

var obj = {};

obj.dataset = [
  {title: 'HTML5 Outliner', description: 'Online tool', link: 'https://gsnedders.html5.org/outliner', appliesTo: [1]}
  , {title: 'HTML5 Game Development', description: 'Game Dev Resource', link: 'http://www.html5gamedevelopment.com/', appliesTo: [1]}
  , {title: 'Code School: Front-end Formations', description: 'Online Course', link: 'https://www.codeschool.com/courses/front-end-formations', appliesTo: [2]}

  , {title: 'Learn CSS Layout', description: 'Online tutorials', link: 'http://learnlayout.com', appliesTo: [2]}
  , {title: 'Sass Basics', description: 'Documentation', link: 'http://sass-lang.com/guide', appliesTo: [2]}
  , {title: 'Eloquent JavaScript', description: 'Online book w/ exercises', link: 'http://eloquentjavascript.net', appliesTo: [3, 5]}
  , {title: 'JS Tutorials - Scotch.io', description: 'Online JavaScript Tutorials', link: 'http://scotch.io/', appliesTo: [3]}
  , {title: 'Sorting Algorithm Animations', description: 'Visualize sorting algorithms', link: 'http://www.sorting-algorithms.com', appliesTo: [4]}
  , {title: 'BigO Cheet Sheet', description: 'Algorithm efficiency chart', link: 'http://bigocheatsheet.com/', appliesTo: [4]}
  , {title: ' Introduction to Object-Oriented JavaScript', description: 'Online Article', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript', appliesTo: [5]}
  , {title: 'Code Wars', description: 'Code challenge site', link: 'http://www.codewars.com/', appliesTo: [3, 4, 5]}
  , {title: 'Linux Command Line Cheat Sheet by DaveChild', description: 'Online Documentation', link: ' http://www.cheatography.com/davechild/cheat-sheets/linux-command-line/', appliesTo: [6]}
  , {title: 'Get Acquainted with Git', description: 'Video workshop', link: 'http://teamtreehouse.com/library/get-acquainted-with-git', appliesTo: [7]}
  , {title: '12 Free Books for Learning Theoretical Computer Science', description: 'Book List', link: ' http://codecondo.com/free-books-theoretical-computer-science/', appliesTo: [8]}
];
obj.filterObjects = [{appliesTo: 'appliesTo'}, {name: 'HTML', id: 1}, {name: 'CSS', id: 2}, {name: 'JavaScript', id: 3}, {name: 'Data & Algorithms', id: 4}, {name: 'OOP', id: 5}, {name: 'Terminal/Console', id: 6}, {name: 'GIT', id: 7}, {name: 'General', id: 8}];
obj.displayItems = [{prop: 'title'}, {prop: 'description', tag: 'label'}, {prop: 'link', tag: 'a'}];
comps.superSelect(obj);