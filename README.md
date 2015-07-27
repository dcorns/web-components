# web-components
A collection of custom web components
## How to use
Currently the components are wrapped in a node module so you can use with node and a tool like browserify. Just require it like any other node module that is not installed via npm `var comps = require(./<path>/dgComponents);`
Then invoke the component that you want to use as a property of the object returned by require. Each component will have it's own particular instructions for usage, but at a minimum, you will need to invoke the component in javascript and place it's corresponding tag in your html file. 
There is only one component right now, but more will follow as I require them on various projects. Feel free to submit your own if you want to contribute.
## super-select (Still in development)
super-select is a super charge selection list element that provides the following enhancements:
Hover activated synchronized data displays. In line button to change auto complete modes: first letters or letters anywhere or no auto complete. An inline number input for adjusting the height of items window. And check box filters for limiting the list based on multiple selection criteria.
####How to use super-select
Each of the super-select features can be used alone or with the others so you can customize the features of your super-select element. All that is required in the html is the super-select opening and closing tags '<super-select></super-select>'

Your java script should require webcomponents.js and create and instance of dgComponents.
'require("webcomponents.js");
var dgComponents = require("<path to dgComponents file>/dgComponents");'

At a minimum super-select requires an object with a datalist property to be passed in when it is invoked. The datalist property value needs to be an array of objects. Each of the objects must have at least one common key representing the object data to display in the list.

The object is also required to have a displayItems property whos value must be another object array with at least one object that has a property called prop that has a value equal to the common key name to use from the datalist array. This key name is used to determine what the super-select list will contain. The following example shows the JavaScript for a basic super select.
'require("webcomponents.js");
var dgComponents = require("./dgComponents");
var obj = {};
obj.datalist = [{color: "green"}, {color: "blue"}, {color: "red"}];
obj.displayItems = [{prop: 'color'}];
dgcomponents.superSelect(obj);
'



Invoke the element passing it a single object of the following form: items, filters, titles `{datalist:[{dataobject}], filterObjects:[{name:value}], displayItems:[array of strings representing the property names of the properties that you want to display with the selection list. The first string indicates the property to be used in the selection list.]`
Place the super-select tag in the html with data attributes that match the object used in the invocation. In this case in would be like this: `<super-select data-datalist data-filterObjects data-displayItems></super-select>` That's it. 

