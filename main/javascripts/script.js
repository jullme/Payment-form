'use strict';

$(document).ready(function() {
  // http://www.formvalidator.net/#security-validators
  $.formUtils.addValidator({
    name : 'credit_card_number',
    validatorFunction : function(value, $el, config, language, $form) {
      let answer = false;
      value = value.replace(/ /g,'');
      if ('' === value) {
        return answer;
      }
      const visa = /^4[0-9]{12}(?:[0-9]{3})?$/g;
      answer = visa.test(value);
      if (answer) {
        return answer;
      }
      const mastercard = /^5[1-5][0-9]{14}$/g;
      answer = mastercard.test(value);
      if (answer) {
        return answer;
      }
      const amex = /^3[47][0-9]{13}$/g;
      answer = amex.test(value);
      if (answer) {
        return answer;
      }
      const discover = /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/g;
      answer = discover.test(value);
      return answer;
    },
    errorMessage : 'You have to enter valid credit card number',
    errorMessageKey: 'badCreditCardNumber'
  });
  $.formUtils.addValidator({
    name : 'credit_card_month',
    validatorFunction : function(value, $el, config, language, $form) {
      let answer = false;
      value = value.replace(/ /g,'');
      if ('' === value) {
        return answer;
      }
      if (+value >= 1 && 12 >= +value) {
        answer = true;
      }

      return answer;
    },
    errorMessage : 'You have to enter valid credit card month',
    errorMessageKey: 'badCreditCardMonth'
  });
  $.formUtils.addValidator({
    name : 'credit_card_year',
    validatorFunction : function(value, $el, config, language, $form) {
      let answer = false;
      value = value.replace(/ /g,'');
      if ('' === value || 4 !== value.length) {
        return answer;
      }
      value = +value;
      const now = new Date();
      const year = now.getFullYear();
      if (value >= year && (year + 20 ) >= value) {
        answer = true;
      }

      return answer;
    },
    errorMessage : 'You have to enter valid credit card year',
    errorMessageKey: 'badCreditCardYear'
  });
  $.validate({
    form : '.form',
    modules : 'date, security, html5, toggleDisabled',
    disabledFormFilter : 'form.toggle-disabled',
    showErrorDialogs : false,
    onSuccess: function(){
      window.location.href = window.location.href;
      return false;
    }
  });
  $('#first_name').on('validation', function(evt, valid) {
    if (!valid) {
        $('.tooltip__first-name').show();
        $('#first_name').css('border-color','#ef5250')
    }
  });
  $('#last_name').on('validation', function(evt, valid) {
    if (!valid) {
        $('.tooltip__last-name').show();
        $('#last_name').css('border-color','#ef5250')
    }
  });
  $('#card_number').on('validation', function(evt, valid) {
    if (!valid) {
        $('.tooltip__card-number').show();
        $('#card_number').css('border-color','#ef5250')
    }
  });
  $('#exp_month').on('validation', function(evt, valid) {
    if (!valid) {
        $('.tooltip__exp-month').show();
        $('#exp_month').css('border-color','#ef5250')
    }
  });
  $('#exp_year').on('validation', function(evt, valid) {
    if (!valid) {
        $('.tooltip__exp-year').show();
        $('#exp_year').css('border-color','#ef5250')
    }
  });
  $('#cvv_cvc').on('validation', function(evt, valid) {
    if (!valid) {
        $('.tooltip__cvv-cvc').show();
        $('#cvv_cvc').css('border-color','#ef5250')
    }
  });
  $('#code').on('validation', function(evt, valid) {
    if (!valid) {
        $('.tooltip__code').show();
        $('#code').css('border-color','#ef5250')
    }
  });
  $('body').on('click', function() {
      $('.tooltip').hide();
      $('.form-group__input, select').css('border-color','#b1b1b1');
  });
  $('#info_icon').on('click', function() {
      $('.cvv-info__window').css('display','flex');
  });
  $('body').click(function(evt){
      if(evt.target.id == "info_icon"){
          return;
      }
      if($(evt.target).closest('#info_icon').length) {
          return;
      }
      $('.cvv-info__window').hide();
  });
});
