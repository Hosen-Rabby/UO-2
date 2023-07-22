function getObject(obj){if(document.getElementById){return document.getElementById(obj);}else{if(document.all){return document.all[obj];}}}
function chkRadio(obj){
	switch(obj.id) {
		case "e_dom":
			getObject('e_monthly1').checked = true;
			getObject('e_dow_card').value = "0";
			getObject('e_dow_day').value = "";
			getObject('e_dow_month_recur').value = "0";
			break;
		case "e_dom_month_recur":
			getObject('e_monthly1').checked = true;
			getObject('e_dow_card').value = "0";
			getObject('e_dow_day').value = "";
			getObject('e_dow_month_recur').value = "0";
			break;
		case "e_dow_card":
			getObject('e_monthly2').checked = true;
			getObject('e_dom').value = "0";
			getObject('e_dom_month_recur').value = "0";
			break;
		case "e_dow_day":
			getObject('e_monthly2').checked = true;
			getObject('e_dom').value = "0";
			getObject('e_dom_month_recur').value = "0";
			break;
		case "e_dow_month_recur":
			getObject('e_monthly2').checked = true;
			getObject('e_dom').value = "0";
			getObject('e_dom_month_recur').value = "0";
			break;
	}
}
