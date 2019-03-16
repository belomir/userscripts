// ==UserScript==
// @name     task with rubric css
// @version  1
// @include  http*://*moodle*/mod/assign/view.php*
// @grant    none
// ==/UserScript==

document.querySelectorAll('.definition').forEach((e,i,a)=>{
  e.style['user-select'] = 'none';
  e.style['-moz-user-select'] = 'none';
  e.style['-webkit-user-select'] = 'none';
  e.style['-ms-user-select'] = 'none';
  e.style['user-select'] = 'none';
  e.style.padding = '1em';
});

document.querySelectorAll('.remark > textarea').forEach((e,i,a)=>{
  e.rows = 1;
});

document.querySelectorAll('.description').forEach((e,i,a)=>{
  e.style.width = 'auto';
  e.style.padding = '1em';
});