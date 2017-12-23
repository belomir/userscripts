// ==UserScript==
// @name     family first
// @version  1
// @grant    none
// @include  http*://*moodle*/grade/report/singleview/index.php*
// ==/UserScript==

var cells = document.querySelectorAll("th.user > a:nth-child(2)");
[].forEach.call(cells, function(e, i, a){
	var fio = e.innerHTML.split(" ");
  e.innerHTML = fio[2] + " " + fio[0] + " " + fio[1];
});