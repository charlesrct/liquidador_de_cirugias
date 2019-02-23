<!DOCTYPE html>
<html lang="es">
    <head>
        <title><?php if (isset($this->titulo)) echo $this->titulo; ?></title>
        <meta charset="UTF-8">
        <meta name="description" content="Aplicación web para liquidar procedimientos médicos, quirúrgicos y hospitalarios en Colombia" />

        <link href="<?php echo $_layoutParams['ruta_css']; ?>estilos.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo BASE_URL; ?>public/css/jquery-ui.min.css" media="all" rel="stylesheet" rev="stylesheet" />
        <link href="<?php echo BASE_URL; ?>public/css/jquery.alerts.css" rel="stylesheet" type="text/css" media="screen" />
        <script src="<?php echo BASE_URL; ?>public/js/jquery-2.2.4.min.js" type="text/javascript"></script>
        <script src="<?php echo BASE_URL; ?>public/js/jquery.validate.min.js" type="text/javascript"></script>
        <script src="<?php echo BASE_URL; ?>public/js/jquery-ui.min.js" type="text/javascript" language="javascript" charset="UTF-8"></script>
        <script src="<?php echo BASE_URL; ?>public/js/jquery.alerts.js" type="text/javascript"></script>
        <script src="<?php echo BASE_URL; ?>public/js/tarifarios.js" type="text/javascript"></script>
        
        <link rel=”alternate” href=”http://tarificador.hol.es/es-CO” hreflang=”x-default” />

        <?php if (isset($_layoutParams['js']) && count($_layoutParams['js'])): ?>
        <?php for ($i = 0; $i < count($_layoutParams['js']); $i++): ?>

        <script src="<?php echo $_layoutParams['js'][$i] ?>" type="text/javascript"></script>

        <?php endfor; ?>
        <?php endif; ?>

        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-49084633-2', 'auto');
            ga('send', 'pageview');

        </script>
        
    </head>

    <body>
        <body>
            <div id="main">
                <div id="header">
                    <div id="logo">
                        <h1><?php echo APP_NAME; ?></h1>
                    </div>

                    <div id="menu">
                        <div id="top_menu">
                            <ul>
                                <?php
                                if (isset($_layoutParams['menu'])):                             //Mostrando el menu si existe el arreglo menu
                                ?>
                                <?php
                                for ($i = 0; $i < count($_layoutParams['menu']); $i++):
                                ?>
                                <?php
                                if ($item && $_layoutParams['menu'][$i]['id'] == $item) {
                                    $_item_style = 'current';
                                } else {
                                    $_item_style = '';
                                }
                                ?>

                                <li>
                                    <a class="<?php echo $_item_style; ?>" href="<?php echo $_layoutParams['menu'][$i]['enlace']; ?>">
                                        <?php echo $_layoutParams['menu'][$i]['titulo']; ?>
                                    </a>
                                </li>

                                <?php endfor; ?>
                                <?php endif; ?>
                            </ul>
                        </div>
                    </div>
                </div>

                <div id="content">
                    <noscript><p>Para el correcto funcionamiento debe tener el soporte de javascript habilitado</p></noscript>
                    <div id="error"><?php if (isset($this->_error)) echo $this->_error; ?></div>