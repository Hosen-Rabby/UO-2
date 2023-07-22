var eventsObject = {}; // holds all of our bookings for the calendar view
eventsObject.events = new Array();
var lastSelectedEndTime = new Date("1980","1","1"); //used to remember the last user-selected end time in the booking dialog 

function convertGVStringDateToJSDate(date) //converts YYYY-MM-DD String to JS Date
{
  var splitDate = date.split("-");
  return new Date(splitDate[0],splitDate[1]-1,splitDate[2]); 
}

function isValidGVDate(dateToTest)
{
  if(typeof dateToTest == 'undefined' || dateToTest == '' || dateToTest == '0000-00-00') {
    //console.log("not a valid date!");
    return false;
  }
    
  else
    return true;
}

$(document).ready(function() 
{

isManager = php_managerIds.split(',').indexOf(php_usrpwId) > -1;
var catgrp = php_catgrp;

//console.log("isManager: " + isManager);


/*LOAD TOGGLE SWICTH*/
if($.isFunction($.fn.toggles))
{
	setTimeout(
		function(){
			
            /*
            //old toggle code
				$('.toggle.update_31-10-14').toggles({
					'drag':false,
					'height':25,
					'event':'update_31_10_14_toogle_cal',
					text:{on:'Enabled',off:'Disabled'},
					'on': php_isActive == 1 ? true:false //The starting state of the toggle switch
				})
*/
			
		},
			500 //intval for startup
	);
}
else
{
	setTimeout(
		function(){
			//$('.toggle.update_31-10-14').remove();
		},500
	)
}

//extension of the date class that adds days to a date
Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

// return the  number of days between one DOW (numberical 0-6) and another
function getNumberOfDaysBetween(bookingDateDOW, cantBookBeforeDOW)
{

  var i = bookingDateDOW;
  var daysBetween = 0;

  //figure out the nuber of days between the bookingdate and the cantBookBeforeDOW
  while (i != cantBookBeforeDOW) 
  { 
    i = (i == 0) ? 6 : i-1;
    daysBetween++;
  }
  //console.log("daysBetween: " + daysBetween);

  if(bookingDateDOW == cantBookBeforeDOW) 
    return 7; //if the same DOW then it's implied that we go to the prev week
  else
    return daysBetween;
}

//converts a date to a human readable/verbose string
function convertDateToVerbose(dateToConvert)
{
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var dows = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  var month = dateToConvert.getMonth();
  var dow = dateToConvert.getDay();
  var date = dateToConvert.getDate();
  var year = dateToConvert.getFullYear();

  return dows[dow] + ", " + months[month] + " " + date + ", " + year;
} 

//if the calendar manager has selected a start and end date for the calendar
//we make sure the calendar adhere's to those rules
function calculateBookingWindowForCalendar()
{
  //console.log("calculate booking window...");

  var startDate = isValidGVDate(php_calStartDate) ? convertGVStringDateToJSDate(php_calStartDate) : null;
  var endDate = isValidGVDate(php_calEndDate) ? convertGVStringDateToJSDate(php_calEndDate) : null;

  //console.log("startDate: %o", startDate);
  //console.log("endDate: %o", endDate);
  //console.log("baseDate: %o", baseDate);

  for (var i = 0; i < 7; i++) //loop through all the days of week
  {
    var testDate = baseDate.addDays(i);
    //console.log("testDate: %o", testDate);    
    if(testDate < startDate && startDate != null) { //block out days before the start date
      makeDayUnavailable(testDate);
    }
    if(testDate > endDate & endDate != null) { //block out days after the end date
      makeDayUnavailable(testDate);
    }
  };
}

//validate against the manager's rules for when a user can book (e.g. not until the previous saturday)
function getCantBookBeforeDate(serviceId, calEvent)
{
   //console.log("isManager:" + isManager);

   //if the user is not a manager and there's a booking window setup
   // for this service then check against those rules
   if(typeof php_serviceDetails["windowPriorDay_"+serviceId] != 'undefined' 
    && typeof php_serviceDetails["windowDays_"+serviceId] != 'undefined' 
    && isManager == false)
   {
      //figure out the number of days between the booking date and the DOW the window starts
      var cantBookBeforeDOW = php_serviceDetails["windowPriorDay_"+serviceId];
      //alert("cantBookBeforeDOW: %o", cantBookBeforeDOW);
      //console.log("cantBookBeforeDOW: %o", cantBookBeforeDOW);
      var bookingDateDOW = calEvent.start.getDay();
      //console.log("bookingDateDOW: %o", bookingDateDOW);         
      var daysBetween = getNumberOfDaysBetween(bookingDateDOW, cantBookBeforeDOW);

      //make both, DATES only (no time)
      var cantBookBeforeDate = new Date();
      cantBookBeforeDate.setDate(calEvent.start.getDate() - daysBetween);
      cantBookBeforeDate.setHours(0,0,0,0);
      //console.log("cantBookBeforeDate: " + cantBookBeforeDate);

      var todayDateOnly = new Date();
      todayDateOnly.setHours(0,0,0,0);
      //console.log("todayDateOnly: " + todayDateOnly);
         
      //check to see if this DOW should be checked against these rules
      DOWHasBookingWindow = php_serviceDetails["windowDays_"+serviceId].indexOf(bookingDateDOW) > -1;
      //console.log("DOWHasBookingWindow: " + DOWHasBookingWindow);
         
      //if the booking DOW has rules and todays date is BEFORE the start day of the booking window
      if(DOWHasBookingWindow == true && todayDateOnly < cantBookBeforeDate)
      {
        var dateVerbose = convertDateToVerbose(cantBookBeforeDate);
        return dateVerbose;
      }
      else return "";   
    }
    else
      return "";
}

//blocks out any given day as "Unavailable"
function makeDayUnavailable(dateToBlockOut)
{
  //console.log("makeDayUnavailable...");
  //console.log("dateToBlockOut: %o", dateToBlockOut);    

  var startTime = new Date(dateToBlockOut.getFullYear(),dateToBlockOut.getMonth(),dateToBlockOut.getDate(),dateToBlockOut.getHours()+php_dailyStartTime);
  var endTime = new Date(dateToBlockOut.getFullYear(),dateToBlockOut.getMonth(),dateToBlockOut.getDate(),dateToBlockOut.getHours()+php_dailyEndTime);

  //console.log("startTime: %o", startTime);
  //console.log("endTime: %o", endTime);

  var calEvent = {
        "id": id,
        "start": startTime,
        "end": endTime,
        "title": "Not Available",
        "classes": "OutOfBounds",
        "readOnly": true, 
  };
  //console.log(calEvent);
  id++;

  $('#calendar_update_31_10_14').weekCalendar("updateEvent", calEvent);
  //$('#calendar_update_31_10_14').weekCalendar('refresh');
}

function isTimeslotAvailable(id, startTime, endTime)
{
   //console.log("isDateBooked called...");

   //console.log("startTime :%o", startTime);
   //console.log("endTime :%o", endTime);
   //console.log("id :%o", id);

   var calEvents = [];
   var isAvailable = true;
   $calendar.find(".wc-cal-event").each(function() 
   {  
      //calEvents.push($(this).data("calEvent"));

     var event = $(this).data("calEvent");
      
      if( (id != event.id) && (typeof event.id != 'undefined'))
      {
         //console.log("event.start :%o", event.start);
         //console.log("event.end :%o", event.end);
         //console.log("event.id :%o", event.id);

         if( (startTime >= event.start && startTime < event.end) || (endTime > event.start && endTime <= event.end) )
         {
            //console.log("start or end is inside a booked event");
            isAvailable = false; 
         }
         if( (startTime < event.start && endTime > event.end) )
         {
            //console.log("start and end surround a booked event");
            isAvailable = false; 
         }
      } 
   });

   //console.log("isAvailable: " + isAvailable);
   
   return isAvailable;
}


//turns a javascript date into a 12 hour am/pm time
function formatAMPM(date) 
{
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


function addQTips()
{
   //console.log("addQTips called...");

   $calendar.find(".wc-cal-event").each(function() 
   {  
      var event = $(this).data("calEvent");
      var timesText = '';
      var titleText = event.title;
      
      if((event.classes != "NotAvailable") && (event.classes != "OutOfBounds")) {
         var timesText = '<br/>' + formatAMPM(event.start) + ' - ' + formatAMPM(event.end);
      }
      if(event.classes == "club_clinic" && isManager == true){
          titleText = event.club_clinic_text;
      }
      if(event.classes == "club_clinic" && isManager != true){
            timesText = '';
            var whocanseeclubclinic =  typeof event.whocanseeclubclinic != 'undefined' ? event.whocanseeclubclinic : ''; 
            if(whocanseeclubclinic == '1'){
                titleText =  'Not Available';
            }else{
                titleText = event.club_clinic_text;
            }
            //console.log(whocanseeclubclinic);    
      }
      var label = titleText + timesText;
      
      $(this).qtip(
         {
            content: label,
            style: {
               tip: { corner: true },
               width: 300
            },
            position: {
               adjust: { adjust: "flip flip"},
               corner: {
                  tooltip: 'bottomMiddle',
                  target: 'topMiddle'
               }
            },
            style: {
               backgroundColor: 'lightyellow',
               textAlign: 'center'
            }
         });

 
   });
}

function convertDateToGVDate(date)
{
   var commonMonth = date.getMonth()+1;
   var gvDate = date.getFullYear() + "-" + ('0' + commonMonth).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);
   return gvDate;
}

function convertDateToGVTime(date)
{
   var hours = date.getHours();
   var minutes = date.getMinutes();
   var seconds = date.getSeconds();
   //console.log("seconds: " + seconds);
   var gvTime = ('0' + hours).slice(-2) + ":" + ('0' + minutes).slice(-2) + ":" + ('0' + seconds).slice(-2);
   //console.log("converted to GV time: " + gvTime);
   return gvTime;
}

/*The function triggered on toggle change*/
/*
$('.update_31-10-14.toggle').live('update_31_10_14_toogle_cal',function(e,active)
{
	//active = true or false
	
	//Ajax to disable the calendar
   //console.log("enable/disable calendar...");

   var enable = active ? 1 : 0; //convert bool to int

   //MAKE THE URL USED TO CALL THE API
   var jsonParams = '{"calId":"' + php_calId + '", "enable":"' + enable + '"}'; //create the params in json format
   //console.log('params:' + jsonParams);
   
   var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly
   
   //var url = 'http://test.groupvalet.com/private/admin/api/v1/booking/toggleCalendar?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
   var url = '/private/admin/api/v1/booking/toggleCalendar?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;

   //console.log('url: ' + url);

   //ajax the calendar data and add it to the calendar view
   $.getJSON(url, function(data) 
   {
      //grab the components of the response
      var statusCode = data.status; //a string
      var messageText = data.message; //a string
      var response = data.response; //an object
      
      //console.log('status code:' + statusCode);
      //console.log('message text:' + messageText);
      //console.log('response:' + response);
      
      if(statusCode == "200") //Everything is OK
      {
         //console.log("success...");
      }
      else //an error occured
      {
         //console.log("handling ajax error...");

      }
    });  
})
*/

/*These functions should be used to get and set the bookings*/
	
//Get starting data in JSON format

//Get starting data in JSON format
function update_31_10_14_getEventData(start,end) 
{
   baseDate = start;

   //console.log("start date for calendar: %o", start);
   //console.log("end date for calendar: %o", end);

   if(dataIsReady == true) //if the data has already been retrieved, then just return it
   {
      //console.log("data is ready:" + JSON.stringify(eventsObject));
      dataIsReady = false; //reset the data refresh flag
      return eventsObject;
   }

   //else retrieve the data via ajax
   events = []; //clear out the calendar events array until we figure out the new data
  //console.log("getting refreshed data...");

   var firstSunday = convertDateToGVDate(start);

   //MAKE THE URL USED TO CALL THE API
   
   if(typeof $("#serviceidforajax").val() != "undefined"){
       var serviceId = $("#serviceidforajax").attr('serviceid');
   }else{
      var  serviceId = '';
   }
   var jsonParams = '{"calId":"' + php_calId + '", "commId":"' + php_commId + '", "sunday":"' + firstSunday + '", "userId":"' + php_usrpwId + '", "serviceId":"' + serviceId + '"}'; //create the params in json format
  //console.log('params:' + jsonParams);
   
   var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly

   //var url = 'http://test.groupvalet.com/private/admin/api/v1/booking/getCalendarData?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
   var url = '/private/admin/api/v1/booking/getCalendarData?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;

   //console.log('url: ' + url);

   //ajax the calendar data and add it to the calendar view
   $.getJSON(url, function(data) 
   {
   	//console.log(url);
      //grab the components of the response
      var statusCode = data.status; //a string
      var messageText = data.message; //a string
      var response = data.response; //an object
      
     //console.log('status code:' + statusCode);
     //console.log('message text:' + messageText);
     //console.log('response:' + response);
      
      if(statusCode == "200") //Everything is OK
      {
         //console.log("iterating booking data...");
         
         var bookings = new Array; //by default we're an empty array

         if(!jQuery.isEmptyObject(response)) //if the server returned some valid bookings
            bookings = response.bookings; //assign it to our array

         //console.log('bookings: %o', bookings);

         var i=1;
         var tempEvents = []; 
         $.each(bookings, function(index, object) //iterate through each booking object
         {
            //split out the date/time numbers so we can create a js Date Object from them
            //console.log(object);
            var bookedDate = object.bookedDate.split("-");
            var bookedLocalStartTime = object.bookedLocalStartTime.split(":");
            var bookedLocalEndTime = object.bookedLocalEndTime.split(":");
            //console.log("object.name: " + object.name);
            //console.log("object.start: " + object.bookedLocalStartTime);

            if (bookedLocalStartTime[0] < php_dailyStartTime) {
               bookedLocalStartTime[0] = php_dailyStartTime;
            }
            if (bookedLocalEndTime[0] > php_dailyEndTime) {
               bookedLocalEndTime[0] = php_dailyEndTime;
            }

            var startTime = new Date(bookedDate[0], bookedDate[1]-1, bookedDate[2], bookedLocalStartTime[0], bookedLocalStartTime[1], bookedLocalStartTime[2]);
            
            var isReadOnly = true;

            if (isManager == true) { //this booking we will editable if you are a manager...
               isReadOnly = false;
            }

            else {
               if( object.usrpwId == php_usrpwId && startTime.getTime() > new Date().getTime() ){ //or the person who created it (as long as the event hasn't ended) 
                  isReadOnly = false;
               }
            } 

            var title = (object.serviceId == "na") ? "Not Available" : object.memberName + '<br/>' + object.name;
            //console.log(title);
            var classes = (object.serviceId == "na") ? (object.club_clinic == '1' ? "club_clinic" : "NotAvailable") : (object.usrpwId != php_usrpwId ? "OtherBooked" : "");
           
             if ((php_catgrp != "") && (object.serviceId != "na")) {
            	classes = "OtherBooked";
            }
            
            if(typeof object.issharedbooking != 'undefined' && object.issharedbooking == "yes"){
                classes = "OtherBooked";
                isReadOnly = true;
            }
            if(typeof object.localnotavailable != 'undefined' && object.localnotavailable == "yes"){
                isReadOnly = true;
            }
            if(typeof object.from_shared != 'undefined' && object.usrpwId == php_usrpwId){
                classes = "";
            }
            var club_clinic_text = ''
            if(typeof object.club_clinic_text != 'undefined'){
                club_clinic_text = object.club_clinic_text;
            }
            var whocanseeclubclinic = ''
            if(typeof object.whocanseeclubclinic != 'undefined'){
                whocanseeclubclinic = object.whocanseeclubclinic;
            }
           //console.log("title: " + title);
           //console.log("isReadOnly: " + isReadOnly);
           //console.log("classes: " +  classes);
            
            //title = activity
            var newBooking = {
               "id": i,
               "start": startTime,
               "end": new Date(bookedDate[0], bookedDate[1]-1, bookedDate[2], bookedLocalEndTime[0], bookedLocalEndTime[1], bookedLocalEndTime[2]),
               "title": title,
               "body": object.body,
               "readOnly": isReadOnly,
               "classes": classes,
               "club_clinic_text": club_clinic_text,
               "whocanseeclubclinic": whocanseeclubclinic,

               //store these properties from the database inside the calendar item
               "bookingId":object.bookingId,
               "commId":object.commId,
               "calendarId":object.calendarId,
               "serviceId":object.serviceId,
               "typeId":object.typeId,
               "location":object.location,
               "name":object.name,
               "createdBy":object.createdBy,
               "openBooking":object.openBooking,
               "windowPriorDay":object.windowPriorDay,
               "windowDays":object.windowDays,
               "cost":object.cost,
               "costPer":object.costPer,
               "minTime":object.minTime,
               "maxTime":object.maxTime,
               "description":object.description,
               "serviceProviders":object.serviceProviders,
               "usrpwId":object.usrpwId,
               "memberName":object.memberName,
               "bookedDate":object.bookedDate,
               "bookedLocalStartTime":object.bookedLocalStartTime,
               "bookedLocalEndTime":object.bookedLocalEndTime,
               "bookedType":object.bookedType,
               "labeling":object.labeling,
               "repeatWeeks":object.repeatWeeks,
               "note":object.note
               }; 
               //alert(newBooking);
            
            tempEvents.push(newBooking); //add this object to the array
            i++;
         });
		
         eventsObject.events = tempEvents;
         dataIsReady = true;
         $('#calendar_update_31_10_14').weekCalendar('refresh');
         addQTips();
        }
        else //an error occured
        {
            //console.log("handling ajax error...");
        }
    });  

     //console.log("events: %o", events);
         
      return events;  	    	
	}
	
	
	//Use this function to ajax to the server and insert into the database
	function update_31_10_14_ajaxSave(calElem,action)
	{
	 // calElem - start, end, id, title, body
	
   calElem.note = (typeof calElem.note == 'undefined') ? '' : calElem.note; //make sure the note is text, even if it's empty
   calElem.labeling = (typeof calElem.labeling == 'undefined') ? '' : calElem.labeling; //make sure the labeling is text, even if it's empty
   
//alert("515: "+calElem);
    if(typeof calElem.usrpwId != 'undefined' && parseInt(calElem.usrpwId) < 0 ){
        alert("Please choose a member");
         return false;
    }
   if(action == "update")
   {
		
       var clubclinictext =  typeof $('#clubclinictext').val() != 'undefined' ? $('#clubclinictext').val() : ''; 
       var whocanseeclubclinic =  typeof $('#whocanseeclubclinic').val() != 'undefined' ? $('#whocanseeclubclinic').val() : '0'; 
      
      //MAKE THE URL USED TO CALL THE API
      var jsonParams = '{"bookingId":"' + calElem.bookingId
                     + '", "serviceId":"' + calElem.serviceId
                     + '", "usrpwId":"' + calElem.usrpwId
                     + '", "bookedDate":"' + convertDateToGVDate(calElem.start)
                     + '", "bookedLocalStartTime":"' + convertDateToGVTime(calElem.start)
                     + '", "bookedLocalEndTime":"' + convertDateToGVTime(calElem.end)
                   	 + '", "bookedType":"' +  $('#activity_type option:selected').val()
                     + '", "bookedTypeText":"' +  clubclinictext
                     + '", "whocanseeclubclinic":"' +  whocanseeclubclinic
                     + '", "labeling":"' + calElem.labeling
                     + '", "repeatWeeks":"' + calElem.repeatWeeks
                     + '", "note":"' + $("textarea[name='note']").val()
                     + '", "proxy":"' + calElem.proxy 
                     + '"}'; //create the params in json format
      //console.log('params:' + jsonParams);
   
      var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly

      //var url = 'http://test.groupvalet.com/private/admin/api/v1/booking/updateRecord?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
      var url = '/private/admin/api/v1/booking/updateRecord?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
   }
   else if (action == "addNew")
   {
       var clubclinictext =  typeof $('#clubclinictext').val() != 'undefined' ? $('#clubclinictext').val() : ''; 
       var whocanseeclubclinic =  typeof $('#whocanseeclubclinic').val() != 'undefined' ? $('#whocanseeclubclinic').val() : '0'; 
      //MAKE THE URL USED TO CALL THE API
      var jsonParams = '{"calId":"' + php_calId
                     + '", "serviceId":"' + calElem.serviceId
                     + '", "usrpwId":"' + calElem.usrpwId
                     + '", "bookedDate":"' + convertDateToGVDate(calElem.start)
                     + '", "bookedLocalStartTime":"' + convertDateToGVTime(calElem.start)
                     + '", "bookedLocalEndTime":"' + convertDateToGVTime(calElem.end)
                     + '", "bookedType":"' +  $('#activity_type option:selected').val()
                     + '", "bookedTypeText":"' +  clubclinictext
                     + '", "whocanseeclubclinic":"' +  whocanseeclubclinic
                     + '", "commId":"' + php_commId
                     + '", "labeling":"' + calElem.labeling
                     + '", "repeatWeeks":"' + calElem.repeatWeeks
                	 + '", "note":"' + calElem.note 
                     + '", "proxy":"' + calElem.proxy
                     + '"}'; //create the params in json format
      //console.log('params:' + jsonParams);
   
      var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly
      //var url = 'http://test.groupvalet.com/private/admin/api/v1/booking/createRecord?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
      var url = '/private/admin/api/v1/booking/createRecord?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
     //alert(url);
   }
    else if (action == "delete")
   {
      //MAKE THE URL USED TO CALL THE API
      var jsonParams = '{"bookingId":"' + calElem.bookingId
      				 + '", "confirm":"0"}'; //create the params in json format
      //console.log('params:' + jsonParams);
   
      var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly

      //var url = 'http://test.groupvalet.com/private/admin/api/v1/booking/cancel?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
      var url = '/private/admin/api/v1/booking/cancel?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
      //alert(url);
   }

  //console.log('url: ' + url);

   //ajax the calendar data and add it to the calendar view
   $.getJSON(url, function(data) 
   {
      //grab the components of the response
      var statusCode = data.status; //a string
      if (typeof data.response !== 'undefined') {
        var response = data.response; //an object
      }else{
          var response = [];
          response.messageText = '';
      }
      
      var serviceId = response.serviceId; //a string
      var msgText = response.messageText;
      	
     //console.log('status code:' + statusCode);
     //console.log('message text:' + messageText);
     //console.log('response: %o', response);
      
      if(statusCode == "200") //Everything is OK
      {
         //console.log("success...");
         if (action == "addNew")
         {
            calElem.bookingId = response.bookingId;
            if(response.bookingId == '855'){
                alert("Sorry that time is booked, please choose other time");
            }else{
           $('#calendar_update_31_10_14').weekCalendar("refresh");
            addQTips();
        }
         }else if(action == "update"){
          $('#calendar_update_31_10_14').weekCalendar("refresh");
            addQTips();
        }
      }
      else if(statusCode == "900")
      {
      	$( "#dialog-confirm-"+serviceId ).dialog({
			resizable: true,
			height:220,
			width:650,
			modal: true,
			title: "Confirm Late Cancellation Policy",
			buttons: {
				"Accept Policy and Cancel This Appointment": function() {
					var confirmUrl = url.replace("confirm%22%3A%220%22%7D", "confirm%22%3A%221%22%7D");
					$.getJSON(confirmUrl);
					location.reload();
				  	$( "#dialog-confirm-"+sid ).dialog( "close" );
				},
				"Don't Cancel This Appointment": function() {
					location.reload();
				  	$( "#dialog-confirm-"+sid ).dialog( "close" );
				}
			}
		});
        $( "#dialog-confirm-"+serviceId ).html("<p>"+msgText+"</p>");
      }
      else //an error occured
      {
         //console.log("handling ajax error...");
      }
    });  
 
		
		//Was added to database
		return true; 
	}


/*EVERYTHING BELOW HERE IS TO RENDER THE CALENDAR*/


   var $calendar = $('#calendar_update_31_10_14');
   var id = 10;
   
   $calendar.weekCalendar({
      date: isValidGVDate(php_calStartDate) ? convertGVStringDateToJSDate(php_calStartDate) : new Date(),
      timeslotsPerHour : 4,
      useShortDayNames: true,
      allowCalEventOverlap : false,
      overlapEventsSeparate: false,
      firstDayOfWeek : php_firstDayOfWeek,
      businessHours :{start: php_dailyStartTime, end: php_dailyEndTime, limitDisplay: true },
      daysToShow : 7,
      height : function($calendar) {
         return $(window).height() + $('.loggedin-content-container .top').outerHeight() + 20;
      },
      calendarAfterLoad : function($calendar) {
        calculateBookingWindowForCalendar();

      },
      eventRender : function(calEvent, $event) 
      {
        //console.log("calEvent in render: %o", calEvent);

         if(isManager == true && calEvent.title == "New Event") {
            calEvent.classes = "OtherBooked";
         }

         if (calEvent.classes == "OtherBooked")
         {
            $event.css("backgroundColor", "#FCC3C7");
            $event.find(".wc-time").css({
               "backgroundColor" : "#F9ACB2",
               "border" : "1px solid #000",
               "color" : "#202020"
            });  
         }
         if (calEvent.classes == "NotAvailable") 
         { 
             $event.removeClass('ui-draggable');
             $event.removeClass('ui-resizable')
            $event.css("backgroundColor", "#aaa");
            $event.find(".wc-time").css({
               "backgroundColor" : "#999",
               "border" : "1px solid #888",
               "color" : "#202020"
            });
         }
         if (calEvent.classes == "club_clinic") 
         { 
             var whocanseeclubclinic =  typeof calEvent.whocanseeclubclinic != 'undefined' ? calEvent.whocanseeclubclinic : ''; 
             
              $event.removeClass('ui-draggable');
             $event.removeClass('ui-resizable')
            $event.css("backgroundColor", "#fcc3c7");
            $event.find(".wc-time").css({
               "backgroundColor" : "#f9acb2",
               "border" : "1px solid #f9acb2",
               "color" : "#202020"
            });
            if(isManager == true || whocanseeclubclinic == '0'){
                 $event.find(".wc-title").addClass('club_clinic');
            $event.find(".club_clinic").removeClass('wc-title').html(calEvent.club_clinic_text);
                     
             }else{
           $event.removeClass('ui-draggable');
             $event.removeClass('ui-resizable')
            $event.css("backgroundColor", "#aaa");
            $event.find(".wc-time").css({
               "backgroundColor" : "#999",
               "border" : "1px solid #888",
               "color" : "#202020"
            });
             }
         }

         if (calEvent.classes == "OutOfBounds") 
         {
            $event.css("backgroundColor", "#aaa");
            $event.find(".wc-time").css({
               "backgroundColor" : "#999",
               "border" : "1px solid #888",
               "color" : "#202020"
            });
         }
      },
      draggable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      resizable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      eventNew : function(calEvent, $event) {

         var today = new Date();

         if (calEvent.start < today)
         {
            alert('You cannot book a time in the past');
            $('#calendar_update_31_10_14').weekCalendar("removeUnsavedEvents");
            return;
         }else if(typeof $("#openBookingWeek").attr('openBookingWeek') != 'undefined' && $("#openBookingWeek").attr('openBookingWeek') > 0){
               var currdate = new Date();
               var weekscount = $("#openBookingWeek").attr('openBookingWeek');
               var additionaldays = weekscount*7;
               var weekmessagetext = "You can book time 1 week in advance";
               if(weekscount > 1){
                   weekmessagetext = "You can book time "+weekscount+" weeks in advance";
               }
                currdate.setDate(currdate.getDate() + additionaldays);
                if(calEvent.start > currdate){
                    alert(weekmessagetext);
                     $('#calendar_update_31_10_14').weekCalendar("removeUnsavedEvents");
                     return;
                }
         }   
         if(isManager == false){
        var cantBookNow_bookingDays = 0;
         var serviceId = $("#activity option:selected").val();
         var bookingDaysReal = 10;
            var bookingDays = typeof php_serviceDetails != 'undefined'  && typeof php_serviceDetails["bookingDays_"+serviceId] != 'undefined' ? php_serviceDetails["bookingDays_"+serviceId] : 0;
            if(bookingDays > 0){
            	// Long method to get just the date of max allowed bookings
            	var tsNow = new Date();
            	var year = tsNow.getFullYear();
            	var month = tsNow.getMonth() + 1;
            	if (month < 10) {
                	month = "0"+month;
                }
                if (month == 13) {
                	month = "01";
                }
            	var day = String(tsNow.getDate());
            	if (day.length == 1) {
                	day = "0"+day;
                }
            	var todayDate = year+'-'+month+'-'+day;
            	//console.log(todayDate);
                var dateDiffToday = Math.round((calEvent.start-today)/(1000*60*60*24));
                
                
                // Long method to get just the date of the selected booking
                var bookDateMilli = Date.parse(calEvent.start);
                var dateObj = new Date(bookDateMilli);
                var dateStr = String(dateObj);
                var dateAry = dateStr.split(" ");
                var m = "01";
                if (dateAry[1] == "Feb") {
                	m = "02";
                } else if (dateAry[1] == "Mar") {
                	m = "03";
                } else if (dateAry[1] == "Apr") {
                	m = "04";
                } else if (dateAry[1] == "May") {
                	m = "05";
                } else if (dateAry[1] == "Jun") {
                	m = "06";
                } else if (dateAry[1] == "Jul") {
                	m = "07";
                } else if (dateAry[1] == "Aug") {
                	m = "08";
                } else if (dateAry[1] == "Sep") {
                	m = "09";
                } else if (dateAry[1] == "Oct") {
                	m = "10";
                } else if (dateAry[1] == "Nov") {
                	m = "11";
                } else if (dateAry[1] == "Dec") {
                	m = "12";
                }
                var d = dateAry[2];
                if (d.length == 1) {
                	d = "0"+d;
                }
                var thisTmpDate = dateAry[3]+'-'+m+'-'+d;
                
                var todayDt = new Date(todayDate);
                var bookDt = new Date(thisTmpDate);
                var testing = ((bookDt - todayDt)/(1000*60*60*24));
                //dateFormat(dateObject, "yyyy-mm-dd");
                //console.log(thisTmpDate);
                //console.log(testing);
                //if(dateDiffToday > bookingDays){
                if (testing > bookingDays) {
                    cantBookNow_bookingDays++;
                }
                /*
                if(bookingDaysReal > bookingDays){
                   bookingDaysReal =  bookingDays;
                }
                */
                //if(cantBookNow_bookingDays >= $("#activity option").length && $("#activity option").length > 0){
                if(testing > bookingDays){
	             alert('You can book this starting '+bookingDays+' days in advance');
	                $('#calendar_update_31_10_14').weekCalendar("removeUnsavedEvents");
	                return;
	       	 	}
         }
        }
         var $dialogContent = $(".dialog");
         update_31_10_14_resetForm($dialogContent);
         //console.log("New Event start_time: ", calEvent.start);
         
         var startField = $dialogContent.find("select[name='start_time']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end_time']").val(calEvent.end);
         var bodyField = $dialogContent.find("select[name='activity_type']");
         var labeling = $dialogContent.find("text[name='labeling']");
         //alert("693: "+labeling);
         var repeatWeeks = $dialogContent.find("select[name='repeatWeeks']");
         var noteField = $dialogContent.find("select[name='note']");

         var titleField  = $dialogContent.find("select[name='activity']");
         var niceDate = months[calEvent.start.getMonth()] + ' ' + update_31_10_14_dateSuffix(calEvent.start.getDate()) + ', '+ calEvent.start.getFullYear();
		 currentDateVar = calEvent.start.getFullYear() + '-' + calEvent.start.getMonth() + '-' + calEvent.start.getDate();
         var dialogTitle = 'Book Your Activity';
		 
		    //add properties used in the GV database inside the calendar item
         calEvent.classes = "";
         calEvent.bookingId = "";
         calEvent.commId = php_commId;
         calEvent.calendarId = php_calId;
         calEvent.serviceId = "";
         calEvent.typeId = "";
         calEvent.location = "";
         calEvent.name = "";
         calEvent.createdBy = "";
         calEvent.openBooking = "";
         calEvent.windowPriorDay = "";
         calEvent.windowDays = "";
         calEvent.cost = "";
         calEvent.costPer = "";
         calEvent.minTime = "";
         calEvent.maxTime = "";
         calEvent.description = "";
         calEvent.serviceProviders = "";
         calEvent.usrpwId = php_usrpwId;
         calEvent.bookedDate = "";
         calEvent.bookedLocalStartTime = "";
         calEvent.bookedLocalEndTime = "";
         calEvent.bookedType = "book";
         calEvent.note = "default note";
         calEvent.labeling = "default label";
         calEvent.repeatWeeks = "";

		if(isOwner_update_31_10_14)
		{
			dialogTitle = php_dialogTitle;
		}
		
         $dialogContent.dialog({
            modal: true,
            resizable:false,
            title: dialogTitle,
            width: 320,
            minHeight:390,
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar_update_31_10_14').weekCalendar("removeUnsavedEvents");
            },
            open: function(){
                 $("#activity_type").val('book');
                    toggleManagerFields();
              checkAvailableServices();
              $("#memberByProxy option:selected").removeAttr("selected");
              $("#memberByProxy").val('-1');
               $(".chosen-single span").css('color','#a09d9d');
              $("#memberByProxy").trigger("chosen:updated");
            },
            buttons: {
               Save : function() 
               {
                  //console.log("save button on add new hit...");
                  calEvent.id = id;
                  id++;
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  if(bodyField.val() == 'na' || bodyField.val() == 'club_clinic')
                  {
                  	calEvent.title = 'Not Available';
                  	calEvent.classes = 'NotAvailable';
                     calEvent.serviceId = "na";
                  }
                  else
                  {
                     if(isManager == true)
                     { //make the manager the proxy and the user selected by the manager the owner 
                        calEvent.proxy = php_usrpwId;
                        calEvent.usrpwId = $("#memberByProxy").val();
                            if(parseInt(calEvent.usrpwId) < 0 ){
                              alert("Please choose a member");
                               return false;
                            }
                        //get the member name from the selector field
                        var nameInfoFromSelector = $("#memberByProxy option:selected").text();
                        var fullName = nameInfoFromSelector.split('(');
                        var lastName = fullName[0].split(',')[0];
                        var firstName = fullName[0].split(',')[1];
                        calEvent.memberName = firstName + lastName; // combine them
                        calEvent.classes = "OtherBooked";
                     }
                     else
                     { //no proxy, the user owns the booking
                        calEvent.proxy = '';
                        calEvent.usrpwId = php_usrpwId;
                        calEvent.memberName = php_userName;
                     }

                     calEvent.serviceId = $('#activity option:selected').val();
                     calEvent.serviceName = $('#activity option:selected').text();
                     calEvent.title =  calEvent.memberName + '<br/>' + calEvent.serviceName;

                     //console.log("serviceID: " + calEvent.serviceID);
                     //console.log("serviceName: " + calEvent.serviceName);
                     //console.log("title: " + calEvent.title);
                     //console.log("memberName: " + calEvent.memberName);


                  }
                  
                  calEvent.body = bodyField.val();
                  calEvent.note = $dialogContent.find("textarea[name='note']" ).val();
                  calEvent.labeling = $dialogContent.find("#labeling").val();
                  //calEvent.labeling = "testing";
                  
                  calEvent.repeatWeeks = $dialogContent.find("select[name='repeatWeeks']").val();
                  //calEvent.note = $('textarea#note').val();
				  //var myTemp = JSON.stringify(calEvent);
                  //alert(myTemp);
         
                  var serviceId = $("#activity option:selected").val(); //get the selected services id
                  //console.log("serviceID:" + serviceId);
                  if(isManager == false){
                   var bookingDays = typeof php_serviceDetails != 'undefined'  && typeof php_serviceDetails["bookingDays_"+serviceId] != 'undefined' ? php_serviceDetails["bookingDays_"+serviceId] : 0;
                    if(bookingDays > 0){
                        // Long method to get just the date of max allowed bookings
		            	var tsNow = new Date();
		            	var year = tsNow.getFullYear();
		            	var month = tsNow.getMonth() + 1;
		            	if (month < 10) {
		                	month = "0"+month;
		                }
		                if (month == 13) {
		                	month = "01";
		                }
		            	var day = String(tsNow.getDate());
		            	if (day.length == 1) {
		                	day = "0"+day;
		                }
		            	var todayDate = year+'-'+month+'-'+day;
		            	//console.log(todayDate);
		                var dateDiffToday = Math.round((calEvent.start-today)/(1000*60*60*24));
		                
		                
		                // Long method to get just the date of the selected booking
		                var bookDateMilli = Date.parse(calEvent.start);
		                var dateObj = new Date(bookDateMilli);
		                var dateStr = String(dateObj);
		                var dateAry = dateStr.split(" ");
		                var m = "01";
		                if (dateAry[1] == "Feb") {
		                	m = "02";
		                } else if (dateAry[1] == "Mar") {
		                	m = "03";
		                } else if (dateAry[1] == "Apr") {
		                	m = "04";
		                } else if (dateAry[1] == "May") {
		                	m = "05";
		                } else if (dateAry[1] == "Jun") {
		                	m = "06";
		                } else if (dateAry[1] == "Jul") {
		                	m = "07";
		                } else if (dateAry[1] == "Aug") {
		                	m = "08";
		                } else if (dateAry[1] == "Sep") {
		                	m = "09";
		                } else if (dateAry[1] == "Oct") {
		                	m = "10";
		                } else if (dateAry[1] == "Nov") {
		                	m = "11";
		                } else if (dateAry[1] == "Dec") {
		                	m = "12";
		                }
		                var d = dateAry[2];
		                if (d.length == 1) {
		                	d = "0"+d;
		                }
		                var thisTmpDate = dateAry[3]+'-'+m+'-'+d;
		                
		                var todayDt = new Date(todayDate);
		                var bookDt = new Date(thisTmpDate);
		                var testing = ((bookDt - todayDt)/(1000*60*60*24));
		                //dateFormat(dateObject, "yyyy-mm-dd");
		                //console.log(thisTmpDate);
		                //console.log(testing);
		                //if(dateDiffToday > bookingDays){
		                if (testing > bookingDays) {
		                    cantBookNow_bookingDays++;
		                }
		                /*
		                if(bookingDaysReal > bookingDays){
		                   bookingDaysReal =  bookingDays;
		                }
		                */
		                //if(cantBookNow_bookingDays >= $("#activity option").length && $("#activity option").length > 0){
		                if(testing > bookingDays){
                            alert('You can book this starting '+bookingDays+' days in advance');
                            $('#calendar_update_31_10_14').weekCalendar("removeUnsavedEvents");
                            return;                                                             
                        }
                    }
                  }
                  // validate the book before rules set up by the manager
                  var dateVerbose = getCantBookBeforeDate(serviceId, calEvent);
                  if(dateVerbose != "") 
                  {
                    alert('You cannot book this date until ' + dateVerbose);
                    $('#calendar_update_31_10_14').weekCalendar("removeUnsavedEvents");
                    return; //abort/don't allow the new booking to be created
                  }

                  if(isTimeslotAvailable(calEvent.id, calEvent.start, calEvent.end))
                  {
                     if(update_31_10_14_ajaxSave(calEvent,'addNew'))
                     {
                  	  $calendar.weekCalendar("removeUnsavedEvents");
                  	  $calendar.weekCalendar("updateEvent", calEvent);
                 	      $dialogContent.dialog("close");
                     }
                     else
                     {
                  	  alert('Something went wrong')
                     }
                  }
                  else
                  {
                      alert('The selected time conflicts with a previously-booked time');
                  }
               },
               Cancel : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();

		    $dialogContent.find('.booking_date_span').text(niceDate)	
        $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
        update_31_10_14_setupStartAndEndTimeFields(calEvent.start, calEvent.end);

      },
      eventDrop : function(calEvent, $event) {
      	var today = new Date();      
         if (calEvent.start < today)
         {
            alert('You cannot book a time in the past');
            $('#calendar_update_31_10_14').weekCalendar("refresh");
            return;
         }  

         var serviceId = $("#activity option:selected").val(); //get the selected services id
         //console.log("serviceID:" + serviceId);

        // validate the book before rules set up by the manager
        var dateVerbose = getCantBookBeforeDate(serviceId, calEvent);
        if(dateVerbose != "") 
        {
          alert('You cannot book this date until ' + dateVerbose);
          $('#calendar_update_31_10_14').weekCalendar("refresh");
          return; //abort/don't allow the booking to be moved
        }

        	if(update_31_10_14_ajaxSave(calEvent,'update'))
        	{
        		
        	}
        	else
        	{
        		alert('Something went wrong')
        	}
      },
      eventResize : function(calEvent, $event) {
        var today = new Date();      
        if (calEvent.start < today)
        {
           alert('You cannot book a time in the past');
           $('#calendar_update_31_10_14').weekCalendar("refresh");
           return;
        }  

        if(update_31_10_14_ajaxSave(calEvent,'update'))
        {
            
        }
        else
        {
          alert('Something went wrong')
        }
      },
      eventClick : function(calEvent, $event) {

         
         var today = new Date();      
         
         if(!isManager)
         {
            if (php_usrpwId == calEvent.usrpwId && calEvent.start < today)
            {
               alert('You cannot edit a time in the past');
               $('#calendar_update_31_10_14').weekCalendar("removeUnsavedEvents");
               return;
            }   

            if (calEvent.readOnly) {
               //console.log("read only!");
               return;
            }
         }
         else
        {
          if (calEvent.readOnly && calEvent.classes == "OutOfBounds") {
            return;
          }
          if (calEvent.readOnly && calEvent.classes == "NotAvailable") {
            return;
          }
          if (calEvent.readOnly && calEvent.classes == "OtherBooked") {
            return;
          }
        }

         var $dialogContent = $(".dialog");
         update_31_10_14_resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start_time']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end_time']").val(calEvent.end);
         var bodyField = $dialogContent.find("select[name='activity_type']");
         var titleField  = $dialogContent.find("select[name='activity']"); 
         var niceDate = months[calEvent.start.getMonth()] + ' ' + update_31_10_14_dateSuffix(calEvent.start.getDate()) + ', '+ calEvent.start.getFullYear();
         currentDateVar = calEvent.start.getFullYear() + '-' + calEvent.start.getMonth() + '-' + calEvent.start.getDate();
         var dialogTitle = 'Book Your Activity';
          
          var clubclinictext =  typeof calEvent.club_clinic_text != 'undefined' ? calEvent.club_clinic_text : ''; 
          var whocanseeclubclinic =  typeof calEvent.whocanseeclubclinic != 'undefined' ? calEvent.whocanseeclubclinic : ''; 
          var tmpClass =  typeof calEvent.classes != 'undefined' ? calEvent.classes : ''; 
         var serviceID = $('#activity option:selected').val();
         var serviceName =  $('#activity option:selected').text();


         $dialogContent.find("textarea[name='note']" ).val(calEvent.note);
         $dialogContent.find("#labeling" ).val(calEvent.labeling);
		 
		if(isOwner_update_31_10_14)
		{
			dialogTitle = php_dialogTitle;
		}
         $dialogContent.dialog({
            modal: true,
            title: dialogTitle,
            resizable:false,
            width: 320,
            minHeight:390,
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar_update_31_10_14').weekCalendar("removeUnsavedEvents");
            },
            open: function(){
                if(calEvent.bookedType == 'na'){
                   $("#whocanseeclubclinic").val('0');
                    if(tmpClass == 'club_clinic'){
                        $("#activity_type").val('club_clinic');
                    }else{
                        $("#activity_type").val('na');
                    }
                    
                    $("#clubclinictext").val(clubclinictext);
                    $("#whocanseeclubclinic").val(whocanseeclubclinic);
                    toggleManagerFields();
                }else{
                     $("#activity_type").val('book');
                    toggleManagerFields();
                }
                 $("#memberByProxy").val(calEvent.usrpwId);
              $("#memberByProxy").trigger("chosen:updated");
            },
            buttons: {
               Save : function() {
                  //console.log("save button on edit/click hit...");
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  if(bodyField.val() == 'na' || bodyField.val() == 'club_clinic')
                  {
                  	calEvent.title = 'Not Available';
                  	calEvent.classes = 'NotAvailable';
                     calEvent.serviceId = "na";
                  }
                  else
                  {
                     if(isManager == true)
                     { //make the manager the proxy and the user selected by the manager the owner 
                        calEvent.proxy = php_usrpwId;
                        calEvent.usrpwId = $("#memberByProxy").val();
                        
                        //get the member name from the selector field
                        var nameInfoFromSelector = $("#memberByProxy option:selected").text();
                        var fullName = nameInfoFromSelector.split('(');
                        var lastName = fullName[0].split(',')[0];
                        var firstName = fullName[0].split(',')[1];
                        calEvent.memberName = firstName + lastName; // combine them
                     }
                     else
                     { //no proxy, the user owns the booking
                        calEvent.proxy = '';
                        calEvent.usrpwId = php_usrpwId;
                        calEvent.memberName = php_userName;
                     }
                     //console.log("serviceID: " + serviceID);
                     //console.log("serviceName: " + serviceName);
                     //console.log("memberName: " + calEvent.memberName);

                     calEvent.serviceId = serviceID;
                     calEvent.title =  calEvent.memberName + '<br/>' + serviceName;
                  }
                  
                  calEvent.body = bodyField.val();
				      calEvent.note = $('textarea#note').val();
				      calEvent.labeling = $('#labeling').val();

				  
				    if(isTimeslotAvailable(calEvent.id, calEvent.start, calEvent.end))
                  {
                     if(update_31_10_14_ajaxSave(calEvent,'update'))
                     {
                      $calendar.weekCalendar("removeUnsavedEvents");
                      $calendar.weekCalendar("updateEvent", calEvent);
                        $dialogContent.dialog("close");
                     }
                     else
                     {
                      alert('Something went wrong')
                     }
                  }
                  else
                  {
                      alert('The selected time conflicts with a previously-booked time');
                  }
               },
               "Delete" : function() {
               	  if(update_31_10_14_ajaxSave(calEvent,'delete'))
               	  {
               	  	$calendar.weekCalendar("removeEvent", calEvent.id);
                  	$dialogContent.dialog("close");
                  }
                  else
                  {
                  	alert('Something went wrong');
                  }
               },
               Cancel : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();

          var startField = $dialogContent.find("select[name='start_time']").val(calEvent.start);
          var endField = $dialogContent.find("select[name='end_time']").val(calEvent.end);
          $dialogContent.find('.booking_date_span').text(niceDate)
          $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
          update_31_10_14_setupStartAndEndTimeFields(calEvent.start, calEvent.end);
          $(window).resize().resize(); //fixes a bug in modal overlay size ??
      },
      eventMouseover : function(calEvent, $event) {
      },
      eventMouseout : function(calEvent, $event) {
      },
      noEvents : function() {

      },
      data : function(start, end, callback) {
         callback(update_31_10_14_getEventData(start,end));
         
      }

   });

   function update_31_10_14_resetForm($dialogContent) {
      $dialogContent.find("input").val("");
      $dialogContent.find("textarea").val("");
   }

   /*
    * Sets up and adjusts the start and end time fields in the calendar event
    * form for editing based on the calendar event being edited
    */
   function update_31_10_14_setupStartAndEndTimeFields(defaultStart, defaultEnd, actType) 
   {
       if(typeof actType == 'undefined'){
           actType = $("#activity_type").val();
       }
       if(actType == 'club_clinic'){
           actType = 'na';
       }
      if(typeof defaultStart != 'undefined' && typeof defaultEnd != 'undefined')
      { //if these vars were sent to the function then this is a new booking
        $("start_time").val(defaultStart);
        $("#end_time").val(defaultEnd);
      }
      else
      { //we are editing and changed the start time, so we get the values from the selector elements
        defaultStart = new Date($("#start_time option:selected").val());
        defaultEnd = new Date($("#end_time option:selected").val());
      }

      //take the autogenerated sets of start timeslots for the day clicked on and filter out any time that is in the past
      var rawTimeslotTimes = $calendar.weekCalendar("getTimeslotTimes", new Date(defaultStart)); //grab the timselots for the day
      var validTimeslotTimes = [];
      var now = new Date();

      for (var i = 0; i < rawTimeslotTimes.length; i++) //filter out timeslots in the past
      {        
        if(rawTimeslotTimes[i].start >= now) { //if the start time is in the present then keep the timeslot
          validTimeslotTimes.push(rawTimeslotTimes[i]); 
        }
      };

      var selectedStartTime;

      $("#start_time").empty(); //empty the start and end selector elements
      $("#end_time").empty();
      var timeFramechck = 1;
      var diffMinutesLoop = 0;
      for (var i = 0; i < validTimeslotTimes.length; i++) 
      { //loop through each timeslot and figure out the seltector options for the start and end fields
          var startTime = validTimeslotTimes[i].start;
          var endTime = validTimeslotTimes[i].end;
         
          //figures out if the either the start or end time should be the selected option
          var startSelected = "";
          if (startTime.getTime() === defaultStart.getTime()) 
          {
            startSelected = "selected=\"selected\"";
            selectedStartTime = startTime;
          }
     	  if (actType != "na") {
          	var endSelected = endTime.getTime() === defaultEnd.getTime() ? "selected=\"selected\"" : "";
          }

          //append this option into the start and end select elements
          $("#start_time").append("<option value=\"" + startTime + "\" " + startSelected + ">" + validTimeslotTimes[i].startFormatted + "</option>");

          var serviceId = $("#activity option:selected").val(); //get the selected services id

          //get the min/max durations for a booking for this service, otherwise use defaults of 15 and all day
          var minDuration = typeof php_serviceDetails != 'undefined' ? php_serviceDetails["minTime_"+serviceId] : 15; 
          var maxDuration = typeof php_serviceDetails != 'undefined' ? php_serviceDetails["maxTime_"+serviceId] : 24*60; 
          var timeFrame = typeof php_serviceDetails != 'undefined' ? php_serviceDetails["timeFrame_"+serviceId] : 15; 
          if (typeof selectedStartTime != 'undefined')
          {  
            var minTimeStart = selectedStartTime.addMinutes(minDuration);
            var maxTimeStart = selectedStartTime.addMinutes(maxDuration);
            var diffMinutes = 15;
            var j = i - 1;
            if(j >= 0){
             var diffTime = Math.abs(validTimeslotTimes[i-1].end - validTimeslotTimes[i].end);
              diffMinutes = Math.floor((diffTime/1000)/60);
              diffMinutesLoop = diffMinutesLoop + diffMinutes;
             if(timeFrame <= diffMinutesLoop){
                 timeFramechck = 1;
                 diffMinutesLoop = 0;
             }else{
                 timeFramechck = 0;
             }
            }
            if(isManager == true) {
                timeFramechck = 1;
            }
            //only add the endtime if it's greater than the selected start time and adheres to the min/max durations of a booking for the service
            if (actType != "na") {
	            if(endTime > selectedStartTime && endTime >= minTimeStart && endTime <= maxTimeStart && timeFramechck === 1) 
	              { $("#end_time").append("<option value=\"" + endTime + "\" " + endSelected + ">" + validTimeslotTimes[i].endFormatted + "</option>"); }
	        } else {
	        	// For adding NA time, override the min and max time defaults so the manager can enter any length of time
	        	if(endTime > selectedStartTime) 
	              { $("#end_time").append("<option value=\"" + endTime + "\" " + endSelected + ">" + validTimeslotTimes[i].endFormatted + "</option>"); }
	        }
          }
        }

        //if the user selected an end time already then let's do our best to keep
        // it selected given any other changes that might have happened to the start date
        $('#end_time').find('option').each(function() 
        {
            
          if($(this).val()==defaultEnd.toString()){ 
              $(this).attr('selected','selected'); 
          }else if($(this).val()==lastSelectedEndTime){ 
              $(this).attr('selected','selected'); 
          }
        });         
   }

    //callback the the start time selector in the booking dialog
    $("#start_time").change(function() 
    {
      //console.log("Onchange startTime called...");
      update_31_10_14_setupStartAndEndTimeFields();
    });
    
    $("#activity_type").change(function()
	{
		//console.log("activity type changed to ", $("#activity_type option:selected").val());
		var startingTime = new Date($("#start_time option:selected").val());
		var str = php_dailyEndTime+":00:00";
		var temp = startingTime.toString();
		var tempAry = temp.split(" ");
		var newStr = tempAry[0]+" "+tempAry[1]+" "+tempAry[2]+" "+tempAry[3]+" "+str+" "+tempAry[5]+" "+tempAry[6];
		var endingTime = new Date(newStr);
		//alert(startingTime);
		//alert(endingTime);
		update_31_10_14_setupStartAndEndTimeFields(startingTime,endingTime,$("#activity_type option:selected").val());
	});

    $("#end_time").change(function() 
    {
      //console.log("Onchange endTime called...");
      //console.log("lastSelectedEndTime: %o", $("#end_time option:selected").val());
      lastSelectedEndTime = new Date($("#end_time option:selected").val());
    });


//only show the toggle if the user is a manager
if(isManager == true) {
   document.getElementById('calendarToggle').style.display = "";
   $('#calendarToggle').before("<span class='calendarTogleTextSpan'>Viewed By</span>")
}
else {
   document.getElementById('calendarToggle') .style.display = "none";
}


//set the initial enabled/disabled state of calendar
if(php_isActive == 1) {
  //console.log("Active Calendar");
   $('#calendarToggle').val("on");

}
else {
  //console.log("Disabled Calendar");
   $('#calendarToggle').val("off");  
}

$('#calendarToggle option:contains("Disabled")').text('Staff Only');
$('#calendarToggle option:contains("Enabled")').text('All Members');

//when the user changes the enabled/disable selector, we tell the database 
$('#calendarToggle').change(function () 
{   
  //console.log("toggle changed!");

   var enable = ($(this).val() == "on") ? 1 : 0; //convert bool to int

   //MAKE THE URL USED TO CALL THE API
   var jsonParams = '{"calId":"' + php_calId + '", "enable":"' + enable + '"}'; //create the params in json format
  //console.log('params:' + jsonParams);
   
   var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly
   
   //var url = 'http://test.groupvalet.com/private/admin/api/v1/booking/toggleCalendar?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
   var url = '/private/admin/api/v1/booking/toggleCalendar?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;

  //console.log('url: ' + url);

   //ajax the calendar data and add it to the calendar view
   $.getJSON(url, function(data) 
   {
      //grab the components of the response
      var statusCode = data.status; //a string
      var messageText = data.message; //a string
      var response = data.response; //an object
      
     //console.log('status code:' + statusCode);
     //console.log('message text:' + messageText);
     //console.log('response:' + response);
      
      if(statusCode == "200") //Everything is OK
      {
        //console.log("success...");
      }
      else //an error occured
      {
        //console.log("handling ajax error...");
      }
    });
    var alertStatus = "visible by everyone";
    if (enable == 0) {
    	alertStatus = "visible only to staff";
    }
    alert('The calendar is now '+alertStatus);
});


$('#end_time,#start_time').change(function () 
{   
    checkAvailableServices()
});


  var months = Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
  
	function update_31_10_14_dateSuffix(dateText) {
        var suffix = "";
        switch(dateText) {
            case 1: case 21: case 31: suffix = 'st'; break;
            case 2: case 22: suffix = 'nd'; break;
            case 3: case 23: suffix = 'rd'; break;
            default: suffix = 'th';
        }
        return dateText+suffix;
    }
});

function checkAvailableServices(){
   if(php_catgrp.length > 0){
    function nowcheckAvailableServices() {
        var endTime = $("#end_time option:selected").text();
        var startTime = $("#start_time  option:selected").text();
        var bookedDate = $(".booking_date_span").text();
        var jsonParams = '{"calId":"' + php_calId + '", "commId":"' + php_commId + '",  "catgrp":"' + php_catgrp + '", "bookedDate":"' + bookedDate + '", "endTime":"' + endTime + '", "startTime":"' + startTime + '"}';
        var rawurlencoded_json_string = encodeURIComponent(jsonParams);

        var url = '/private/admin/api/v1/booking/getAvailableServicesByEndTime?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;

        $.getJSON(url, function (data)
        {
            if (data.status == "400") {
                alert("Sorry, the chosen service is not available at the time selected");
            } else if (data.status == "200") {
                $("#activity").replaceWith(data.availableServices);
                $("#activity").effect("highlight", 500);
            }
        }); 
    }

            setTimeout(nowcheckAvailableServices, 200);
        }
}
