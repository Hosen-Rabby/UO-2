(function($){
/*STYLE ALL SELECT BOXES
	==============================*/

	
	
	/*jQuery('select').each(function()
	{
		
			jQuery(this).wrap('<div class="select_style '+$(this).attr('class')+'"></div>');

	})*/
	
	
   
     
     
     
   /*SHOW FORMS*/
        
        $('.form_choice a').click(
       	 	function()
       		 {
       		 
       		 	var openform = $(this).attr('data-open');
       		 	
       		 	$('.short_form,.advanced_form').hide()
       		 	$('.'+openform).show()
       		 	
       		 	$('.form_choice .active').removeClass('active')
       		 	$(this).parent().addClass('active');
       		 }
        )
})(jQuery)
/*SHOW ACTIVITY STEPS*/
        function showNextStep(step) {
        	
            	var laststep = parseFloat(step) - 1
            	//jQuery('#step' + laststep).slideUp(500)
                jQuery('#step' + step).slideDown(500)
          		jQuery('#step' + laststep + ' .next_activity_step a').addClass('disable')
        }
        
     
 