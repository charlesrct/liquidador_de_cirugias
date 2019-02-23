<style>.xdebug-error{visibility:hidden;}</style>
<?php
require_once("conexion.php");
$title = $_POST['titulo'];
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$comentario = $_POST['comentario'];
$web = 'http://google.com';
$logo = 'logo1.png';
if (!isset($nombre) || $nombre == '') {
    echo
        '<center><h1>Falta completar el Nombre</h1><br /><h3><a href="javascript:history.go(-1);">Vuelve a el Formulario</a></h3></center>';
    exit;
}
else if (!isset($comentario) || $comentario == '') {
    echo
        '<center><h1>Falta completar el Comentario</h1><br /><h3><a href="javascript:history.go(-1);">Vuelve a el Formulario</a></h3></center>';
    exit;
}
else if (!isset($title) || $title == '') {
    echo
        '<center><h1>Falta completar el Titulo</h1><br /><h3><a href="javascript:history.go(-1);">Vuelve a el Formulario</a></h3></center>';
    exit;
}
else {
    $insertar = mysqli_query($conexion, "INSERT INTO comentario (title, nombre, correo, comentario, web, logo)
VALUES ('{$title}', '{$nombre}', '{$correo}', '{$comentario}', '{$web}', '{$logo}')");
    if (!$insertar) {
        die("Fallo en la insercion de registro en la Base de Datos: " . mysql_error());
    }
    mysqli_close($conexion);
}
header("Location: http://tarificador.hol.es/comentarios/index.php");
?>