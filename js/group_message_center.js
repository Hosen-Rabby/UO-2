function getObject(obj){if(document.getElementById){return document.getElementById(obj);}else{if(document.all){return document.all[obj];}}}
function chkRadio(obj){
	switch(obj.id) {
		case "grouptype":
			getObject('sendto1').checked = true;
			break;
		case "who":
			getObject('sendto2').checked = true;
			break;
		case "what":
			getObject('sendto2').checked = true;
			break;
	}
}
