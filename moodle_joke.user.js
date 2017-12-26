// ==UserScript==
// @name        joke1
// @namespace   moodle
// @include     http://moodle3.stu.ru/course/view.php?id=788*
// @version     1
// @grant       none
// ==/UserScript==

var list = document.querySelectorAll("img.activityicon");

var style = document.createElement("style");
style.appendChild(document.createTextNode(""));// WebKit hack :(
document.head.appendChild(style);
style.sheet.insertRule("img.activityicon {transition: all .5s;}", 0);

setInterval(function(){
  for(var i=0; i<list.length; i++){
    list[i].style.transform="translate("+(-5+10*Math.random())+"px, "+(-5+10*Math.random())+"px) scale("+(.75+.5*Math.random())+")";
  }
}, 125);