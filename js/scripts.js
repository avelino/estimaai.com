(function ($) {
	"use strict";

	/*
	|-----------------------------------------------------
	|	CONTROL Countdown box display
	|-----------------------------------------------------
	*/
	// Make 'false' to hide (top-bottom).
	var display_till_years		= false;
	var display_till_months 	= false;
	var display_till_days		= true;
	var display_till_hours		= true;
	var display_till_minutes	= true;
	var display_till_seconds	= true;

	// Hide Hour, Min, Sec boxes
	var hide_hr_min_sec			= 'no'; // make 'yes' to hide Hour, Min, Sec boxes

	/*
	|-----------------------------------------------------
	|	Countdown JS
	|-----------------------------------------------------
	*/
	function countDown(userDate){
		var frontYears 		= $( '.years' );
		var frontMonths 	= $( '.months' );
		var frontDays 		= $( '.days' );
		var frontHours		= $( '.hours' );
		var frontminutes	= $( '.minutes' );
		var frontSeconds	= $( '.seconds' );
		var expiredText		= $( '.expired-text' );
		var countDownUl		= $( '.count-down-list' );

		var currentDate = new Date().getTime();
		var difference = userDate.getTime() - currentDate;
		
		if(difference < 0){
			clearInterval(countd);
			$(expiredText).removeClass('hidden');
			$(countDownUl).addClass('hidden');
		}
		else {
			// if all boxes hide condition
			if (!display_till_years && !display_till_months && !display_till_days && !display_till_hours && !display_till_minutes && !display_till_seconds ) {
				$('#countdown-boxes').hide();
			} else {

				// seconds display condition
				if (display_till_seconds) {
					var seconds = Math.floor(difference / 1000);

					$('#years').hide();
					$('#months').hide();
					$('#days').hide();
					$('#hours').hide();
					$('#minutes').hide();
					$('#seconds').show();
				}

				// till minutes display condition
				if (display_till_minutes) {
					var minutes = Math.floor(difference / (1000 * 60));
					var seconds = Math.floor(difference % (1000 * 60) / 1000);

					$('#years').hide();
					$('#months').hide();
					$('#days').hide();
					$('#hours').hide();
					$('#minutes').show();
					$('#seconds').show();
				}

				// till hours display condition
				if (display_till_hours) {
					var hours = Math.floor(difference / (1000 * 60 * 60));
					var minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60));
					var seconds = Math.floor(difference % (1000 * 60) / 1000);

					$('#years').hide();
					$('#months').hide();
					$('#days').hide();
					$('#hours').show();
					$('#minutes').show();
					$('#seconds').show();
				}

				// till days display condition
				if (display_till_days) {
					var days = Math.floor(difference / (1000 * 60 * 60 * 24));
					var hours = Math.floor(difference % (1000 * 60 * 60 *24) / (1000 * 60 * 60));
					var minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60));
					var seconds = Math.floor(difference % (1000 * 60) / 1000);

					$('#years').hide();
					$('#months').hide();
					$('#days').show();
					$('#hours').show();
					$('#minutes').show();
					$('#seconds').show();
				}

				// till months display condition
				if (display_till_months) {
					var months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.436875));
					var days = Math.floor(difference % (1000 * 60 * 60 * 24 * 30.436875) / (1000 * 60 * 60 * 24));
					var hours = Math.floor(difference % (1000 * 60 * 60 *24) / (1000 * 60 * 60));
					var minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60));
					var seconds = Math.floor(difference % (1000 * 60) / 1000);

					$('#years').hide();
					$('#months').show();
					$('#days').show();
					$('#hours').show();
					$('#minutes').show();
					$('#seconds').show();
				}

				// till years display condition
				if (display_till_years) {
					var years = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.436875 * 12));
					var months = Math.floor(difference % (1000 * 60 * 60 * 24 * 30.436875 * 12) / (1000 * 60 * 60 * 24 * 30.436875));
					var days = Math.floor(difference % (1000 * 60 * 60 * 24 * 30.436875) / (1000 * 60 * 60 * 24));
					var hours = Math.floor(difference % (1000 * 60 * 60 *24) / (1000 * 60 * 60));
					var minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60));
					var seconds = Math.floor(difference % (1000 * 60) / 1000);

					$('#years').show();
					$('#months').show();
					$('#days').show();
					$('#hours').show();
					$('#minutes').show();
					$('#seconds').show();
				}

				// Hr, Min, Sec hide condition
				if ('yes' == hide_hr_min_sec) {
					$('#hours').hide();
					$('#minutes').hide();
					$('#seconds').hide();
				}
			}

			// Double zero conditions
			if(years < 10){years = "0" + years;}
			if(months < 10){months = "0" + months;}
			if(days < 10){days = "0" + days;}
			if(hours < 10){hours = "0" + hours;}
			if(minutes < 10){minutes = "0" + minutes;}
			if(seconds < 10) {seconds = "0" + seconds;}

			// display numbers
			(years > 0) ? $(frontYears).text(years) : $('#years').hide();
			(months > 0) ? $(frontMonths).text(months) : $('#months').hide();
			(days > 0) ? $(frontDays).text(days) : $('#days').hide();
			$(frontHours).text(hours);
			$(frontminutes).text(minutes);
			$(frontSeconds).text(seconds);
		}
	}

	function randomDate(start, end) {
		var rand = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
		// 31 Dec, 2019 12:00:00
		return rand;
	}

	$("#btn-send").click(function(){
		var today = new Date();
		var company = $("#company:checked").val()
		if (company == "startup"){
			var maxDate = new Date(today.getFullYear(), (today.getMonth() + Math.floor(Math.random()*(2-1+1)+1)), 31);
		} else {
			var maxDate = new Date(today.getFullYear(), 11 + Math.floor(Math.random()*(13-1+1)+1), 31);
		}
		var getRandomDate = randomDate(today, maxDate)
		$("#count-timer").show();
		$(".subscribe-form").hide();
		countDown(getRandomDate);
		setInterval(function(){
			countDown(getRandomDate);
		}, 1000);
	});
}(jQuery));