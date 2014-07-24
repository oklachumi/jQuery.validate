$(function () {
  var msgs;
  var setError = function (elem, msg) {
    msgs.push('<li>' + msg + '</li>');
    $(elem)
    .addClass('error_field')
    .after('<span class="error_mark">*</span>');
  };

  $('#fm').submit(function (e) {
    msgs = [];
    $('.error_mark').remove();
    $('.valid', this)
    .removeClass('error_field')
    .filter('.required')
    .each(function () {
      if ($(this).val() === '') {
        setError(this,
          $(this).prev('label').text() + '必須輸入喔。');
      }
    })
    .end()
    .filter('.length')
    .each(function () {
      if ($(this).val().length > $(this).data('length')) {
        setError(this,
          $(this).prev('label').text() + '不可超過' +
          $(this).data('length') + '個文字。');
      }
    })
    .end()
    .filter('.range')
    .each(function () {
      var v = parseFloat($(this).val());
      if (v < $(this).data('min') || v > $(this).data('max')) {
        setError(this,
          $(this).prev('label').text() + '請輸入在' +
          $(this).data('min') + '～' + $(this).data('max') +
          '的範圍裡。');
      }
    })
    .end()
    .filter('.inarray')
    .each(function () {
      var opts = $(this).data('option').split(' ');
      if ($.inArray($(this).val(), opts) === -1) {
        setError(this,
          $(this).prev('label').text() + '請' +
          opts.toString() + '的其中一個輸入。');
      }
    })
    .end()
    .filter('.regexp')
    .each(function () {
      var reg = new RegExp($(this).data('pattern'), 'gi');
      if (!reg.test($(this).val())) {
        setError(this,
          $(this).prev('label').text() + '的格式有誤。');
      }
    });

    if (msgs.length === 0) {
      $('#error_summary').css('display', 'none');
    } else {
      $('#error_summary')
        .css('display', 'block')
        .html(msgs.join(''));
      e.preventDefault();
    }
  });
});