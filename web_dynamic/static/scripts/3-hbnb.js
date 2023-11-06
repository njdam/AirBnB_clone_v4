// Use strict mode to avoid coding errors
'use strict';
// A javascript to listen for changes on each input checkbox tag.
$(document).ready(init);
const HOST = 'localhost';
const PORT = '5001';

function init () {
  apiStatus();
  places_search();
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

function places_search() {
	$.post({
		url: `${HOST}:${PORT}/api/v1/places_search`,
		data: JSON.stringify({}),
		headers: {"Content-Type": "application/json",},
		success: (data) => {
			data.forEach((place) => $("section.places").append(
				`<article>
				<div class="title_box">
				<h2>${place.name}</h2>
				<div class="price_by_night">$${place.price_by_night}</div>
				</div>
				<div class="information">
				<div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? "s" : ""}</div>
				<div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? "s" : ""}</div>
				<div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? "s" : ""}</div>
				</div>
				<div class="description">${place.description}</div>
				</article>`
			)
			);
		},
		dataType: "json",
	});
}
