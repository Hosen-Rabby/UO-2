function getObject(obj){if(document.getElementById){return document.getElementById(obj);}else{if(document.all){return document.all[obj];}}}
function chkRadio(obj){
	switch(obj.id) {
		case "segSpecCommEvent":
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "scevtGender":
			getObject('segSpecCommEvent').checked = true;
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "scevtEvent":
			getObject('segSpecCommEvent').checked = true;
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "segCommEvent":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "cevtGender":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segCommEvent').checked = true;
			getObject('grpGender').value = "";
			getObject('lstList').value = "";
			getObject('grpGroup').value = "";
			getObject('gdrGender').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "cevtEvent":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segCommEvent').checked = true;
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "cevtOcc":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segCommEvent').checked = true;
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "segEvent":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "evtGender":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segEvent').checked = true;
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "evtEvent":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segEvent').checked = true;
			getObject('grpGender').value = "";
			getObject('lstList').value = "";
			getObject('grpGroup').value = "";
			getObject('gdrGender').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "evtOcc":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segEvent').checked = true;
			getObject('grpGender').value = "";
			getObject('lstList').value = "";
			getObject('grpGroup').value = "";
			getObject('gdrGender').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "segGroup":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "grpGender":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segGroup').checked = true;
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "grpGroup":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segGroup').checked = true;
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('lstList').value = "";
			getObject('gdrGender').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "segGender":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('lstList').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "gdrGender":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segGender').checked = true;
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('lstList').value = "";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "segList":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "lstList":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segList').checked = true;
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "segTracker":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "tracker":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segTracker').checked = true;
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "trackerVal":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segTracker').checked = true;
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "bookingService":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segBooking').checked = true;
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			break;
		case "evtBooking":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segBooking').checked = true;
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			break;
		case "segBirth":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "gdrBirth":
			getObject('segBirth').checked = true;
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "birthMonth":
			getObject('segBirth').checked = true;
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "segJoin":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "gdrJoin":
			getObject('segJoin').checked = true;
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "joinMonth":
			getObject('segJoin').checked = true;
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('grpGender').value = "";
			getObject('grpGroup').value = "";
			getObject('cevtGender').value = "";
			getObject('cevtEvent').value = "";
			getObject('cevtOcc').value = "MM/DD/YYYY";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('segMemStaff').value = "";
			getObject('memStaff').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "segMemStaff":
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segCommEvent').value = "";
			getObject('grpGender').value = "";
			getObject('lstList').value = "";
			getObject('grpGroup').value = "";
			getObject('gdrGender').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
		case "memStaff":
			getObject('segMemStaff').checked = true;
			getObject('scevtGender').value = "";
			getObject('scevtEvent').value = "";
			getObject('segCommEvent').value = "";
			getObject('grpGender').value = "";
			getObject('lstList').value = "";
			getObject('grpGroup').value = "";
			getObject('gdrGender').value = "";
			getObject('evtGender').value = "";
			getObject('evtEvent').value = "";
			getObject('evtOcc').value = "MM/DD/YYYY";
			getObject('tracker').value = "";
			getObject('trackerVal').value = "";
			getObject('gdrBirth').value = "";
			getObject('birthMonth').value = "";
			getObject('gdrJoin').value = "";
			getObject('joinMonth').value = "";
			if (hasBooking == 1) {
				getObject('bookingService').value = "";
				getObject('bookingDate').value = "MM/DD/YYYY";
			}
			break;
	}
}