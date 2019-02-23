<?php

/*
 * -------------------------------------
 *| Charles Torres
 * LIQUIDADOR DE CIRUGIAS
 * View.php
 * -------------------------------------
 */

class View {                        //Se encarga de manejar el trabajo con las vistas

    private $_controlador;
    private $_js;

    public function __construct(Request $peticion) {
        $this->_controlador = $peticion->getControlador();      //Toma el controlador del Request
        $this->_js = array();
    }

    public function renderizar($vista, $item = false) {         //Hace el llamado a las vistas. $vista = nombre de la vista
        //Menú de la página web.
        $menu = array(
            array(
                'id' => 'inicio',
                'titulo' => 'Inicio',
                'enlace' => BASE_URL                    //Controlador
            ),
            array(
                'id' => 'liquidador',
                'titulo' => 'Liquidar Cirugías',
                'enlace' => BASE_URL . 'liquidador'
            )
        );

        $js = array();

        if (count($this->_js)) {
            $js = $this->_js;
        }

        $_layoutParams = array(
            'ruta_css' => BASE_URL . 'views/layout/' . DEFAULT_LAYOUT . '/css/', //Ruta css de la plantilla
            'ruta_img' => BASE_URL . 'views/layout/' . DEFAULT_LAYOUT . '/img/', //Ruta imagenes de la plantilla
            'ruta_js' => BASE_URL . 'views/layout/' . DEFAULT_LAYOUT . '/js/', //Ruta funciones css de la plantilla
            'menu' => $menu, //Menú de la página web.
            'js' => $js
        );

        $rutaView = ROOT . 'views' . DS . $this->_controlador . DS . $vista . '.phtml';             //Ruta de la vista Se crea una carpeta por cada controlador 
        //en la carpeta views que va a tener la vista de cada controlador.

        if (is_readable($rutaView)) {                                                               //Verificando que el archivo exista y sea legible
            include_once ROOT . 'views' . DS . 'layout' . DS . DEFAULT_LAYOUT . DS . 'header.php';  //Encabezado del html
            include_once $rutaView;                                                                 //Vista o cuerpo del html
            include_once ROOT . 'views' . DS . 'layout' . DS . DEFAULT_LAYOUT . DS . 'footer.php';  //Pie de pagina del html
        } else {
            throw new Exception('Error de vista');                                                  //Si no existe la vista envia error
        }
    }
    
    public function renderizar_no_menu($vista) {         //Hace el llamado a las vistas. $vista = nombre de la vista

        $rutaView = ROOT . 'views' . DS . $this->_controlador . DS . $vista . '.phtml';             //Ruta de la vista Se crea una carpeta por cada controlador 
        //en la carpeta views que va a tener la vista de cada controlador.

        if (is_readable($rutaView)) {                                                               //Verificando que el archivo exista y sea legible
            include_once $rutaView;                                                                 //Vista o cuerpo del html
        } else {
            throw new Exception('Error de vista');                                                  //Si no existe la vista envia error
        }
    }

    public function setJs(array $js) {
        if (is_array($js) && count($js)) {
            for ($i = 0; $i < count($js); $i++) {
                $this->_js[] = BASE_URL . 'views/' . $this->_controlador . '/js/' . $js[$i] . '.js';
            }
        } else {
            throw new Exception('Error de js');
        }
    }

}

?>
