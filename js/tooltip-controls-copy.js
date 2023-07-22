var qtipGP = jQuery.noConflict();
    	
		qtipGP(".faq-tip").qtip({
  		content: '<p>This is an example.</p>',

		style: { 
      		  tip: { corner: 'bottomMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'center',
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 }
		},
		position: { 
			corner: {
         		target: 'topMiddle',
         		tooltip: 'bottomMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
		
		qtipGP(".faq-tip2").qtip({
  		content: '<p><strong>What is &quot;Remember Me&quot;?</strong></p><p style="margin-bottom:10px;">If you check this box you won\'t have to log in each time you visit the site. Instead, we\'ll place a cookie in this web browser that tells us it\'s ok to log you in. If you visit our site from multiple devices (a computer, an iPad, a smart phone) you can check this box once when logging in from each device and we\'ll remember you on that device.</p><p style="margin-bottom:10px;">Checking this box will make signing up for activities much easier. When you get your reminder email, just click the link in the email and you\'ll be signed up. You won\'t have to log in each time and find the specific date you\'re looking for.</p><p style="margin-bottom:10px;">The cookie is created by logging in with this box checked. The cookie is removed by logging out of the site. So if you want to keep the cookie active so we can remember you, don\'t click Log Out. Instead, just close your browser and we\'ll be able to automatically log you in at your next visit.</p><p style="margin-bottom:10px;">If you ever want to remove the cookie, all you need to do is Log Out of the site. That will remove the cookie from your browser. You\'re in complete control.</p>',

		style: { 
      		 tip: { corner: 'bottomMiddle' },
			background: '#FFF4C6',
      		color: 'black',
      		textAlign: 'left',
      		width: 600,
      		padding: 15,
      		border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 }
		},
		position: { 
			corner: {
         		target: 'topMiddle',
         		tooltip: 'bottomMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
		
		
		
		qtipGP(".cal-tip1").qtip({
  		content: {
  		text: '<time datetime="2011-12-10" class="qtip-time">Saturday, December 10</time><h3 class="qtip-heading">Another Event Title Here</h3><p class="qtip-signedup-text">You\'re signed up</p><div class="cancel"><a href="#">Cancel</a></div>',
		title: {
			text: '',
      		button: 'Close'
        	}
        },
		style: { 
      		  tip: { corner: 'leftMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'left',
      		  padding: 12,
      		  marginTop: -10,
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 }
		},
		
   		show: { when: { event: 'click' } },
		hide: { when: { event: 'click' } },
		
		position: { 
			corner: {
         		target: 'rightMiddle',
         		tooltip: 'leftMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
		
		
		qtipGP(".cal-tip2").qtip({
  		content: {
  		text: '<time datetime="2011-12-10" class="qtip-time">Saturday, December 10</time><h3 class="qtip-heading">Another Event Title Here</h3><p class="qtip-signedup-text">You\'re signed up</p><div class="cancel"><a href="#">Cancel</a></div><hr style="clear:both; margin:55px 0px 0px 0px;" /><h3 class="qtip-heading">Another Event Title Here</h3><p class="qtip-notsignedup-text">You\'re not signed up</p><div class="join"><a href="#">Join</a></div><p class="remove">or</p><div class="decline"><a href="#">Decline</a></div><p class="qtip-remove red">by Friday 9th December at 11:59pm</p>',
		title: {
			text: ' ',
      		button: 'Close'
        	}
        },
		style: { 
      		  tip: { corner: 'leftMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'left',
      		  padding: 12,
      		  marginTop: -10,
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 }
		},
		
		show: { when: { event: 'click' } },
		hide: { when: { event: 'click' } },
		
		position: { 
			corner: {
         		target: 'rightMiddle',
         		tooltip: 'leftMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
		
		
		
		qtipGP(".cal-tip3").qtip({
  		content: {
  		text: '<time datetime="2011-12-10" class="qtip-time">Saturday, December 10</time><h3 class="qtip-heading">Another Event Title Here</h3><p class="qtip-desc">The desc could be two lines long and now a little bit longer.</p><div class="join"><a href="#">Join</a></div><p class="remove">or</p><div class="decline"><a href="#">Decline</a></div><p class="qtip-remove red">by Friday 9th December at 11:59pm</p>',
		title: {
			text: ' ',
      		button: 'Close'
        	}
        },
		style: { 
      		  tip: { corner: 'leftMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'left',
      		  padding: 12,
      		  marginTop: -10,
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 } 
		},
		
		show: { when: { event: 'click' } },
		hide: { when: { event: 'click' } },
		
		position: { 
			corner: {
         		target: 'rightMiddle',
         		tooltip: 'leftMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
		
		qtipGP(".add-to-cal-tip1").qtip({
		content: {
  		text: '<div style="margin-top:-12px"><a href="#" class="add-tocal-menu-link">Add to Google Calendar</a><a href="#" class="add-tocal-menu-link">Add to iCal</a><a href="#" class="add-tocal-menu-link">Add to Outlook Calendar</a><div>',
		title: {
			text: ' ',
      		button: 'Close'
        	}
        },
		style: { 
      		  tip: { corner: 'leftMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'left',
      		  padding: 12,
      		  margin: 0,
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995',
       		  zindex: 100000000
     		 }
		},
		
		show: { when: { event: 'click' } },
		hide: { when: { event: 'click' } },
		
		position: { 
			corner: {
         		target: 'rightMiddle',
         		tooltip: 'leftMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
		
		qtipGP(".user-detail").qtip({
  		content: {
  		text: '<p style="line-height:22px; font-size:14px;"><strong>City:</strong> Cityname &nbsp;&nbsp; <strong>State:</strong> Statehere &nbsp;&nbsp; <strong>Zip:</strong> 1234567<br /><strong>Home:</strong> 123-456-789 &nbsp;&nbsp; <strong>Mobile:</strong> 123-456-789</p><hr /><div class="update"><a href="#">Update</a></div>',
		title: {
			text: ' ',
      		button: 'Close'
        	}
        },
		style: { 
      		  tip: { corner: 'leftMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'left',
      		  padding: 12,
      		  width:390,
      		  marginTop: -10,
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 } 
		},
		
		show: { when: { event: 'click' },
				solo: true },
		hide: { when: { event: 'click' } },
		
		position: { 
			corner: {
         		target: 'rightMiddle',
         		tooltip: 'leftMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
			
		qtipGP(".report-tooltip-one").qtip({
  		content: '<p>This is example text for the first info tooltip on the reports page</p>',

		style: { 
      		  tip: { corner: 'bottomMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'left',
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 }
		},
		position: { 
			corner: {
         		target: 'topMiddle',
         		tooltip: 'bottomMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
		qtipGP(".report-tooltip-two").qtip({
  		content: '<p>This is example text for the second info tooltip on the reports page</p>',

		style: { 
      		  tip: { corner: 'bottomMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'left',
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 }
		},
		position: { 
			corner: {
         		target: 'topMiddle',
         		tooltip: 'bottomMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
		qtipGP(".report-tooltip-three").qtip({
  		content: '<p>This is example text for the third info tooltip on the reports page</p>',

		style: { 
      		  tip: { corner: 'bottomMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'left',
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 }
		},
		position: { 
			corner: {
         		target: 'topMiddle',
         		tooltip: 'bottomMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
		qtipGP(".likes-pop-up").qtip({
  		content: '<p>Joe Bloggs, Jane Doe, John Doe</p>',

		style: { 
      		  tip: { corner: 'bottomMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'left',
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 }
		},
		position: { 
			corner: {
         		target: 'topMiddle',
         		tooltip: 'bottomMiddle'
         		},
         		adjust: { screen: true }
         		}
		});
		qtipGP(".actions-pop-up").qtip({
  		
  		content: {
  		text: '<p><a href="#admin" class="admin-link-manager">Edit</a><a href="#makeManager" class="make-link-manager">Make Manager</a><a href="#removeManager" class="remove-link-manager">Remove Manager</a></p>',
		title: {
			text: '',
      		button: 'Close'
        	}
        },
        		
		style: { 
      		  tip: { corner: 'bottomMiddle' },
			  background: '#FFF4C6',
      		  color: 'black',
      		  textAlign: 'left',
      		  width : 370,
      		  border: {
       		  width: 1,
       		  radius: 5,
       		  color: '#D5C995'
     		 }
		},
		
		show: { when: { event: 'click' },
				solo: true },
		hide: { when: { event: 'click' } },
		
		position: { 
			corner: {
         		target: 'topMiddle',
         		tooltip: 'bottomMiddle'
         		},
         		adjust: { screen: true }
         		}
		});