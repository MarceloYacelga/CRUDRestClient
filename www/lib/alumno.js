/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
// variables para el jslint

/**
* Creamos el objeto alumno y todos sus métodos.
*/
$.alumno={};
// Configuración del HOST y URL del servicio
$.alumno.HOST = 'http://localhost:8080';
// $.alumno.URL = '/GA-JPA/webresources/com.iesvdc.acceso.entidades.alumno';
$.alumno.URL = '/GAREST/webresources/com.iesvdc.acceso.entidades.alumno';


/**
    Esta función hace la llamada REST al servidor y crea la tabla con todos los alumnos.
*/
$.alumno.AlumnoReadREST = function() {
    // con esta función jQuery hacemos la petición GET que hace el findAll()
    $.ajax({
        url: this.HOST+this.URL,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        success: function (json) {
            $('#r_alumno').empty();
            $('#r_alumno').append('<h3>Listado de Alumnos</h3>');
            var table = $('<table />').addClass('table table-stripped');

            table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>')));
            var tbody = $('<tbody />');
            for (var clave in json) {
                tbody.append($('<tr />').append('<td>' + json[clave].id + '</td>',
                            '<td>' + json[clave].nombre + '</td>', '<td>' + json[clave].apellido + '</td>'));
            }
            table.append(tbody);

            $('#r_alumno').append( $('<div />').append(table) );
            $('tr:odd').css('background','#CCCCCC');
        },
        error: function (xhr, status) {
             $.alumno.error('Imposible leer alumno','Compruebe su conexión e inténtelo de nuevo más tarde');
        }
    });
};

/**
    Esta función carga los datos del formulario y los envía vía POST al servicio REST
*/
$.alumno.AlumnoCreateREST = function(){
    // Leemos los datos del formulario pidiendo a jQuery que nos de el valor de cada input.
    var datos = {
        'nombre' : $("#c_al_nombre").val(),
        'apellido': $("#c_al_apellidos").val()
    };
    
    // comprobamos que en el formulario haya datos...
    if ( datos.nombre.length>2 && datos.apellido.length>2 ) {
        $.ajax({
            url: $.alumno.HOST+$.alumno.URL,
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.alumno.AlumnoReadREST();
            },
            error: function(jqXHR, textStatus, errorThrown){
                $.alumno.error('Error: Alumno Create','No ha sido posible crear el alumno. Compruebe su conexión.');
            }
        });
        
        // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
        $.afui.clearHistory();
        // cargamos el panel con id r_alumno.
        $.afui.loadContent("#r_alumno",false,false,"up");
    }
    
};

/**
    Crea un desplegable, un select, con todos los alumnos del servicio para seleccionar el alumno a eliminar
*/
$.alumno.AlumnoDeleteREST = function(id){
    // si pasamos el ID directamente llamamos al servicio DELETE
    // si no, pintamos el formulario de selección para borrar.
    if ( id !== undefined ) {
        id = $('#d_al_sel').val();
        $.ajax({
            url: $.alumno.HOST+$.alumno.URL+'/'+id,
            type: 'DELETE',
            dataType: 'json',
            contentType: "application/json",
            // data: JSON.stringify(datos),
            success: function(result,status,jqXHR ) {
               // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                $.alumno.AlumnoReadREST();
                // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
                $.afui.clearHistory();
                // cargamos el panel con id r_alumno.
                $.afui.loadContent("#r_alumno",false,false,"up");
            },
            error: function(jqXHR, textStatus, errorThrown){
                $.alumno.error('Error: Alumno Delete','No ha sido posible borrar el alumno. Compruebe su conexión.');
            }
        });    
    } else{
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#d_alumno').empty();
                var formulario = $('<div />');
                formulario.addClass('container');
                var div_select = $('<div />');
                div_select.addClass('form-group');
                var select = $('<select id="d_al_sel" />');
                select.addClass('form-group');
                for (var clave in json){
                    select.append('<option value="'+json[clave].id+'">'+json[clave].nombre+' ' + json[clave].apellido+'</option>');
                }
                formulario.append(select);
                formulario.append('<div class="form-group"></div>').append('<div class="btn btn-danger" onclick="$.alumno.AlumnoDeleteREST(1)"> eliminar! </div>');
                $('#d_alumno').append(formulario);
            },
            error: function(jqXHR, textStatus, errorThrown){
                $.alumno.error('Error: Alumno Delete','No ha sido posible conectar al servidor. Compruebe su conexión.');
            }
        });
    }
    
};

/**
    Función para la gestión de actualizaciones. Hay tres partes: 
    1) Listado 
    2) Formulario para modificación
    3) Envío de datos al servicio REST (PUT)
*/

$.alumno.AlumnoUpdateREST = function(id, envio){
    if ( id === undefined ) {
        $.ajax({
            url: this.HOST+this.URL,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            success: function (json) {
                $('#u_alumno').empty();
                $('#u_alumno').append('<h3>Pulse sobre un alumno</h3>');
                var table = $('<table />').addClass('table table-stripped');

                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>')));
                var tbody = $('<tbody />');
                for (var clave in json) {
                    // le damos a cada fila un ID para luego poder recuperar los datos para el formulario en el siguiente paso
                    tbody.append($('<tr id="fila_'+json[clave].id+'" onclick="$.alumno.AlumnoUpdateREST('+json[clave].id+')"/>').append('<td>' + json[clave].id + '</td>',
                    '<td>' + json[clave].nombre + '</td>', '<td>' + json[clave].apellido + '</td>'));
                }
                table.append(tbody);

                $('#u_alumno').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                $.alumno.error('Error: Alumno Update','Ha sido imposible conectar al servidor.');
            }
        });
    } else if (envio === undefined ){
        var seleccion = "#fila_"+id+" td";
        var al_id = ($(seleccion))[0];
        var al_nombre = ($(seleccion))[1];
        var al_apellidos = ($(seleccion))[2];
        
        $("#u_al_id").val(al_id.childNodes[0].data);
        $("#u_al_nombre").val(al_nombre.childNodes[0].data);
        $("#u_al_apellidos").val(al_apellidos.childNodes[0].data);
        // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
        $.afui.clearHistory();
        // cargamos el panel con id r_alumno.
        $.afui.loadContent("#uf_alumno",false,false,"up");
    } else {
        //HACEMOS LA LLAMADA REST
            var datos = {
                'id' : $("#u_al_id").val(),
                'nombre' : $("#u_al_nombre").val(),
                'apellido': $("#u_al_apellidos").val()
            };

            // comprobamos que en el formulario haya datos...
            if ( datos.nombre.length>2 && datos.apellido.length>2 ) {
                $.ajax({
                    url: $.alumno.HOST+$.alumno.URL+'/'+$("#u_al_id").val(),
                    type: 'PUT',
                    dataType: 'json',
                    contentType: "application/json",
                    data: JSON.stringify(datos),
                    success: function(result,status,jqXHR ) {
                       // probamos que se ha actualizado cargando de nuevo la lista -no es necesario-
                        $.alumno.AlumnoReadREST();
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        $.alumno.error('Error: Alumno Create','No ha sido posible crear el alumno. Compruebe su conexión.');
                    }
                });

                // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
                $.afui.clearHistory();
                // cargamos el panel con id r_alumno.
                $.afui.loadContent("#r_alumno",false,false,"up");
            }
    }
};


/**
    Función para la gestión de errores y mensajes al usuario
*/
$.alumno.error = function(title, msg){
    $('#err_alumno').empty();
    $('#err_alumno').append('<h3>'+title+'</h3>');
    $('#err_alumno').append('<p>'+msg+'</p>');
    // esto es para que no vaya hacia atrás (que no salga el icono volver atrás en la barra de menú) 
    $.afui.clearHistory();
    // cargamos el panel con id r_alumno.
    $.afui.loadContent("#err_alumno",false,false,"up");
};
