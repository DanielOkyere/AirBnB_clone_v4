 /**                                                    
  * Script to handle selection of amenities from api    
	* Uses jquery                                         
	*/                                                    
$(document).ready(function list_items(){               
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
});                                                    

