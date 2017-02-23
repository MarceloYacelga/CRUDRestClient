# Cliente REST

El presente proyecto de cliente REST forma parte de una de las tareas de 
la asignatura de Acceso a Datos del Ciclo Formativo de Grado Superior de 
Desarrollo de Aplicaciones Multiplataforma. 

## Introducción a la tarea

Básicamente se trata de crear un CRUD para usuarios/clientes, otro CRUD para libros/productos, otro CRUD para reservas/pedidos y un maestro-detalle para ver préstamos/pedidos.

Para implementarlo, deberemos tener un servicio REST programado como un servlet Java en un contenedor Tomcat (cuidado, Tomcat no es un contenedor de EJB luego no soportará correctamente la inyección del EntityManagerFactory en las clases de los servicios), TomEE o GlashFish, contra una base de datos relacional Oracle o MySQL.

En cuanto al cliente, deberá ser en HTML5+JS (concretamente jQuery) y comunicarse con el servicio anterior en XML o en JSON.

El código de ejemplo para crear el servicio así como la base de datos lo 
puedes encontrar [en este otro repositorio](https://github.com/juangualberto/GA-JPA).

## Documentación

Nos basta con una escueta documentación, aunque sí vamos a necesitar varios diagramas que detallamos a continuación.

### Casos de uso

![](./Screenshot_20170219_215302.png)

### Diagrama entidad/relación

![](./Captura%20de%20pantalla_2017-02-19_21-48-56.png)

### Diagrama de clases

![](./Screenshot_20170219_215403.png)

### Manual de instalación y configuración

#### Fichero README.md / README.txt

Es fundamental tener un fichero en el raíz del proyecto donde se explique cómo instalar y configurar el servicio.

#### Instalación automática

La instalación automatizada es muy recomendable.

Puede hacerse descomprimiendo el proyecto y mediante scripts (bash, poweshell...) o bien mediante clonación desde GitHub, GitBucket... y siguiendo las instrucciones del README del repositorio.

### Breve manual de usuario

Basta con explicar las funcionalidades del sistema.

## Generando servicios REST con el IDE

#### Creación de la base de datos, usuarios y las tablas

Creación de la base de datos y carga inicial: [https://www.youtube.com/watch?v=pPQ5Ul2-RFs](https://www.youtube.com/watch?v=pPQ5Ul2-RFs)

Código fuente: [CargaInicial.sql](https://github.com/juangualberto/GA-JPA/blob/master/src/java/CargaInicial.sql)

#### Creación del servicio REST con Netbeans

Videotutorial: [https://www.youtube.com/watch?v=kZQ60EW6gLg](https://www.youtube.com/watch?v=kZQ60EW6gLg)

## Creación del cliente

### jQuery

Ejemplo de fichero JS para hacer

<pre style="color: #000000; background: #f1f0f0;"><span style="color: #c34e00;">/*jslint browser:true, devel:true, white:true, vars:true */</span>
<span style="color: #c34e00;">/*global $:false, intel:false */</span>

<span style="color: #400000; font-weight: bold;">function</span> <span style="text-decoration: underline;">**AlumnoReadREST**</span><span style="color: #806030;">(</span>id<span style="color: #806030;">)</span> <span style="color: #806030;">{</span>
    <span style="color: #400000; font-weight: bold;">if</span> <span style="color: #806030;">(</span> id<span style="color: #806030;">===</span> <span style="color: #0f4d75;">undefined</span> <span style="color: #806030;">)</span> <span style="color: #806030;">{</span>
        $<span style="color: #806030;">.</span>ajax<span style="color: #806030;">(</span><span style="color: #806030;">{</span>
            url<span style="color: #806030;">:</span> <span style="color: #800000;">'</span><span style="color: #e60000;">http://localhost:8080/GA-JPA/webresources/com.iesvdc.acceso.entidades.alumno</span><span style="color: #800000;">'</span><span style="color: #806030;">,</span>
            type<span style="color: #806030;">:</span> <span style="color: #800000;">'</span><span style="color: #e60000;">GET</span><span style="color: #800000;">'</span><span style="color: #806030;">,</span>
            dataType<span style="color: #806030;">:</span> <span style="color: #800000;">'</span><span style="color: #e60000;">json</span><span style="color: #800000;">'</span><span style="color: #806030;">,</span>
            success<span style="color: #806030;">:</span> <span style="color: #400000; font-weight: bold;">function</span> <span style="color: #806030;">(</span>json<span style="color: #806030;">)</span> <span style="color: #806030;">{</span>
                $<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;">#r_alumno</span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">.</span>empty();
                $<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;">#r_alumno</span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">.</span>append<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;"><h3>Listado de Alumnos</h3></span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
                <span style="color: #400000; font-weight: bold;">var</span> table <span style="color: #806030;">=</span> $<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;"><table /></span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">.</span>addClass<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;">table table-stripped</span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
                table<span style="color: #806030;">.</span>append<span style="color: #806030;">(</span>$<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;"><thead /></span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">.</span>append<span style="color: #806030;">(</span>$<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;"><tr /></span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">.</span>append<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;"><th>id</th></span><span style="color: #800000;">'</span><span style="color: #806030;">,</span> <span style="color: #800000;">'</span><span style="color: #e60000;"><th>nombre</th></span><span style="color: #800000;">'</span><span style="color: #806030;">,</span> <span style="color: #800000;">'</span><span style="color: #e60000;"><th>apellidos</th></span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">)</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
                <span style="color: #400000; font-weight: bold;">var</span> tbody <span style="color: #806030;">=</span> $<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;"><tbody /></span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
                <span style="color: #400000; font-weight: bold;">for</span> <span style="color: #806030;">(</span><span style="color: #400000; font-weight: bold;">var</span> alumno <span style="color: #400000; font-weight: bold;">in</span> json<span style="color: #806030;">)</span> <span style="color: #806030;">{</span>
                    console<span style="color: #806030;">.</span><span style="color: #400000; font-weight: bold;">log</span><span style="color: #806030;">(</span>alumno<span style="color: #806030;">)</span><span style="color: #806030;">;</span>
                    tbody<span style="color: #806030;">.</span>append<span style="color: #806030;">(</span>$<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;"><tr /></span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">.</span>append<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;"><td></span><span style="color: #800000;">'</span> <span style="color: #806030;">+</span> json<span style="color: #806030;">[</span>alumno<span style="color: #806030;">]</span><span style="color: #806030;">.</span>id <span style="color: #806030;">+</span> <span style="color: #800000;">'</span><span style="color: #e60000;"></td></span><span style="color: #800000;">'</span><span style="color: #806030;">,</span>
                                <span style="color: #800000;">'</span><span style="color: #e60000;"><td></span><span style="color: #800000;">'</span> <span style="color: #806030;">+</span> json<span style="color: #806030;">[</span>alumno<span style="color: #806030;">]</span><span style="color: #806030;">.</span>nombre <span style="color: #806030;">+</span> <span style="color: #800000;">'</span><span style="color: #e60000;"></td></span><span style="color: #800000;">'</span><span style="color: #806030;">,</span> <span style="color: #800000;">'</span><span style="color: #e60000;"><td></span><span style="color: #800000;">'</span> <span style="color: #806030;">+</span> json<span style="color: #806030;">[</span>alumno<span style="color: #806030;">]</span><span style="color: #806030;">.</span>apellido <span style="color: #806030;">+</span> <span style="color: #800000;">'</span><span style="color: #e60000;"></td></span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
                <span style="color: #806030;">}</span>
                table<span style="color: #806030;">.</span>append<span style="color: #806030;">(</span>tbody<span style="color: #806030;">)</span><span style="color: #806030;">;</span>
                $<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;">#r_alumno</span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">.</span>append<span style="color: #806030;">(</span> $<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;"><div /></span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">.</span>append<span style="color: #806030;">(</span>table<span style="color: #806030;">)</span> <span style="color: #806030;">)</span><span style="color: #806030;">;</span>
                $<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;">tr:odd</span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">.</span>css<span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;">background</span><span style="color: #800000;">'</span><span style="color: #806030;">,</span><span style="color: #800000;">'</span><span style="color: #e60000;">#CCCCCC</span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
            <span style="color: #806030;">}</span><span style="color: #806030;">,</span>
            error<span style="color: #806030;">:</span> <span style="color: #400000; font-weight: bold;">function</span> <span style="color: #806030;">(</span>xhr<span style="color: #806030;">,</span> status<span style="color: #806030;">)</span> <span style="color: #806030;">{</span>
                console<span style="color: #806030;">.</span><span style="color: #400000; font-weight: bold;">log</span><span style="color: #806030;">(</span><span style="color: #800000;">'</span><span style="color: #e60000;">Disculpe, existió un problema</span><span style="color: #800000;">'</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
            <span style="color: #806030;">}</span>
        <span style="color: #806030;">}</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
    <span style="color: #806030;">}</span>
<span style="color: #806030;">}</span>
</pre>

### Intel XDK

Ejemplo de menús de aplicación con Intel XDK.

<pre style="color: #000000; background: #f1f0f0;"><span style="color: #004a43;"><!DOCTYPE html></span>
<span style="color: #c34e00;"><!--HTML5 doctype--></span>
<span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">html</span><span style="color: #a65700;">></span>
<span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">head</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">title</span><span style="color: #a65700;">></span>App Framework Kitchen Sink<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">title</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">meta</span> <span style="color: #074726;"></span> <span style="color: #074726;">http-equiv</span><span style="color: #806030;">=</span><span style="color: #e60000;">"Content-type"</span> <span style="color: #074726;"></span> <span style="color: #074726;">content</span><span style="color: #806030;">=</span><span style="color: #e60000;">"text/html; charset=utf-8"</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">meta</span> <span style="color: #074726;"></span> <span style="color: #074726;">name</span><span style="color: #806030;">=</span><span style="color: #e60000;">"viewport"</span> <span style="color: #074726;"></span> <span style="color: #074726;">content</span><span style="color: #806030;">=</span><span style="color: #e60000;">"width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, minimal-ui"</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">meta</span> <span style="color: #074726;"></span> <span style="color: #074726;">name</span><span style="color: #806030;">=</span><span style="color: #e60000;">"apple-mobile-web-app-capable"</span> <span style="color: #074726;"></span> <span style="color: #074726;">content</span><span style="color: #806030;">=</span><span style="color: #e60000;">"yes"</span> <span style="color: #074726;"></span> <span style="color: #a65700;">/></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">meta</span> <span style="color: #074726;"></span> <span style="color: #074726;">HTTP-EQUIV</span><span style="color: #806030;">=</span><span style="color: #e60000;">"Pragma"</span> <span style="color: #074726;"></span> <span style="color: #074726;">CONTENT</span><span style="color: #806030;">=</span><span style="color: #e60000;">"no-cache"</span> <span style="color: #074726;"></span> <span style="color: #a65700;">/></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">meta</span> <span style="color: #074726;"></span> <span style="color: #074726;">http-equiv</span><span style="color: #806030;">=</span><span style="color: #e60000;">"X-UA-Compatible"</span> <span style="color: #074726;"></span> <span style="color: #074726;">content</span><span style="color: #806030;">=</span><span style="color: #e60000;">"IE=edge"</span> <span style="color: #074726;"></span> <span style="color: #a65700;">/></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">link</span> <span style="color: #074726;"></span> <span style="color: #074726;">rel</span><span style="color: #806030;">=</span><span style="color: #e60000;">"stylesheet"</span> <span style="color: #074726;"></span> <span style="color: #074726;">type</span><span style="color: #806030;">=</span><span style="color: #e60000;">"text/css"</span> <span style="color: #074726;"></span> <span style="color: #074726;">href</span><span style="color: #806030;">=</span><span style="color: #e60000;">"lib/appframework/icons.css"</span> <span style="color: #074726;"></span> <span style="color: #a65700;">/></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">link</span> <span style="color: #074726;"></span> <span style="color: #074726;">rel</span><span style="color: #806030;">=</span><span style="color: #e60000;">"stylesheet"</span> <span style="color: #074726;"></span> <span style="color: #074726;">type</span><span style="color: #806030;">=</span><span style="color: #e60000;">"text/css"</span> <span style="color: #074726;"></span> <span style="color: #074726;">href</span><span style="color: #806030;">=</span><span style="color: #e60000;">"lib/appframework/af.ui.css"</span> <span style="color: #074726;"></span> <span style="color: #a65700;">/></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">script</span> <span style="color: #074726;"></span> <span style="color: #074726;">type</span><span style="color: #806030;">=</span><span style="color: #e60000;">"text/javascript"</span> <span style="color: #074726;"></span> <span style="color: #074726;">charset</span><span style="color: #806030;">=</span><span style="color: #e60000;">"utf-8"</span> <span style="color: #074726;"></span> <span style="color: #074726;">src</span><span style="color: #806030;">=</span><span style="color: #e60000;">"lib/jquery.min.js"</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">script</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">script</span> <span style="color: #074726;"></span> <span style="color: #074726;">type</span><span style="color: #806030;">=</span><span style="color: #e60000;">"text/javascript"</span> <span style="color: #074726;"></span> <span style="color: #074726;">charset</span><span style="color: #806030;">=</span><span style="color: #e60000;">"utf-8"</span> <span style="color: #074726;"></span> <span style="color: #074726;">src</span><span style="color: #806030;">=</span><span style="color: #e60000;">"lib/fastclick.min.js"</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">script</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">script</span> <span style="color: #074726;"></span> <span style="color: #074726;">type</span><span style="color: #806030;">=</span><span style="color: #e60000;">"text/javascript"</span> <span style="color: #074726;"></span> <span style="color: #074726;">charset</span><span style="color: #806030;">=</span><span style="color: #e60000;">"utf-8"</span> <span style="color: #074726;"></span> <span style="color: #074726;">src</span><span style="color: #806030;">=</span><span style="color: #e60000;">"lib/appframework/appframework.ui.min.js"</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">script</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">script</span> <span style="color: #074726;"></span> <span style="color: #074726;">src</span><span style="color: #806030;">=</span><span style="color: #e60000;">'cordova.js'</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">script</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">script</span> <span style="color: #074726;"></span> <span style="color: #074726;">src</span><span style="color: #806030;">=</span><span style="color: #e60000;">"lib/alumno.js"</span><span style="color: #a65700;">></span> <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">script</span><span style="color: #a65700;">></span>
<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">head</span><span style="color: #a65700;">></span>
<span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">body</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">id</span><span style="color: #806030;">=</span><span style="color: #e60000;">"splashscreen"</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">'ui-loader heavy'</span><span style="color: #a65700;">></span>
        App Framework
        <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">br</span><span style="color: #a65700;">></span>
        <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">span</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">'ui-icon ui-icon-loading spin'</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">span</span><span style="color: #a65700;">></span>
        <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>Starting app<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"view splitview"</span><span style="color: #a65700;">></span>        
        <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">header</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">a</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"menuButton"</span> <span style="color: #074726;"></span> <span style="color: #074726;">data</span><span style="color: #074726;">-</span><span style="color: #074726;">left</span><span style="color: #074726;">-menu</span><span style="color: #806030;">=</span><span style="color: #e60000;">"left"</span> <span style="color: #074726;"></span> <span style="color: #074726;">data</span><span style="color: #074726;">-transition</span><span style="color: #806030;">=</span><span style="color: #e60000;">"cover"</span> <span style="color: #074726;"></span> <span style="color: #074726;">style</span><span style="color: #806030;">=</span><span style="color: #e60000;">"</span><span style="color: #bb7977; font-weight: bold;">float</span><span style="color: #806030;">:</span><span style="color: #074726;">left</span><span style="color: #e60000;">"</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">a</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>Title<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>
        <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">header</span><span style="color: #a65700;">></span>        
        <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"pages"</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"panel"</span> <span style="color: #074726;"></span> <span style="color: #074726;">id</span><span style="color: #806030;">=</span><span style="color: #e60000;">"main"</span> <span style="color: #074726;"></span> <span style="color: #074726;">data</span><span style="color: #074726;">-</span><span style="color: #074726;">title</span><span style="color: #806030;">=</span><span style="color: #e60000;">"Inicio"</span> <span style="color: #074726;"></span> <span style="color: #074726;">data</span><span style="color: #074726;">-</span><span style="color: #074726;">selected</span><span style="color: #806030;">=</span><span style="color: #e60000;">"true"</span><span style="color: #a65700;">></span>
                <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>Alumno CRUD<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>
                <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">p</span><span style="color: #a65700;">></span>Ejemplo de APP híbrida que produce/consume un servicio REST<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">p</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"panel"</span> <span style="color: #074726;"></span> <span style="color: #074726;">id</span><span style="color: #806030;">=</span><span style="color: #e60000;">"c_alumno"</span> <span style="color: #074726;"></span> <span style="color: #074726;">data</span><span style="color: #074726;">-</span><span style="color: #074726;">title</span><span style="color: #806030;">=</span><span style="color: #e60000;">"Create Alumno"</span><span style="color: #a65700;">></span>
                <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>Create Alumno<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"panel"</span> <span style="color: #074726;"></span> <span style="color: #074726;">id</span><span style="color: #806030;">=</span><span style="color: #e60000;">"<span style="text-decoration: underline;">**r_alumno**</span>"</span> <span style="color: #074726;"></span> <span style="color: #074726;">data</span><span style="color: #074726;">-</span><span style="color: #074726;">title</span><span style="color: #806030;">=</span><span style="color: #e60000;">"Read Alumno"</span><span style="color: #a65700;">></span>
                <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>Read Alumno<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"panel"</span> <span style="color: #074726;"></span> <span style="color: #074726;">id</span><span style="color: #806030;">=</span><span style="color: #e60000;">"u_alumno"</span> <span style="color: #074726;"></span> <span style="color: #074726;">data</span><span style="color: #074726;">-</span><span style="color: #074726;">title</span><span style="color: #806030;">=</span><span style="color: #e60000;">"Update Alumno"</span><span style="color: #a65700;">></span>
                <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>Update Alumno<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"panel"</span> <span style="color: #074726;"></span> <span style="color: #074726;">id</span><span style="color: #806030;">=</span><span style="color: #e60000;">"d_alumno"</span> <span style="color: #074726;"></span> <span style="color: #074726;">data</span><span style="color: #074726;">-</span><span style="color: #074726;">title</span><span style="color: #806030;">=</span><span style="color: #e60000;">"Delete Alumno"</span><span style="color: #a65700;">></span>
                <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>Delete Alumno<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
        <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
        <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">nav</span> <span style="color: #074726;"></span> <span style="color: #074726;">id</span><span style="color: #806030;">=</span><span style="color: #e60000;">"left"</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"view active"</span><span style="color: #a65700;">></span>
                <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">header</span><span style="color: #a65700;">></span>
                    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>Left<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">h1</span><span style="color: #a65700;">></span>
                <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">header</span><span style="color: #a65700;">></span>
                <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"pages"</span><span style="color: #a65700;">></span>
                    <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">div</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"panel active"</span> <span style="color: #074726;"></span> <span style="color: #074726;">id</span><span style="color: #806030;">=</span><span style="color: #e60000;">"navPage1"</span> <span style="color: #074726;"></span> <span style="color: #074726;">data</span><span style="color: #074726;">-</span><span style="color: #074726;">title</span><span style="color: #806030;">=</span><span style="color: #e60000;">"Foobar"</span><span style="color: #a65700;">></span>
                        <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">ul</span> <span style="color: #074726;"></span> <span style="color: #074726;">class</span><span style="color: #806030;">=</span><span style="color: #e60000;">"list"</span><span style="color: #a65700;">></span>
                            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">li</span><span style="color: #a65700;">></span><span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">a</span> <span style="color: #074726;"></span> <span style="color: #074726;">href</span><span style="color: #806030;">=</span><span style="color: #e60000;">"#main"</span> <span style="color: #074726;"></span> <span style="color: #074726;">onclick</span><span style="color: #806030;">=</span><span style="color: #e60000;">"$.afui.clearHistory()"</span><span style="color: #a65700;">></span>Inicio<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">a</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">li</span><span style="color: #a65700;">></span>
                            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">li</span><span style="color: #a65700;">></span><span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">a</span> <span style="color: #074726;"></span> <span style="color: #074726;">href</span><span style="color: #806030;">=</span><span style="color: #e60000;">"#c_alumno"</span> <span style="color: #074726;"></span> <span style="color: #074726;">onclick</span><span style="color: #806030;">=</span><span style="color: #e60000;">"$.afui.clearHistory()"</span><span style="color: #a65700;">></span>Crear Alumno<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">a</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">li</span><span style="color: #a65700;">></span>
                            **<span style="color: #a65700;"><</span>**<span style="color: #400000; font-weight: bold;">li</span><span style="color: #a65700;">></span><span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">a</span> <span style="color: #074726;"></span> <span style="color: #074726;">href</span><span style="color: #806030;">=</span><span style="color: #e60000;">"#r_alumno"</span> <span style="color: #074726;"></span> <span style="color: #074726;">onclick</span><span style="color: #806030;">=</span><span style="color: #e60000;">"$.afui.clearHistory();<span style="text-decoration: underline;">**AlumnoReadREST**</span>();"</span><span style="color: #a65700;">></span>Leer Alumno<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">a</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">li</span><span style="color: #a65700;">></span>
                            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">li</span><span style="color: #a65700;">></span><span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">a</span> <span style="color: #074726;"></span> <span style="color: #074726;">href</span><span style="color: #806030;">=</span><span style="color: #e60000;">"#u_alumno"</span> <span style="color: #074726;"></span> <span style="color: #074726;">onclick</span><span style="color: #806030;">=</span><span style="color: #e60000;">"$.afui.clearHistory()"</span><span style="color: #a65700;">></span>Actualizar Alumno<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">a</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">li</span><span style="color: #a65700;">></span>
                            <span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">li</span><span style="color: #a65700;">></span><span style="color: #a65700;"><</span><span style="color: #400000; font-weight: bold;">a</span> <span style="color: #074726;"></span> <span style="color: #074726;">href</span><span style="color: #806030;">=</span><span style="color: #e60000;">"#d_alumno"</span> <span style="color: #074726;"></span> <span style="color: #074726;">onclick</span><span style="color: #806030;">=</span><span style="color: #e60000;">"$.afui.clearHistory()"</span><span style="color: #a65700;">></span>Borrar Alumno<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">a</span><span style="color: #a65700;">></span><span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">li</span><span style="color: #a65700;">></span>
                        <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">ul</span><span style="color: #a65700;">></span>
                    <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
                <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
            <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
        <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">nav</span><span style="color: #a65700;">></span>
    <span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">div</span><span style="color: #a65700;">></span>
<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">body</span><span style="color: #a65700;">></span>
<span style="color: #a65700;"></</span><span style="color: #400000; font-weight: bold;">html</span><span style="color: #a65700;">></span>
</pre>

## Descripción detallada

### Opción 1: Gestión de pedidos

En nuestra aplicación un operario es el único agente que interactúa con el sistema.

El operario puede dar de alta, modificar o borrar los productos del almacén. **<span style="text-decoration: underline;">Para cada producto hay que guardar la cantidad que hay.</span>**

El operario puede dar de alta, modificar o borrar los clientes de la tienda.

El operario recibe llamadas telefónicas de los clientes y crea los pedidos en el sistema.

Un pedido es para un cliente.

Los pedidos tienen un detalle de pedido donde está la lista de productos y la cantidad de cada uno. Antes de procesar un pedido hay que ver si hay productos suficientes para poder hacerlo. En caso de no haberlos, no se podrá hacer el pedido (lo puedes controlar con transacciones, disparadores, software -cliente- o software -servidor-).

Una vez grabado, se pueden añadir nuevos productos o borrar existentes al mismo.

Se permite eliminar pedidos.

La consulta de pedidos se hace por cliente. Selecciono un cliente y me muestra sus pedidos. Selecciono un pedido y me muestra los productos del mismo.

### Opción 2: Gestión básica de biblioteca

En nuestra aplicación un operario es el único agente que interactúa con el sistema.

El operario puede dar de alta, modificar o borrar los libros de la biblioteca. **<span style="text-decoration: underline;">Para cada libro hay un único ejemplar.</span>**

El operario puede dar de alta, modificar o borrar los usuarios de la biblioteca.

Para grabar un préstamo, escaneamos el código de barras del ISBN del libro, seleccionamos del listado de usuarios el usuario (o escaneamos su tarjeta de préstamo) y aceptamos.

El sistema debe permitir listar los préstamos que ha realizado un usuario seleccionando el mismo de un desplegable con todos los usuarios del mismo.

Los préstamos se pueden modificar (p. ej. extender la fecha de entrega) o borrar.

No se especifica si se borra un préstamo cuando devolvemos un libro. Puedes hacerlo así y fijar un número máximo de préstamos por usuario. Si no borras los préstamos el sistema debe permitir buscar entre dos fechas posibles todos los préstamos que se hayan hecho. También puedes usar dos tablas y en una borrar y en otra llevar el histórico.

#### Pista para usar el lector del framework

<pre style="color: #000000; background: #f1f0f0;"><span style="color: #400000; font-weight: bold;">function</span> scanNow<span style="color: #806030;">(</span><span style="color: #806030;">)</span>
        <span style="color: #806030;">{</span>
            <span style="color: #c34e00;">//this function launches the QR Code scanner.</span>
            intel<span style="color: #806030;">.</span>xdk<span style="color: #806030;">.</span>device<span style="color: #806030;">.</span>scanBarcode<span style="color: #806030;">(</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
        <span style="color: #806030;">}</span>

        <span style="color: #c34e00;">//this event is fired when scanning is completed</span>
        document<span style="color: #806030;">.</span>addEventListener<span style="color: #806030;">(</span><span style="color: #800000;">"</span><span style="color: #e60000;">intel.xdk.device.barcode.scan</span><span style="color: #800000;">"</span><span style="color: #806030;">,</span><span style="color: #400000; font-weight: bold;">function</span><span style="color: #806030;">(</span>evt<span style="color: #806030;">)</span><span style="color: #806030;">{</span>
            <span style="color: #400000; font-weight: bold;">if</span> <span style="color: #806030;">(</span>evt<span style="color: #806030;">.</span>success <span style="color: #806030;">==</span> <span style="color: #0f4d75;">true</span><span style="color: #806030;">)</span> <span style="color: #806030;">{</span>
                <span style="color: #c34e00;">//successful scan</span>

                <span style="color: #400000; font-weight: bold;">alert</span><span style="color: #806030;">(</span>evt<span style="color: #806030;">.</span>codedata<span style="color: #806030;">)</span><span style="color: #806030;">;</span>
            <span style="color: #806030;">}</span>
            <span style="color: #400000; font-weight: bold;">else</span>
            <span style="color: #806030;">{</span>
                <span style="color: #c34e00;">//failed scan</span>
                <span style="color: #400000; font-weight: bold;">alert</span><span style="color: #806030;">(</span><span style="color: #800000;">"</span><span style="color: #e60000;">Please try again</span><span style="color: #800000;">"</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
            <span style="color: #806030;">}</span>
        <span style="color: #806030;">}</span><span style="color: #806030;">,</span><span style="color: #0f4d75;">false</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
</pre>

## Solución al problema del CORS

Si queremos usar XML y AJAX, tenemos que habilitar el CORS en nuestros servicios con Tomcat. La manera más usual es creando un filtro:

<pre style="color: #000000; background: #f1f0f0;"><span style="color: #400000; font-weight: bold;">package</span> <span style="color: #004a43;">com</span><span style="color: #806030;">.</span><span style="color: #004a43;">iesvdc</span><span style="color: #806030;">.</span><span style="color: #004a43;">acceso</span><span style="color: #806030;">.</span><span style="color: #004a43;">filtro</span><span style="color: #806030;">;</span>
<span style="color: #400000; font-weight: bold;">import</span> <span style="color: #004a43;">java</span><span style="color: #806030;">.</span><span style="color: #004a43;">io</span><span style="color: #806030;">.</span><span style="color: #004a43;">IOException</span><span style="color: #806030;">;</span>
<span style="color: #400000; font-weight: bold;">import</span> <span style="color: #004a43;">javax</span><span style="color: #806030;">.</span><span style="color: #004a43;">servlet</span><span style="color: #806030;">.</span><span style="color: #004a43;">Filter</span><span style="color: #806030;">;</span>
<span style="color: #400000; font-weight: bold;">import</span> <span style="color: #004a43;">javax</span><span style="color: #806030;">.</span><span style="color: #004a43;">servlet</span><span style="color: #806030;">.</span><span style="color: #004a43;">FilterChain</span><span style="color: #806030;">;</span>
<span style="color: #400000; font-weight: bold;">import</span> <span style="color: #004a43;">javax</span><span style="color: #806030;">.</span><span style="color: #004a43;">servlet</span><span style="color: #806030;">.</span><span style="color: #004a43;">FilterConfig</span><span style="color: #806030;">;</span>
<span style="color: #400000; font-weight: bold;">import</span> <span style="color: #004a43;">javax</span><span style="color: #806030;">.</span><span style="color: #004a43;">servlet</span><span style="color: #806030;">.</span><span style="color: #004a43;">ServletException</span><span style="color: #806030;">;</span>
<span style="color: #400000; font-weight: bold;">import</span> <span style="color: #004a43;">javax</span><span style="color: #806030;">.</span><span style="color: #004a43;">servlet</span><span style="color: #806030;">.</span><span style="color: #004a43;">ServletRequest</span><span style="color: #806030;">;</span>
<span style="color: #400000; font-weight: bold;">import</span> <span style="color: #004a43;">javax</span><span style="color: #806030;">.</span><span style="color: #004a43;">servlet</span><span style="color: #806030;">.</span><span style="color: #004a43;">ServletResponse</span><span style="color: #806030;">;</span>
<span style="color: #400000; font-weight: bold;">import</span> <span style="color: #004a43;">javax</span><span style="color: #806030;">.</span><span style="color: #004a43;">servlet</span><span style="color: #806030;">.</span><span style="color: #004a43;">http</span><span style="color: #806030;">.</span><span style="color: #004a43;">HttpServletResponse</span><span style="color: #806030;">;</span>

<span style="color: #400000; font-weight: bold;">public</span> <span style="color: #400000; font-weight: bold;">class</span> SimpleCORSFilter <span style="color: #400000; font-weight: bold;">implements</span> Filter <span style="color: #806030;">{</span>

 <span style="color: #400000; font-weight: bold;">public</span> <span style="color: #800040;">void</span> doFilter<span style="color: #806030;">(</span>ServletRequest req<span style="color: #806030;">,</span> ServletResponse res<span style="color: #806030;">,</span> FilterChain chain<span style="color: #806030;">)</span> <span style="color: #400000; font-weight: bold;">throws</span> <span style="color: #800040;">IOException</span><span style="color: #806030;">,</span> ServletException <span style="color: #806030;">{</span>
  HttpServletResponse response <span style="color: #806030;">=</span> <span style="color: #806030;">(</span>HttpServletResponse<span style="color: #806030;">)</span> res<span style="color: #806030;">;</span>
  response<span style="color: #806030;">.</span>setHeader<span style="color: #806030;">(</span><span style="color: #e60000;">"Access-Control-Allow-Origin"</span><span style="color: #806030;">,</span> <span style="color: #e60000;">"*"</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
  response<span style="color: #806030;">.</span>setHeader<span style="color: #806030;">(</span><span style="color: #e60000;">"Access-Control-Allow-Methods"</span><span style="color: #806030;">,</span> <span style="color: #e60000;">"POST, GET, PUT, OPTIONS, DELETE"</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
  response<span style="color: #806030;">.</span>setHeader<span style="color: #806030;">(</span><span style="color: #e60000;">"Access-Control-Max-Age"</span><span style="color: #806030;">,</span> <span style="color: #e60000;">"3600"</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
  response<span style="color: #806030;">.</span>setHeader<span style="color: #806030;">(</span><span style="color: #e60000;">"Access-Control-Allow-Headers"</span><span style="color: #806030;">,</span> <span style="color: #e60000;">"Origin, x-requested-with, Content-Type, Accept"</span><span style="color: #806030;">)</span><span style="color: #806030;">;</span>
  chain<span style="color: #806030;">.</span>doFilter<span style="color: #806030;">(</span>req<span style="color: #806030;">,</span> res<span style="color: #806030;">)</span><span style="color: #806030;">;</span>
 <span style="color: #806030;">}</span>

 <span style="color: #400000; font-weight: bold;">public</span> <span style="color: #800040;">void</span> init<span style="color: #806030;">(</span>FilterConfig filterConfig<span style="color: #806030;">)</span> <span style="color: #806030;">{</span><span style="color: #806030;">}</span>

 <span style="color: #400000; font-weight: bold;">public</span> <span style="color: #800040;">void</span> destroy<span style="color: #806030;">(</span><span style="color: #806030;">)</span> <span style="color: #806030;">{</span><span style="color: #806030;">}</span>

<span style="color: #806030;">}</span>
</pre>

## Puntuación rápida

Básicamente, por la documentación y el servicio REST se obtendrá el 50% de la nota. Si no se hace cliente, se deberán crear varios scripts o comandos CURL de test para probarlo.

Del 50% restante, 20% es conseguir en el cliente una interfaz maestro/detalle y 30% por el resto de CRUD desde el cliente.

El cliente debe estar implementado usando jQuery y la comunicación entre cliente/servidor con XML/JSON.

Si el cliente no usa JavaScript pero está en HTML, la nota máxima posible sería 60% (sobre el 100%).

Si se implementa un lector de código de barras con XDK para un CRUD, estás exento del maestro/detalle.


