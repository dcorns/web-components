/**
 * dgComponents
 * Created by dcorns on 6/9/15.
 */
'use strict';

module.exports = function(){
  return{
    superSelect: function(obj){
      var proto = Object.create(HTMLElement.prototype);
      proto.showAll = false;
      proto.numToShow = 5;
      proto.totalItems = 0;
      proto.lastItemIndex = 0;
      proto.itemlist = [];
      proto.associations = [];
      proto.displayitems = [];
      proto.createdCallback = function(){
        var shadowdom = this.createShadowRoot();
        //console.dir(shadowdom);

        //console.dir(shadowdom.host.dataset);
        //console.dir(this.shadowRoot.children);


        shadowdom.innerHTML = '<section><label></label><content></content><section><section></section><input id="searchTxt" on-mouseenter="searchTxtMouseEnter" on-mouseout="searchTxtMouseOut" on-click="searchTxtClick" ><button id="btnPref" on-click="preferenceBtn">off</button><input on-change="listSize" class="numToShow" type="number" min="1" max="99" value="5"><ul on-click="ulClicked"></ul><section id="ssdescript" class="descStyle"></section></section></section>';

        //setup shadowdom access
        proto.compRoot = this.shadowRoot.children[0];
        proto.lblError = this.compRoot.children[0];
        proto.sSelect = this.compRoot.children[2];
        var sSKids = this.sSelect.children;
        proto.searchTxt = sSKids[0];
        proto.preferenceBtn = sSKids[1];
        proto.numItemsToDisplay = sSKids[2];
        proto.itemList = sSKids[3];
        proto.sSDescriptions = sSKids[4];

        //Set Internal Styles
        var compRootStyle = this.compRoot.style;
        compRootStyle.display = 'block'; compRootStyle.boxSizing = 'border-box';
        this.numItemsToDisplay.style.width = '30px';
        var listStyle = this.sSelect.style;
        listStyle.border = '3px gray solid'; listStyle.display = 'block'; listStyle.width = '250px';
        var itemStyle = this.itemList.style;
        itemStyle.listStyle = 'none'; itemStyle.margin = '0'; itemStyle.padding = '0'; itemStyle.display = 'block';
        itemStyle.height = '100px'; itemStyle.overflowY = 'scroll';
        var descStyle = this.sSDescriptions.style;
        descStyle.border = '3px black inset'; descStyle.overflowX = 'scroll';
        var errorStyle = this.lblError.style;
        errorStyle.border = '3px red inset'; errorStyle.width = '200px'; errorStyle.display = 'inline-block'; errorStyle.backgroundColor = '#e1bee7';
        //Add event listeners for sub elements
        //searchTxt.addEventListener('keyup', function(e){
        //  console.log(e.target.value);
        //});
        //searchTxt.addEventListener('mouseenter', function(e){
        //  e.target.style.backgroundColor = 'grey';
        //});
        //searchTxt.addEventListener('mouseout', function(e){
        //  e.target.style.backgroundColor = 'white';
        //});
        //searchTxt.addEventListener('click', function(e){
        //  e.target.style.backgroundColor = 'white';
        //});
        //preferenceBtn.addEventListener('click', function(e){
        //  var showAll = e.target.parentNode.parentNode.host.showAll;
        //  if(showAll){
        //    e.target.parentNode.parentNode.host.showAll = false;
        //    preferenceBtn.innerHTML = '*'
        //  }
        //  else{
        //    e.target.parentNode.parentNode.host.showAll = true;
        //    preferenceBtn.innerHTML = '@'
        //  }
        //  console.log(showAll);
        //});
        //
        //numItemsToDisplay.addEventListener('change', function(e){
        //  console.log(e.target.value);
        //  console.log(e.target.parentNode.parentNode.host.numToShow);
        //  e.target.parentNode.parentNode.host.numToShow = e.target.value;
        //});
        this.ready();
       // loadDefaults();
        function loadDefaults(){
          var data = shadowdom.host.dataset, items = obj[data.items], filters = obj[data.filters], titles = obj[data.titles];
          var extraTitles = false;
          if(titles.length > 1) extraTitles = true;
          var totalItems = shadowdom.host.totalItems = items.length;
          var numItemsShow = shadowdom.host.numToShow;
          var idx = shadowdom.host.lastItemIndex;
          if(titles){
            var len = numItemsShow, c = idx, el;
            for(c;c<len;c++){
              el = document.createElement('li');
              el.innerHTML = items[c][titles[0].prop];
              if(extraTitles){
                var len2 = titles.length, c2 = 1;
                for(c2;c2<len2;c2++){
                  el.setAttribute('data-' + titles[c2].prop, items[c][titles[c2].prop]);
                }
                el.addEventListener('mouseenter', function(e){
                  e.target.style.backgroundColor = 'grey';
                  var data = e.target.dataset;
                  var sSDescKids = sSDescriptions.children;
                  for(var prop in data){
                    if(data.hasOwnProperty(prop)){
                      c2 = 0;  len2 = sSDescKids.length;
                      for(c2;c2<len2;c2++){
                        if(prop === sSDescKids[c2].innerHTML.toLowerCase()){
                          c2++;
                          sSDescKids[c2].innerHTML = data[prop];
                        }
                      }
                    }
                  }

                });
                el.addEventListener('mouseout', function(e){e.target.style.backgroundColor = 'white';});
              }
              else{
                el.addEventListener('mouseenter', function(e){e.target.style.backgroundColor = 'grey';});
                el.addEventListener('mouseout', function(e){e.target.style.backgroundColor = 'white';});
              }
              itemList.appendChild(el);
            }
            if(extraTitles){
              var descData;
              len = titles.length; c = 1;
              for(c;c<len;c++){
                el = document.createElement(titles[c].tag);
                el.innerHTML = titles[c].prop;
                el.style.paddingRight = '10px';
                el.style.display = 'flex';
                descData = document.createElement('label');
                descData.style.display = 'flex';
                sSDescriptions.appendChild(el);
                sSDescriptions.appendChild(descData);
              }
            }
          }
        }
      };

      proto.checkItemList = function(){
          //check if itemlist is an Array
          if(!(Object.prototype.toString.call(this.itemlist) === '[object Array]')){
            this.lblError.innerHTML = 'super-select "itemlist" property must be an array';
            return;
          }
          if(!(Object.prototype.toString.call(this.itemlist[0]) === '[object Object]')){
            this.lblError.innerHTML = 'super-select "itemlist" property must be an array of OBJECTS';
          }
          else{
            if(this.checkDisplayItems()){
              this.sSelect.style.display = 'block';
              this.lblError.style.display = 'none';
              this.populateList();
            }
          }
      };

      proto.checkDisplayItems = function(){
        //check if displayItems is an array
        if(!(Object.prototype.toString.call(this.displayitems) === '[object Array]')){
          this.lblError.innerHTML = 'super-select "displayitems" property must be an array';
          console.error('there is no display items array');
          return false;
        }
        if(!(Object.prototype.toString.call(this.displayitems[0]) === '[object Object]')){
          this.lblError.innerHTML = 'super-select "displayitems" property must be an array of OBJECTS who\'s first object is of the form {prop: value} where value is the itemlist property name representing the value to be used for the selection list';
          console.error('no Objects in display items array');
          return false;
        }
        if(!(this.displayitems[0].hasOwnProperty('prop'))){
          this.lblError.innerHTML = 'super-select "displayitems" property must be an array of objects who\'s FIRST OBJECT IS OF THE FORM {prop: value} where value is the itemlist property name representing the value to be used for the selection list';
          console.error('displayitems[0] has no prop property');
          return false;
        }
        if(!(this.itemlist[0].hasOwnProperty(this.displayitems[0]['prop']))){
          this.lblError.innerHTML = 'super-select "displayitems" property must be an array of objects who\'s first object is of the form {prop: value} where value is the ITEM LIST PROPERTY NAME representing the value to be used for the selection list. Item list does not contain the property ' + this.displayitems[0]['prop'];
          console.error('property name' + this.displayitems[0]['prop'] + 'defined in displayitems not found in itemlist');
          return false;
        }
        var len = this.displayitems.length;
        if(len > 1){
          var c = 1;
          for (c; c < len; c++){
            if(!(this.displayitems[c].hasOwnProperty('prop'))  || !(this.displayitems[c].hasOwnProperty('tag'))){
              this.lblError.innerHTML = 'super-select displayitems properties that follow the first one must all be of the form{prop: value, tag: value}';
              console.error('displayitems object[' + c + '] does not have required properties {prop: value, tag: value}');
              return false;
            }
            if(!(this.itemlist[0].hasOwnProperty(this.displayitems[c]['prop']))){
              this.lblError.innerHTML = 'super-select itemlist has no property: ' + this.displayitems[0]['prop'];
              console.error('no property ' + this.displayitems[c]['prop'] + 'in itemlist');
              return false;
            }
            var c2 = 0, len2 = this.itemlist.length;
            for(c2; c2 < len2; c2++){
              if(!(this.itemlist[c2].hasOwnProperty(this.displayitems[c]['prop']))){
               this.lblError.innerHTML = 'super-select itemlist[' + c2 + '] has no property called ' + this.displayitems[c]['prop'];
                console.error('itemlist[' + c2 + ' has no property ' + this.displayitems[c]['prop']);
                return false;
              }
            }
          }
          return true;
        }
        else{
          return true;
        }
      };

      proto.ready = function(){
        //var ss = this.shadowRoot.children[2]; //lblError = this.shadowRoot.children[0];
        this.sSelect.style.display = 'none';
        this.lblError.innerHTML = 'super-select requires the itemlist property to be set as an array with at list one object. Also, the diplayitems property must be set to an array with at least one object of the form [{prop: value}] where value is the property name who\'s values will be used to make up the list';
        console.dir(this.dataset);
        var data = this.dataset;
        this.itemlist = obj[data.itemlist]; this.associations = obj[data.associations]; this.displayitems = obj[data.displayitems];
        this.checkItemList();
      };

      proto.populateList = function (){
        var items = this.itemlist, len = items.length, c = this.lastItemIndex, el;
        var titles = this.displayitems;
        var extraTitles = titles.length > 1;
        for (c; c < len; c++) {
          el = document.createElement('li');
          el.setAttribute('data-show', 'true');
          el.innerHTML = items[c][titles[0].prop];
          if (extraTitles) {
            var len2 = titles.length, c2 = 1;
            for (c2; c2 < len2; c2++) {
              el.setAttribute('data-' + titles[c2].prop, JSON.stringify({
                iData: items[c][titles[c2].prop],
                iTag: titles[c2].tag
              }));
            }
            el.addEventListener('mouseenter', function (e) {
              e.target.style.backgroundColor = 'grey';
              var data = e.target.dataset, p, lbl, txt;
              this.sSDescriptions.innerHTML = '';
              var liData;
              for (var prop in data) {
                if (data.hasOwnProperty(prop) && prop !== 'subjects' && prop !== 'show') {
                  liData = JSON.parse(data[prop]);
                  p = document.createElement('p');
                  p.style.margin = '0px';
                  lbl = document.createElement('h4');
                  lbl.style.margin = '0px';
                  lbl.innerHTML = prop.toString().toUpperCase() + ': ';
                  if (liData.iTag === 'a') {
                    txt = document.createElement(liData.iTag);
                    txt.setAttribute('href', liData.iData);
                  }
                  else {
                    txt = document.createElement(liData.iTag);
                  }
                  txt.innerHTML = liData.iData;
                  p.appendChild(lbl);
                  p.appendChild(txt);
                  this.sSDescriptions.appendChild(p);
                }
              }
            });
            el.addEventListener('mouseout', function (e) {
              e.target.style.backgroundColor = 'white';
            });
          }
          else {
            el.addEventListener('mouseenter', function (e) {
              e.target.style.backgroundColor = 'grey';
            });
            el.addEventListener('mouseout', function (e) {
              e.target.style.backgroundColor = 'white';
            });
            this.sSDescriptions.hidden=true;
          }
          this.itemList.appendChild(el);
        }
        if (extraTitles) {
          len = titles.length;
          c = 1;
          for (c; c < len; c++) {
            el = document.createElement('label');
            el.innerHTML = titles[c].prop;
            el.style.paddingRight = '10px';
            el.style.display = 'flex';
            this.sSDescriptions.appendChild(el);
          }
        }
      };

      document.registerElement('super-select', {prototype: proto});

    }
  };
}();