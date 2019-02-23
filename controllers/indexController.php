<?php

class indexController extends Controller
{
    public function __construct() {
        parent::__construct();
    }
    
    public function index()
    {
        $post = $this->loadModel('post');
        
        $this->_view->posts = $post->getPosts();
        
        $this->_view->titulo = 'Manuales Tarifarios';                   //Sirve para pasar parámetros a las vistas ej: en index.phtml mostramos el titulo: echo $this->titulo; 
        $this->_view->renderizar('index', 'inicio');
    }
}

?>