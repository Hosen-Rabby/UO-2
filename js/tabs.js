$(document).ready(function() {
 
	//Default Action
	$(".tab_content").hide(); //Hide all content
	$("ul.dashboard-tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content
	
	//Default Action
	$(".sidebar_content").hide(); //Hide all content
	$("ul.sidebar-tabs li:first").addClass("active").show(); //Activate first tab
	$(".sidebar_content:first").show(); //Show first tab content
	
	//Default Action

	$(".manage-sidebar_content").hide();
	$("ul.manage-sidebar-tabs li:last").addClass("active").show();
	$("ul.manage-sidebar-tabs li:first").removeClass("active");
	$(".manage-sidebar_content:last").show();
	
	//Default Action
	$(".content_content").hide(); //Hide all content
	$("ul.content-tabs li:first").addClass("active").show(); //Activate first tab
	$(".content_content:first").show(); //Show first tab content
	
	if($("ul.content-tabs li").hasClass('load-upcoming-tab') == false){
	
		//Default Action
		$(".content_content").hide(); //Hide all content
		$("ul.content-tabs li:first").addClass("active").show(); //Activate first tab
		$(".content_content:first").show(); //Show first tab content
	
	} else {
		// load upcoming first
		
		$(".content_content").hide();
		$("ul.content-tabs li:last").addClass("active").show();
		$("ul.content-tabs li:first").removeClass("active");
		$(".content_content:last").show();
	}
	
	//Default Action
	
	$(".view-sign-ups .sidebar_content").hide();
	$(".view-sign-ups ul.sidebar-tabs li:last").addClass("active").show();
	$(".view-sign-ups ul.sidebar-tabs li:first").removeClass("active");
	$(".view-sign-ups .sidebar_content:last").show();
	
	
	//Default Action
	$(".bi-directional .sidebar_content").hide(); //Hide all content
	$(".bi-directional ul.sidebar-tabs li:last").addClass("active").show(); //Activate last tab
	$(".bi-directional ul.sidebar-tabs li:first").removeClass("active"); //Remove any "active" class
	$(".bi-directional .sidebar_content:last").show(); //Show last tab content
	
	// Show manage tab first
	$(".reports .sidebar_content").hide(); //Hide all content
	$(".reports ul.sidebar-tabs li:last").addClass("active").show(); //Activate last tab
	$(".reports ul.sidebar-tabs li:first").removeClass("active"); //Remove any "active" class
	$(".reports .sidebar_content:last").show(); //Show last tab content
	
	//On Click Event
	$("ul.dashboard-tabs li").click(function() {
		$("ul.dashboard-tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(0); //Fade in the active content
		return false;
	});
	
	//On Click Event
	$("ul.tabs2 li").click(function() {
		$("ul.tabs2 li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content2").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(0); //Fade in the active content
		return false;
	});
	
	
	
	//On Click Event
	$("ul.sidebar-tabs li").click(function() {
		$("ul.sidebar-tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".sidebar_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(0); //Fade in the active content
		return false;
	});
	
	//On Click Event
	$("ul.manage-sidebar-tabs li").click(function() {
		$("ul.manage-sidebar-tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".manage-sidebar_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(0); //Fade in the active content
		return false;
	});
	
	//On Click Event
	$("ul.tabs2 li").click(function() {
		$("ul.tabs2 li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".sidebar_content2").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(0); //Fade in the active content
		return false;
	});
	
	
	
	//On Click Event
	$("ul.content-tabs li").click(function() {
		$("ul.content-tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".content_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(0); //Fade in the active content
		return false;
	});

    
});
