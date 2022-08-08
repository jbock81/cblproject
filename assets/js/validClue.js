/**
 * File : addSchool.js
 * 
 * This file contain the validation of add user form
 * 
 * Using validation plugin : jquery.validate.js
 * 
 * @author Kishor Mali
 */

$(document).ready(function(){
	var addSchoolForm = $("#addClue");
	var validator = addSchoolForm.validate({	
		rules:{
            cluename :{ required : true }
		},
		messages:{
            cluename :{ required : "This field is required" }
		}
	});
});
