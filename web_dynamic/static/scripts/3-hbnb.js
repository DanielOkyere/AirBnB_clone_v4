/**
 * Script to check status of api
 */

$(document).ready(list_items);


function list_items(){
     const selected_list = {};
     $('.amenities .popover input').on('change', function (){
       if ($(this).is(':checked')){
          selected_list[$(this).attr('data-name')] = $(this).attr('data-id');
      } else if ($(this).is(':not(:checked)')){
        delete selected_list[$(this).attr('data-name')];
      }
      const names = Object.keys(selected_list);
      $('.amenities h4').text(names.sort().join(', '));
    });
    check_api_status();
	query_search();
  };

function check_api_status(){
  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (response){
    console.log(response);
    if (response.status === 'OK') {
			$('#api_status').removeClass('api_stats');
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
			$('#api_status').addClass('api_stats');
    }
  });
};

function query_search(){
	const search_url = 'http://0.0.0.0:5001/api/v1/places_search/';
	$.ajax({
		url: search_url,
		type: 'POST',
		headers: { 'Content-Type': 'application/json' },
		data: JSON.stringify({}),
		success: function (response){
			for (const d of response) {
				const article = ['<article>',
					'<div class="title_box">',
					`<h2>${d.name}</h2>`,
					`<div class="price_by_night">$${d.price_by_night}</div>`,
					'</div>',
					'<div class="information">',
					`<div class="max_guest">${d.max_guest} Guest(s)</div>`,
					`<div class="number_rooms">${d.number_rooms} Bedroom(s)</div>`,
					`<div class="number_bathrooms">${d.number_bathrooms}
					</div>`,
					'</div>',
					'<div class="description">',
					`${d.description}`,
					'</div>',
					'</article>'];
				$('SECTION.places').append(article.join(''));
			}
		},
	error: function (error) {
		console.log(error);
	}
 });
}
