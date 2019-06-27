// ==UserScript==
// @name        scorm properties
// @version     0.1
// @grant       none
// @namespace   moodle
// @include     http://moodle3.stu.ru/course/modedit.php?update=*
// ==/UserScript==


exec();


function getId(){
	let current = document.querySelector('.current_branch');
	let previous = current.previousElementSibling;
	if(previous){
		let a = previous.querySelector('a');
		let href = a.href;
		let url = new URL(href);
		let searchParams = url.searchParams;
		let id = searchParams.get('id');
		return id;
	}else{
		return false
	};
}


function setProperties(id){
	/* view */
	document.querySelector('#id_popup').value = '1';
	document.querySelector('#id_width').disabled = false;
	document.querySelector('#id_width').value = '100%';
	document.querySelector('#id_height').disabled = false;
	document.querySelector('#id_height').value = '100%';
	document.querySelector('#id_displayactivityname').value = 0;
	document.querySelector('#id_displayactivityname').checked = false;
	document.querySelector('#id_hidetoc').value = 3;
	document.querySelector('#id_nav').disabled = true;
	/* completion */
	document.querySelector('#id_completion').value = 2;
	document.querySelector('#id_completionusegrade').disabled = false;
	document.querySelector('#id_completionusegrade').value = 1;
	document.querySelector('#id_completionusegrade').checked = true;
	document.querySelector('#id_completionscoredisabled').checked = true;
	document.querySelector('#id_completionscorerequired').disabled = true;
	/* availability */
	if(id){
		document.querySelector('#id_availabilityconditionsheader button').click();
		document.querySelector('#availability_addrestriction_completion').click();
		document.querySelector('select[name="cm"]').value = id;
		document.querySelector('select[name="e"]').value = 2;
		document.querySelector('#id_availabilityconditionsjson').value = `{"op":"&","c":[{"type":"completion","cm":${id},"e":2}],"showc":[true]}`;
	}
	// document.querySelector('#id_submitbutton2').click();
}


function exec(){
	let button = document.createElement('button');
	button.textContent = 'сделать зашибись!';
	button.addEventListener('click', ev=>{
		setProperties(getId());
	});
	let form = document.querySelector('#mform1');
	form.parentElement.insertBefore(button, form);
}