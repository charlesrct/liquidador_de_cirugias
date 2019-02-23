<script type="text/javascript" language="javascript">
function cara1(){var element = document.getElementById("comentario"); element.value += ":)";}
function cara2(){var element = document.getElementById("comentario"); element.value += ":(";}
</script>


<?php
function emoticones($valor){
$emoticones = array(":)", ":(");
$imagenes = array
("<img src='emoticon/emoticon.gif' />",
"<img src='emoticon/emoticon2.gif' />"
);
return (str_replace($emoticones, $imagenes, $valor));}
ob_start("emoticones");
?>