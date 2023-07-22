var nav = new DayPilot.Navigator("navigator");
nav.onTimeRangeSelected = function (args) {
    var day = args.day;

    if (dp.visibleStart() <= day && day < dp.visibleEnd()) {
        dp.scrollTo(day, "fast");
    } else {
        var start = day.firstDayOfMonth();
        var days = day.daysInMonth();
        dp.startDate = start;
        dp.days = days;
        dp.update();
        dp.scrollTo(day, "fast");
        loadEvents();
    }
};
nav.init();


var dp = new DayPilot.Scheduler("scheduler");

dp.treeEnabled = true;

dp.heightSpec = "Max";
//dp.height = 300;

dp.scale = "CellDuration";
dp.cellDuration = "15";
dp.cellGroupBy = "Day";
dp.cellWidth = "25";
dp.theme = "scheduler_8";
dp.showBaseTimeHeader = true;
dp.showNonBusiness = false;
dp.startDate = DayPilot.Date.today().firstDayOfMonth();
dp.days = DayPilot.Date.today().daysInMonth();
dp.cellWidth = 40;
dp.showCurrentTime = true;

dp.eventHeight = 40;
dp.durationBarVisible = false;

dp.treePreventParentUsage = true;

dp.onBeforeEventRender = function (args) {
};

var slotPrices = {
    "06:00": 12,
    "06:15": 12,
    "07:00": 15,
    "08:00": 15,
    "09:00": 15,
    "10:00": 15,
    "11:00": 12,
    "12:00": 10,
    "13:00": 10,
    "14:00": 12,
    "15:00": 12,
    "16:00": 15,
    "17:00": 15,
    "18:00": 15,
    "19:00": 15,
    "20:00": 15,
    "21:00": 12,
    "22:00": 10,
};
dp.onBeforeTimeHeaderRender = function (args) {
    if (args.header.level === 1) {
        switch (args.header.start.getDayOfWeek()) {
            case (1):
                args.header.backColor = "#baaeae";
                break;
            case (3):
                args.header.backColor = "#baaeae";
                break;
            case (5):
                args.header.backColor = "#baaeae";
                break;
            case (6):
                args.header.backColor = "#999999";
                break;
            default:

        }

    } else if (args.header.level === 0) {
       // console.log(args.header.start.getMonth());
        switch (args.header.start.getMonth()) {

            case (1):
                args.header.backColor = "#baaeae";
                break;
            case (3):
                args.header.backColor = "#baaeae";
                break;
            case (5):
                args.header.backColor = "#baaeae";
                break;
            case (6):
                args.header.backColor = "#999999";
                break;
            default:

        }

        args.header.backColor = "#baaeae";
    }
};
dp.onBeforeCellRender = function (args) {

    var color = "#FFFAEA";
    var colorna = "#AAAAAA";

    var slotId = args.cell.start.toString("HH:mm");
    if (args.cell.isParent) {
        return;
    }
    var resourceId = args.cell.resource;
    var timestart = args.cell.start.toString('HH:mm:ss');
    if (args.cell.start < new DayPilot.Date()) {  // past
        args.cell.html = "<div style='cursor: default; position: absolute; left: 0px; top:0px; right: 0px; bottom: 0px; padding-left: 3px; text-align: center; background-color: " + color + "; color:white;' ></div>";
    }else if(typeof php_servicesStartEndTimes[resourceId] != 'undefined' && timestart < php_servicesStartEndTimes[resourceId].start ){
        args.cell.html = "<div style='cursor: default; position: absolute; left: 0px; top:0px; right: 0px; bottom: 0px; padding-left: 3px; text-align: center; background-color: " + colorna + "; color:white;' >NA</div>";
         args.cell.business = false;
    }else if(typeof php_servicesStartEndTimes[resourceId] != 'undefined' && timestart > php_servicesStartEndTimes[resourceId].end ){
        args.cell.html = "<div style='cursor: default; position: absolute; left: 0px; top:0px; right: 0px; bottom: 0px; padding-left: 3px; text-align: center; background-color: " + colorna + "; color:white;' >NA</div>";
         args.cell.business = false;
    }

    if (args.cell.utilization() > 0) {
        return;
    }

//                    var price = slotPrices[slotId];
//
//                    var min = 5;
//                    var max = 15;
//                    var opacity = (price - min)/max;
//                    var text = "$" + price;

};

dp.timeHeaders = [
    {groupBy: "Month", format: "MMMM yyyy"},
    {groupBy: "Day", format: "dddd, MMMM d"},
    {groupBy: "Hour", format: "h tt"},
    {"groupBy": "Cell", "format": null}
];

dp.businessBeginsHour = php_minStartTime;
dp.businessEndsHour = php_maxEndTime;
dp.businessWeekends = true;
dp.showNonBusiness = false;

dp.allowEventOverlap = false;

//dp.cellWidthSpec = "Auto";
dp.bubble = new DayPilot.Bubble();

dp.onTimeRangeSelecting = function (args) {
    
         var resourceId = args.resource;
    var timestart = args.start.toString('HH:mm:ss');
    if (args.start < new DayPilot.Date()) {
        args.right.enabled = true;
        args.right.html = "You can't create a reservation in the past";
        args.allowed = false;
    } else if (args.duration.totalHours() > 4) {
        args.right.enabled = true;
        args.right.html = "You can only book up to 4 hours";
        args.allowed = false;
    }else if(typeof php_servicesStartEndTimes[resourceId] != 'undefined' && timestart < php_servicesStartEndTimes[resourceId].start ){
          args.right.enabled = true;
        args.right.html = "<p style='color:red'>Service not available</p>";
        args.allowed = false;
    }else if(typeof php_servicesStartEndTimes[resourceId] != 'undefined' && timestart > php_servicesStartEndTimes[resourceId].end ){
         args.right.enabled = true;
        args.right.html = "<p style='color:red'>Service not available</p>";
        args.allowed = false;
    }
};

// event creating
// http://api.daypilot.org/daypilot-scheduler-ontimerangeselected/
dp.onTimeRangeSelected = function (args) {
    var months = Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    var modal = new DayPilot.Modal();
    modal.onClosed = function (args) {
        dp.clearSelection();
        loadEvents();
    };

    var $dialogContent = $(".dialog");
    update_resetForm($dialogContent);
    var StartTime = args.start.toString("hh:mm tt");
    var EndTime = args.end.toString("hh:mm tt");
    var bookDate = moment(args.start).format('YYYY-MM-DD');
    
    var serviceId = args.resource;
    //$("#start_time").val(StartTime);
    //$("#end_time").val(EndTime);
    $("#dialogServiceId").val(serviceId);
    var StartTimeD = moment(args.start, 'YYYY-MM-DDTHH:mm:ss');
    var EndTimeD = moment(args.end, 'YYYY-MM-DDTHH:mm:ss');
    setupStartAndEndTimeFields(StartTimeD,EndTimeD);
    var niceDate = months[StartTimeD.get('month')] + ' ' + update_dateSuffix(StartTimeD.get('date')) + ', ' + StartTimeD.get('year');
    $(".booking_date_span").text(niceDate);
    $("#booking_date").text(bookDate);

    $dialogContent.dialog({
        modal: true,
        resizable: false,
        title: "New",
        width: 320,
        minHeight: 390,
        close: function () {
            $dialogContent.dialog("destroy");
            $dialogContent.hide();
            dp.clearSelection();
            loadEvents();
        },
        open: function () {
            $("#activity_type").val('book');
            $("#activity_type").trigger("change");
              $("#memberByProxy").val("-1");
            $("#memberByProxy").trigger("chosen:updated");
        },
        buttons: {
            Save: function ()
            {
                var addBookingArr = {};
                addBookingArr.serviceId = serviceId;
                addBookingArr.usrpwId = serviceId;
                addBookingArr.proxy = php_usrpwId;
                addBookingArr.usrpwId = $("#memberByProxy").val();
                if (parseInt(addBookingArr.usrpwId) < 0) {
                    alert("Please choose a member");
                    return false;
                }
                ;
                addBookingArr.start = $("#start_time").val();
                addBookingArr.end = $("#end_time").val();
                addBookingArr.labeling = '';
                addBookingArr.note = $("#note").text();
                if (update_ajaxSave(addBookingArr, "addNew"))
                {
                    $dialogContent.dialog("close");
                    dp.update();
                    //  dp.Calendar.update();
              
                } else
                {
                    alert('Something went wrong')
                }


            },
            Cancel: function () {
                $dialogContent.dialog("close");
                dp.clearSelection();
                loadEvents();
            }
        }
    }).show();

    //  modal.showUrl("new.php?start=" + args.start + "&end=" + args.end + "&resource=" + args.resource);
};
dp.onEventClicked = function (args) {
    var $dialogContent = $(".dialog");
    update_resetForm($dialogContent);
    var event = dp.events.find(args.e.id());
    
    var eventIdObj = args.e.id();
    var bookingId = eventIdObj.id;
    var userId = eventIdObj.userid;
    var bookingType = args.e.data.bookingType;
    var StartTimeD = moment(args.e.start().value, 'YYYY-MM-DDTHH:mm:ss');
    var EndTimeD = moment(args.e.end().value, 'YYYY-MM-DDTHH:mm:ss');
    var eventTitle = args.e.data.bubbleHtml;
    var StartTime = formatAMPM(StartTimeD);
    var EndTime = formatAMPM(EndTimeD);
    
    
    var bookDate = args.e.start().value.toString("yyyy-mm-dd");
    var serviceId = args.e.resource();
    var startField = $dialogContent.find("#start_time").val(StartTime);
    var endField = $dialogContent.find("#end_time").val(EndTime);
    var months = Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
    $("#dialogServiceId").val(serviceId);

 setupStartAndEndTimeFields(StartTimeD,EndTimeD);
      var niceDate = months[StartTimeD.get('month')] + ' ' + update_dateSuffix(StartTimeD.get('date')) + ', ' + StartTimeD.get('year');
    $(".booking_date_span").text(niceDate);
    $("#booking_date").text(bookDate);
    var serviceID = args.e.resource();


//         $dialogContent.find("textarea[name='note']" ).val();
//         $dialogContent.find("#labeling" ).val();
//                    new DayPilot.Modal({
//                        onClosed: function(args) {
//                            loadEvents();
//                        }
//                    }).showUrl("edit.php?id=" + args.e.id());

    $dialogContent.dialog({
        modal: true,
        resizable: false,
        title: "New",
        width: 320,
        minHeight: 390,
        close: function () {
            $dialogContent.dialog("destroy");
            $dialogContent.hide();
            dp.clearSelection();
            loadEvents();
        },
        open: function () {
            $("#activity_type").val(bookingType);
            $("#activity_type").trigger("change");
            if(bookingType == 'club_clinic'){
                $("#clubclinictext").val(eventTitle);
            }
            $("#memberByProxy").val(userId);
            $("#memberByProxy").trigger("chosen:updated");
        },
        buttons: {
            Save: function ()
            {
                var updateBookingArr = {};
                updateBookingArr.serviceId = serviceId;
                updateBookingArr.usrpwId = serviceId;
                updateBookingArr.proxy = php_usrpwId;
                updateBookingArr.usrpwId = $("#memberByProxy").val();
                if (parseInt(updateBookingArr.usrpwId) < 0) {
                    alert("Please choose a member");
                    return false;
                };
                updateBookingArr.start = StartTimeD;
                updateBookingArr.end = EndTimeD;
                updateBookingArr.labeling = '';
                updateBookingArr.bookingId = bookingId;
                updateBookingArr.note = $("#note").text();
                if (update_ajaxSave(updateBookingArr, "update"))
                {
                    $dialogContent.dialog("close");
                    dp.update();
                    dp.Calendar.update();
                    loadEvents();
                } else
                {
                    alert('Something went wrong')
                }


            },
            Cancel: function () {
                $dialogContent.dialog("close");
                dp.clearSelection();
                loadEvents();
            }
        }
    }).show();
};
dp.init();

var scrollTo = new DayPilot.Date();
//if (new DayPilot.Date().getHours() > 12) {
//    scrollTo = scrollTo.addHours(12);
//}
dp.scrollTo(scrollTo);

loadResources();
loadEvents();

function loadResources() {
    var type = $("#select_staff_type").val();
    var jsonParams = '{"commId":"' + php_commId + '", "typeId":"' + type + '"}';
    dp.rows.load("/private/admin/api/v1/booking/getStaffCalendarServices?json=" + jsonParams + "&key=" + php_privateKey);
}

function loadEvents() {
    var jsonParams = '{"commId":"' + php_commId
            + '"}';
    dp.events.load("/private/admin/api/v1/booking/getStaffCalendarEvents?json=" + jsonParams + "&key=" + php_privateKey);  // POST request with "start" and "end" JSON parameters
}


function update_ajaxSave(calElem, action)
{
    // calElem - start, end, id, title, body

    calElem.note = (typeof calElem.note == 'undefined') ? '' : calElem.note; //make sure the note is text, even if it's empty
    calElem.labeling = (typeof calElem.labeling == 'undefined') ? '' : calElem.labeling; //make sure the labeling is text, even if it's empty
//alert("515: "+calElem);
    if (typeof calElem.usrpwId != 'undefined' && parseInt(calElem.usrpwId) < 0) {
        alert("Please choose a member");
        return false;
    }
    if (action == "update")
    {
        //MAKE THE URL USED TO CALL THE API
        var jsonParams = '{"bookingId":"' + calElem.bookingId
                + '", "serviceId":"' + calElem.serviceId
                + '", "usrpwId":"' + calElem.usrpwId
                + '", "bookedDate":"' + convertDateToGVDate(calElem.start)
                + '", "bookedLocalStartTime":"' + convertDateToGVTime(calElem.start)
                + '", "bookedLocalEndTime":"' + convertDateToGVTime(calElem.end)
                + '", "labeling":"' + calElem.labeling
                + '", "repeatWeeks":"' + calElem.repeatWeeks
                + '", "note":"' + calElem.note
                + '", "proxy":"' + calElem.proxy
                + '"}'; //create the params in json format
        //console.log('params:' + jsonParams);

        var rawurlencoded_json_string = encodeURIComponent(jsonParams); //make the json url friendly

        //var url = 'http://test.groupvalet.com/private/admin/api/v1/booking/updateRecord?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
        var url = '/private/admin/api/v1/booking/updateRecord?json=' + rawurlencoded_json_string + '&key=' + php_privateKey;
    } else if (action == "addNew")
    {
        //MAKE THE URL USED TO CALL THE API
        var jsonParams = '{"calId":"' + php_calId
                + '", "serviceId":"' + calElem.serviceId
                + '", "usrpwId":"' + calElem.usrpwId
                + '", "bookedDate":"' + convertDateToGVDate(calElem.start)
                + '", "bookedLocalStartTime":"' + convertDateToGVTime(calElem.start)
                + '", "bookedLocalEndTime":"' + convertDateToGVTime(calElem.end)
                + '", "bookedType":"' + $('#activity_type option:selected').val()
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
    } else if (action == "delete")
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
    $.getJSON(url, function (data)
    {
        //grab the components of the response
        var statusCode = data.status; //a string
        if (typeof data.response !== 'undefined') {
            var response = data.response; //an object
        } else {
            var response = [];
            response.messageText = '';
        }

        var serviceId = response.serviceId; //a string
        var msgText = response.messageText;

        //console.log('status code:' + statusCode);
        //console.log('message text:' + messageText);
        //console.log('response: %o', response);

        if (statusCode == "200") //Everything is OK
        {
            //console.log("success...");
            if (action == "addNew")
            {
                calElem.bookingId = response.bookingId;
                if (response.bookingId == '855') {
                    alert("Sorry that time is booked, please choose other time");
                } else {
                    //console.log("calElem.bookingId: ", calElem.bookingId);
                }
            }
                  loadResources();
                    loadEvents();
        } else if (statusCode == "900")
        {
            $("#dialog-confirm-" + serviceId).dialog({
                resizable: true,
                height: 220,
                width: 650,
                modal: true,
                title: "Confirm Late Cancellation Policy",
                buttons: {
                    "Accept Policy and Cancel This Appointment": function () {
                        var confirmUrl = url.replace("confirm%22%3A%220%22%7D", "confirm%22%3A%221%22%7D");
                        $.getJSON(confirmUrl);
                        location.reload();
                        $("#dialog-confirm-" + sid).dialog("close");
                    },
                    "Don't Cancel This Appointment": function () {
                        location.reload();
                        $("#dialog-confirm-" + sid).dialog("close");
                    }
                }
            });
            $("#dialog-confirm-" + serviceId).html("<p>" + msgText + "</p>");
        } else //an error occured
        {
            //console.log("handling ajax error...");
        }
    });


    //Was added to database
    return true;
}




function update_dateSuffix(dateText) {
    var suffix = "";
    switch (dateText) {
        case 1:
        case 21:
        case 31:
            suffix = 'st';
            break;
        case 2:
        case 22:
            suffix = 'nd';
            break;
        case 3:
        case 23:
            suffix = 'rd';
            break;
        default:
            suffix = 'th';
    }
    return dateText + suffix;
}


function convertDateToGVDate(date)
{
    var gvDate = date = moment(date).format('YYYY-MM-DD');
    return gvDate;
}

function convertDateToGVTime(date)
{
    if(!moment(date, "DD/MM/YYYY", true).isValid()){
       date = moment(date);
    }
    var gvTime = date.format('HH:mm:ss');
    return gvTime;
}

function update_resetForm($dialogContent) {
    $dialogContent.find("input").val("");
    $dialogContent.find("textarea").val("");
}


function formatAMPM(date) {
    
//    var hours = date.getHours();
//    var minutes = date.getMinutes();
//    var ampm = hours >= 12 ? 'pm' : 'am';
//    hours = hours % 12;
//    hours = hours ? hours : 12; // the hour '0' should be '12'
//    minutes = minutes < 10 ? '0' + minutes : minutes;
//    var strTime = hours + ':' + minutes + ' ' + ampm;
  //  return strTime;
    return date.format('hh:mm a');
}

function setupStartAndEndTimeFields(defaultStart, defaultEnd) 
   {

      $("#start_time").empty(); //empty the start and end selector elements
      $("#end_time").empty();
      
     var  mytime = defaultStart;
      var i =0;
       while (mytime.get('hour') < dp.businessEndsHour) {
        var startSelected = "";
        var endSelected = "";
        
//        if (defaultStart.getTime() === defaultStart.getTime()) 
//          {
//              
//          }
        $("#start_time").append("<option value=\"" + mytime.format() + "\" " + startSelected + ">" + formatAMPM(mytime) + "</option>");
        mytime = mytime.add('m', dp.cellDuration); 
        if(mytime.get('hour') == defaultEnd.get('hour') && mytime.get('minutes') == defaultEnd.get('minutes')){
            endSelected = "selected";
        }
        $("#end_time").append("<option value=\"" + mytime.format() + "\" " + endSelected + ">" + formatAMPM(mytime) + "</option>");
         i++;
    }; 
   }

$(document).ready(function () {

    if ($("#select_staff_type").length > 0) {
        $("#select_staff_type").chosen({
        }).change(function (event) {
            dp.update();
            loadResources();
            loadEvents();
        });
        $(".chosen-single span").css('color', '#000');
    }
    $("#openFullScreen").click(function (ev) {
        var element;
        var is_safari = navigator.userAgent.indexOf("Safari") > -1;
        if (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
                ) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            element = $('.main').get(0);
            if(is_safari){
                element.webkitRequestFullScreen();
            }else{
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                element.webkitRequestFullScreen(); 
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
        }
    });
});