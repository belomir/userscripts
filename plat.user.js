// ==UserScript==
// @name        plat.user.js
// @namespace   moodle
// @downloadURL https://bitbucket.org/belomir/plat.js/raw/master/plat.user.js
// @updateURL   https://bitbucket.org/belomir/plat.js/raw/master/plat.user.js
// @include     */mod/assign/view.php*action=grade*
// @version     0.2
// @run-at      idle
// @grant       none
// ==/UserScript==

var c = document.querySelector("#region-main .usersummary");
var re1 = /\/user\/view\.php\?id=\d+/g;
var re2 = /\d+/g;

var userID = c.innerHTML.match(re1)[0].match(re2)[0];
var list = c.querySelectorAll("a");
for(var i=0; i<list.length; i++){
	if(list[i].href.match(re1) && list[i].textContent !== ""){
		userName = list[i].textContent;
	}
}

console.log(userID);
console.log(userName);

var div = document.createElement("div");

div.style.minHeight = "5em";
div.style.border = "1px solid #000";
div.style.background = "#eee";
div.style.display = "flex";
div.style.flexDirection = "column";
div.style.padding = "0 0 0.5em 0";
var h = document.createElement("header");
	h.style.padding = "0.5em 1em";
	h.style.margin = "0 0 0.5em 0";
	h.style.background ="rgba(0, 0, 0, 0.125)";
	var h1 = document.createElement("h4");
		h1.appendChild(document.createTextNode("Индивидуальное задание"));
		h1.style.color = "#000";
		h1.style.padding = "0";
		h1.style.margin = "0";
	h.appendChild(h1);
div.appendChild(h);

var divi = document.createElement("div");
	divi.style.border = "1px solid #00f";
	divi.style.background = "#eef";
	divi.style.margin = "0.5em 1em";
		var h = document.createElement("header");
			h.style.background = "rgba(0, 0, 255, 0.125)";
			h.style.padding = "0.5em 1em";
			var h1 = document.createElement("h4");
				h1.appendChild(document.createTextNode("Учащийся"));
				h1.style.color = "#00f";
				h1.style.padding = "0";
				h1.style.margin = "0";
			h.appendChild(h1);
		divi.appendChild(h);
		var d = document.createElement("div");
		d.style.padding = "1em";
			var p = document.createElement("p");
			var un = userName.split("(");
			p.appendChild(document.createTextNode(un[0]));
			var s = document.createElement("span");
				s.style.color = "lightgray";
				s.appendChild(document.createTextNode("("+un[1]));
			p.appendChild(s);
		d.appendChild(p);
			var p = document.createElement("p");
			p.appendChild(document.createTextNode("вариант: "));
			p.appendChild(document.createTextNode(userID));
		d.appendChild(p);
	divi.appendChild(d);
div.appendChild(divi);

var divt = document.createElement("div");
	divt.style.border = "1px solid green";
	divt.style.background = "#efe";
	divt.style.margin ="0.5em 1em";
	var h = document.createElement("header");
		h.style.background = "rgba(0, 255, 0, 0.125)";
		h.style.padding = "0.5em 1em";
		var h1 = document.createElement("h4");
			h1.appendChild(document.createTextNode("Задание"));
			h1.style.color = "green";
			h1.style.padding = "0";
			h1.style.margin = "0";
		h.appendChild(h1);
	divt.appendChild(h);
		var ddivt = document.createElement("div");
		ddivt.style.padding = "1em";
	divt.appendChild(ddivt);
div.appendChild(divt);

var diva = document.createElement("div");
	diva.style.border = "1px solid #f00";
	diva.style.background = "#fee";
	diva.style.margin = "0.5em 1em";
	var h = document.createElement("header");
		h.style.background = "rgba(255, 0, 0, 0.125)";
		h.style.padding = "0.5em 1em";
		var h1 = document.createElement("h4");
			h1.appendChild(document.createTextNode("Решение"));
			h1.style.color = "red";
			h1.style.padding = "0";
			h1.style.margin = "0";
		h.appendChild(h1);
	diva.appendChild(h);
	var ddiva = document.createElement("div");
		ddiva.style.padding = "1em";
	diva.appendChild(ddiva);
div.appendChild(diva);

c.parentNode.insertBefore(div, c.nextSibling);

var href = window.location.href.match(/.*\?id=\d+/)[0];

var iframe = document.createElement('object');
	iframe.style.display = "none";
	iframe.type = "type/html";
	iframe.data = href;
div.appendChild(iframe);

iframe.addEventListener("load", r_f);

function r_f(){
	var iframeContent = (iframe.contentWindow || iframe.contentDocument);
	ddivt.appendChild(iframeContent.Jas.prototype.variant(userID));
	ddiva.appendChild(iframeContent.Jas.prototype.answer(userID));
	MathJax.Hub.Typeset(div);
}
