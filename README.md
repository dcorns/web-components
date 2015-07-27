# web-components
A collection of custom web components. Chrome and Opra provide full support for web components. For all other browsers you will need to require webcomponents.js or another polyfill in your project until such time as they support it.
## How to use
The components are wrapped in a node module so you can use with node and a tool like browserify. Just require it like any other node module that is not installed via npm `var comps = require(./<path>/dgComponents);`
Then invoke the component that you want to use as a property of the object returned by require. Each component will have it's own particular instructions for usage, but at a minimum, you will need to invoke the component in javascript and place it's corresponding tag in your html file. 
## super-select
super-select is a super charged selection list element that provides the following enhancements:
Hover activated synchronized data displays. In line button to change auto complete modes: first letters, letters anywhere, no auto complete. An inline number input for adjusting the height of items window. And check box filters for limiting the list based on multiple selection criteria.
###How to use super-select
Each of the super-select features can be used alone or with the others so you can customize the features of your super-select element.
####Minimum usage:
It is not likely that you will want to use super-select in a minimum usage scenario since the result is just a selection list. However the configuration is included for completeness.
#####JavaScript:
super-select requires a single argument which is an object containing at least two properties of which each are an array of objects. The property names are passed in using data attributes in the html so they can be called whatever you desire, but they must be of the following forms:
`item-list` array must contain objects with at least one common key representing the values to be displayed in the main list. For example: `[{color:"red"}, {color:"green"}, {color: "blue"}]`
`display-items` array must contain an array with at least one object which gives the key to use from `item-list` for the main list in super-select. The key name must be `prop` and the value must be the property name to use as the key from `item-list` For example: `[{prop: 'color'}]`
So the JavaScript would look like this:
`var dgComponents = require("[path to dgComponents.js/]dgComponents");
var obj = {};
obj.mycolors = [{color:"red"}, {color:"green"}, {color: "blue"}];
obj.mycolorkey = [{prop: 'color'}];
dgComponents.superSelect(obj);`
html:
Register the property names of the arrays using `data-item-list` and `data-display-items` attributes as shown here:
`<super-select data-item-list="mycolorlist" data-display-items="mycolorkey"></super-select>`

The previous example will result in a super-select with a list of color names red, green, blue.

