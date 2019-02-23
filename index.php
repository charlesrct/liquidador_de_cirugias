<?php

define('DS', DIRECTORY_SEPARATOR);                  //Separador del S.O. ej: win= \ linux= /
define('ROOT', realpath(dirname(__FILE__)) . DS);   //Ruta donde esta guardado el index de la aplicación
define('APP_PATH', ROOT . 'application' . DS);      //Directorio de las aplicaciones.

require_once APP_PATH . 'Config.php';           //Variables de configuración.  Se puede hacer un solo archivo o crear uno para las  rutas, otro para las bases de datos y otro para las configuraciones de la aplicación.
require_once APP_PATH . 'Request.php';          //Recibe las peticiones por la URL y las pasa al Bootstrap.php
require_once APP_PATH . 'Bootstrap.php';        //Llama al controlador que se encuentre en controllers/ y que es pedido en el Request.php.
require_once APP_PATH . 'Controller.php';       // Es el controlador principal, de donde se van a extender todos los controladores. Contiene los métodos que va  a ser utilizados por todos controladores.
                                                //controllers/ -> El controlador que reciba la petición ara su gestión de modelo y vista.
require_once APP_PATH . 'Model.php';            //Contiene todos los métodos que van a ser comunes a todos los modelos.
require_once APP_PATH . 'View.php';             //Contiene todos los métodos que van a ser comunes a todas las vistas. Las vistas no son instanciadas, la clase view maneja el trabajo con las vistas.
require_once APP_PATH . 'Registro.php';         //Lleva el patrón singleton, Su propósito es asegurar que sólo exista una instancia de una clase.
require_once APP_PATH . 'Database.php';         //Conxion a la base de datos.

try{
    Bootstrap::run(new Request);                //Llama el Bootstrap y request para que procesar la peticion.
}
catch(Exception $e){
    echo $e->getMessage();                      //Si no encuentra un controlador, muestra mensaje de error devuelto por el bootstrap: throw new Exception('no encontrado');
}

?>