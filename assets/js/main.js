$(document).ready(() => {
    console.log('Cargó el documento!!!!!');
  
    //GET LEADS FROM DB
    const handleGetLeads = () => {
      $('.listado').html('');
      $.ajax({
        url: 'https://prog-3-leads-api-rest.vercel.app/leads',
        type: 'GET',
        success: (response) => {
          const resposneReverse = response.reverse()
          resposneReverse.forEach((registro) => {
            $('.listado').append(
              '<li>' + registro.nombre + '-' + registro.sexo + '</li>'
            );
          });
        },
      });
    };
  
    
    handleGetLeads();
  
    $.validator.addMethod(
      'customemail',
      function (value, element) {
        return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
      },
      'Ingresá una dirección de email'
    );
  
    $('#main_form').validate({
      rules: {
        nombre: {
          required: true,
          minlength: 5,
        },
        email: {
          required: {
            depends: function () {
              $(this).val($.trim($(this).val()));
              return true;
            },
          },
          customemail: true,
        },
        sexo: { required: true },
        comentarios: { required: true },
      },
      messages: {
        nombre: 'Ingresá tu nombre',
        sexo: 'Seleccioná tu sexo',
      },
      submitHandler: (form) => {
        console.log('Todo ok para enviar', $(form).serialize());
        $.ajax({
          url: form.action,
          type: form.method,
          data: $(form).serialize(),
          beforeSend: () => {
            console.log('Datos a enviar');
            $('.loading_spinner').show();
          },
          success: () => {
            console.log('DATOS ENVIADOS!!!!!!!!!!');
            $('.loading_spinner').hide();
            $('.respuesta_form').html('Muchas gracias señore');
  
            setTimeout(() => {
              $('.respuesta_form').html('');
              handleGetLeads();
            }, 1000);
          },
        });
      },
    });
  
    
  });