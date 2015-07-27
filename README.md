# web-components
A collection of custom web components
## How to use
Components are wrapped in a node module so you can use with node and a tool like browserify. (see example) Just require it like any other node module that is not installed via npm `var comps = require(./<path>/dgComponents);`
Then invoke the component that you want to use as a property of the object returned by require. Each component will have it's own particular instructions for usage, but at a minimum, you will need to invoke the component in javascript and place it's corresponding tag in your html file. 
## super-select (Still in development)
super-select is a super charged selection list element that provides the following enhancements:
Hover activated synchronized data displays. In line button to change auto complete modes: first letters, letters anywhere, no auto complete. An inline number input for adjusting the height of items window. And check box filters for limiting the list based on multiple criteria.
####How to use super-select
Invoke the element passing it a single object of the following form: items, filters, titles `{datalist:[{dataobject}], filterObjects:[{name:value}], displayItems:[array of strings representing the property names of the properties that you want to display with the selection list. The first string indicates the property to be used in the selection list.]`
Place the super-select tag in the html with data attributes that match the object used in the invocation. In this case in would be like this: `<super-select data-datalist data-filterObjects data-displayItems></super-select>` That's it. 

