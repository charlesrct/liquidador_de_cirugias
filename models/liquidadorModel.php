<?php

class liquidadorModel extends Model {

    public function __construct() {
        parent::__construct();
    }

    public function getPaciente($valor) {
        $resultados = array();
        $res = $this->_db->query("SELECT 
                id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, identificacion
                FROM pacientes
                WHERE (primer_nombre like '%$valor%' or segundo_nombre like '%$valor%' or primer_apellido like '%$valor%' or segundo_apellido like '%$valor%' or id like '%$valor%' or identificacion like '%$valor%') 
                limit 0, 10");

        while ($reg = $res->fetch(PDO::FETCH_ASSOC)) {
            $resultados[] = array(
                'label' => $reg['primer_nombre'] . "::" . $reg['segundo_nombre'] . "::" . $reg['primer_apellido'] . "::" . $reg['segundo_apellido'] . "::" . $reg['identificacion'] . ":::" . $reg['id'],
                'value' => $reg['primer_nombre'] . "::" . $reg['segundo_nombre'] . "::" . $reg['primer_apellido'] . "::" . $reg['segundo_apellido'] . "::" . $reg['identificacion'] . ":::" . $reg['id']
            );
        }
        return $resultados;
    }

    public function getProcedimiento($valor, $idtarifario, $anio) {
        $resultados = array();

        //Si el tarifarios es ISS 2001, excluimos de la consulta:
        //  TIPO                            unidad_liquidacion
        //'Servicios Intrahospitalarios' en UVR
        //'Proteccion  Deteccion y Atencion de Enfermedades Salud Publica'  en UVR
        //'Derechos de Sala' en UVR
        //'Materiales' en UVR
        //'Conjunto de Atencion por Tarifa Integral' en UVR

        if ($idtarifario == "ISS" && $anio == '2001') {
            $sql2001 = $this->_db->query("SELECT  idliquidador_tarifario  FROM `liquidador_tarifario` 
                        WHERE `tarifario` = 'iss' AND `anio` = '2001' AND descripcion LIKE '%$valor%'  
                        AND `tipo` IN ('Servicios Intrahospitalarios', 'Proteccion  Deteccion y Atencion de Enfermedades Salud Publica', 'Derechos de Sala', 'Materiales', 'Conjunto de Atencion por Tarifa Integral') 
                        AND `unidad_liquidacion`='uvr'");
            $Select_Consulta1 = $sql2001->fetch();
            $if_iss_2001 = "               
                            AND idliquidador_tarifario<>'" . $Select_Consulta1['idliquidador_tarifario'] . "'                                
                            ";
        } else {
            $if_iss_2001 = "";
        }
        $res = $this->_db->query("select idliquidador_tarifario, codigo, descripcion, tarifario, anio, unidad_liquidacion
                            from liquidador_tarifario
                            where (codigo like '%$valor%' or descripcion like '%$valor%'or referencia like '%$valor%') 
                            and (tarifario='$idtarifario' and anio='$anio')
                            AND suma <> 0
                            $if_iss_2001
                            order by codigo
                            limit 0, 10");

        if ($idtarifario == "SOAT") {
            $tanio = "";
        } else {
            $tanio = " " . $anio;
        }

        while ($reg = $res->fetch(PDO::FETCH_ASSOC)) {
            $resultados[] = array(
                'label' => $reg['codigo'] . "::" . $reg['descripcion'] . "::" . $reg['tarifario'] . $tanio . ":::" . $reg['idliquidador_tarifario'],
                'value' => $reg['codigo'] . "::" . $reg['descripcion'] . "::" . $reg['tarifario'] . $tanio . ":::" . $reg['idliquidador_tarifario']
            );
            //$cups::$descripcion::$tarifario_texto:::$id
        }
        return $resultados;
    }

    public function getAnual() {
        $result = $this->_db->query("SELECT anual
                                        FROM parametros_tarifarios
                                        WHERE cancel = 0
                                        ORDER BY anual DESC");
        return $result->fetchall();
    }

    public function getTermFactura() {
        $result = $this->_db->query("SELECT CONCAT(id,'-',netduedays) as id_t, verbal
                                        FROM invoiceterms
                                        WHERE ar = 1 AND cancel = 0
                                        ORDER BY verbal");
        return $result->fetchall();
    }

    public function getQuirofano($cod_quirofano) {
        $result = $this->_db->query('SELECT 
                                        idliquidador_tarifario, 
                                        codigo, 
                                        descripcion, 
                                        grupo_quirurgico,
                                        suma,
                                        tarifario,
                                        anio,
                                        tipo,
                                        unidad_liquidacion,
                                        med_general_odontologo
                                    FROM 
                                        liquidador_tarifario 
                                    WHERE 
                                        tipo = "Servicios Intrahospitalarios Quirofanos"
                                    AND 
                                        anio = "2001"
                                    AND 
                                        codigo = "' . $cod_quirofano . '";');
        return $result->fetchall();
    }

    public function getSalaSoat($Servicios) {
        $result = $this->_db->query('SELECT 
                                        idliquidador_tarifario, 
                                        codigo, 
                                        descripcion, 
                                        grupo_quirurgico,
                                        suma,
                                        tarifario,
                                        anio,
                                        tipo,
                                        unidad_liquidacion,
                                        med_general_odontologo
                                    FROM 
                                        liquidador_tarifario 
                                    WHERE 
                                        tipo = "Derechos de Sala"
                                    AND 
                                        grupo_quirurgico = "' . $Servicios . '";');
        return $result->fetchall();
    }

    public function getMatSoat($Servicios) {
        $result = $this->_db->query('SELECT 
                                        idliquidador_tarifario, 
                                        codigo, 
                                        descripcion, 
                                        grupo_quirurgico,
                                        suma,
                                        tarifario,
                                        anio
                                    FROM 
                                        liquidador_tarifario 
                                    WHERE 
                                        tipo = "Materiales de Sutura"
                                    AND 
                                        grupo_quirurgico = "' . $Servicios . '";');
        return $result->fetchall();
    }

    public function getSala2001($sala) {
        $result = $this->_db->query('SELECT 
                                        idliquidador_tarifario, 
                                        codigo, 
                                        descripcion, 
                                        grupo_quirurgico,
                                        suma,
                                        tarifario,
                                        anio,
                                        tipo
                                    FROM 
                                        liquidador_tarifario 
                                    WHERE 
                                        idliquidador_tarifario = "' . $sala . '";');
        return $result->fetchall();
    }

    public function getMat2001($mat) {
        $result = $this->_db->query('SELECT 
                                        idliquidador_tarifario, 
                                        codigo, 
                                        descripcion, 
                                        grupo_quirurgico,
                                        suma,
                                        tarifario,
                                        anio,
                                        tipo
                                    FROM 
                                        liquidador_tarifario 
                                    WHERE 
                                        idliquidador_tarifario = "' . $mat . '";');
        return $result->fetchall();
    }

    public function getMat2004($mat) {
        $result = $this->_db->query('SELECT 
                                        idliquidador_tarifario, 
                                        codigo, 
                                        descripcion, 
                                        grupo_quirurgico,
                                        suma,
                                        tarifario,
                                        anio,
                                        tipo,
                                        unidad_liquidacion,
                                        med_general_odontologo
                                    FROM 
                                        liquidador_tarifario 
                                    WHERE 
                                        tipo = "Materiales"
                                    AND 
                                        anio = "2004"
                                    AND 
                                        codigo = "' . $mat . '";');
        return $result->fetchall();
    }

    public function getMat($cod_materiales) {
        $result = $this->_db->query('SELECT 
                                        idliquidador_tarifario, 
                                        codigo, 
                                        descripcion, 
                                        grupo_quirurgico,
                                        suma,
                                        tarifario,
                                        anio,
                                        tipo,
                                        unidad_liquidacion,
                                        med_general_odontologo
                                    FROM 
                                        liquidador_tarifario 
                                    WHERE 
                                        tipo = "Servicios Intrahospitalarios Materiales Sutura"
                                    AND 
                                        anio = "2001"
                                    AND 
                                        codigo = "' . $cod_materiales . '";');
        return $result->fetchall();
    }

    public function getM2004($cod_materiales) {
        $result = $this->_db->query('SELECT 
                        idliquidador_tarifario, 
                        codigo, 
                        descripcion, 
                        grupo_quirurgico,
                        suma,
                        tarifario,
                        anio,
                        tipo
                    FROM 
                        liquidador_tarifario 
                    WHERE 
                        idliquidador_tarifario = "' . $cod_materiales . '";');
        return $result->fetchall();
    }

    public function getProductos($convenioid, $Dato) {
        $result = $this->_db->query("SELECT 
                                item.id AS itemid,
                                item.itemcode AS itemcode,
                                item.catalogdescription AS catalogdescription,
                                pricesubperpriceunit.precio_venta AS precio_venta,
                                pricesubperpriceunit.id AS pricesubperpriceunitid,
                                pricesubperpriceunit.pricesublevelid AS pricesublevelid,
                                pricesubperpriceunit.itemid AS pricesubperpriceunititemid
                            FROM 
                                convenios,
                                pricesublevel,
                                pricesubperpriceunit,
                                item
                            WHERE
                                convenios.id = '$convenioid' 
                            AND
                                convenios.idListaProd = pricesublevel.id
                            AND 
                                pricesublevel.id = pricesubperpriceunit.pricesublevelid
                            AND
                                pricesubperpriceunit.itemid = item.id
                            AND 
                                (item.itemcode LIKE '%$Dato%' OR item.catalogdescription LIKE '%$Dato%')
                            AND
                                convenios.cancel=0
                            AND
                                item.cancel=0
                            AND
                                pricesublevel.cancel=0
                            AND
                                pricesubperpriceunit.cancel=0
                            GROUP BY 
                                item.id ;");
        return $result->fetchall();
    }

    public function getConvenioPaciente($paciente_id) {
        $result = $this->_db->query('SELECT 
                                        Tipo_Tarifario, 
                                        anio, 
                                        fecha_in, 
                                        fecha_fin, 
                                        id
                                    FROM 
                                        convenios
                                    WHERE 
                                        cancel = 0
                                    AND id = (  SELECT convenioid
                                                FROM pacientes
                                                WHERE cancel = 0
                                                AND id = "' . $paciente_id . '");');
        return $result->fetchall();
    }

    public function getReteFuente() {
        $result = $this->_db->query("SELECT 
                                        tax_rates.tax_rates_id, 
                                        tax_rates.tax_description
                                    FROM
                                        tax_rates,
                                        tax_class
                                    WHERE
                                        tax_rates.tax_class_id = 2 
                                    AND 
                                        tax_class.tax_class_id = tax_rates.tax_class_id 
                                    AND 
                                        tax_rates.cancel = 0");
        return $result->fetchall();
    }

    public function getFormaPago() {
        $result = $this->_db->query("SELECT id, description 
                                        FROM trtypepayment
                                        WHERE cancel = 0
                                        ORDER BY description");
        return $result->fetchall();
    }

    public function getServicio() {
        $result = $this->_db->query('SELECT 
                                idliquidador_tarifario, 
                                codigo, 
                                descripcion, 
                                grupo_quirurgico,
                                especialista,
                                anestesiologo,
                                ayudante,
                                suma,
                                tarifario,
                                anio,
                                tipo,
                                unidad_liquidacion,
                                med_general_odontologo
                            FROM 
                                liquidador_tarifario 
                            WHERE 
                                tarifario = "' . $_REQUEST["Tarifario"] . '"
                            AND 
                                idliquidador_tarifario = ' . $_REQUEST["Dato"] . '
                            AND 
                                anio = "' . $_REQUEST["anio"] . '";');
        return $result->fetchall();
    }

    public function getAddServicio($Dato_Service) {
        $result = $this->_db->query('SELECT
                                        idliquidador_tarifario,
                                        codigo,
                                        descripcion,
                                        grupo_quirurgico,
                                        especialista,
                                        anestesiologo,
                                        ayudante,
                                        suma,
                                        tarifario,
                                        anio,
                                        unidad_liquidacion
                                    FROM
                                        liquidador_tarifario
                                    WHERE
                                        idliquidador_tarifario = "' . $Dato_Service . '";
                                        ');
        return $result->fetchall();
    }

    public function getAnio($anio_smlv) {
        $result = $this->_db->query('SELECT 
                                        valor_smdlv
                                    FROM 
                                        parametros_tarifarios
                                    WHERE 
                                        anual = "' . $anio_smlv . '";
                                        ');
        return $result->fetchall();
    }

    public function getMateriales($Dato_Service) {
        $result = $this->_db->query('SELECT 
                                        idliquidador_tarifario, 
                                        codigo, 
                                        descripcion, 
                                        grupo_quirurgico,
                                        suma,
                                        tarifario,
                                        anio
                                    FROM 
                                        liquidador_tarifario 
                                    WHERE 
                                        idliquidador_tarifario = "' . $Dato_Service . '";
                                        ');
        return $result->fetchall();
    }

    public function getSala($Dato_Service) {
        $result = $this->_db->query('SELECT 
                                        idliquidador_tarifario, 
                                        codigo, 
                                        descripcion, 
                                        grupo_quirurgico,
                                        suma,
                                        tarifario,
                                        anio
                                    FROM 
                                        liquidador_tarifario 
                                    WHERE 
                                        idliquidador_tarifario = "' . $Dato_Service . '";
                                    ');
        return $result->fetchall();
    }

    public function datos_de_paciente($paciente_id) {
        $result = $this->_db->query('SELECT 
                                        Fullname, 
                                        identificacion, 
                                        customerid
                                    FROM 
                                        pacientes
                                    WHERE 
                                        cancel = 0
                                    AND 
                                        id = "' . $paciente_id . '"
                                    ');
        return $result->fetchall();
    }

    public function datos_de_cliente($paciente) {
        $result = $this->_db->query('SELECT 
                                        id, 
                                        companyname
                                    FROM 
                                        company
                                    WHERE 
                                        cancel = 0
                                    AND id = (
                                            SELECT 
                                                companyid
                                            FROM 
                                                customer
                                            WHERE 
                                                cancel = 0
                                            AND 
                                                id = "' . $paciente . '");            
                                        ');
        return $result->fetchall();
    }

    public function numero_ultima_factura() {
        $result = $this->_db->query('SELECT 
                                        invoicenumber 
                                    FROM 
                                        arinvoice 
                                    ORDER BY 
                                        invoicenumber 
                                    DESC LIMIT 
                                        1;
                                    ');
        return $result->fetchall();
    }

    public function Nit_compania($datos_company) {
        $result = $this->_db->query('SELECT 
                                        federalid 
                                    FROM 
                                        company 
                                    WHERE 
                                        id = ' . $datos_company . '
                                    ORDER BY 
                                        federalid 
                                    DESC LIMIT 
                                        1;
                                    ');
        return $result->fetchall();
    }

    public function Porcentaje_convenio($paciente_id) {
        $result = $this->_db->query('SELECT 
                                        Porcentaje,
                                        Valor_Porcentaje,
                                        nombre_convenio,
                                        id
                                    FROM 
                                        convenios
                                    WHERE 
                                        cancel = 0
                                    AND id = (  SELECT 
                                                    convenioid
                                                FROM 
                                                    pacientes
                                                WHERE 
                                                    cancel = 0
                                                AND 
                                                    id = "' . $paciente_id . '");
                                    ');
        return $result->fetchall();
    }

    public function porcentaje_retefuente($retefuente) {

        $result = $this->_db->query('SELECT 
                                        tax_rate
                                    FROM 
                                        tax_rates 
                                    WHERE 
                                        tax_rates_id = ' . $retefuente . '
                                    ORDER BY 
                                        tax_rate
                                    DESC LIMIT 
                                        1;
                                    ');
        return $result->fetchall();
    }

    public function insert_arinvoice($invoicenumber, $datos_company, $federalid, $subtotal, $termPag, $FechaFac, $fechVen, $active_company, $userid, $forPag, $Total_porcentaje) {
        $date = date('Y-m-d H:i:s');
        $inserta = $this->_db->prepare("
            INSERT INTO 
                arinvoice 
            (
                invoicenumber, ponumber, wherefrom, orderid, orderbycompanyid,
                shiptocompanyid, status, customerbillcode, shipcost, invoicetotal,
                invoicetermsid, salesmanid, invoicedate, duedate, discountdate,
                discountamount, accruedinterest, datelastinterestcalc, gencompanyid, cancel,
                canceldate, canceluserid, entrydate, entryuserid, lastchangedate,
                lastchangeuserid, modo_pago, discountsalesamount, campaing_id, invoice_consignar, 
                status_apcrdrmemo, companyid, rtefte, reteid, ica, icaid, 
                nro_radicado, radicacion_date, idGlosa, tipofactura, 
                copago, cuota_moderadora, valorNeto, view_factura
            )
                        VALUES 
            (
                :invoicenumber, 
                :ponumber, 
                :wherefrom, 
                :orderid,
                :orderbycompanyid,
                :shiptocompanyid,
                :status,
                :customerbillcode,
                :shipcost,
                :invoicetotal,
                :invoicetermsid,
                :salesmanid,
                :invoicedate,
                :duedate,
                :discountdate,
                :discountamount, 
                :accruedinterest,
                :datelastinterestcalc,
                :gencompanyid,
                :cancel,
                :canceldate,
                :canceluserid,
                :entrydate,
                :entryuserid,
                :lastchangedate,
                :lastchangeuserid,
                :modo_pago, 
                :discountsalesamount, 
                :campaing_id,
                :invoice_consignar, 
                :status_apcrdrmemo,
                :companyid,
                :rtefte,
                :reteid,
                :ica,
                :icaid, 
                :nro_radicado,
                :radicacion_date, 
                :idGlosa,
                :tipofactura, 
                :copago,
                :cuota_moderadora,
                :valorNeto,
                :view_factura
            )");
        if ($inserta->execute(
                        array(
                            ':invoicenumber' => $invoicenumber,
                            ':ponumber' => '0',
                            ':wherefrom' => '21',
                            ':orderid' => '0',
                            ':orderbycompanyid' => "'" . $datos_company . "'",
                            ':shiptocompanyid' => "'" . $datos_company . "'",
                            ':status' => '1',
                            ':customerbillcode' => $federalid,
                            ':shipcost' => '0',
                            ':invoicetotal' => "'" . $subtotal . "'",
                            ':invoicetermsid' => "'" . $termPag . "'",
                            ':salesmanid' => '1',
                            ':invoicedate' => "'" . $FechaFac . "'",
                            ':duedate' => "'" . $fechVen . "'",
                            ':discountdate' => "'" . $FechaFac . "'",
                            ':discountamount' => '0',
                            ':accruedinterest' => '0',
                            ':datelastinterestcalc' => "'" . $FechaFac . "'",
                            ':gencompanyid' => "'" . $active_company . "'",
                            ':cancel' => '0',
                            ':canceldate' => '0',
                            ':canceluserid' => '0',
                            ':entrydate' => $date,
                            ':entryuserid' => "'" . $userid . "'",
                            ':lastchangedate' => $date,
                            ':lastchangeuserid' => "'" . $userid . "'",
                            ':modo_pago' => "'" . $forPag . "'",
                            ':discountsalesamount' => '0',
                            ':campaing_id' => '0',
                            ':invoice_consignar' => "'" . $subtotal . "'",
                            ':status_apcrdrmemo' => '0',
                            ':companyid' => '0',
                            ':rtefte' => '0',
                            ':reteid' => '0',
                            ':ica' => '0',
                            ':icaid' => '0',
                            ':nro_radicado' => '0',
                            ':radicacion_date' => '0',
                            ':idGlosa' => '0',
                            ':tipofactura' => '9',
                            ':copago' => '0',
                            ':cuota_moderadora' => '0',
                            ':valorNeto' => "'" . $Total_porcentaje . "'",
                            ':view_factura' => '1'
                ))) {
            //print "<p>Registro creado correctamente.</p>\n";
        } else {
            print "<p>Error al crear el registro.</p>\n";
            print_r($inserta->errorInfo());
        }
    }

    public function insert_tarif_detalle($invoiceid, $paciente_id, $id_tarifario, $anio, $opciones0, $opciones1, $opciones2, $opciones3, $Dato_Service0, $Dato_Service1, $especialista_val, $anestesiologo_val, $ayudante_val, $med_odonto_general_val, $suma_val, $Dato_Service8, $sala_val, $Dato_Service10, $materiales_val, $subtotal_val, $Dato_Service13, $userid) {
        $date = date('Y-m-d H:i:s');
        $inserta = $this->_db->prepare("
            INSERT INTO 
                liq_tarif_detalle
            (
                invoiveid, id_paciente, op_detalle, id_tarifario, anio_tarifario,
                id_tipo_cirugia, id_numero_cirugia, id_via_acceso, id_especialista, id_procedimiento,
                cups_procedimiento, especialista_val, anestesiologo_val, ayudante_val, med_odonto_general_val,
                suma_val, cups_sala, sala_val, cups_materiales, materiales_val,
                subtotal_val, porcentajes, id_producto, cantidad_producto, producto_val,
                entryuserid, entrydate, lastchangeuserid, lastchangedate, cancel,
                canceluserid, canceldate
            )
            VALUES 
            (
                :invoiveid, :id_paciente, :op_detalle, :id_tarifario, :anio_tarifario,
                :id_tipo_cirugia, :id_numero_cirugia, :id_via_acceso, :id_especialista, :id_procedimiento,
                :cups_procedimiento, :especialista_val, :anestesiologo_val, :ayudante_val, :med_odonto_general_val,
                :suma_val, :cups_sala, :sala_val, :cups_materiales, :materiales_val,
                :subtotal_val, :porcentajes, :id_producto, :cantidad_producto, :producto_val,
                :entryuserid, :entrydate, :lastchangeuserid, :lastchangedate, :cancel,
                :canceluserid, :canceldate
            )");
        if ($inserta->execute(
                        array(
                            ':invoiveid' => $invoiceid,
                            ':id_paciente' => $paciente_id,
                            ':op_detalle' => '0',
                            ':id_tarifario' => $id_tarifario,
                            ':anio_tarifario' => $anio,
                            ':id_tipo_cirugia' => $opciones0,
                            ':id_numero_cirugia' => $opciones1,
                            ':id_via_acceso' => $opciones2,
                            ':id_especialista' => $opciones3,
                            ':id_procedimiento' => $Dato_Service0,
                            ':cups_procedimiento' => $Dato_Service1,
                            ':especialista_val' => $especialista_val,
                            ':anestesiologo_val' => $anestesiologo_val,
                            ':ayudante_val' => $ayudante_val,
                            ':med_odonto_general_val' => $med_odonto_general_val,
                            ':suma_val' => $suma_val,
                            ':cups_sala' => $Dato_Service8,
                            ':sala_val' => $sala_val,
                            ':cups_materiales' => $Dato_Service10,
                            ':materiales_val' => $materiales_val,
                            ':subtotal_val' => $subtotal_val,
                            ':porcentajes' => $Dato_Service13,
                            ':id_producto' => '0',
                            ':cantidad_producto' => '0',
                            ':producto_val' => '0',
                            ':entryuserid' => $userid,
                            ':entrydate' => $date,
                            ':lastchangeuserid' => '0',
                            ':lastchangedate' => '0',
                            ':cancel' => '0',
                            ':canceluserid' => '0',
                            ':canceldate' => '0'
                ))) {
            //print "<p>Registro creado correctamente.</p>\n";
        } else {
            print "<p>Error al crear el registro.</p>\n";
            print_r($inserta->errorInfo());
        }
    }

    public function insert_arinvoicedetail($invoiceid, $lineas_fact, $S_descripcion, $priceach, $userid, $Dato_Service0, $convenio_id) {
        $date = date('Y-m-d H:i:s');
        $inserta = $this->_db->prepare("
            INSERT INTO 
                arinvoicedetail
            (
                invoiceid, linenumber, itemid, description,
                qty, qtyunitnameid, glaccountid, taxflag, priceach,
                priceunitnameid, qtyunitperpriceunit, totalprice, entrydate, entryuserid,
                lastchangedate, lastchangeuserid, idproductsdetail, idfactura, iditem,
                cancel, canceldate, canceluserid, detalleActualizado, id_Services, 
                idconvenio
            )
            VALUES 
            (
                :invoiceid, :linenumber, :itemid, :description,
                :qty, :qtyunitnameid, :glaccountid, :taxflag, :priceach,
                :priceunitnameid, :qtyunitperpriceunit, :totalprice, :entrydate, :entryuserid,
                :lastchangedate, :lastchangeuserid, :idproductsdetail, :idfactura, :iditem,
                :cancel, :canceldate, :canceluserid, :detalleActualizado, :id_Services, 
                :idconvenio
            )");
        if ($inserta->execute(
                        array(
                            ':invoiceid' => $invoiceid,
                            ':linenumber' => $lineas_fact,
                            ':itemid' => '0',
                            ':description' => $S_descripcion,
                            ':qty' => '1',
                            ':qtyunitnameid' => '0',
                            ':glaccountid' => '0',
                            ':taxflag' => '0',
                            ':priceach' => $priceach,
                            ':priceunitnameid' => '0',
                            ':qtyunitperpriceunit' => '0',
                            ':totalprice' => $priceach,
                            ':entrydate' => $date,
                            ':entryuserid' => $userid,
                            ':lastchangedate' => $date,
                            ':lastchangeuserid' => $userid,
                            ':idproductsdetail' => '0',
                            ':idfactura' => '0',
                            ':iditem' => '0',
                            ':cancel' => '0',
                            ':canceldate' => '0',
                            ':canceluserid' => '0',
                            ':detalleActualizado' => '0',
                            ':id_Services' => $Dato_Service0,
                            ':idconvenio' => $convenio_id
                ))) {
            //print "<p>Registro creado correctamente.</p>\n";
        } else {
            print "<p>Error al crear el registro.</p>\n";
            print_r($inserta->errorInfo());
        }
    }

    public function insert_liq_tarif_detalle($invoiceid, $paciente_id, $id_tarifario, $anio, $Dato_Producto0, $Dato_Producto2, $Dato_Producto3, $userid) {
        $date = date('Y-m-d H:i:s');
        $inserta = $this->_db->prepare("
            INSERT INTO 
                liq_tarif_detalle
            (
                invoiveid, id_paciente, op_detalle, id_tarifario, anio_tarifario,
                id_tipo_cirugia, id_numero_cirugia, id_via_acceso, id_especialista, id_procedimiento,
                cups_procedimiento, especialista_val, anestesiologo_val, ayudante_val, med_odonto_general_val,
                suma_val, cups_sala, sala_val, cups_materiales, materiales_val,
                subtotal_val, porcentajes, id_producto, cantidad_producto, producto_val,
                entryuserid, entrydate, lastchangeuserid, lastchangedate,cancel,
                canceluserid, canceldate
            )
            VALUES 
            (
                :invoiveid, :id_paciente, :op_detalle, :id_tarifario, :anio_tarifario,
                :id_tipo_cirugia, :id_numero_cirugia, :id_via_acceso, :id_especialista, :id_procedimiento,
                :cups_procedimiento, :especialista_val, :anestesiologo_val, :ayudante_val, :med_odonto_general_val,
                :suma_val, :cups_sala, :sala_val, :cups_materiales, :materiales_val,
                :subtotal_val, :porcentajes, :id_producto, :cantidad_producto, :producto_val,
                :entryuserid, :entrydate, :lastchangeuserid, :lastchangedate,:cancel,
                :canceluserid, :canceldate
            )");
        if ($inserta->execute(
                        array(
                            ':invoiveid' => $invoiceid,
                            ':id_paciente' => $paciente_id,
                            ':op_detalle' => '1',
                            ':id_tarifario' => $id_tarifario,
                            ':anio_tarifario' => $anio,
                            ':id_tipo_cirugia' => '0',
                            ':id_numero_cirugia' => '0',
                            ':id_via_acceso' => '0',
                            ':id_especialista' => '0',
                            ':id_procedimiento' => '0',
                            ':cups_procedimiento' => '0',
                            ':especialista_val' => '0',
                            ':anestesiologo_val' => '0',
                            ':ayudante_val' => '0',
                            ':med_odonto_general_val' => '0',
                            ':suma_val' => '0',
                            ':cups_sala' => '0',
                            ':sala_val' => '0',
                            ':cups_materiales' => '0',
                            ':materiales_val' => '0',
                            ':subtotal_val' => '0',
                            ':porcentajes' => '0',
                            ':id_producto' => $Dato_Producto0,
                            ':cantidad_producto' => $Dato_Producto2,
                            ':producto_val' => $Dato_Producto3,
                            ':entryuserid' => $userid,
                            ':entrydate' => $date,
                            ':lastchangeuserid' => '0',
                            ':lastchangedate' => '0',
                            ':cancel' => '0',
                            ':canceluserid' => '0',
                            ':canceldate' => '0'
                ))) {
            //print "<p>Registro creado correctamente.</p>\n";
        } else {
            print "<p>Error al crear el registro.</p>\n";
            print_r($inserta->errorInfo());
        }
    }

    public function id_arinvoice() {

        $result = $this->_db->query('SELECT 
                                        id 
                                    FROM 
                                        arinvoice 
                                    ORDER BY 
                                        id 
                                    DESC LIMIT 1
                                        ');
        return $result->fetchall();
    }

    public function insert_arinvoicenotes($invoiceid, $notas, $userid) {
        $date = date('Y-m-d H:i:s');
        $inserta = $this->_db->prepare("
            INSERT INTO 
                arinvoicenotes
            (
                invoiceid, note, hide, lastchangedate, lastchangeuserid
            )
            VALUES 
            (
                :invoiceid, :note, :hide, :lastchangedate, :lastchangeuserid
            )");
        if ($inserta->execute(
                        array(
                            ':invoiceid' => $invoiceid,
                            ':note' => $notas,
                            ':hide' => '0',
                            ':lastchangedate' => $date,
                            ':lastchangeuserid' => $userid
                ))) {
            //print "<p>Registro creado correctamente.</p>\n";
        } else {
            print "<p>Error al crear el registro.</p>\n";
            print_r($inserta->errorInfo());
        }
    }

    public function insert_arinvoicetaxdetail($invoiceid, $R_retefuente, $retefuente) {

        $inserta = $this->_db->prepare("
            INSERT INTO 
                arinvoicetaxdetail
            (
                invoiceid, taxid, taxamount, ica_id, monto_ica
            )
            VALUES 
            (
                :invoiceid, :taxid, :taxamount, :ica_id, :monto_ica
            )");
        if ($inserta->execute(
                        array(
                            ':invoiceid' => $invoiceid,
                            ':taxid' => $R_retefuente,
                            ':taxamount' => $retefuente,
                            ':ica_id' => '0',
                            ':monto_ica' => '0'
                ))) {
            //print "<p>Registro creado correctamente.</p>\n";
        } else {
            print "<p>Error al crear el registro.</p>\n";
            print_r($inserta->errorInfo());
        }
    }

    public function insert_arinvoicedetailp($invoiceid, $lineas_fact, $Dato_Producto0, $desproduc, $Dato_Producto2, $Dato_Producto3, $userid, $convenioid) {
        $date = date('Y-m-d H:i:s');
        $inserta = $this->_db->prepare("
            INSERT INTO 
                arinvoicedetail
            (
                invoiceid, linenumber, itemid, description,
                qty, qtyunitnameid, glaccountid, taxflag, priceach,
                priceunitnameid, qtyunitperpriceunit, totalprice, entrydate, entryuserid,
                lastchangedate, lastchangeuserid, idproductsdetail, idfactura, iditem,
                cancel, canceldate, canceluserid, detalleActualizado, id_Services, 
                idconvenio
            )
            VALUES 
            (
                :invoiceid, :linenumber, :itemid, :description,
                :qty, :qtyunitnameid, :glaccountid, :taxflag, :priceach,
                :priceunitnameid, :qtyunitperpriceunit, :totalprice, :entrydate, :entryuserid,
                :lastchangedate, :lastchangeuserid, :idproductsdetail, :idfactura, :iditem,
                :cancel, :canceldate, :canceluserid, :detalleActualizado, :id_Services, 
                :idconvenio
            )");
        if ($inserta->execute(
                        array(
                            ':invoiceid' => $invoiceid,
                            ':linenumber' => $lineas_fact,
                            ':itemid' => $Dato_Producto0,
                            ':description' => $desproduc,
                            ':qty' => $Dato_Producto2,
                            ':qtyunitnameid' => '0',
                            ':glaccountid' => '0',
                            ':taxflag' => '0',
                            ':priceach' => $Dato_Producto3,
                            ':priceunitnameid' => '0',
                            ':qtyunitperpriceunit' => '0',
                            ':totalprice' => ($Dato_Producto2 * $Dato_Producto3),
                            ':entrydate' => $date,
                            ':entryuserid' => $userid,
                            ':lastchangedate' => $date,
                            ':lastchangeuserid' => $userid,
                            ':idproductsdetail' => '0',
                            ':idfactura' => '0',
                            ':iditem' => '0',
                            ':cancel' => '0',
                            ':canceldate' => '0',
                            ':canceluserid' => '0',
                            ':detalleActualizado' => '0',
                            ':id_Services' => '0',
                            ':idconvenio' => $convenioid
                ))) {
            //print "<p>Registro creado correctamente.</p>\n";
        } else {
            print "<p>Error al crear el registro.</p>\n";
            print_r($inserta->errorInfo());
        }
    }

    public function liquidador_tarifario_s($Dato_Service) {

        $result = $this->_db->query('SELECT 
                                        idliquidador_tarifario, 
                                        codigo, 
                                        descripcion, 
                                        grupo_quirurgico,
                                        especialista,
                                        anestesiologo,
                                        ayudante,
                                        suma,
                                        tarifario,
                                        anio,
                                        unidad_liquidacion
                                    FROM 
                                        liquidador_tarifario 
                                    WHERE 
                                        idliquidador_tarifario = "' . $Dato_Service . '";
                                        ');
        return $result->fetchall();
    }

    public function Select_des($Dato_Producto) {

        $result = $this->_db->query('SELECT 
                                        catalogdescription
                                    FROM 
                                        item
                                    WHERE
                                        itemcode = "' . $Dato_Producto . '"
                                        ORDER BY catalogdescription 
                                        DESC LIMIT 1;
                                    ');
        return $result->fetchall();
    }

//*******************************************************************    
    public function getPost($id) {
//        $id = (int) $id;
//        $post = $this->_db->query("select * from posts where id = $id");
//        return $post->fetch();
    }

    public function insertarPost($titulo, $cuerpo) {
//        $this->_db->prepare("INSERT INTO posts VALUES (null, :titulo, :cuerpo)")
//                ->execute(
//                        array(
//                            ':titulo' => $titulo,
//                            ':cuerpo' => $cuerpo
//                ));
    }

    public function editarPost($id, $titulo, $cuerpo) {
//        $id = (int) $id;
//
//        $this->_db->prepare("UPDATE posts SET titulo = :titulo, cuerpo = :cuerpo WHERE id = :id")
//                ->execute(
//                        array(
//                            ':id' => $id,
//                            ':titulo' => $titulo,
//                            ':cuerpo' => $cuerpo
//                ));
    }

    public function eliminarPost($id) {
//        $id = (int) $id;
//        $this->_db->query("DELETE FROM posts WHERE id = $id");
    }

}

?>
