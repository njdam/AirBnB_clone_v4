// Use strict mode to avoid coding errors
'use strict';
// A javascript to listen for changes on each input checkbox tag.
$(document).ready(init);
const HOST = 'localhost';
const PORT = '5001';

function init () {
  apiStatus();
  const amenityObject = {};
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amenityObject[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amenityObject[$(this).attr('data-name')];
    }
    const names = Object.keys(amenityObject);
    $('.amenities h4').text(names.sort().join(', '));
  });
}

function apiStatus () {
  const apiUrl = `http://${HOST}:${PORT}/api/v1/status/`;
  $.get(apiUrl, (data, status) => {
    if (status === 'success' && data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
}
