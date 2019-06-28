// ==UserScript==
// @name        scorm properties
// @version     0.1
// @grant       none
// @namespace   moodle
// @include     http://moodle3.stu.ru/course/modedit.php?update=*
// ==/UserScript==


exec();


function getParameters(){
	let currentModuleName = document.querySelector('input[name="modulename"]').value;
	let current = document.querySelector('.current_branch');
	let previous = current.previousElementSibling;
	let previousId;
	let previousModuleName;
	if(previous){
		let a = previous.querySelector('a');
		let href = a.href;
		let url = new URL(href);
		let searchParams = url.searchParams;
		previousId = searchParams.get('id');
		let matching = href.match(/mod\/([^\/]*)\/view/);
		if(matching.length>1){
			previousModuleName = matching[1];
		}
	};
	return {
		previousId: previousId,
		previousModuleName: previousModuleName,
		currentModuleName: currentModuleName
	};
}


function setProperties({previousId, previousModuleName, currentModuleName}){
	/* properties */
	switch(currentModuleName){
		case 'scorm':
			setScormProperties(previousId);
			break;
	}
	/* completion */
	switch(currentModuleName){
		case 'page':
		case 'resource':
			setSimpleCompletion(previousId);
			break;
		case 'scorm':
			setScormCompletion(previousId);
			break;
	}
	/* availability */
	switch(previousModuleName){
		case 'page':
		case 'resource':
			setSimpleAvailability(previousId);
			break;
		case 'scorm':
			setGradeAvailability(previousId);
			break;
	}
}


function setSimpleAvailability(id){
	if(id){
		document.querySelector('#id_availabilityconditionsheader button').click();
		document.querySelector('#availability_addrestriction_completion').click();
		document.querySelector('select[name="cm"]').value = id;
		document.querySelector('select[name="e"]').value = 0;
		document.querySelector('#id_availabilityconditionsjson').value = `{"op":"&","c":[{"type":"completion","cm":${id},"e":0}],"showc":[true]}`;
	}
}


function setGradeAvailability(id){
	if(id){
		document.querySelector('#id_availabilityconditionsheader button').click();
		document.querySelector('#availability_addrestriction_completion').click();
		document.querySelector('select[name="cm"]').value = id;
		document.querySelector('select[name="e"]').value = 2;
		document.querySelector('#id_availabilityconditionsjson').value = `{"op":"&","c":[{"type":"completion","cm":${id},"e":2}],"showc":[true]}`;
	}
}


function setSimpleCompletion(id){
	let needToUnlock = false;
	let completion = document.querySelector('#id_completion');
	if(completion.value != 2){
		needToUnlock = true;
		completion.value = 2;
	}
	let completionview = document.querySelector('#id_completionview');
	if(!completionview.checked){
		needToUnlock = true;
		completionview.checked = true;
		completionview.disabled = false;
	};
	if(needToUnlock)
		document.querySelector('input[name="completionunlocked"]').value = 1;
}


function setScormCompletion(){
	let needToUnlock = false;
	let completion = document.querySelector('#id_completion');
	if(completion.value != 2){
		needToUnlock = true;
		completion.value = 2;
	}
	let completionusegrade = document.querySelector('#id_completionusegrade');
	if(completionusegrade.value != 1){
		needToUnlock = true;
		completionusegrade.disabled = false;
		completionusegrade.value = 1;
		completionusegrade.checked = true;
		document.querySelector('#id_completionscoredisabled').checked = true;
		document.querySelector('#id_completionscorerequired').disabled = true;
	}
	if(needToUnlock)
		document.querySelector('input[name="completionunlocked"]').value = 1;
}


function setScormProperties(info){
	document.querySelector('#id_popup').value = '1';
	document.querySelector('#id_width').disabled = false;
	document.querySelector('#id_width').value = '100%';
	document.querySelector('#id_height').disabled = false;
	document.querySelector('#id_height').value = '100%';
	document.querySelector('#id_displayactivityname').value = 0;
	document.querySelector('#id_displayactivityname').checked = false;
	document.querySelector('#id_hidetoc').value = 3;
	document.querySelector('#id_nav').disabled = true;
}


function submit(){
	document.querySelector('#id_submitbutton2').click();
}


function exec(){
	let parameters = getParameters();
	console.log(parameters);
	let button = document.createElement('button');
	button.disabled = true;
	let canBeShown = ['quiz', 'page', 'scorm', 'resource'].includes(parameters.currentModuleName);
	button.textContent = 'сделать зашибись!';
	button.addEventListener('click', ev=>{
		setProperties(parameters);
		submit();
	});
	let form = document.querySelector('#mform1');
	form.parentElement.insertBefore(button, form);
	if(document.readyState == 'complete'){
		if(canBeShown)
			button.disabled = false;
	}else{
		window.addEventListener('load', ev=>{
			if(canBeShown)
				button.disabled = false;
		});
	}
}