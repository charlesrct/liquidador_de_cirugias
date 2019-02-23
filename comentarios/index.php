<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Sistema de Comentarios V1.6</title>
        <!-- Seccion "A" -->
        <link href="estilo.css" rel="stylesheet" type="text/css" />
        <?php require_once("conexion.php"); ?>
        <?php require_once("emoticones.php"); ?>
        <!-- Fin Seccion "A" -->
    </head>
    <body>
        <div align="center">
            <!--
           <h1>Ayúdanos a mejorar. Déjanos tus comentarios:</h1>
            <table id="cont" border="0">
                <tr>
                    <td>

                        
                        <form id="formcomentarios" name="form1" method="post" action="insertar.php">
                            <fieldset>
                                <legend>
                                    Campos Obligatorios (<span id="obligatorio">*</span>)
                                </legend>

                                <div>
                                    <label for="titulo">Titulo:</label>
                                    <input type="text" name="titulo" id="titulo" maxlength="150" required/> <span id="obligatorio">*</span>
                                </div>                   

                                <div>
                                    <label for="nombre">Nombre: </label>
                                    <input type="text" name="nombre" id="nombre" maxlength="150" required/> <span id="obligatorio">*</span>
                                </div>

                                <div>
                                    <label for="correo">Correo: </label>
                                    <input type="email" name="correo" id="correo" maxlength="200" /> (No sera publicado)
                                </div>

                                <div>
                                    <label for="comentario">Comentario :<span id="obligatorio">*</span></label>
                                    <textarea name="comentario" id="comentario" maxlength="400" cols="45" rows="5" required></textarea> 
                                </div>
                                <div>
                                    <input class="btn" type="submit" name="go" id="go" value="Comenta" />
                                </div>

                            </fieldset>
                        </form>
                        <!-- FIN DEL FORMULARIO -->
                        <div>
                            <br>
                            <!-- Seccion "B" -->
                            <?php
                            $cadena ="SELECT * FROM comentario ORDER BY id DESC"; 
                            $tabla = mysqli_query($conexion, $cadena) or die ("problema con cadena de conexion<br><b>" . mysql_error()."</b>");
                            $campos = mysqli_num_rows($tabla);
                            $cadena = mysqli_query($conexion, $cadena); 
                            echo "Comentarios: $campos";
                            while ($campos = mysqli_fetch_array($tabla)){
                                echo
                                    '<div class="fondo_mensaje texto_mensaje"><center><h2>'.$campos['title'].'</h2></center>'
                                    .'<div class="titular-comentario contenido-comentario"><span id="title">Nombre: </span>'.
                                    $campos['nombre']
                                    .'</a><div "><span id="title"> Dijo:</span> '.
                                    $campos['comentario']
                                    .'</div></div></div>';
                            }
                            ?>
                            <!-- Fin Seccion "B" -->
                        </div>


                        <p>&nbsp;</p></td>
                </tr>
            </table>
        </div>
    </body>
</html>