// last change 10 May : IE Password fix

// last change 13 April : Login placeholders not working properly

/* Description : 

Put everything into functions

*/
// last change 4 April : Placeholders on Date not changing

/* Description : 

Completly overhaledthe way the placeholders evaluate the value

*/
// last change 3 April : Placeholders on Date not changing

/* Description : 

changed the way the feild is evaluated, becuase 
the date jquery changes on blur I suspect so I this now
evaluates on .change

*/
// last change 2 April : Values wasnt submiting

// add this class to input's with placeValue attr
$('input[placeValue], textarea[placeValue]').addClass('placeholder-value');

// get the input value on focus and empty it
$('input[placeValue=true], textarea[placeValue=true]').focus(function(){
// only if the attr placeValue is set - empty the value
if($(this).attr('placeValue')){
	
	if($(this).val() == $(this).attr('defaultValue'))
	{
  		$(this).val('');
  		$(this).removeClass('placeholder-value');
	}
}
});

// get the input value on blur and reset it back
$('input[placeValue=true], textarea[placeValue=true]').blur(function(){
	
	$this = $(this);
	
	if($this.hasClass('hasDatepicker')){
	
		dateplaceholder();
		
 	} // end main if
 	else if($this.hasClass('hasTimepicker')){
	
		timeplaceholder();
		
 	} // end main if

  	else {
 		textplaceholder();
 	} // end main else 
 	
 	function textplaceholder (){
		// only if the attr placeValue is set - reset the valueOf()
		var input = $this;
		
		defaultVal = input.attr('defaultValue');
		placeVal = input.attr('placeValue');
		actualVal = input.attr('value');
		
		
		if(actualVal == "" || actualVal == undefined && placeVal == "true")
		{
			input.val(input.attr('defaultValue'));
			input.addClass('placeholder-value');
		}
		if (actualVal != "" && actualVal != defaultVal){
			input.removeClass('placeholder-value');
		}
	}
	function dateplaceholder() {
		setTimeout(function () {
		$('.hasDatepicker').each(function(){
		// only if the attr placeValue is set - reset the valueOf()
		var input = $(this);
		
		defaultVal = input.attr('defaultValue');
		placeVal = input.attr('placeValue');
		actualVal = input.attr('value'); 
		
		
		if(actualVal == "" || actualVal == undefined && placeVal == "true")
		{
			input.val(input.attr('defaultValue'));
			input.addClass('placeholder-value');
		}
		if (actualVal != "" && actualVal != defaultVal){
			input.removeClass('placeholder-value');
		}
	 	});
	 	}, 200);
	}
	function timeplaceholder() {
		setTimeout(function () {
		$('.hasTimepicker').each(function(){
		// only if the attr placeValue is set - reset the valueOf()
		var input = $(this);
		
		defaultVal = input.attr('defaultValue');
		placeVal = input.attr('placeValue');
		actualVal = input.attr('value'); 
		
		
		if(actualVal == "" || actualVal == undefined && placeVal == "true")
		{
			input.val(input.attr('defaultValue'));
			input.addClass('placeholder-value');
		}
		if (actualVal != "" && actualVal != defaultVal){
			input.removeClass('placeholder-value');
		}
	 	});
	 	}, 200);
	}
});

// Listen for submit

$('input[type=submit]').click(function(){

  $('input[type=text]').each(function(){
   
   $this = $(this);
   
   input = $this.val();
   
   defaultVal = $this.attr('defaultValue');
   placeVal = $this.attr('placeValue');
   actualVal = $this.attr('value');
   
   // Find emtpy defualt placeholder feilds and empty them
   
   if(actualVal == defaultVal && placeVal == "true")
   {
    $this.val('');
   }
  })
  return true;
});

////////////////////////////////////////////
// nasty but only fix for chrome input bug //
////////////////////////////////////////////

if (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0)
{
    var _interval = window.setInterval(function ()
    {
        var autofills = $('input:-webkit-autofill');
        if (autofills.length > 0)
        {
            window.clearInterval(_interval); // stop polling
            autofills.each(function()
            {
                var clone = $(this).clone(true, true);
                $(this).after(clone).remove();
            });
        }
    }, 20);
}
$('.home-password').after('<span class="placeholder-value placeholder-span">Password</span>');

$('.home-password').focus(function(){
	$('.placeholder-span').hide();
});

$('.placeholding-input').click(function(){
	$('.placeholder-span').hide();
	$('.home-password').focus();
});
$('.home-password').blur(function(){
	// only if the attr placeValue is set - reset the valueOf()
	
		var input = $(this);
		
		actualVal = input.attr('value');
		
		if(actualVal == "")
		{
			$('.placeholder-span').show();
		}
});
