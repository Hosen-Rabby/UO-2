jQuery(document).ready(function() {
    if(document.getElementsByClassName("form-section-contents").length){
        if(typeof $("#bundleSelected").val() != "undefined" && $("#bundleSelected").val() === "yes" ){
            
        }else{
            $("#remSched option[value=create]").attr('selected','selected');
        }
        
     
    
                $( "input,select" ).not("#activity_calendar").on('keyup change', function (){
                    if($(this).val().length > 0 && $(this).hasClass( "error-field" )){
                        $(this).removeClass("error-field")
                    }
                    if($(this).attr("type") == "checkbox" && $(this).attr("name") == "e_weekly[]"){
                        if($('input[name^=e_weekly]:visible:checked').length > 0){
                            if($(this).closest('table').first().hasClass( "error-field" )){
                                $(this).closest('table').first().removeClass("error-field");
                            }
                        }else{
                            $(this).closest('table').first().addClass("error-field");
                        }
                    }
                    if($(this).attr("type") == "radio" && $(this).attr("name") == "e_monthly"){
                        if($('input[name^=e_monthly]:visible:checked').length > 0){
                            if($(this).closest('table').parent().closest('table').hasClass( "error-field" )){
                                $(this).closest('table').parent().closest('table').removeClass("error-field");
                            }
                        }else{
                           $(this).closest('table').parent().closest('table').addClass("error-field");  
                        }
                    }
                });
                $("input").click(function(){
                    if(typeof $(this).data("datepicker") != "undefined" && $(this).data("datepicker") != null){
                        if(!$(this).datepicker( "widget" ).is(":visible")){
                           $(this).datepicker( "show" );
                        }
                    }
                });
            }
    });
/*SHOW ACTIVITY STEPS*/
        function showNextStep_valid(step,formtype) {
            var laststep = parseFloat(step) - 1;
            var errors = 0;
            $("#"+formtype).find('#step'+laststep).find('input,select').each(function () {
                var $this = $(this);
                if($this.is(":visible")){
                    if($this.is("input")){
                        var checkreqfield = $this.parent().prev('td').text();
                        if(checkreqfield.indexOf("*") > 0){
                            if($this.hasClass( "placeholder-value" ) || $this.val() == ''){
                                $this.addClass("error-field");
                                $('html, body').animate({ scrollTop: $this.offset().top - 150 }, 'slow', function() { $this.focus()});
                                errors = 1;
                                return false;
                            }
                        }
                        var checkreqfieldcomm = $this.prev('p').text();
                         if(checkreqfieldcomm.indexOf("*") > 0){
                            if($this.hasClass( "placeholder-value" )){
                                $this.addClass("error-field");
                                $('html, body').animate({ scrollTop: $this.offset().top - 150 }, 'slow', function() { $this.focus()});
                                errors = 1;
                                return false;
                            }
                        }
                        if($this.attr("type") == "checkbox" && $this.attr("name") == "e_weekly[]" && $('input[name^=e_weekly]:visible:checked').length < 1){
                                $this.closest('table').first().addClass("error-field");
                                $('html, body').animate({ scrollTop: $this.offset().top - 150 }, 'slow');
                            errors = 1;
                            return false;
                        }
                        if($this.attr("type") == "radio" && $this.attr("name") == "e_monthly"){
                            if($('input[name^=e_monthly]:visible:checked').length < 1){
                                $this.closest('table').parent().closest('table').addClass("error-field");
                                $('html, body').animate({ scrollTop: $this.offset().top - 150 }, 'slow');
                                errors = 1;
                                return false;
                            }else{
                                $('input[name^=e_monthly]:visible:checked').first().closest('tr').find('select').each(function () {
                                    if($(this).val() == '' && errors == 0){
                                            if($(this).attr("id") == "e_dow_day" && $(this).find(':selected').attr('data-skip') != 0){
                                      
                                        }else{
                                            $(this).addClass("error-field");
                                            $('html, body').animate({ scrollTop: $this.offset().top - 150 }, 'slow');
                                            errors = 1;
                                              return false;
                                        }
                                    }
                                });
                                if(errors > 0){
                                    return false;
                                }
                            }   
                        }
                        
                    }else if($this.is("select")){
                        if($("select[name=numInstances]:visible").find(':selected').attr('data-skip') == '1'){
                           $this = $("select[name=numInstances]:visible");
                             $this.addClass("error-field");
                                $('html, body').animate({ scrollTop: $this.offset().top - 150 }, 'slow', function() { $this.focus()});
                                errors = 1;
                                return false;
                        }
                        var checkreqfield = $this.parent().prev('td').text();
                        if(checkreqfield.indexOf("*") > 0){
                            if($this.find(':selected').attr('data-skip') == 0){
                                $this.addClass("error-field");
                                $('html, body').animate({ scrollTop: $this.offset().top - 150 }, 'slow', function() { $this.focus()});
                                errors = 1;
                                return false;
                            };
                        }   
                    }
                }
            });
            if(errors == 0){
               
                if(!$("#"+formtype).find('#step' + step).length){
                    step++;
                }
                if(step == 2 && $("#advfrm").is(":visible")){
                    remScheduleOptions();
                }
                $("#"+formtype).find('#step' + step).slideDown(500);
                $('html, body').animate({ scrollTop: $("#"+formtype).find('#step' + step).offset().top - 50 }, 'slow');
                $("#"+formtype).find('#step' + laststep + ' .next_activity_step a').addClass('disable')
            }
        }