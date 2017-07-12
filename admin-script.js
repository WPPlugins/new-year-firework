jQuery(function() {
	jQuery("#all").click(function() {
		if (jQuery(this).prop("checked")) {
			jQuery("input[name='new_year_firework_redirect_place[]']").each(function() {
				jQuery(this).prop("checked", true);
			});
		} else {
			jQuery("input[name='new_year_firework_redirect_place[]']").each(function() {
				jQuery(this).prop("checked", false);
			});
		}
	});
});

jQuery(document).ready(function() {
	var formfield;

	/* user clicks button on custom field, runs below code that opens new window */
	jQuery('.new-year-firework-music-upload-button').click(function() {
		formfield = jQuery("#new_year_firework_music_url");		//The input field that will hold the uploaded file url
		tb_show('', 'media-upload.php?TB_iframe=true');
		return false;
	});

	//adding my custom function with Thick box close function tb_close() .
	window.old_tb_remove = window.tb_remove;
	window.tb_remove = function() {
		window.old_tb_remove(); // calls the tb_remove() of the Thickbox plugin
		formfield=null;
	};

	// user inserts file into post. only run custom if user started process using the above process
	// window.send_to_editor(html) is how wp would normally handle the received data
 
	window.original_send_to_editor = window.send_to_editor;
	window.send_to_editor = function(html){
		if (formfield) {
			fileurl = jQuery('img',html).attr('src');
			jQuery(formfield).val(fileurl);
			tb_remove();
		} else {
			window.original_send_to_editor(html);
		}
	};
});