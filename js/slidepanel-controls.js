
var login = jQuery.noConflict();
    	
		login(document).ready(function(){
            
            var $username = login("#username"),
                $password = login("#password"),
                $usernameLabel = $username.next();
            
			login(".btn-slide").click(function(){
			  login("#panel").slideToggle("slow");
			  login(this).toggleClass("active");
			  
			  $username.focus();
			  
			  if($username.val()) $usernameLabel.hide();
			  if($password.val()) login('.placeholding-input span').hide();
			});
			
			$username.keydown(function() {
			    $usernameLabel.hide();
			});
			
			$username.blur(function() {
			    if(!$(this).val()) {
			        $usernameLabel.show();
			    } else {
			        if($password.val()) $password.next().hide();
			    }
			});
			
			$usernameLabel.click(function() {
			    $(this).hide();
			    $username.focus();
			})
			
			
		});
