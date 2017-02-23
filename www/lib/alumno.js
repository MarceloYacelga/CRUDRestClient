/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */

var alumno; 

alumno.HOST = 'http://localhost:8080';
alumno.URL = '/GA-JPA/webresources/com.iesvdc.acceso.entidades.alumno';

alumno.AlumnoReadREST = function(id) {
    if ( id=== undefined ) {
        $.ajax({
            url: alumno.HOST+alumno.URL,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                $('#r_alumno').empty();
                $('#r_alumno').append('<h3>Listado de Alumnos</h3>');
                var table = $('<table />').addClass('table table-stripped');

                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>')));
                var tbody = $('<tbody />');
                for (var alumno in json) {
                    console.log(alumno);
                    tbody.append($('<tr />').append('<td>' + json[alumno].id + '</td>',
                                '<td>' + json[alumno].nombre + '</td>', '<td>' + json[alumno].apellido + '</td>'));
                }
                table.append(tbody);

                $('#r_alumno').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                $('#r_alumno').empty();
                $('#r_alumno').append('<h3>Error conectando al servidor</h3>');
                $('#r_alumno').append('<p>Inténtelo más tarde</p>');
            }
        });
    } else {
        $.ajax({
            url: 'http://localhost:8080/GA-JPA/webresources/com.iesvdc.acceso.entidades.alumno',
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                
            },
            error: function (xhr, status) {
                
            }
        });
    }
};

alumno.AlumnoCreateREST = function(){
    var alumno = {
        'nombre' : $("#c_al_nombre").val(),
        'apellido': $("#c_al_apellidos").val()
    };
    
};