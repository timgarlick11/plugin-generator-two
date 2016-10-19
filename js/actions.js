$(function ($) {

	




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

		formLoop($(this).serializeArray());
	});

	var formLoop = function(form) {

		for (var key in form) {
			console.log(form[key].name + " : " + form[key].value);
			

		}

	}

});
