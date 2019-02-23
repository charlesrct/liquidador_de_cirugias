<?php

/*
 * -------------------------------------
 * Charles Torres
 * LIQUIDADOR DE CIRUGIAS
 * Request.php
 * -------------------------------------
 */


class Request                       //Recibe y procesa la peticion por la url
{
    private $_controlador;
    private $_metodo;
    private $_argumentos;
    
    public function __construct() {
        if(isset($_GET['url'])){        
            $url = filter_input(INPUT_GET, 'url', FILTER_SANITIZE_URL);     //Verificamos si existe un controlador a traves de la URL
            $url = explode('/', $url);                                      //crea un arreglo de la URL
            $url = array_filter($url);                                      //Elimina todos los elementos que no sean validos en la URL
            
            $this->_controlador = strtolower(array_shift($url));            //Extrae el primer elemento de la URL el controlador, queda ahora deprimer elemento el metodo
            $this->_metodo = strtolower(array_shift($url));                 //Extrae el primer elemento de la URL, el metodo (y convierte a minusculas)
            $this->_argumentos = $url;                                      //Quedan los argumetnos.
        }
        
        if(!$this->_controlador || $this->_controlador == "es-co"){         //indica pagina web en español y de colombia
            $this->_controlador = DEFAULT_CONTROLLER;                       //Si no exixte un controlador se toma por defecto
        }
        
        if(!$this->_metodo){                                                //Si no existe un método se toma el método index.
            $this->_metodo = 'index';
        }
        
        if(!isset($this->_argumentos)){                                     //Si no existen argumentos se devuelve un array vacio.
            $this->_argumentos = array();
        }
    }
    
    public function getControlador()
    {
        return $this->_controlador;
    }
    
    public function getMetodo()
    {
        return $this->_metodo;
    }
    
    public function getArgs()
    {
        return $this->_argumentos;
    }
}

?>