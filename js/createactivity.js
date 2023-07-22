//GLOBALS USED TO CAPTURE THE DEFAULT VALUES FOR THE ADD QUESTION FORM
var defaultQuestionText = "";
var defaultAnswerTypeText = "";
var defaultPossibleAnswersText = "";
var defaultisRequiredText = "";

//ACTIVITY START/END TIME GLOBALS
var maxActivityHours = 12; //the range of possible hours between the activity start and end time
var maxEndHour = 0; //in 24 hour time--e.g. 0 = midnight, 1 = 1am, etc.
var activityTimeIncrement = 15; //must be a multiple of 60 minutes

//helper function that converts adds a 0 prefix for times
function makeTwoDigits(n) { return n < 10 ? '0' + n : n; }

//helper function that figures out am/pm for times
function getAMPM(n) { return n < 12 ? 'am' : 'pm'; }

//helper function that converts 24 hour value to standard 12 hour
function makeStandardTime(n) { return n > 12 ? n-12 : (n==0 ? 12: n); }

//Called once the DOM is loaded    
window.addEventListener("load", function() 
{
	//grab the default values of the "add question" form
    defaultQuestionText = document.getElementById('enter-question').value;
    defaultAnswerTypeText = document.getElementById('answer_type').value;
    defaultisRequiredText = document.getElementById('isRequired').value;
    defaultPossibleAnswersText = document.getElementById('possible_answers').value;
    
    
    //MAKE QUESTIONS SORTABLE
//    $( "#question-container" ).sortable(
//        {
//            items: 'li:not(.empty-question)'
//        });
    $( ".sortableList" ).sortable(
        {
            items: 'li:not(.empty-question)'
        });
    $( ".sortableList" ).disableSelection();

    
    //UPDATES FORM AFTER A QUESTION IS SORTED
   /*
    $( "#question-container" ).on( "sortupdate", function( event, ui ) 
        {
            var questionContainerChildren = document.getElementById('question-container').childNodes;
            var endOfIncludeSection = false;

            //these vars are used to detect sections that don't have any questions
            var includeHasQuestions = true;
            var notIncludeHasQuestions = true;
            var questionCounter = 0;

            //loop through all child elements
            for(var i=0; i < questionContainerChildren.length; ++i)
            {
                if(questionContainerChildren[i].nodeName == "LI") //grab the <li> elements
                {
                    if(questionContainerChildren[i].id == "questions-do-not-include")
                    {
                        endOfIncludeSection = true;
                        
                        if(questionCounter == 0) {includeHasQuestions = false;}
                        questionCounter = 0;
                    }    

                    if (endOfIncludeSection == false)
                    {
                        console.log('li id:' + questionContainerChildren[i].id);

                        var checkboxNameSelector = '[name="' + questionContainerChildren[i].id + '"]';
                        
                        $(checkboxNameSelector).prop('checked', true); //check this item's checkbox
                        console.log($(checkboxNameSelector)[0]);
                    }
                    questionCounter++;
                }
            }   
            if(questionCounter == 1) {notIncludeHasQuestions = false;}

            $(".empty-question").remove();
            includeHasQuestions || insertEmptyQuestionElement("include");
            notIncludeHasQuestions || insertEmptyQuestionElement("not include");

        } 
    );
    
    
    //UPDATES FORM AFTER A QUESTION IS SORTED
    $( "#question-container" ).on( "sortupdate", function( event, ui ) 
        {
            var questionContainerChildren = document.getElementById('question-container').childNodes;
            var endOfIncludeSection = false;

            //these vars are used to detect sections that don't have any questions
            var includeHasQuestions = true;
            var notIncludeHasQuestions = true;
            var questionsInThisSection = 0; 

            //loop through all child elements
            for(var i=0; i < questionContainerChildren.length; ++i)
            {
                if(questionContainerChildren[i].nodeName == "LI") //we only care about the <li> elements
                {
                    var childID = questionContainerChildren[i].id;

                    //if we are NOT a question element
                    if ((childID.indexOf("include") > -1) || (childID.indexOf("empty") > -1))
                    {                    
                        //if we hit the not-include section then the "include" section has ended
                        if(childID == "questions-do-not-include")
                        {
                            endOfIncludeSection = true;
                            if(questionsInThisSection == 0) {includeHasQuestions = false;}
                            questionsInThisSection = 0;
                        }    
                        continue; //re-loop! this element doesn't require further processing
                    }

                    //if we ARE a question that SHOULD be included
                    if (endOfIncludeSection == false)
                    {
                        var checkboxNameSelector = '[name="' + questionContainerChildren[i].id + '"]';                        
                        $(checkboxNameSelector).prop('checked', true); //check this item's hidden checkbox 
                    }
                    questionsInThisSection++;
                }
            }   
            if(questionsInThisSection == 0) {notIncludeHasQuestions = false;} //checks the # of questions in the "not-include" section

            $(".empty-question").remove();
            includeHasQuestions || insertEmptyQuestionElement("include"); //if no questions in section
            notIncludeHasQuestions || insertEmptyQuestionElement("not include");

        } 
    );
    */
    //UPDATES FORM AFTER A QUESTION IS SORTED
   $( ".sortableList" ).on( "sortupdate", function( event, ui ) 
        {
             if ($("#shrtfrm").is(":visible")) {
        var currentform = $("#shrtfrm");
    } else {
        var currentform = $("#advfrm");
    }
         //   var questionContainerChildren = document.getElementById('question-container').childNodes;
            var questionContainerChildren = currentform.find('#question-container').children();
         
            var endOfIncludeSection = false;
            var sortOrder = "";

            //these vars are used to detect sections that don't have any questions
            var includeHasQuestions = true;
            var notIncludeHasQuestions = true;
            var questionsInThisSection = 0; 
            //loop through all child elements
            for(var i=0; i < questionContainerChildren.length; ++i)
            {
                
                if(questionContainerChildren[i].nodeName == "LI") //we only care about the <li> elements
                {
                    var childID = questionContainerChildren[i].id;
                    
                    //if we are NOT a question element
                    if ((childID.indexOf("include") > -1) || (childID.indexOf("empty") > -1))
                    {                    
                        //if we hit the not-include section then the "include" section has ended
                        if(childID == "questions-do-not-include")
                        {
                            endOfIncludeSection = true;
                            if(questionsInThisSection == 0) {includeHasQuestions = false;}
                            questionsInThisSection = 0;
                        }    
                        continue; //re-loop! this element doesn't require further processing
                    }

                    //if we ARE a question that SHOULD be included
                    if (endOfIncludeSection == false)
                    {
                        var checkboxNameSelector = '[name="' + childID + '"]';
                        currentform.find(checkboxNameSelector).prop('checked', true); //check this item's hidden checkbox 
                        sortOrder += childID + ","; //add this question to the sort order
                    }
                    questionsInThisSection++;
                }
            }   
            if(questionsInThisSection == 0) {notIncludeHasQuestions = false;} //checks the # of questions in the "not-include" section

            currentform.find(".empty-question").remove();
            includeHasQuestions || insertEmptyQuestionElement("include"); //if no questions in section
            notIncludeHasQuestions || insertEmptyQuestionElement("not include");

            //save the sort order field
            var checkboxNameSelector = '[name="' + childID + '"]';                        
            currentform.find('[name="question_sort_order"]').val(sortOrder.slice(0,-1)); //save and remove last comma
            //console.log("sort: " + $('[name="question_sort_order"]').val() );
        } 
    );
   $( ".sortableList" ).disableSelection();

    //EVENT HANDLER TO SET END TIME ONCE START TIME IS SELECTED
     if ($("#time-adv").length){
    document.getElementById("time-adv").addEventListener("change", function (e)
    {
        var endTimeElement = document.getElementById("endtime-adv"); //get the end date selector element
        var selectedTimeString = e.currentTarget.value;
        var selectedTimeSplit = selectedTimeString.split(":");

        //make a date object so that calculations are easier--NOTE: we're only using hours and minutes so the year, etc. doesn't matter
        var selectedDateTime = new Date("2000", "11", "31", selectedTimeSplit[0], selectedTimeSplit[1], 0,0 ); 
        
        //REMOVE ALL OPTIONS FROM THE END TIME FIELD
        while (endTimeElement.lastChild) 
            { endTimeElement.removeChild(endTimeElement.lastChild); }

        //REPLACE THE DEFAULT OPTION
        var defaultOptionElement = document.createElement('option'); // create new option element
        defaultOptionElement.appendChild( document.createTextNode('N/A') ); //set the label
        defaultOptionElement.value = ''; //set the value
        endTimeElement.appendChild(defaultOptionElement); //add it

        //ADD THE NEW TIMES/OPTIONS
        var tempDateTime = new Date(selectedDateTime.toString()); //used to interate the new times
        var lastDateTime = new Date(tempDateTime.toString());
        lastDateTime.setHours(selectedDateTime.getHours() + maxActivityHours); //the last time in the range
        while (tempDateTime < lastDateTime  )
        {    
            
            var labelString = makeStandardTime(tempDateTime.getHours()) + ":" + makeTwoDigits(tempDateTime.getMinutes()) + " " + getAMPM(tempDateTime.getHours());
            var valueString = makeTwoDigits(tempDateTime.getHours()) + ":" + makeTwoDigits(tempDateTime.getMinutes());
                
            var tempOptionElement = document.createElement('option'); // create new option element            
            tempOptionElement.appendChild( document.createTextNode(labelString)); //set the label
            tempOptionElement.value = valueString; //set the value
            endTimeElement.appendChild(tempOptionElement); //add it

            tempDateTime.setMinutes(tempDateTime.getMinutes() + activityTimeIncrement); //calculate the next time increment
        }    
        endTimeElement.classList.remove("disable"); //un-disable the endtime field

    }, false);
}
    if ($("#time-shrt").length){
    document.getElementById("time-shrt").addEventListener("change", function (e)
    {
        var endTimeElement = document.getElementById("endtime-shrt"); //get the end date selector element
        var selectedTimeString = e.currentTarget.value;
        var selectedTimeSplit = selectedTimeString.split(":");

        //make a date object so that calculations are easier--NOTE: we're only using hours and minutes so the year, etc. doesn't matter
        var selectedDateTime = new Date("2000", "11", "31", selectedTimeSplit[0], selectedTimeSplit[1], 0,0 ); 
        
        //REMOVE ALL OPTIONS FROM THE END TIME FIELD
        while (endTimeElement.lastChild) 
            { endTimeElement.removeChild(endTimeElement.lastChild); }

        //REPLACE THE DEFAULT OPTION
        var defaultOptionElement = document.createElement('option'); // create new option element
        defaultOptionElement.appendChild( document.createTextNode('N/A') ); //set the label
        defaultOptionElement.value = ''; //set the value
        endTimeElement.appendChild(defaultOptionElement); //add it
        //ADD THE NEW TIMES/OPTIONS
        var tempDateTime = new Date(selectedDateTime.toString()); //used to interate the new times
        var lastDateTime = new Date(tempDateTime.toString());
        lastDateTime.setHours(selectedDateTime.getHours() + maxActivityHours); //the last time in the range
        while (tempDateTime < lastDateTime)
        {    
            var labelString = makeStandardTime(tempDateTime.getHours()) + ":" + makeTwoDigits(tempDateTime.getMinutes()) + " " + getAMPM(tempDateTime.getHours());
            var valueString = makeTwoDigits(tempDateTime.getHours()) + ":" + makeTwoDigits(tempDateTime.getMinutes());
                
            var tempOptionElement = document.createElement('option'); // create new option element            
            tempOptionElement.appendChild( document.createTextNode(labelString)); //set the label
            tempOptionElement.value = valueString; //set the value
            endTimeElement.appendChild(tempOptionElement); //add it

            tempDateTime.setMinutes(tempDateTime.getMinutes() + activityTimeIncrement); //calculate the next time increment
        }    
        endTimeElement.classList.remove("disable"); //un-disable the endtime field

    }, false);
    }
    //EVENT HANDLER TO SET SECOND BUNDLE DAY ONCE FIRST BUNDLE DAY IS SELECTED
    if (testType != "community") {
//	    document.getElementById("dow1").addEventListener("change", function (e)
//	    {
//	    	var dayTwoElement = document.getElementById("dow2");
//	        var selectedDayString = parseInt(e.currentTarget.value);
//	        
//	        if (isNaN(selectedDayString)) {
//	        	selectedDayString = parseInt("-1");
//	        }
//	
//	        //REMOVE ALL OPTIONS FROM THE END TIME FIELD
//	        while (dayTwoElement.lastChild) 
//	            { dayTwoElement.removeChild(dayTwoElement.lastChild); }
//			
//			//REPLACE THE DEFAULT OPTION
//	        var defaultOptionElement = document.createElement('option'); // create new option element
//	        defaultOptionElement.appendChild( document.createTextNode('No 2nd Reminder') ); //set the label
//	        defaultOptionElement.value = ''; //set the value
//	        dayTwoElement.appendChild(defaultOptionElement); //add it
//	
//	        //ADD THE NEW TIMES/OPTIONS
//	        var tempDay = selectedDayString+1;
//	        
//	        while (tempDay <= 6)
//	        {    
//				var labelString = getDayName(tempDay);
//				var tempOptionElement = document.createElement('option'); // create new option element            
//				tempOptionElement.appendChild( document.createTextNode(labelString)); //set the label
//				tempOptionElement.value = tempDay; //set the value
//				dayTwoElement.appendChild(tempOptionElement); //add it
//				tempDay++;
//	        }
//	        dayTwoElement.classList.remove("disable"); //un-disable the endtime field
//	    }, false);
	}
        
        $(".dow1").change(function(){
                 if ($("#shrtfrm").is(":visible")) {
        var currentform = $("#shrtfrm");
    } else {
        var currentform = $("#advfrm");
    }
	    	var dayTwoElement = currentform.find("#dow2");
	        var selectedDayString = $(this).val();
	        
	        if (isNaN(selectedDayString)) {
	        	selectedDayString = parseInt("-1");
	        }
	
			dayTwoElement.find('option:not(:first)').remove();
			//REPLACE THE DEFAULT OPTION
	
	        //ADD THE NEW TIMES/OPTIONS
	        var tempDay = parseInt(selectedDayString)+1;
	         //console.log("TEMPdAY-"+tempDay);
	        while (tempDay <= 6)
	        {    
				var labelString = getDayName(tempDay);
                                //console.log("text-"+labelString+", val-"+tempDay);
                                dayTwoElement.append($(document.createElement("option")).
                        attr("value",tempDay).text(labelString));
                                
				tempDay++;
	        }
	        dayTwoElement.removeClass("disable"); 
        });

});



function resetAddBundleSection()
{
       if ($("#shrtfrm").is(":visible")) {
        var currentform = $("#shrtfrm");
    } else {
        var currentform = $("#advfrm");
    }
	currentform.find('#createbundle_row').hide(); //hide the add question button
	currentform.find('#createbundle').show(); //show the create question button
}


/*
function resetAddQuestionSection()
{
	$('#enter-question').val(defaultQuestionText);
	$('#answer_type').val(defaultAnswerTypeText);
	$('#possible_answers').val(defaultPossibleAnswersText);
	$('#count-toward-total').removeAttr('checked');
	
	$('#createquestion_row').hide(); //hide the add question button
	$('#createquestion').show(); //show the create question button
	$('#questions-next_activity_step').removeClass('disable'); //disable the next button
}
*/

function resetAddQuestionSection()
{
     if ($("#shrtfrm").is(":visible")) {
        var currentform = $("#shrtfrm");
    } else {
        var currentform = $("#advfrm");
    }
    currentform.find('#enter-question').val(defaultQuestionText);
    currentform.find('#enter-question').addClass('placeholder-value');

    currentform.find('#answer_type').val(defaultAnswerTypeText);
    currentform.find('#isRequired').val(defaultisRequiredText);
    
    currentform.find('#possible_answers').val(defaultPossibleAnswersText);
    currentform.find('#possible_answers').addClass('placeholder-value');
    
    //kept this in javascript to match what is happening in the possibleAnswers() function in the html
    currentform.find('#ans_row').css("display", "none");
    currentform.find('#space_row').css("display", "");

    currentform.find('#count-toward-total').removeAttr('checked');

    currentform.find('#createquestion_row').hide(); //hide the add question button
    currentform.find('#createquestion').show(); //show the create question button
    currentform.find('#questions-next_activity_step').removeClass('disable'); //disable the next button
}


function displaySaveError(errorMessage)
{
     if ($("#shrtfrm").is(":visible")) {
            var currentform = $("#shrtfrm");
        } else {
            var currentform = $("#advfrm");
        }
	if(errorMessage == "")
		currentform.find('#question-save-error').text(''); //clear it out
	else
		currentform.find('#question-save-error').text(errorMessage);
}

function displayBundleSaveError(errorMessage)
{
     if ($("#shrtfrm").is(":visible")) {
            var currentform = $("#shrtfrm");
        } else {
            var currentform = $("#advfrm");
        }
	if(errorMessage == "")
		currentform.find('#bundle-save-error').text(''); //clear it out
	else
		currentform.find('#bundle-save-error').text(errorMessage);
}

function getObject(obj){if(document.getElementById){return document.getElementById(obj);}else{if(document.all){return document.all[obj];}}}

function chkRadio(obj){
	switch(obj.id) {
		case "e_dom":
			getObject('e_monthly1').checked = true;
			getObject('e_dow_card').value = "0";
			getObject('e_dow_day').value = "";
			getObject('e_dow_month_recur').value = "0";
			break;
		case "e_dom-adv":
			getObject('e_monthly1-adv').checked = true;
			getObject('e_dow_card-adv').value = "0";
			getObject('e_dow_day-adv').value = "";
			getObject('e_dow_month_recur-adv').value = "0";
			break;
		case "e_dom_month_recur":
			getObject('e_monthly1').checked = true;
			getObject('e_dow_card').value = "0";
			getObject('e_dow_day').value = "";
			getObject('e_dow_month_recur').value = "0";
			break;
		case "e_dom_month_recur-adv":
			getObject('e_monthly1-adv').checked = true;
			getObject('e_dow_card-adv').value = "0";
			getObject('e_dow_day-adv').value = "";
			getObject('e_dow_month_recur-adv').value = "0";
			break;
		case "e_dow_card":
			getObject('e_monthly2').checked = true;
			getObject('e_dom').value = "0";
			getObject('e_dom_month_recur').value = "0";
			break;
		case "e_dow_card-adv":
			getObject('e_monthly2-adv').checked = true;
			getObject('e_dom-adv').value = "0";
			getObject('e_dom_month_recur-adv').value = "0";
			break;
		case "e_dow_day":
			getObject('e_monthly2').checked = true;
			getObject('e_dom').value = "0";
			getObject('e_dom_month_recur').value = "0";
			break;
		case "e_dow_day-adv":
			getObject('e_monthly2-adv').checked = true;
			getObject('e_dom-adv').value = "0";
			getObject('e_dom_month_recur-adv').value = "0";
			break;
		case "e_dow_month_recur":
			getObject('e_monthly2').checked = true;
			getObject('e_dom').value = "0";
			getObject('e_dom_month_recur').value = "0";
			break;
		case "e_dow_month_recur-adv":
			getObject('e_monthly2-adv').checked = true;
			getObject('e_dom-adv').value = "0";
			getObject('e_dom_month_recur-adv').value = "0";
			break;
	}
        
        if($(".monthly-form-options").hasClass( "error-field" )){
            $(".monthly-form-options").removeClass("error-field");
        }
        $('input[name^=e_monthly]:visible:not(:checked)').first().closest('tr').find('select').each(function () {
            if($(this).hasClass("error-field")){
              $(this).removeClass("error-field")
            }
        });
}

function getPotentialParentQuestions(orgID, privateKey, cookieName)
{
	var qArray = new Array();
	var jsonParams = '{"orgId":"' + orgID + '"}'; 
	var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly
	var url = '/private/admin/api/v1/question/getParentQuestions?json=' + rawurlencoded_json_string + '&key=' + privateKey;
	
	$.getJSON(url, function(data) 
	{
		//grab the 3 components of the response
		var statusCode = data.status; //a string
   	    var messageText = data.message; //a string
        var response = data.response; //an object
        if(statusCode == "200") //Everything is OK
        {
    		//grab the data
    		var potentialParents = response.potentialParents; //inside the repsonse object is an array of question data
    		document.getElementById('questionParent').options.length = 0;
    		document.getElementById('questionParent').options[0] = new Option ("", "");
    		$.each(potentialParents, function(key, value) {
    			$('#questionParent').append($('<option></option>', {
    				value: key,
    				text: value
    			}));
    		});
		}
	});
}

//AJAX FUNCTION USED TO RETRIEVE ALL QUESTIONS FOR A PARTICULAR OrgID

function getQuestionsForOrganization(orgID, eventID, date, context, privateKey)

{

	var qArray = new Array();

	// FIRST GET AN ARRAY OF THE QUESTIONS SELECTED FOR THIS ACTIVITY/EVENT

	//MAKE THE URL USED TO CALL THE API

	var jsonParams = '{"orgId":"' + orgID + '",' +

					'"eventId":"' + eventID + '",' +

					'"date":"' + date  + '",' +

					'"context":"' + context  + '"' +

					'}'; 

					
	//console.log('params:' + jsonParams);

	var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly

	

	var url = '/private/admin/api/v1/question/getQuestionsForEvent?json=' + rawurlencoded_json_string + '&key=' + privateKey;

    
	//console.log('get questions for event url: ' + url);

    

    //ajax the questions data and display it

    $.getJSON(url, function(data) 

    {

    	//grab the 3 components of the response

    	var statusCode = data.status; //a string

   	    var messageText = data.message; //a string

        var response = data.response; //an object

		

        //console.log('status code:' + statusCode);

        //console.log('message text:' + messageText);

        //console.log('response:' + response);



        if(statusCode == "200") //Everything is OK

        {

    		//grab the data

    		var signupQs = response.signupQuestions; //inside the repsonse object is an array of question data
			//console.log('qArray:' + signupQs);

    		qArray = signupQs.split('|');

		}

	});

	

	

	//MAKE THE URL USED TO CALL THE API

	var jsonParams = '{"orgId":"' + orgID + '"}'; //create the single param in json format
	//console.log('params:' + jsonParams);

	var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly



    var url = '/private/admin/api/v1/question/getList?json=' + rawurlencoded_json_string + '&key=' + privateKey;

    
	//console.log('get questions url: ' + url);

	

	//ajax the questions data and display it

    $.getJSON(url, function(data) 

    {

    	//grab the 3 components of the response

    	var statusCode = data.status; //a string

   	    var messageText = data.message; //a string

        var response = data.response; //an object



        //console.log('status code:' + statusCode);

        //console.log('message text:' + messageText);

        //console.log('response:' + response);



        if(statusCode == "200") //Everything is OK

        {

        	//CLEAR THE QUESTIONS FROM THE DOM

    		$("#question-container").find("tr:gt(0)").remove(); //remove all rows except the first one



        	var signupQuestions = response.signupQuestions; //inside the repsonse object is an array of question data
			//console.log('signupQuestions:' + signupQuestions);

			var i = 1;

        	

        	$.each(signupQuestions, function(index, object) //iterate through each set of question data

        	{

        		//grab the data

            	var questionID = object.questionId;

            	var questionText = object.question;

            	var answerType = object.answerType;

				var isRequired = object.isRequired;

            	//append a new row with the data into the DOM

            	var str1;

            	var str2;

            	var str3;

            	str1 = '<tr><td class="questionss"><input type="checkbox" name="q_' + questionID + '" id="q_' + questionID + '" value="1" ';

            	if (qArray.indexOf(questionID) > -1) {

            		str2 = 'checked="checked" ';

            	} else {

            		str2 = '';

            	}
            	
            	str3 = '/><p>';
            	
            	if (isRequired == 1) {
            		str3 += '[Mandatory] ';
            	}
            	str3 += questionText + '</p><br/></td></tr>';
				
            	var rowContent = str1.concat(str2).concat(str3);
				//console.log('row ' + i + ':' + rowContent);

            	$("#question-container").append(rowContent); 

            	i = i+1;

        	});



        	resetAddQuestionSection() //reset the form so that another question can be added 

        	displaySaveError(""); //remove any previously displayed errors

        }

        else //an error occured

        {

        	//CLEAR THE QUESTIONS FROM THE DOM

    		$("#question-container").find("tr:gt(0)").remove(); //remove all rows except the first one



    		//INSERT THE ERROR MESSAGE

        	var rowContent = '<tr><td class="questionss">An error occured while updating the questions: <i>' + messageText + '</i></td></tr>';

			$("#question-container").append(rowContent); 

        }

    });

}



function getBundlesForOrganization(orgID, context, privateKey, selectedBundle)
{
    if ($("#shrtfrm").is(":visible")) {
            var currentform = $("#shrtfrm");
        } else {
            var currentform = $("#advfrm");
        }
	//MAKE THE URL USED TO CALL THE API
	var jsonParams = '{"orgId":"' + orgID + '",' +
					'"context":"' + context  + '"' +
					'}'; 
	//console.log('params:' + jsonParams);
	var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly

    var url = '/private/admin/api/v1/bundle/getList?json=' + rawurlencoded_json_string + '&key=' + privateKey;
    
    //console.log('get bundle url: ' + url);
	
	//ajax the questions data and display it
    $.getJSON(url, function(data) 
    {
    	//grab the 3 components of the response
    	var statusCode = data.status; //a string
   	    var messageText = data.message; //a string
        var response = data.response; //an object
        
        //console.log('status code:' + statusCode);
        //console.log('message text:' + messageText);
        //console.log('response:' + response);

        if(statusCode == "200") //Everything is OK
        {
        	//CLEAR THE QUESTIONS FROM THE DOM
    		//$("#bundle-container").find("tr:gt(0)").remove(); //remove all rows except the first one

        	var bundles = response.bundles; //inside the repsonse object is an array of bundle data
			//console.log('bundles:' + bundles);
			var i = 1;
			var html = '';
			var activityType = '';
			if (context == "group") {
				activityType = "Activities";
			} else if (context == "community") {
				activityType = "Events";
			}
			
			if (bundles.length == 1) {
				html += "<tr><td class='questionss'><strong>Send as part of which bundle?</strong><br/></td></tr>";
				html += "<tr><td height=\"10\"> </td></tr><tr width=\"408\"><td width=\"408\"><table width=\"408\"><tr><th width=\"5%\" style=\"padding:3px;\">&nbsp;</th>";
				html += "<th align=\"left\" width=\"20%\" style=\"padding:3px; vertical-align:bottom;\">Name</th>";
				html += "<th align=\"left\" width=\"15%\" style=\"padding:3px; vertical-align:bottom;\">1st<br/>Bundle</th>";
				html += "<th align=\"left\" width=\"15%\" style=\"padding:3px; vertical-align:bottom;\">2nd<br/>Bundle</th>";
				html += "<th align=\"left\" width=\"15%\" style=\"padding:3px; vertical-align:bottom;\">Num<br/>Days</th>";
				html += "<th align=\"left\" width=\"30%\" style=\"padding:3px; vertical-align:bottom;\">"+activityType+"<br/>In Bundle</th></tr></table>";
			}
        	html += "<table width=\"408\">";
        	$.each(bundles, function(index, object) //iterate through each set of bundle data
        	{
        		//grab the data
            	var bundleID = object.bundleId;
            	var bundle = object.bundle;
            	var dow1 = getShortDayName(object.dow1);
            	var tmp = object.dow2;
            	var dow2 = '';
            	if (tmp != "N/A") {
            		dow2 = getShortDayName(tmp);
            	} else {
            		dow2 = tmp;
            	}
            	var bundleDays = object.bundleDays;
            	var activityList = object.activityList;
            	
            	//append a new row with the data into the DOM
            	var str1;
            	var str2;
            	str1 = "<tr>\n<td width=\"5%\" style=\"padding:3px;\"><input type=\"radio\" name=\"bundle\" id=\"bundle\" value=\""+bundleID+"\" ";
				if (bundles.length == 1 || bundleID == selectedBundle) {
					str1 += "checked=\"checked\" ";
				}
				str2 = "/>\n</td><td align=\"left\" width=\"20%\" style=\"padding:3px;\">"+bundle+"</td>\n<td align=\"left\" width=\"15%\" style=\"padding:3px;\">"+dow1+"</td>";
				str2 += "<td align=\"left\" width=\"15%\" style=\"padding:3px;\">"+dow2+"</td><td align=\"left\" width=\"15%\" style=\"padding:3px;\">"+bundleDays+"</td>";
				str2 += "<td align=\"left\" width=\"30%\" style=\"padding:3px;\">"+activityList+"</td></tr>\n";
            	var rowContent = str1.concat(str2);
            	
            	//console.log('row ' + i + ':' + rowContent);
            	html += rowContent;
            	//$("#bundle-container").append(rowContent); 
            	i = i+1;
        	});
        	html += "</table></td></tr>";
                currentform.find("#bundle-container").html(html);
        	//$("#bundle-container").html(html);
        	resetAddBundleSection() //reset the form so that another question can be added 
        	displaySaveError(""); //remove any previously displayed errors
        }
        else //an error occured
        {
        	//CLEAR THE QUESTIONS FROM THE DOM
    		currentform.find("#bundle-container").find("tr:gt(0)").remove(); //remove all rows except the first one

    		//INSERT THE ERROR MESSAGE
        	var rowContent = '<tr><td class="questionss">An error occured while updating the bundles: <i>' + messageText + '</i></td></tr>';
			currentform.find("#bundle-container").append(rowContent); 
        }
    });
}

function getDayName(dow) {
	// Returns the shortened day name from number identifier (where Sunday is 0)
	if (dow == "0") {
		return "Sunday";
	} else if (dow == "1") {
		return "Monday";
	} else if (dow == "2") {
		return "Tuesday";
	} else if (dow == "3") {
		return "Wednesday";
	} else if (dow == "4") {
		return "Thursday";
	} else if (dow == "5") {
		return "Friday";
	} else if (dow == "6") {
		return "Saturday";
	}
}

function getShortDayName(dow) {
	// Returns the shortened day name from number identifier (where Sunday is 0)
	if (dow == "0") {
		return "Sun";
	} else if (dow == "1") {
		return "Mon";
	} else if (dow == "2") {
		return "Tues";
	} else if (dow == "3") {
		return "Wed";
	} else if (dow == "4") {
		return "Thur";
	} else if (dow == "5") {
		return "Fri";
	} else if (dow == "6") {
		return "Sat";
	}
}

//INSERTS A NEW QUESTION INTO THE BOTTOM OF THE "INCLUDE" SECTION
/*
function insertNewQuestionIntoDOM(question, id)
{
    var html = '<li  id="q_' + id + '" class="withBox"><span class="withDragHandle"></span><span>' + question + '</span></li><input name="q_' + id + '" type="checkbox" value="1" style="display:none"/>';
    $(html).insertBefore("#questions-do-not-include");
}
*/
//INSERTS A NEW QUESTION INTO THE BOTTOM OF THE "INCLUDE" SECTION
function insertNewQuestionIntoDOM(question, id, isRequired, parentQuestion)
{
      if ($("#shrtfrm").is(":visible")) {
            var currentform = $("#shrtfrm");
        } else {
            var currentform = $("#advfrm");
        }
    //if the "include" section is empty, remove the empty question placeholder
    var previousElement = currentform.find("#questions-do-not-include").prev();
    if(previousElement.attr("id") == "empty-question")
        {previousElement.remove();}

    var html = '<li id="q_' + id + '" class="withBox"><span class="withDragHandle"></span><span>';
    if (isRequired == 1) {
    	html += '* ';
    }
    
    if ((typeof parentQuestion !== 'undefined') && (parentQuestion != '')) {
    	html += '[child] ';
    }
    html += question + '</span></li><input name="q_' + id + '" type="checkbox" value="1" style="display:none"/>';
    $(html).insertBefore(currentform.find("#questions-do-not-include"));
    
    // Added to fix bug when adding new questions
    //loop through all "include" questions and figure out the new sort order
    var sortOrder = "";
    var questionContainerChildren = currentform.find('#question-container').children();
    currentform.find('#question-container').children().each(function () {
         var childID = $(this).attr("id");   
    if(childID == "questions-do-not-include"){
         return false;
    }

        
        if($(this).prop("tagName").toLowerCase() == "li") //we only care about the <li> elements
        {
            //if we are a question element then add this question to the sort order        
            if ((childID.indexOf("include") == -1) && (childID.indexOf("empty") == -1))
                {sortOrder += childID + ",";}
        }
});
//    for(var i=0; i < questionContainerChildren.length; ++i)
//    {
//        if(childID == "questions-do-not-include") // if we hit the the "not include" section then we're done
//            {break;}
//
//        var childID = questionContainerChildren[i].attr("id");    
//        if(questionContainerChildren[i].prop("tagName").toLowerCase() == "li") //we only care about the <li> elements
//        {
//            //if we are a question element then add this question to the sort order        
//            if ((childID.indexOf("include") == -1) && (childID.indexOf("empty") == -1))
//                {sortOrder += childID + ",";}
//        }
//    }   

    //save the sort order field
    currentform.find('[name="question_sort_order"]').val(sortOrder.slice(0,-1)); //save and remove last comma
    
    resetAddQuestionSection() //reset the form so that another question can be added 
    displaySaveError(""); //remove any previously displayed errors
    //in case this was the first question added, show the drag/drop structure
    currentform.find('#hidden-structure').css("display", "");
    currentform.find('#no-questions').css("display", "none");
}


//AJAX FUNCTION USED TO SAVE A NEW QUESTION TO THE GV DATABASE

function saveQuestionToDatabase(orgID, privateKey, question, answerType, countTowardMax, possibleValues, eventID, date, context, isRequired, includeMember, parentQuestion, isReservationTimeQuestion)

{

	//MAKE THE URL USED TO CALL THE API
	
	var jsonParams = '{"orgId":"' + orgID + '",' +

					'"question":"' + question  + '",' +

					'"answerType":"' + answerType  + '",' +

					'"countTowardMax":"' + countTowardMax + '",' +
					
					'"includeMember":"' + includeMember + '",' +

					'"possibleValues":"' + possibleValues + '",' +
					
					'"parentQuestion":"' + parentQuestion + '",' +
					
					'"isReservationTimeQuestion":"' + isReservationTimeQuestion + '",' +
					
					'"isRequired":"' + isRequired  + '"' +

					'}'; 


	//console.log('params:' + jsonParams);

	

	var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly

	

    var url = '/private/admin/api/v1/question/addNew?json=' + rawurlencoded_json_string + '&key=' + privateKey;

    
	//console.log('get questions url: ' + url);

	

	//ajax the questions data and display it

    $.getJSON(url, function(data) 

    {

    	//grab the error message from the response

   	    var statusCode = data.status;

   	    var messageText = data.message;

   	    var questionId = data.response.questionId;

        

        //console.log('message code:' + statusCode);

        //console.log('message text:' + messageText);

        //console.log('new question ID:' + questionId);



        if(statusCode == "200") //Everything is OK

        {

        	//getQuestionsForOrganization(orgID, eventID, date, context, privateKey); 
            insertNewQuestionIntoDOM(question, questionId, isRequired, parentQuestion);
        }

        else

        {

        	displaySaveError(messageText);

        }

    });

}



function saveBundleToDatabase(orgID, privateKey, dow1, dow2, context, bundleDays, selectedBundle)

{

	//MAKE THE URL USED TO CALL THE API

	var jsonParams = '{"orgId":"' + orgID + '",' +

					'"dow1":"' + dow1  + '",' +

					'"dow2":"' + dow2  + '",' +
					
					'"bundleDays":"' + bundleDays  + '"' +

					'}'; 



	//console.log('params:' + jsonParams);

	

	var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly

	

    var url = '/private/admin/api/v1/bundle/addNew?json=' + rawurlencoded_json_string + '&key=' + privateKey;

    //console.log('get bundle url: ' + url);

	

	//ajax the questions data and display it

    $.getJSON(url, function(data) 

    {

    	//grab the error message from the response

   	    var statusCode = data.status;

   	    var messageText = data.message;

        

        //console.log('message code:' + statusCode);

        //console.log('message text:' + messageText);



        if(statusCode == "200") //Everything is OK

        {

        	getBundlesForOrganization(orgID, context, privateKey, selectedBundle); 

        }

        else

        {

        	displayBundleSaveError(messageText);

        }

    });

}



function addQuestion(orgID, eventID, date, context, privateKey)

{

	$ = jQuery.noConflict();
 if ($("#shrtfrm").is(":visible")) {
            var currentform = $("#shrtfrm");
        } else {
            var currentform = $("#advfrm");
        }
	//GRAB THE VALUES FROM THE FORM

	var question = currentform.find('#enter-question').val();
	var answerType = currentform.find('#answer_type').val();

	var possibleValuesRaw = currentform.find('#possible_answers').val();

	

	//REPLACE LINE BREAKS WITH PIPE |

	var possibleValues = possibleValuesRaw.replace(/(?:\r\n|\r|\n)/g, '|');



	var countTowardMax = (currentform.find('#count-toward-total').is(':checked') == true) ? 1 : 0;
	
	var includeMember = (currentform.find('#includeMemberQ').val());
	
	var isRequired = currentform.find('#isRequired').val();
	
	var parentQuestion = currentform.find('#questionParent').val();
	
	var isReservationTimeQuestion = currentform.find('#isReservationTimeQuestion').val();

	//console.log('isRequired: ' + isRequired);

	//console.log('answers: ' + possibleValues);

	//console.log('answer Type: ' + answerType);

	//console.log('countTowardMax: ' + countTowardMax);

	

	//DATA VALIDATION
	
	if(question == "" || question == defaultQuestionText)

	{

		displaySaveError("You must enter a question");

		return;

	}

	if(answerType == "" || answerType == defaultAnswerTypeText)

	{

		displaySaveError("You must select an answer type");

		return;

	}

	if(answerType == "checkbox" || answerType == "radio" || answerType == "select")

	{

		if(possibleValues == "" || possibleValues == defaultPossibleAnswersText)

		{	

			displaySaveError("You must enter a set of possible answers");

			return;	

		}

	}

	else

	{

		possibleValues = ""; //not needed so let's make sure it's empty

	}



	saveQuestionToDatabase(orgID, privateKey, question, answerType, countTowardMax, possibleValues, eventID, date, context, isRequired, includeMember, parentQuestion, isReservationTimeQuestion);

}



function addBundle(orgID, context, privateKey, selectedBundle)

{

	$ = jQuery.noConflict();

 if ($("#shrtfrm").is(":visible")) {
            var currentform = $("#shrtfrm");
        } else {
            var currentform = $("#advfrm");
        }
	//GRAB THE VALUES FROM THE FORM

	var dow1 = currentform.find('#dow1').val();

	var dow2 = currentform.find('#dow2').val();
	
	var bundleDays = currentform.find('#bundleDays').val();
	
	//DATA VALIDATION

	if (dow1 == "")

	{

		displayBundleSaveError("You must choose a day for the first reminder");

		return;

	}

	

	if (dow2 == "") 

	{

		dow2 = "N/A";

	}
	
	
	if (bundleDays == "")

	{

		displayBundleSaveError("You must choose the number of days for the bundle to include");

		return;

	}



	saveBundleToDatabase(orgID, privateKey, dow1, dow2, context, bundleDays, selectedBundle);

}



function createQuestion(orgId, privateKey)

{
      if ($("#shrtfrm").is(":visible")) {
            var currentform = $("#shrtfrm");
        } else {
            var currentform = $("#advfrm");
        }
        
        
    getPotentialParentQuestions(orgId, privateKey, '');

	//NOTE: KLUDGE - JAVASCRIPT IS USED BECAUSE OF JQUERY VERSION CONFLICT

	//ie. THIS FUNCTION CAN BE CALLED AT ANY TIME AND LEGACY CODE SWITCHES JQUERY VERSIONS INCONSISTANTLY
		currentform.find('#createquestion_row').css("display", "");
        currentform.find('#includeMemberRow').css("display", "none");
        currentform.find('#createquestion').css("display", "none");
        currentform.find('#next_activity_step').addClass("disable");;
//	document.getElementById('createquestion_row').style.display = ""; //show the add question section
//
//	document.getElementById('createquestion').style.display = "none"; //hide the create question button
//
//	document.getElementById('questions-next_activity_step').classList.add('disable'); //disable the next button



	//$('#createquestion_row').show(); //show the add question section

    //$('#createquestion').hide(); //hide the create question button

    //$('#questions-next_activity_step').addClass('disable'); //disable the next button

}



function createBundle()

{
  if ($("#shrtfrm").is(":visible")) {
            var currentform = $("#shrtfrm");
        } else {
            var currentform = $("#advfrm");
        }
        
        currentform.find("#createbundle_row").show();
        currentform.find("#createbundle").hide();
	//NOTE: KLUDGE - JAVASCRIPT IS USED BECAUSE OF JQUERY VERSION CONFLICT

	//ie. THIS FUNCTION CAN BE CALLED AT ANY TIME AND LEGACY CODE SWITCHES JQUERY VERSIONS INCONSISTANTLY
//
//	document.getElementById('createbundle_row').style.display = ""; //show the add question section
//
//	document.getElementById('createbundle').style.display = "none"; //hide the create question button

	//document.getElementById('questions-next_activity_step').classList.add('disable'); //disable the next button



	//$('#createquestion_row').show(); //show the add question section

    //$('#createquestion').hide(); //hide the create question button

    //$('#questions-next_activity_step').addClass('disable'); //disable the next button

}



function cancelAddQuestion()

{
  if ($("#shrtfrm").is(":visible")) {
            var currentform = $("#shrtfrm");
        } else {
            var currentform = $("#advfrm");
        }
	//NOTE: KLUDGE - JAVASCRIPT IS USED BECAUSE OF JQUERY VERSION CONFLICT

	//ie. THIS FUNCTION CAN BE CALLED AT ANY TIME AND LEGACY CODE SWITCHES JQUERY VERSIONS INCONSISTANTLY

	currentform.find("#createquestion_row").hide();
	currentform.find("#createquestion").show();
	currentform.find("#questions-next_activity_step").removeClass("disable");

//	document.getElementById('createquestion_row').style.display = "none"; //hide the add question section
//
//	document.getElementById('createquestion').style.display = ""; //show the create question button
//
//	document.getElementById('questions-next_activity_step').classList.remove('disable'); //enable the next button

}



function cancelAddBundle()

{

 if ($("#shrtfrm").is(":visible")) {
            var currentform = $("#shrtfrm");
        } else {
            var currentform = $("#advfrm");
        }
        currentform.find("#createbundle_row").hide();
        currentform.find("#createbundle").show();
	//NOTE: KLUDGE - JAVASCRIPT IS USED BECAUSE OF JQUERY VERSION CONFLICT

	//ie. THIS FUNCTION CAN BE CALLED AT ANY TIME AND LEGACY CODE SWITCHES JQUERY VERSIONS INCONSISTANTLY

	

	document.getElementById('createbundle_row').style.display = "none"; //hide the add question section

	document.getElementById('createbundle').style.display = ""; //show the create question button

	//document.getElementById('questions-next_activity_step').classList.remove('disable'); //enable the next button

}

//INSERTS AN EMPTY PLACEHOLDER INTO A SECTION
function insertEmptyQuestionElement(section)
{
	//console.log("insertEmptyQuestionElement");
    var htmlBefore = '<li id="empty-question" class="empty-question"><span>DRAG QUESTIONS HERE TO USE</span></li>';
    var htmlAfter = '<li id="empty-question" class="empty-question"><span>NO QUESTIONS</span></li>';
    
    if(section == "include")
        { $(htmlBefore).insertBefore("#questions-do-not-include"); }
    else
        { $(htmlAfter).insertAfter("#questions-do-not-include"); }
}