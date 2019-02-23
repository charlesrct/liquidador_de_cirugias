<?php
//$conexion = mysql_connect("localhost","root","");
//$bd = mysql_select_db("tarifario", $conexion);
$conexion = mysqli_connect('localhost', 'u424840527', '', 'u424840527_tarif');
if (!$conexion) {
die("Fallo la conexión a la Base de Datos: " . mysql_error());
}
//if (!$bd) {
//die("Fallo la selección de la Base de Datos: " . mysql_error());
//} 
?>