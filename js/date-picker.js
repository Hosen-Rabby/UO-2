	var datepickeroo = jQuery.noConflict();
	datepickeroo(function() {
		var dates = datepickeroo( "#from, #to" ).datepicker({
			defaultDate: "+1w",
			changeMonth: false,
			numberOfMonths: 1,
			onSelect: function( selectedDate ) {
				var option = this.id == "from" ? "minDate" : "maxDate",
					instance = datepickeroo( this ).data( "datepicker" ),
					date = datepickeroo.datepicker.parseDate(
						instance.settings.dateFormat ||
						datepickeroo.datepicker._defaults.dateFormat,
						selectedDate, instance.settings );
				dates.not( this ).datepicker( "option", option, date );
			}
		});
		datepickeroo("#from-seasonal, #to-seasonal").focus(function() {
  			datepickeroo('.ui-datepicker-year,.ui-datepicker-year').hide();
		});
		var datesSeasonal = datepickeroo( "#from-seasonal, #to-seasonal" ).datepicker({
			
			dateFormat: 'mm-dd',
			showYear: false,
			defaultDate: "+1w",
			changeMonth: false,
			numberOfMonths: 1,
			onSelect: function( selectedDate ) {
				var option = this.id == "from-seasonal" ? "minDate" : "maxDate",
					instance = datepickeroo( this ).data( "datepicker" ),
					date = datepickeroo.datepicker.parseDate(
						instance.settings.dateFormat ||
						datepickeroo.datepicker._defaults.dateFormat,
						selectedDate, instance.settings );
				datesSeasonal.not( this ).datepicker( "option", option, date );
			}
		});
	});