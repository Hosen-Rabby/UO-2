$(document).ready(function() {
 
	//Default Action
	$(".tab_content").hide(); //Hide all content
	$("ul.dashboard-tabs li:last").addClass("active").show(); //Activate first tab
	$(".tab_content:last").show(); //Show first tab content
	
	
	//Default Action
	$(".content_content").hide(); //Hide all content
	$("ul.content-tabs li:last").addClass("active").show(); //Activate first tab
	$(".content_content:last").show(); //Show first tab content
	
	if($("ul.content-tabs li").hasClass('load-upcoming-tab') == true){
	
		//Default Action
		$(".content_content").hide(); //Hide all content
		$("ul.content-tabs li:last").addClass("active").show(); //Activate first tab
		$(".content_content:last").show(); //Show first tab content
	
	} else {
		// load communities first
		$(".content_content").hide();
		$("ul.content-tabs li:last").addClass("active").show();
		$("ul.dashboard-tabs li:first").removeClass("active");
		$("ul.content-tabs li:first").removeClass("active");
		$(".content_content:last").show();
	}
	
	
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
	$("ul.content-tabs li").click(function() {
		$("ul.content-tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".content_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(0); //Fade in the active content
		return false;
	});

    
});
