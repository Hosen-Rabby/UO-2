var slideDown = jQuery.noConflict();
slideDown(document).ready(function(){
	var count = 0;
	slideDown(".btn-slide-group").click(function(){
	  count++;
	  slideDown("#signedup-people-panel").slideToggle("slow");
	  slideDown(this).toggleClass("active");
	  
	  if(count % 2 == 0){
	  	slideDown(this).html("Show More");
	  } else {
	  	slideDown(this).html("Show Less");
	  }
	  
	});
});