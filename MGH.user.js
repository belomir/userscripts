// ==UserScript==
// @name        MGH
// @namespace   moodle
// @include     http://moodle3.stu.ru/grade/report/history/index.php
// @version     1
// @grant       none
// ==/UserScript==

// require     https://d3js.org/d3.v4.min.js

/* init */

var months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

var points = [];

/* get data */

var table = document.querySelector(".gradereport_history");

var trs = table.querySelectorAll("tr");

for(var i=0; i<trs.length; i++){
  var tds = trs[i].querySelectorAll("td");
  if(tds.length>0){
    var point = {
      rawDate: tds[0].textContent,
      rawValue: tds[5].textContent
    };
    if(point.rawDate != "" && point.rawValue != ""){
      point.value = parseFloat(point.rawValue.replace(",", "."));
      var d0 = point.rawDate.split(", ");
      var d1 = d0[1].split(" ");
      var d2 = d0[2].split(":");
      point.date = new Date(Date.UTC(d1[2], months.indexOf(d1[1]), d1[0], d2[0], d2[1]));
      points.push(point);
    }
  }
}


/* draw data */

/*var svg = document.createElement("svg");
svg.id = "rsa_chart";
table.parentNode.insertBefore(svg, table);
var svg = d3.select("#rsa_chart"),
    width = parseFloat(window.getComputedStyle(table).width),
    height = 500,
    g = svg.append("g");

var x = d3.scaleTime()
  .rangeRound([0, width]);

var y = d3.scaleLinear()
  .rangeRound([height, 0]);

var line = d3.line()
  .x(function(d){return x(d.date);})
  .y(function(d){return y(d.value);});

x.domain(d3.extent(points, function(d){return d.date;}));
y.domain(d3.extent(points, function(d){return d.value;}));

g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

g.append("g")
  .attr("class", "axis axis--y")
  .call(d3.axisLeft(y))
  .append("text")
  .attr("fill", "#000")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .style("text-anchor", "end")
  .text("Price ($)");

g.append("path")
  .datum(points)
  .attr("class", "line")
  .attr("d", line);*/

var canvas = document.createElement("canvas");
canvas.width = parseFloat(window.getComputedStyle(table).width);
canvas.height = 500;
table.parentNode.insertBefore(canvas, table);
var ctx = canvas.getContext("2d");

var minX=points[0].date,
    maxX=points[0].date,
    minY=points[0].value,
    maxY=points[0].value;

for(var i=1; i<points.length; i++){
  if(points[i].date<minX)minX=points[i].date;
  if(points[i].date>maxX)maxX=points[i].date;
  if(points[i].value<minY)minY=points[i].value;
  if(points[i].value>maxY)maxY=points[i].value;
}

ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
// grid
ctx.strokeStyle = "lightgray";
ctx.lineWidth = 1;
var x = (points[0].date-minX)/(maxX-minX)*ctx.canvas.width;
var y = ctx.canvas.height-(points[0].value-minY)/(maxY-minY)*ctx.canvas.height;
ctx.beginPath();
ctx.moveTo(x, 0);
ctx.lineTo(x, ctx.canvas.height);
ctx.stroke();
ctx.closePath();
ctx.beginPath();
ctx.moveTo(0, y);
ctx.lineTo(ctx.canvas.width, y);
ctx.stroke();
ctx.closePath();
for(var i=1; i<points.length; i++){
  if(points[i].date.getMonth()+1.0 + "." + points[i].date.getDate() != points[i-1].date.getMonth()+1.0 + "." + points[i-1].date.getDate()){
    x = (points[i].date-minX)/(maxX-minX)*ctx.canvas.width;
    y = ctx.canvas.height-(points[i].value-minY)/(maxY-minY)*ctx.canvas.height;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);
    ctx.stroke();
    ctx.closePath();
  }
}
// captions
ctx.fillStyle = "gray";
ctx.font = "50px";
var x = (points[0].date-minX)/(maxX-minX)*ctx.canvas.width;
var y = ctx.canvas.height-(points[0].value-minY)/(maxY-minY)*ctx.canvas.height;
ctx.fillText(points[0].date.getMonth()+1.0 + "." + points[0].date.getDate(), x, ctx.canvas.height);
for(var i=1; i<points.length; i++){
  if(points[i].date.getMonth()+1.0 + "." + points[i].date.getDate() != points[i-1].date.getMonth()+1.0 + "." + points[i-1].date.getDate()){
    x = (points[i].date-minX)/(maxX-minX)*ctx.canvas.width;
    y = ctx.canvas.height-(points[i].value-minY)/(maxY-minY)*ctx.canvas.height;
    ctx.fillText(points[i].date.getDate() + "." + parseInt(points[i].date.getMonth()+1), x, ctx.canvas.height);
  }
}
// line
ctx.strokeStyle = "blue";
ctx.lineWidth = 3;
ctx.fillStyle = "black";
ctx.beginPath();
var x = (points[0].date-minX)/(maxX-minX)*ctx.canvas.width;
var y = ctx.canvas.height-(points[0].value-minY)/(maxY-minY)*ctx.canvas.height;
ctx.arc(x, y, 3, 0, Math.PI*2);
ctx.fill();
ctx.closePath();
for(var i=1; i<points.length; i++){
  ctx.beginPath();
  ctx.moveTo(x, y);
  x = (points[i].date-minX)/(maxX-minX)*ctx.canvas.width;
  y = ctx.canvas.height-(points[i].value-minY)/(maxY-minY)*ctx.canvas.height;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI*2);
  ctx.fill();
  ctx.closePath();
}