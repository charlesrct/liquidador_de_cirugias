<?php

class liquidadorController extends Controller {

    private $_liquidador;

    public function __construct() {
        parent::__construct();
        $this->_liquidador = $this->loadModel('liquidador');
    }

    public function index() {

        $this->_view->sel_anual = $this->_liquidador->getAnual();
        //$this->_view->term_factura = $this->_liquidador->getTermFactura();
        //$this->_view->rete_fuente = $this->_liquidador->getReteFuente();
        //$this->_view->forma_pago = $this->_liquidador->getFormaPago();

        $this->_view->titulo = 'Liquidador de Cirugías';
        $this->_view->renderizar('index', 'liquidador');
    }

    public function tabla_procedimiento() {

        $this->_view->dato_servicio = $this->_liquidador->getServicio();

        $this->_view->renderizar_no_menu('servicio');
    }

    public function buscar_productos() {

        $this->_view->renderizar_no_menu('productos');
    }

    public function get_productos($convenioid, $Dato) {

        return $this->_liquidador->getProductos($convenioid, $Dato);
    }

    public function adicionar_procedimiento() {

        $this->_view->renderizar_no_menu('addservicio');
    }

    public function Valida_Existe() {

        $Cadena = $_GET['Dato'];
        $Services_id = $_GET['Services_id'];

        $Resultado = explode(',', $Cadena);
        for ($i = 1; $i < count($Resultado); $i++) {

            $Dato_Service = explode('**', $Resultado[$i]);

            if ($Dato_Service[0] == $Services_id) {
                $a_vectt['val'] = 'TRUE';
                echo json_encode($a_vectt);
                exit;
            }
        }
        return;
    }

    public function Valida_Existe_2() {

        $Datos = $_GET['Datos'];
        $Cadena = $_GET['Cadena'];
        $Services_id = $_GET['Services_id'];

        $Resultado = explode(',', $Cadena);
        for ($i = 1; $i < count($Resultado); $i++) {

            $Dato_Service = explode('**', $Resultado[$i]);

            if ($Dato_Service[0] == $Services_id) {
                $a_vectt['val'] = 'TRUE';
                echo json_encode($a_vectt);
                exit;
            }
        }
        $New_Cadena = explode(',', $Datos);
        for ($k = 0; $k < count($New_Cadena); $k++) {
            if ($New_Cadena[$k] == $Services_id) {
                $a_vectt['val'] = 'TRUE';
                echo json_encode($a_vectt);
                exit;
            }
        }
        return;
    }

    public function Valida_Existe_Producto() {

        $Cadena = $_GET['Dato'];
        $Services_id = $_GET['Services_id'];

        $Resultado = explode('###', $Cadena);
        for ($i = 1; $i < count($Resultado); $i++) {

            $Dato_Service = explode('**', $Resultado[$i]);

            if ($Dato_Service[0] == $Services_id) {
                $a_vectt['val'] = 'TRUE';
                echo json_encode($a_vectt);
                exit;
            }
        }
        return;
    }

    public function listar_productos() {

        $this->_view->renderizar_no_menu('listar_productos');
    }

    public function consultar_procedimiento($Dato_Service) {
        return $this->_liquidador->getAddServicio($Dato_Service);
    }

    public function consultar_valor_smdlv($anio_smlv) {
        return $this->_liquidador->getAnio($anio_smlv);
    }

    public function consultar_quirofano($cod_quirofano) {
        return $this->_liquidador->getQuirofano($cod_quirofano);
    }

    public function consultar_mat($cod_materiales) {
        return $this->_liquidador->getMat($cod_materiales);
    }

    public function consultar_mat_2004($cod_materiales) {
        return $this->_liquidador->getMat2004($cod_materiales);
    }

    public function consultar_sala($Dato_Service) {
        return $this->_liquidador->getSala($Dato_Service);
    }

    public function consultar_soat($Servicios) {
        $tipo_sala = $this->_liquidador->getSalaSoat($Servicios);
        $tipo_mat = $this->_liquidador->getMatSoat($Servicios);
        return array($tipo_mat, $tipo_sala);
    }

    public function consultar_2001($mat, $sala) {
        $tipo_sala = $this->_liquidador->getSala2001($sala);
        $tipo_mat = $this->_liquidador->getMat2001($mat);
        return array($tipo_mat, $tipo_sala);
    }

    public function consultar_2004($mat) {
        return $this->_liquidador->getM2004($mat);
    }

    public function convenio_paciente($paciente_id) {
        return $this->_liquidador->getConvenioPaciente($paciente_id);
    }

    public function consultar_materiales($Dato_Service) {
        return $this->_liquidador->getMateriales($Dato_Service);
    }

    public function busca_paciente() {
        $resultados = array();
        $valor = $_REQUEST['term'];

        $resultados = $this->_liquidador->getPaciente($valor);

        echo json_encode($resultados);
    }

    public function ventana_factura() {

        //global $userid, $conn, $active_company;

        $paciente_id = explode(':::', $_REQUEST['id_paciente']);

        //traemos los datos de paciente
        $paciente = $this->_liquidador->datos_de_paciente($paciente_id[1]);

        //traemos los datos de cliente
        $datos_company = $this->_liquidador->datos_de_cliente($paciente[0]['customerid']);

        //Consulta numero de la ultima factura.
        $Select_Invoicenumber = $this->_liquidador->numero_ultima_factura();
        $invoicenumber = $Select_Invoicenumber[0]['invoicenumber'] + 1;

        //Nit de la compañia
        $Select_federal = $this->_liquidador->Nit_compania($datos_company[0]['id']);
        $federalid = $Select_federal[0]['federalid'];

        //Porcentaje del convenio
        //PARA LA TABLA convenios
        //Con convenioid obtener:
        //cancel = 	Validar = 0
        //Porcentaje:	 0-> es una suma (+)  1-> es una resta (-) TENER EN CUENTA PARA CALCULAR LOS VALORES DE LA FACTURA
        //Valor_Porcentaje:  valor que se opera segun el porcentaje. % A APLICAR A LOS VALORES DE LA FACTURA.
        $convenio = $this->_liquidador->Porcentaje_convenio($paciente_id[1]);

        $Total_porcentaje = ($_REQUEST["Total"] * $convenio[0]['Valor_Porcentaje'] / 100);

        if ($convenio[0]['Porcentaje'] == 1) {
            $Total_porcentaje = $_REQUEST["Total"] - $Total_porcentaje;
        } else {
            $Total_porcentaje = $_REQUEST["Total"] + $Total_porcentaje;
        }

        //Al total le sumamos los valores de los productos antes de calcular la retefuente.
        $datos_cadena = $_REQUEST['datos_cadena'];
        $Servicios = explode(',', $datos_cadena);

        $datos_productos = $_REQUEST['datos_producto'];
        $Productos = explode(',', $datos_productos);
        $Suma_Prod = 0;

        for ($i = 1; $i < count($Productos); $i++) {
            $Sum_Producto = explode('**', $Productos[$i]);
            $Suma_Prod = $Suma_Prod + ($Sum_Producto[2] * $Sum_Producto[3]);
        }

        $Total_porcentaje = $Total_porcentaje + $Suma_Prod;

        //porcentaje retefuente
        $Select_Rete = $this->_liquidador->porcentaje_retefuente($_REQUEST["retefuente"]);
        $porcentRetefunte = $Select_Rete[0]['tax_rate'];
        $retefuente = ( $Total_porcentaje * $porcentRetefunte / 100);
        $subtotal = $Total_porcentaje - $retefuente;

        //Guardamos los datos capturados y calculados en la tabla arinvoice
        //*******************************************************************************
        global $userid, $active_company;
        $arinvoice_Insert = $this->_liquidador->insert_arinvoice($invoicenumber, $datos_company[0]['id'], $federalid, $subtotal, $_REQUEST["termPag"], $_REQUEST["FechaFac"], $_REQUEST["fechVen"], $active_company, $userid, $_REQUEST["forPag"], $Total_porcentaje);
        $Select_id = $this->_liquidador->id_arinvoice();

        //Ultimo id de la factura
        $invoiceid = $Select_id[0]['id'];
        //Guardamos las notas de la factura con el ultimo id de la factura
        $notas_Insert = $this->_liquidador->insert_arinvoicenotes($invoiceid, $_REQUEST["notas"], $userid);
        //************************************************************************
        $lineas_fact = count($Servicios) + count($Productos) - 2;
        //Gurdamos los servicios.....
        for ($i = 1; $i < count($Servicios); $i++) {
            $Dato_Service = explode('**', $Servicios[$i]);
            $Servicios_Lista = $this->_liquidador->liquidador_tarifario_s($Dato_Service[0]);
            //Cadena = ','id_procedimiento**cups_procedimiento**especialista_val**anestesiologo_val**ayudante_val**med_odonto_general_val**suma_val**
            //op_liquida**Sala_id**sala_val**Materiales_id**materiales_val**SubTotal**porcentajes
            //Porcentaje:	 0-> es una suma (+)  1-> es una resta (-) TENER EN CUENTA PARA CALCULAR LOS VALORES DE LA FACTURA
            $priceach = ($Dato_Service[12] * $convenio[0]['Valor_Porcentaje'] / 100);
            if ($convenio[0]['Porcentaje'] == 1) {
                $priceach = $Dato_Service[12] - $priceach;
            } else {
                $priceach = $Dato_Service[12] + $priceach;
            }

            $opciones = explode(';', $Dato_Service[7]);

            $especialista_val = ($Dato_Service[2] * $convenio[0]['Valor_Porcentaje'] / 100);
            if ($convenio[0]['Porcentaje'] == 1) {
                $especialista_val = $Dato_Service[2] - $especialista_val;
            } else {
                $especialista_val = $Dato_Service[2] + $especialista_val;
            }
            $anestesiologo_val = ($Dato_Service[3] * $convenio[0]['Valor_Porcentaje'] / 100);
            if ($convenio[0]['Porcentaje'] == 1) {
                $anestesiologo_val = $Dato_Service[3] - $anestesiologo_val;
            } else {
                $anestesiologo_val = $Dato_Service[3] + $anestesiologo_val;
            }
            $ayudante_val = ($Dato_Service[4] * $convenio[0]['Valor_Porcentaje'] / 100);
            if ($convenio[0]['Porcentaje'] == 1) {
                $ayudante_val = $Dato_Service[4] - $ayudante_val;
            } else {
                $ayudante_val = $Dato_Service[4] + $ayudante_val;
            }
            $med_odonto_general_val = ($Dato_Service[5] * $convenio[0]['Valor_Porcentaje'] / 100);
            if ($convenio[0]['Porcentaje'] == 1) {
                $med_odonto_general_val = $Dato_Service[5] - $med_odonto_general_val;
            } else {
                $med_odonto_general_val = $Dato_Service[5] + $med_odonto_general_val;
            }
            $suma_val = ($Dato_Service[6] * $convenio[0]['Valor_Porcentaje'] / 100);
            if ($convenio[0]['Porcentaje'] == 1) {
                $suma_val = $Dato_Service[6] - $suma_val;
            } else {
                $suma_val = $Dato_Service[6] + $suma_val;
            }
            $sala_val = ($Dato_Service[9] * $convenio[0]['Valor_Porcentaje'] / 100);
            if ($convenio[0]['Porcentaje'] == 1) {
                $sala_val = $Dato_Service[9] - $sala_val;
            } else {
                $sala_val = $Dato_Service[9] + $sala_val;
            }
            $materiales_val = ($Dato_Service[11] * $convenio[0]['Valor_Porcentaje'] / 100);
            if ($convenio[0]['Porcentaje'] == 1) {
                $materiales_val = $Dato_Service[11] - $materiales_val;
            } else {
                $materiales_val = $Dato_Service[11] + $materiales_val;
            }
            $subtotal_val = ($Dato_Service[12] * $convenio[0]['Valor_Porcentaje'] / 100);
            if ($convenio[0]['Porcentaje'] == 1) {
                $subtotal_val = $Dato_Service[12] - $subtotal_val;
            } else {
                $subtotal_val = $Dato_Service[12] + $subtotal_val;
            }

            //Inserta SERVICIOS de la factua actual en la tabla liq_tarif_detalle
            $liquidadetail_Insert = $this->_liquidador->insert_tarif_detalle($invoiceid, $paciente_id[1], $_REQUEST["id_tarifario"], $_REQUEST["anio"], $opciones[0], $opciones[1], $opciones[2], $opciones[3], $Dato_Service[0], $Dato_Service[1], $especialista_val, $anestesiologo_val, $ayudante_val, $med_odonto_general_val, $suma_val, $Dato_Service[8], $sala_val, $Dato_Service[10], $materiales_val, $subtotal_val, $Dato_Service[13], $userid);

            //Inserta SERVICIOS de la factua actual en la tabla arinvoicedetail
            $arinvoicedetail_Insert = $this->_liquidador->insert_arinvoicedetail($invoiceid, $lineas_fact, $Servicios_Lista[0]['descripcion'], $priceach, $userid, $Dato_Service[0], $convenio[0]['id']);
        }//FIN FOR SERVIVIOS
        //Guardamos los productos.
        //productos = ','Productos_id**Productos_code**cantidad_prod**valor_up;
        for ($i = 1; $i < count($Productos); $i++) {
            $Dato_Producto = explode('**', $Productos[$i]);

            //Inserta PRODUCTOS de la factua actual en la tabla liq_tarif_detalle
            $liquidadetail_Insert = $this->_liquidador->insert_liq_tarif_detalle($invoiceid, $paciente_id[1], $_REQUEST["id_tarifario"], $_REQUEST["anio"], $Dato_Producto[0], $Dato_Producto[2], $Dato_Producto[3], $userid);

            $Select_des = $this->_liquidador->Select_des($Dato_Producto[0]);
            $desproduc = $Select_des[0]['catalogdescription'];

            //Inserta PRODUCTOS de la factua actual en la tabla arinvoicedetail
            $arinvoicedetail_Insert = $this->_liquidador->insert_arinvoicedetailp($invoiceid, $lineas_fact, $Dato_Producto[0], $desproduc, $Dato_Producto[2], $Dato_Producto[3], $userid, $convenio[0]['id']);
        }//FIN FOR PRODUCTOS
        //Guardamos los datos calculados y consultados de la retefuente
        $arinvoicetaxdetail_Insert = $this->_liquidador->insert_arinvoicetaxdetail($invoiceid, $_REQUEST["retefuente"], $retefuente);
        #$objeto_class->factura_ventana($invoiceid);
        ######################################

        $a_vectt['val'] = 'TRUE';
        $a_vectt['invoiceid'] = $invoiceid;
        echo json_encode($a_vectt);
        exit;
    }

    public function busca_procedimiento() {
        $resultados = array();
        $valor = $_REQUEST['term'];
        $idtarifario = $_REQUEST['idtarifario'];

        if ($idtarifario == -1) {                   //si escogieron manual tarifario                
            $err[] = array(
                'label' => '..:: ERROR - SELECCIONE UN TARIFARIO ::..',
                'value' => '..:: ERROR - SELECCIONE UN TARIFARIO ::..'
            );
            $idtarifario = "";
            $anio = "";
        }
        if ($idtarifario == 1) {                   //si escogieron manual tarifario
            $idtarifario = "SOAT";
            $anio = 'TODOS';
        }
        if ($idtarifario == 2) {                   //si escogieron manual tarifario
            $idtarifario = "ISS";
            $anio = '2001';
        }
        if ($idtarifario == 3) {                   //si escogieron manual tarifario
            $idtarifario = "ISS";
            $anio = '2004';
        }

        if (isset($err)) {
            echo json_encode($err);
        } else {
            $resultados = $this->_liquidador->getProcedimiento($valor, $idtarifario, $anio);
            echo json_encode($resultados);
        }
    }

}

?>
