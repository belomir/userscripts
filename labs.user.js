// ==UserScript==
// @name        labs
// @namespace   moodle
// @include     http://*moodle*/grade/report/singleview/index.php?id=*&item=user&group=*&itemid=*
// @version     1
// @grant       none
// ==/UserScript==

var jtrs = $("tr:has(th):has(a[href*=assign])");
//jtrs.css({"background": "rgba(0,0,255,.2)", "border": "1px solid blue"});
var jgood = $("tr:has(td.c4)").filter(function(){return parseInt($(this).find("input").attr("value"))>=60;});
var jtrg = jtrs.filter(jgood);
var jmid = $("tr:has(td.c4)").filter(function(){
  var value = parseInt($(this).find("input").attr("value"));
  return value>0&&value<60;
});
var jtrm = jtrs.filter(jmid);
var jbad = $("tr:has(td.c4)").filter(function(){
  var value = $(this).find("input").attr("value");
  return value==""||parseInt(value)<25;
});
var jtrb = jtrs.filter(jbad);
jtrb.css({"border": "1px solid red"}).children().css({"background": "rgba(255,0,0,.2)"});
jtrm.css({"border": "1px solid yellow"}).children().css({"background": "rgba(255,255,0,.2)"});
jtrg.css({"border": "1px solid green"}).children().css({"background": "rgba(0,255,0,.2)"});