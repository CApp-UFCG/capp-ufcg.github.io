$(function()
{
	var msgSucesso = "Sua mensagem foi enviada! Faremos o possível para responde-lo rapidamente!"; 
	var msgFalha = ":( Desculpe, parece que o servidor não está acessível no momento. Tente novamente mais tarde."; 
		
	$("input,textarea").jqBootstrapValidation(
    {
     	preventSubmit: true,
     	submitSuccess: function($form, event)
	 	{
			event.preventDefault(); // Previne o Submit default

			var arquivo = "./bin/"+$form.attr('id')+".php";
			var dadosForm = {};

			$form.find("input, textarea").each(function(e)
			{
				dadosForm[$(this).attr('id')] = $(this).val();
			});

			$.ajax({
		        url: arquivo,
		    	type: "POST",
		    	data: dadosForm,
		    	cache: false,
		    	success: function() // Sucesso
		 		{
					$form.append("<div id='form-alert'><div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>"+msgSucesso+"</strong></div></div>");
		 	   	},
			   	error: function() // Falha
			   	{
					$form.append("<div id='form-alert'><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>"+msgFalha+"</strong></div></div>");
			   	},
				complete: function() // Limpa
				{
					$form.trigger("reset");
				},
		   	});
         },
         filter: function() // Cuida dos elementos Hidden
		 {
			 return $(this).is(":visible");
         },
	 });
});
