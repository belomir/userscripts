// ==UserScript==
// @name     moodle_groupHalfs
// @version  1
// @grant    none
// @include  http*://*moodle*/user/index.php*
// ==/UserScript==

console.log("moodle_groupHalfs by RSA, 2017");

var trs = document.querySelectorAll("table#participants > tbody > tr:not(.emptyrow)");

var hs = document.querySelectorAll("h3");
var h3 = [].filter.call(hs, function(e,i,a){return e.textContent.indexOf("Все участники:")>-1;})[0];
h3.style.background = "rgba(255,128,0,.2)";

var len = parseInt(h3.textContent.match(/[0-9]+/)[0]) || 0;

var half = parseInt(len/2);

h3.innerHTML += "( по "+half+")";

var c1 = "rgba(0,255,255,.25)";
var c2 = "rgba(0,255,0,.25)";
var c12 = "rgba(255,0,0,.25)";
var c11 = "rgba(255,255,0,.25)";
var color;

[].forEach.call(trs, function(e,i,a){
  if(a.length%2){
  	color = i==half?c12:(i<half-1?c1:(i>half+1?c2:c11));
  }else{
  	color = i<half-1?c1:(i>half?c2:c11);
    if(i==half-1){
    	e.style.borderBottom = "1px solid red";
    }
    if(i==half){
    	e.style.borderTop = "1px solid red";
    }
  }
  e.style.background = color;
  [].forEach.call(e.querySelectorAll("td"), function(e,j,a){
  	e.style.background = color;
    if(j==1){e.innerHTML += (i+1).toString();}
  });
});