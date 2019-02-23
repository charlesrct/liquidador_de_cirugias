<?php

/*
 * -------------------------------------
 * Charles Torres
 * LIQUIDADOR DE CIRUGIAS
 * Bootstrap.php
 * -------------------------------------
 */


class Bootstrap                     //Procesa la llama al metodo y al controlador enviado por URL.. si no se envia nada se ejecuta el metodo/controlador por defecto index
{
    public static function run(Request $peticion)
    {
        $controller = $peticion->getControlador() . 'Controller';               //Toma el nombre del controlador de la url
        $rutaControlador = ROOT . 'controllers' . DS . $controller . '.php';    //Se construye la ruta del controlador
        $metodo = $peticion->getMetodo();                                       //Toma el nombre del método de la url
        $args = $peticion->getArgs();                                           //Toma el nombre de los argumentos de la url

        if(is_readable($rutaControlador)){                                      //Verificando si es accesible el archivo del controlador
            require_once $rutaControlador;                                      //Incluye ese controlador
            $controller = new $controller;

            if(is_callable(array($controller, $metodo))){                       //Verificando si el método es valido
                $metodo = $peticion->getMetodo();                               //Guarda el nombre metodo
            }
            else{
                $metodo = 'index';                                              //Si el método no existe le asigna index por defecto
            }

            if(isset($args)){                                                   //Verifica los argumentos
                call_user_func_array(array($controller, $metodo), $args);       //Los guarda en un arreglo que va contener el controlador el metodo y argumentos
            }                                                                   //$controller = nombre de la clase, $metodo = funcion de esa clase, $args = pasa los parámetros 
            else{
                call_user_func(array($controller, $metodo));                    //Si no hay argumentos solo envia el controlador y el método
            }                                                                   //$controller = nombre de la clase, $metodo = funcion de esa clase, sin parametros.

        } else {
            throw new Exception('no encontrado');                               //Si el archivo de controlador no existe envia un error.
        }
    }
}

?>