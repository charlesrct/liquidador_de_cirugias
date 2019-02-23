            </div>

            <div id="footer">
                Copyright &copy; 2017 <a href="http://tarificador.hol.es/"><?php echo APP_COMPANY; ?></a>
            </div>
            <?php
                $peticion = new Request;  
                if($peticion->getControlador() == "liquidador"){
                    echo ('<iframe src="http://tarificador.hol.es/comentarios/index.php" width="100%" height="800" align="center">');        
                }
            ?>

        </div>
    </body>
</html>