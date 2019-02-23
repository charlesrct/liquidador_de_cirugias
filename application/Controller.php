<?php

/*
 * -------------------------------------
 * | Charles Torres
 * LIQUIDADOR DE CIRUGIAS
 * Controller.php
 * -------------------------------------
 */

abstract class Controller {

    protected $_view;

    public function __construct() {
        $this->_view = new View(new Request);   //Obtenemos el objeto view disponoble en el controlador.
    }

    abstract public function index();           //Todas la clases que hereden de Controller deben tener un método index aunque no tenga codigo. Este el el metodo por defecto

    protected function loadModel($modelo) {                     //METODO PARA IMPORTAR LOS MODELOS
        $modelo = $modelo . 'Model';                            //Mombre del modelo
        $rutaModelo = ROOT . 'models' . DS . $modelo . '.php';  //Ruta del modelo

        if (is_readable($rutaModelo)) {                         //Verificando si es legible
            require_once $rutaModelo;
            $modelo = new $modelo;                              //Si existe instancia el modelo
            return $modelo;
        } else {
            throw new Exception('Error de modelo');             //Error si el modelo no existe.
        }
    }

    protected function getLibrary($libreria) {
        $rutaLibreria = ROOT . 'libs' . DS . $libreria . '.php';    //Ruta de la libreria

        if (is_readable($rutaLibreria)) {                       //Verificar si es legible
            require_once $rutaLibreria;
        } else {
            throw new Exception('Error de libreria');           //Si no es legible envia un error.
        }
    }

    protected function getTexto($clave) {
        if (isset($_POST[$clave]) && !empty($_POST[$clave])) {
            $_POST[$clave] = htmlspecialchars($_POST[$clave], ENT_QUOTES);
            return $_POST[$clave];
        }

        return '';
    }

    protected function getInt($clave) {
        if (isset($_POST[$clave]) && !empty($_POST[$clave])) {
            $_POST[$clave] = filter_input(INPUT_POST, $clave, FILTER_VALIDATE_INT);
            return $_POST[$clave];
        }

        return 0;
    }

    protected function redireccionar($ruta = false) {
        if ($ruta) {
            header('location:' . BASE_URL . $ruta);
            exit;
        } else {
            header('location:' . BASE_URL);
            exit;
        }
    }

    protected function filtrarInt($int) {
        $int = (int) $int;

        if (is_int($int)) {
            return $int;
        } else {
            return 0;
        }
    }

    protected function getPostParam($clave) {
        if (isset($_POST[$clave])) {
            return $_POST[$clave];
        }
    }

}

?>
