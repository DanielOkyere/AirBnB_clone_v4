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

