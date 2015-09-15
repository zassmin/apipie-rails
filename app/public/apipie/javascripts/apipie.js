$(document).ready(function() {
  if (typeof prettyPrint == 'function') {
    $('pre.ruby').addClass('prettyprint lang-rb');
    prettyPrint();
  }

  $('form#api-params').on('submit', function(event) {
    event.preventDefault();
    var $form = $(this);
    var actionTemplateUrl = $form.data('action-template');
    var $urlParams = $('input[name^="url_params"]');

    $urlParams.each(function(index, urlParam) {
      var urlParamName = /url_params\[(.*)\]/.exec($(urlParam).attr('name'))[1];
      actionTemplateUrl = actionTemplateUrl.replace(':' + urlParamName, $(urlParam).attr('value'));
    });

    $.ajax({
      url: actionTemplateUrl,
      type: $form.attr('method'),
      data: $form.find('input').not('input[name^="url_params["]').serialize(),
      dataType: "json",
      success: function(data) {
        $('#data-stuff code').html(JSON.stringify(data));
        $('pre.ruby').addClass('prettyprint lang-rb');
        prettyPrint();
      },
      error: function(data) {
        $('#data-stuff code').html(JSON.stringify(data));
        $('pre.ruby').addClass('prettyprint lang-rb');
        prettyPrint();
      }
    });
  });

  $('#api-link').on('click', function(event) {
    event.preventDefault();
    var $form = $(this);

    $.ajax({
      url: $form.attr('href'),
      type: $form.attr('data-method'),
      success: function(data) {
        $('#data-stuff code').html(JSON.stringify(data));
        $('pre.ruby').addClass('prettyprint lang-rb');
        prettyPrint();
      },
      error: function(data) {
        $('#data-stuff code').html(JSON.stringify(data));
        $('pre.ruby').addClass('prettyprint lang-rb');
        prettyPrint();
      }
    });
  })
});
