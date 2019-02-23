<?php

class completa_pacienteController extends Controller {

    private $_completa;

    public function __construct() {
        parent::__construct();
        $this->_completa = $this->loadModel('completa_paciente');
    }

    public function index() {
        
    }

}

?>
