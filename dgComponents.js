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
      proto.createdCallback = function(){
        var shadowdom = this.createShadowRoot();
        //console.dir(shadowdom);

        //console.dir(shadowdom.host.dataset);
        //console.dir(this.shadowRoot.children);


        shadowdom.innerHTML = '<section><label></label><content></content><section><section></section><input id="searchTxt" on-mouseenter="searchTxtMouseEnter" on-mouseout="searchTxtMouseOut" on-click="searchTxtClick" value="{{searchText::input}}"><button id="btnPref" on-click="preferenceBtn">off</button><input on-change="listSize" class="numToShow" type="number" min="1" max="99" value="5"><ul id="ssul" on-click="ulClicked"></ul><section id="ssdescript" class="descStyle"></section></section></section>';

        //setup shadowdom access
        proto.compRoot = this.shadowRoot.children[0];
        proto.lblError = this.compRoot.children[0];
        proto.sSelect = this.compRoot.children[2];
        var sSKids = this.sSelect.children, searchTxt = sSKids[0], preferenceBtn = sSKids[1], numItemsToDisplay = sSKids[2], itemList = sSKids[3], sSDescriptions = sSKids[4];

        //Set Internal Styles
        var compRootStyle = this.compRoot.style;
        compRootStyle.display = 'block'; compRootStyle.boxSizing = 'border-box';
        numItemsToDisplay.style.width = '30px';
        var listStyle = this.sSelect.style;
        listStyle.border = '3px gray solid'; listStyle.display = 'block'; listStyle.width = '250px';
        var itemStyle = itemList.style;
        itemStyle.listStyle = 'none'; itemStyle.margin = '0'; itemStyle.padding = '0'; itemStyle.display = 'block';
        itemStyle.height = '100px'; itemStyle.overflowY = 'scroll';
        var descStyle = sSDescriptions.style;
        descStyle.border = '3px black inset'; descStyle.overflowX = 'scroll';
        var errorStyle = this.lblError.style;
        errorStyle.border = '3px red inset'; errorStyle.width = '200px'; errorStyle.display = 'inline-block'; errorStyle.backgroundColor = '#e1bee7';

        //Add event listeners for sub elements
        searchTxt.addEventListener('keyup', function(e){
          console.log(e.target.value);
        });
        searchTxt.addEventListener('mouseenter', function(e){
          e.target.style.backgroundColor = 'grey';
        });
        searchTxt.addEventListener('mouseout', function(e){
          e.target.style.backgroundColor = 'white';
        });
        searchTxt.addEventListener('click', function(e){
          e.target.style.backgroundColor = 'white';
        });
        preferenceBtn.addEventListener('click', function(e){
          var showAll = e.target.parentNode.parentNode.host.showAll;
          if(showAll){
            e.target.parentNode.parentNode.host.showAll = false;
            preferenceBtn.innerHTML = '*'
          }
          else{
            e.target.parentNode.parentNode.host.showAll = true;
            preferenceBtn.innerHTML = '@'
          }
          console.log(showAll);
        });

        numItemsToDisplay.addEventListener('change', function(e){
          console.log(e.target.value);
          console.log(e.target.parentNode.parentNode.host.numToShow);
          e.target.parentNode.parentNode.host.numToShow = e.target.value;
        });
        loadDefaults();
        function loadDefaults(){
          var data = shadowdom.host.dataset, items =obj[data.items], filters = obj[data.filters], titles = obj[data.titles];
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
this.ready();
      };

      proto.ready = function(){
        //var ss = this.shadowRoot.children[2]; //lblError = this.shadowRoot.children[0];
        this.sSelect.style.display = 'none';
        this.lblError.innerHTML = 'super-select requires the itemlist property to be set as an array with at list one object. Also, the diplayitems property must be set to an array with at least one object of the form [{prop: value}] where value is the property name who\'s values will be used to make up the list';
      };

      proto.populateList = function (){
        var items = this.itemlist, len = items.length, c = this.lastItemIndex, el, sSDescriptions = document.getElementById('ssdescript'), itemList = document.getElementById('ssul');
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
              sSDescriptions.innerHTML = '';
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
                  sSDescriptions.appendChild(p);
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
            sSDescriptions.hidden=true;
          }
          itemList.appendChild(el);
        }
        if (extraTitles) {
          len = titles.length;
          c = 1;
          for (c; c < len; c++) {
            el = document.createElement('label');
            el.innerHTML = titles[c].prop;
            el.style.paddingRight = '10px';
            el.style.display = 'flex';
            sSDescriptions.appendChild(el);
          }
        }
      };

      document.registerElement('super-select', {prototype: proto});

    }
  };
}();