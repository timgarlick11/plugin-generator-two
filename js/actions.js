$(function ($) {

	console.log(this);
// $('.software-recommendation').append('<img src=images/avalara-inventory-management.png');

var start = true;
var questionNumber = $('.pagination-container button');
var form = $('form');
var checkboxChecked = 0;
var detached;

	// $(".showNext, .showFirst").prop("disabled", true).css('opacity', '.5');
	$("button").prop("disabled", true).css('opacity', '.5');//set all buttons to disabled on page load

	var pageLoad = function() {
		if (start === true) {
			$("#industry").show();
			$('.start').addClass('highlight').prop('disabled', false).css('opacity', '1');
			$('button.showPrev').prop('disabled', false).css('opacity', '1');
			$('button.results').prop('disabled', false).css('opacity', '1');
		}
	}
	pageLoad();

	$('.showNext').click(function(e) {
		var numberFilter = $(this).parent().data('number');
		
		
		questionNumber.removeClass('highlight');
		questionNumber.eq(numberFilter).each(function(index, element) {
			$(this).next().prop('disabled', false).css('opacity', '1').addClass('highlight');

		});
		$(this).parent().next().fadeIn(500);
		$(this).parent().fadeOut(-500);


	});

	$('.showPrev').click(function(e) {
		var numberFilter = $(this).parent().data('number');
		console.log(numberFilter)
		questionNumber.removeClass('highlight');
		questionNumber.eq(numberFilter).each(function(index, element) {
			$(this).prev().addClass('highlight');

		});
		$(this).parent().prev().fadeIn(500);
		$(this).parent().fadeOut(-500);



	});

	$("input:radio").change(function (e) { 
		$(this).parent('label').siblings('.showNext').prop('disabled', false).css('opacity', '1');
	});
	$("input.revenue:checkbox").change(function (e) { 

		checkBoxDetect($(this), e.currentTarget)
		
	});

	$("input.plugin-recommendation:checkbox").change(function (e) { 

		checkBoxDetect($(this))
		
	});

	var checkBoxDetect = function(checkbox) {
		var checkedState = $('input.' + checkbox[0].className + ':checkbox:checked').length;
		var buttonState = checkbox.parent('label').siblings('.showNext');	

		if (checkedState > 0) {
			buttonState.prop('disabled', !checkedState).css('opacity', '1');	
		}
		else {
			buttonState.prop('disabled', !checkedState).css('opacity', '.5');
		}

	}

	form.on('submit', function(e) {

		e.preventDefault();
		var form = $(this);
		$('.load-container').fadeIn(300);
		$('.form-container').fadeOut(2500);
		setTimeout(function(){
			formLoop(form.serializeArray());
		}, 2800);
		
	});



	var formLoop = function(form) {
		console.log(form)
		$('.load-container').fadeOut(300);
		$('.software-container').fadeIn(400).css('display', 'inline-block');
		$('.software-recommendation').fadeIn(500);
		var url = "https://www.fishbowlinventory.com/";
		var duplicateCheckArray = [];
		
		for (var key in form) {

			duplicateCheckArray.push(form[key].value);
			var duplicateValue = duplicateCheckArray.indexOf(form[key].value)
			if (form[key].name === "first-name") {
				$('.software-recommendation h1').html("Thank You " + form[key].value + "!");
				$('.software-recommendation h2').html("Below is a list of recommended software" + "<br>" +  "that will help streamline your business")
			}
			if (form[key].name === "recommendation" && form[key].value !== "none") {
				
				duplicateCheckArray.push(form[key].value);
				$('.software-recommendation').append('<a href=' + url + form[key].value + '><img src="images/' + form[key].value + '.png"></a>');
			}


		} 

		$('.software-recommendation').append('<div class="schedule-container"><div class="schedule"><a href="" class="schedule-link">Schedule Demo</a></div>' + '<div class="schedule"><a href="" class="schedule-link"> Free 14 Day Trial</a></div></div>');


	}


});
