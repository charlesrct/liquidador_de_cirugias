<?php

/*
 * -------------------------------------
 * Charles Torres
 * LIQUIDADOR DE CIRUGIAS
 * Config.php
 * -------------------------------------
 */


define('BASE_URL', 'http://tarificador.hol.es/');  //Se va a utilizar para incluir archivos del lado de las vistas, del lado del uruario.
define('DEFAULT_CONTROLLER', 'index');
define('DEFAULT_LAYOUT', 'default');                            //Template para aplicar a las vistas

define('APP_NAME', 'Liquidador de Cirugías');
define('APP_SLOGAN', '');
define('APP_COMPANY', 'http://tarificador.hol.es/');

define('DB_HOST', 'localhost');
define('DB_USER', 'u424840527');
define('DB_PASS', '');
define('DB_NAME', 'u424840527_tarif');
define('DB_CHAR', 'utf8');

//Variables globales temporales .. dependen del inicio de sesion..
$userid = '1'; $active_company = '1';

//IDIOMA ESPAÑOL
define('IDIOMA', 'Español');
define('SERV_LIQUIDA', 'Servicios a Liquidar');
define('PACIENTE', 'Paciente:');
define('TARIFARIO', 'Tarifario:');
define('ANIO', 'Año:');
define('PROCEDIMIENTO', 'Procedimiento:');
define('VIA_ACCESO', 'Via Acceso:');
define('ESPECIALISTA', 'Especialista:');
define('TIPO_CIRUGIA', 'Tipo Cirugia:');
define('CIR_MULTIPLE', 'Cant.Cirugias Multiples:');
define('BUSCAR', 'Buscar...');
define('LIQUIDAR', '.: LIQUIDAR :.');
define('FACTURAR_LIQUIDACION', '.: FACTURAR LIQUIDACION :.');
define('PRODUCTOS_FACTURAR', 'SELECCIONE LOS PRODUCTOS ADICIONALES A FACTURAR');
define('PRODUCTO', 'PRODUCTO:');
define('CONDICIONES_FACTURACION', 'SELECCIONE LAS CONDICIONES DE LA FACTURACION');
define('FECHA_FACTURACION', 'Fecha Facturación:');
define('TERMINO_FACTURACION', 'Término de Facturación:');
define('FECHA_VENCIMIENTO', 'Fecha Vencimiento:');
define('RETE_FUENTE', 'Rete-Fuente:');
define('FORMA_PAGO', 'Forma de Pago:');
define('NOTA', 'Notas:');
define('GENERA_FACTURA', '.: GENERAR FACTURA :.');
?>
