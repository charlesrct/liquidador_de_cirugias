<?php

/*
 * -------------------------------------
 *| Charles Torres
 * LIQUIDADOR DE CIRUGIAS
 * Model.php
 * -------------------------------------
 */

class Model {

    protected $_db;

    public function __construct() {
        $this->_db = new Database();
    }

}

?>
