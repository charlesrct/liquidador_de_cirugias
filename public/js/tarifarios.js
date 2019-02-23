// Autocompletado Pacientes    
jQuery(document).ready(function(){
        jQuery("#c_paciente").autocomplete({  
            source: 'liquidador/busca_paciente/',
            select: function(event, ui) {
                var id=(ui.item.value);      	
                var dato = id.split("::");
            }
        });
    });
    
//Autocompletar Procedimiento
jQuery(function(){
    jQuery('#c_procedimiento').keypress(function() {
        var idtarifario = jQuery('#c_tarifario').val();
        jQuery("#c_procedimiento").autocomplete({  
            source: 'liquidador/busca_procedimiento/?idtarifario='+idtarifario,
            select: function(event, ui) {
                var id=(ui.item.value);      	
                var dato = id.split("::");
            }
        });
    });
    
    jQuery('#c_via_acceso').change(function() {
        var c_via_acceso=jQuery('#c_via_acceso').val();
        if(jQuery('#c_tipo_qx').val() != 2){
            if(c_via_acceso==1){
                jQuery('#c_tipo_qx').val(1);
                jQuery('#c_n_cirugia').val(1);
                jQuery('#especialista').val(1);
                jQuery('#ver_tipo_qx').css("display", "none"); 
                jQuery('#c_tipo_qx').css("display", "none"); 
            }else{
                jQuery('#ver_tipo_qx').css("display", "block"); 
                jQuery('#c_tipo_qx').css("display", "block"); 
            }
        }
    });
    
    jQuery('#c_tipo_qx').change(function() {
        if(jQuery('#c_tipo_qx').val() == 2){
            jQuery('#ver_titulo_cirugia1').css("display", "block"); 
            jQuery('#ver_c_n_cirugia1').css("display", "block");
        }else{
            jQuery('#ver_titulo_cirugia1').css("display", "none"); 
            jQuery('#ver_c_n_cirugia1').css("display", "none");
        }
    });
    
    jQuery('#c_tarifario').change(function() {
        var tarifario=jQuery('#c_tarifario').val();
        //alert(tarifario);
        if(tarifario==1){
            jQuery('#anual_titulo').show();
            jQuery('#anual_select').show();
        }
        else{
            jQuery('#anual_titulo').hide();
            jQuery('#anual_select').hide();
        }
    });
});
    
function BuscarServicios(){
    var Buscar_Productos = jQuery('#Buscar_Productos').val();
    if(Buscar_Productos != ""){
        var convenioid = jQuery('#convenioid').val();
        jQuery.ajax({
            url: 'liquidador/buscar_productos/', 
            type: 'GET',
            //cache: false,
            //dataType: 'json',
            data: ({
                actionID: 'Buscar_Productos',
                Dato:Buscar_Productos,
                convenioid:convenioid
            }),                
            beforeSend: function(){
                jQuery("#resultado_datos1").html("Cargando..."); //Muestra mensaje mientras se ejecuta el proceso.
            },
            //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
            success: function(data){
                jQuery('#resultado_datos1').html("");
                jQuery('#busca_productos').html(data);
                                                                                                                                                                                                                        							
            }/*data*/
        });
    }else{
        jQuery("#mostrar_guarda").css("display", "none");
        jQuery("#mostrar_guarda1").css("display", "none");
        jQuery('#c_n_cirugia').val('1');
                                                                                                                                                                                                
        var c_paciente=jQuery('#c_paciente').val();
        var c_tarifario=jQuery('#c_tarifario').val();
        var c_anual=jQuery('#c_anual').val();
        var procedimiento=jQuery('#c_procedimiento').val();
        var idprocedimiento=procedimiento.split(':::');
        var tcirugia=jQuery('#c_tipo_qx').val();
        var ocacion=jQuery('#c_n_cirugia').val();    
        var c_via_acceso=jQuery('#c_via_acceso').val();
        var especialista=jQuery('#especialista').val();
        var anio = "";
        var tarifario = "";
        //Validacion de campos
        if(c_paciente==""){
            alert("Completa el campo paciente");
            jQuery('#c_paciente').focus();
            return;
        }
        var temporal = c_paciente.split('::');
        if(!jQuery.trim(temporal[1])){
            alert("DEBE SELECCIONAR UN PACIENTE");
            return;
        }
        if(c_tarifario==-1){
            alert("Selecciona un Tarifario");
            jQuery('#c_tarifario').focus();
            return;
        }
        if(c_tarifario==1 && c_anual==-1){
            alert("Selecciona un a�o para el tarifario SOAT");
            jQuery('#c_anual').focus();
            return;
        }
        if(procedimiento==""){
            alert("Completa el campo procedimiento");
            jQuery('#c_procedimiento').focus();
            return;
        }
        if(c_via_acceso==-1){
            alert("Selecciona la Via de Acceso");
            jQuery('#c_via_acceso').focus();
            return;
        }
        if(tcirugia==-1){
            alert("Selecciona el Tipo de Cirugia");
            jQuery('#c_tipo_qx').focus();
            return;
        }
        if(ocacion==-1){
            alert("Selecciona el Numero de Cirugia");
            jQuery('#c_n_cirugia').focus();
            return;
        }
        if(especialista==-1){
            alert("Selecciona el especialista");
            jQuery('#especialista').focus();
            return;
        }
                                
        //validando unica via.
        if (c_via_acceso==1 && tcirugia == 1  ){
            if(ocacion != 1 || especialista != 1){
                alert("\t Para un Procedimiento con Unica Via de Acceso SOLO APLICA -\" Primera Vez y Mismo Especialista \"- ");
                jQuery('#c_n_cirugia').val('1');
                jQuery('#especialista').val('1');
            }
        }                                                                                                                                        
        //Validando si el proceso es bilateral:
        if(tcirugia==1){
            if (ocacion==3 ){
                alert("\t Opcion invalida: \n\n Para un Procedimiento Bilateral NO APLICA -\" Tercera vez \"- \n\n\t Seleccione de nuevo. ");
                jQuery('#c_n_cirugia').focus().val('-1');
                return;
            }
            if (c_via_acceso!=1){
                if (c_via_acceso!=2){
                    alert("\t Opcion invalida: \n\n Para un Procedimiento Bilateral SOLO APLICA -\" Misma Via \"- ");
                    jQuery('#c_via_acceso').focus().val('2');
                    return;
                }
            }
            if (especialista!=1){
                alert("\t Opcion invalida: \n\n Para el Procedimiento seleccionado SOLO APLICA -\" Mismo Especialista \"- ");
                jQuery('#especialista').focus().val('1');
                return;
            }
        }

        //Validando si el proceso es Multiple:      
        if(tcirugia==2){
            if (c_via_acceso==2){
                alert("\t Opcion invalida: \n\n Para un Procedimiento Multiple NO APLICA -\" Misma Via \"- \n\n\t Seleccione de nuevo. ");
                jQuery('#c_via_acceso').focus().val('-1');
                return;
            }
        }
                                                                                                                                                        
        if(c_tarifario==1){
            anio = "TODOS";
            tarifario = "SOAT";
        }
        if(c_tarifario==2){
            anio = "2001";
            tarifario = "ISS";
        }
        if(c_tarifario==3){
            anio = "2004";
            tarifario = "ISS";
        }                                                                    	                                    	
        jQuery.ajax({
            url: 'liquidador/tabla_procedimiento/', 
            type: 'GET',
            //cache: false,
            //dataType: 'json',
            data: ({
                Dato:idprocedimiento[1],
                Tarifario:tarifario,
                anio:anio
            //op_liquida:tcirugia+';'+ocacion+';'+c_via_acceso+';'+especialista
            }),                
            beforeSend: function(){
                jQuery("#resultado_datos").html("Cargando..."); //Muestra mensaje mientras se ejecuta el proceso.
            },
            //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
            success: function(data){
                jQuery('#resultado_datos').html("");
                jQuery('#Div_Servicos').html(data);
                                                                                                                                                                                                                        							
            }/*data*/
        });
    }
}
    
function Add_Service(){
    $("#muestra_liquidar").css('display', 'block');
    var Index      = $('#Index').val();
    var c_tarifario=$('#c_tarifario').val();
    var anio_smlv  = $('#c_anual').val();
    var tcirugia=$('#c_tipo_qx').val();
    var ocacion=$('#c_n_cirugia').val();    
    var c_via_acceso=$('#c_via_acceso').val();
    var especialista=$('#especialista').val();
    var paciente_id = $('#c_paciente').val();
    var anio = "";
    var tarifario = "";
                                                                                                                                                                        
    if(c_tarifario==1){
        anio = "TODOS";
        tarifario = "SOAT";
    }
    if(c_tarifario==2){
        anio = "2001";
        tarifario = "ISS";
    }
    if(c_tarifario==3){
        anio = "2004";
        tarifario = "ISS";
    }
                                                                                                                                                                                                                        		
    for(i=0;i<Index;i++){
                                                                                                                                                                                                                        			
        if($('#Valido_'+i).is(':checked')){/*if($('#Valido_'+i).is(':checked'))*/
            var Services_id  = $('#Services_id_'+i).val();
            var Sala_id      = $('#Sala_id_'+i).val();
            var Materiales_id = $('#Materiales_id_'+i).val();
            var subtotal_u = $('#subtotal_u_'+i).val();
            var especialista_2004 = $('#especialista_'+i).val();
            var med_odonto_general = $('#med_odonto_general_'+i).val();
                                                                                                                                                                                                                        					
            var Cadena     = ','+Services_id+'**'+Sala_id+'**'+Materiales_id+'**'+subtotal_u+'**'+especialista_2004+'**'+med_odonto_general;
            var op_liquida = '**'+tcirugia+'**'+ocacion+'**'+c_via_acceso+'**'+especialista;
                                                                                                                                                                                                                        					
            $('#Aray').val($('#Aray').val()+Cadena+op_liquida);
                                                                                                                                                                                                                        					
        }/*if($('#Valido_'+i).is(':checked'))*/
    }/*FIn for*/
    /*########################################################*/	
    var Aray = $('#Aray').val();
    //ORDENANDO EL ARRAY
    var Aray_Ordenado = $('#Aray').val();
                                                                                                                                                    
    //alert(Aray);
                                                                                                                                                    
    //alert(Aray_Ordenado);
                                                                                                                                                    
    $.ajax({
        url: 'liquidador/adicionar_procedimiento/', 
        //url: 'pg_liquida_cirugia.html.php', 
        type: 'GET',
        //cache: false,
        //dataType: 'json',
        data: ({
            actionID: 'Listar',
            Dato:Aray,
            Tarifario:tarifario,
            anio:anio,              //Año para UVR tarifarios ISS
            anio_smlv:anio_smlv,     //Año para SMLV tarifario SOAT    
            paciente_id:paciente_id
        }),
        beforeSend: function(){
            $("#resultado_datos").html("Adicionando..."); //Muestra mensaje mientras se ejecuta el proceso.
        },
        //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
        success: function(data){
            $("#resultado_datos").html(" ");
            $('#Buscar_Serv').val('');
            $('#Div_Servicos').html('');
            $('#Div_Lista').html(data);
                                                                                                                                                                                                                        								
        }/*data*/
    });                                                                                                                                                                                		
}
    
function Add_Producto(){

    var Index_p = $('#Index_p').val();
                                                                                                                                                                        
    for(i=0;i<Index_p;i++){
                                                                                                                                                                                                                        			
        if($('#Valido_Prod_'+i).is(':checked')){/*if($('#Valido_'+i).is(':checked'))*/
            var Productos_id  = $('#Productos_id_'+i).val();
            var Productos_code = $('#Productos_code_'+i).val();
            var Productos_descrip = $('#Productos_descrip_'+i).val();
            var cantidad_prod = $('#cantidad_prod_'+i).val();
            var valor_up = $('#valor_up_'+i).val();
            var valor_totalp = $('#valor_totalp_'+i).val();
                                
            if(!$.trim(cantidad_prod)){
                alert('Ingrese la cantidad de productos ...');
                $('#cantidad_prod_'+i).val("");
                $('#cantidad_prod_'+i).focus();
                return false;
            }

            if(cantidad_prod == ""){ 
                alert('Ingrese la cantidad de productos ...');
                $('#cantidad_prod_'+i).val("");
                $('#cantidad_prod_'+i).focus();
                return false;
            }
                                
            if(cantidad_prod == 0){ 
                alert('La cantidad de productos debe ser mayor a 0 ...');
                $('#cantidad_prod_'+i).val("");
                $('#cantidad_prod_'+i).focus();
                return false;
            }
                                                                                                                                                                                                                        					
            var Cadena_p     = '###'+Productos_id+'**'+Productos_code+'**'+Productos_descrip+'**'+cantidad_prod+'**'+valor_up+'**'+valor_totalp;
                            
            $('#Aray_p').val($('#Aray_p').val()+Cadena_p);
                                                                                                                                                                                                                        					
        }/*if($('#Valido_'+i).is(':checked'))*/
    }/*FIn for*/
    /*########################################################*/	
    var Aray_p = $('#Aray_p').val();
    $.ajax({
        url: 'liquidador/listar_productos/', 
        type: 'GET',
        //cache: false,
        //dataType: 'json',
        data: ({
            actionID: 'listar_productos',
            Dato_p:Aray_p
        }),
        beforeSend: function(){
            $("#resultado_datos1").html("Adicionando..."); //Muestra mensaje mientras se ejecuta el proceso.
        },
        //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
        success: function(data){                    
            $('#resultado_datos1').html("");
            $('#busca_productos').html("");
            $('#agega_productos').html(data);
                                                                                                                                                                                                                        								
        }/*data*/
    });                                                                                                                                                                                		
}
    
function Selecionar_Todo(OP){
    if(OP==0){
        if($('#ID_Todos').is(':checked')){
            $('.All').attr('checked',true);
            var Index  = $('#Index').val();
            for(i=0;i<Index;i++){
                Valida_Exite(i);	
            }
        }else{
            $('.All').attr('checked',false);
        }
    }else if(OP==1){
                                                                                                                                                                                                                        			
        if($('#ID_Todos_eli').is(':checked')){
                                                                                                                                                                                                                        			
            $('.All_eli').attr('checked',true);
                                                                                                                                                                                                                        			
        }else{
            $('.All_eli').attr('checked',false);
        }
    }else if(OP==2){
        if($('#ID_Todos_delete').is(':checked')){
                                                                                                                                                                                                                        			
            $('.delete').attr('checked',true);
                                                                                                                                                                                                                        			
        }else{
            $('.delete').attr('checked',false);
        }
    }else if(OP==3){
        if($('#ID_Todos_p').is(':checked')){
            $('.Product').attr('checked',true);
            var Index_p  = $('#Index_p').val();
            for(i=0;i<Index_p;i++){
                Valida_Exite_p(i);	
            }
        }
        else{
            $('.Product').attr('checked',false);
        }
    }else if(OP==4){
        if($('#ID_Todos_p_del').is(':checked')){
                                                                                                                                                                                                                       			
            $('.Eliminar_prod').attr('checked',true);
                                                                                                                                                                                                                        			
        }else{
            $('.Eliminar_prod').attr('checked',false);
        }
    }
}
    
function Liquidar(){
    var conta_multiples = $('#conta_multiples').val();
    var c_n_cirugia1 = $('#c_n_cirugia1').val();
    if (conta_multiples > 0 && c_n_cirugia1 == 0){
        $('#c_n_cirugia1').focus();
        alert('Debe seleccionar la cantidad de procedimientos multiples a liquidar');
        return;
    }
    if (conta_multiples < c_n_cirugia1){
        alert('Falta agregar procedimientos Multiples...\n Agregados = '
            + conta_multiples + '\n No. Procedimientos = '+c_n_cirugia1 + '\n Procedimientos a agregar = '
            + eval(c_n_cirugia1-conta_multiples));
        return;
    } 
    if (conta_multiples > c_n_cirugia1){
        alert('La cantidad de procedimientos Multiples es mayor a los indicados... \n Agregados = '
            + conta_multiples + '\n No. Procedimientos = '+c_n_cirugia1 + '\n Procedimientos a eliminar = '
            + eval(conta_multiples-c_n_cirugia1));
        return;
    }
    $("#liquidado").val("si"); //Variable de control para guardar la liquidacion si todo ok
    var Index      = $('#Index_2').val();
    var c_tarifario=$('#c_tarifario').val();
    var anio_smlv  = $('#c_anual').val();
    var paciente   = $('#c_paciente').val(); //Nombre:::id
    var ajuste     = 49;
                                                                                                                                
    if(c_tarifario==1){
        anio = "TODOS";
        tarifario = "SOAT";
    }
    if(c_tarifario==2){
        anio = "2001";
        tarifario = "ISS";
    }
    if(c_tarifario==3){
        anio = "2004";
        tarifario = "ISS";
    }
    var Total_pesos = 0 ; //eval($('#subtotal_pesos_1').val());
    if (!$.trim(Total_pesos)){
        alert("Debe Seleccionar Procedimientos para Liquidar.");
        $("#liquidado").val("no");
        return;
    }
                                
    for(i=1;i<Index;i++){     //Se liquida a partir del 2do item, el primero se deja al 100%
                                                                                                                                                                                                                        			
        var Services_id  = $('#Servis_id_'+i).val();
        var grupo_quirurgico = $('#grupo_quirurgico_'+i).val();
        var anio_soat = $('#anio_soat_'+i).val();
        var especialista = $('#especialista_'+i).val();
        var anestesiologo = $('#anestesiologo_'+i).val();
        var ayudante = $('#ayudante_'+i).val();
        var med_odonto_general = $('#med_odonto_general_'+i).val();
        var pesos_suma = $('#pesos_suma_'+i).val();
        var op_liquida = $('#op_liquida_'+i).val();
        var Sala_id      = $('#Sala_id_'+i).val();
        var sala_suma = $('#sala_suma_'+i).val();
        var Materiales_id = $('#Materiales_id_'+i).val();
        var material_suma = $('#material_suma_'+i).val();
        var subtotal_pesos = $('#subtotal_pesos_'+i).val();
        var subtotal_u = $('#subtotal_u_'+i).val();
        var porcent_especialista = 0;
        var porcent_anestesiologo = 0;
        var porcent_ayudante = 0;
        var porcent_pesos_suma = 0;
        var porcent_sala_suma = 0;
        var porcent_material_suma = 0;

        var new_op_liquida = op_liquida.split(';');
                                    
        if( new_op_liquida[2] == 1 && new_op_liquida[0]==1 && i == 1){
            //var Total_pesos = eval($('#subtotal_pesos_1').val());
            porcent_especialista = 100;
            porcent_anestesiologo = 100;
            porcent_ayudante = 100;
            porcent_pesos_suma = 100;
            porcent_sala_suma = 100;
            porcent_material_suma = 100;
            Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                subtotal_pesos,Total_pesos,med_odonto_general);
            alert("Procedimiento No. "+i+" liquidado al 100%, Por ser el de mayor valor");
            //porcent_especialista;porcent_anestesiologo;porcent_ayudante;porcent_pesos_suma;porcent_sala_suma;porcent_material_suma;
            $("#porcentajes_"+i).val("100:::100:::100:::100:::100:::100");
        }else if(new_op_liquida[0]!=1 && i == 1){
            //var Total_pesos = eval($('#subtotal_pesos_1').val());
            porcent_especialista = 100;
            porcent_anestesiologo = 100;
            porcent_ayudante = 100;
            porcent_pesos_suma = 100;
            porcent_sala_suma = 100;
            porcent_material_suma = 100;
            Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                subtotal_pesos,Total_pesos,med_odonto_general);
            alert("Procedimiento No. "+i+" liquidado al 100%, Por ser el de mayor valor");
        //porcent_especialista;porcent_anestesiologo;porcent_ayudante;porcent_pesos_suma;porcent_sala_suma;porcent_material_suma;
        //$("#porcentajes_"+i).val("100:::100:::100:::100:::100:::100");
        }else{
            //***********************************************************************************************************************************************************************************************************
            //VAlidando: Tipo de cirug�a PROCEDIMIENTO BILATERAL 
            //new_op_liquida[0] == "1">Bilatera
            if(new_op_liquida[0]==1){
                //VAlidando: Numero de cirugia 
                //new_op_liquida[1] = "1">Primera Vez
                if(new_op_liquida[1]==1){
                    //VAlidando: Via de Acceso
                    //new_op_liquida[2] = "1">Unica via
                    if(new_op_liquida[2] == 1){
                        //VAlidando: Especialista
                        //new_op_liquida[3] = "1">Mismo Especialista
                        if(new_op_liquida[3] == 1){
                            //Procedimiento 100%, sala 100%, materiales 100%
                            porcent_especialista = 100;
                            porcent_anestesiologo = 100;
                            porcent_ayudante = 100;
                            porcent_pesos_suma = 100;
                            porcent_sala_suma = 100;
                            porcent_material_suma = 100;
                            Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                subtotal_pesos,Total_pesos,med_odonto_general);
                            alert("Procedimiento No. "+i+" liquidado al 100%, Verificar condiciones");
                        //Total_pesos = Total_pesos + eval($('#subtotal_pesos_'+i).val());
                        //porcent_especialista;porcent_anestesiologo;porcent_ayudante;porcent_pesos_suma;porcent_sala_suma;porcent_material_suma;
                        //$("#porcentajes_"+i).val("100:::100:::100:::100:::100:::100");
                        }//fin Mismo Especialista
                    }//fin Misma Via
                }//fin Primera Vez
                //VAlidando: Numero de cirugia 
                //new_op_liquida[1] = "1">Primera Vez
                if(new_op_liquida[1]==1){
                    //VAlidando: Via de Acceso
                    //new_op_liquida[2] = "2">Misma Via
                    if(new_op_liquida[2] == 2){
                        //VAlidando: Especialista
                        //new_op_liquida[3] = "1">Mismo Especialista
                        if(new_op_liquida[3] == 1){
                            //Validando tarifario ISS
                            if(tarifario == "ISS"){
                                //Procedimiento 175%, sala 175%, materiales 175%
                                alert("Procedimiento Bilateral No. "+i+" liquidado 175%, sala 175%, materiales 175%");
                                porcent_especialista = 175;
                                porcent_anestesiologo = 175;
                                porcent_ayudante = 175;
                                porcent_pesos_suma = 175;
                                porcent_sala_suma = 175;
                                porcent_material_suma = 175;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //Validando tarifario SOAT
                            if(tarifario == "SOAT"){
                                //Procedimiento 175%, sala 150%, materiales 175%
                                alert("Procedimiento Bilateral No. "+i+" liquidado 175%, sala 150%, materiales 175%");
                                porcent_especialista = 175;
                                porcent_anestesiologo = 175;
                                porcent_ayudante = 175;
                                porcent_pesos_suma = 175;
                                porcent_sala_suma = 150;
                                porcent_material_suma = 175;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                        }//fin Mismo Especialista
                    }//fin Misma Via
                }//fin Primera Vez
                //VAlidando: Numero de cirugia 
                //new_op_liquida[1] = "2">Segunda Vez
                if(new_op_liquida[1]==2){
                    //VAlidando: Via de Acceso
                    //new_op_liquida[2] = "2">Misma Via
                    if(new_op_liquida[2] == 2){
                        //VAlidando: Especialista
                        //new_op_liquida[3] = "1">Mismo Especialista
                        if(new_op_liquida[3] == 1){
                            //Validando tarifario ISS
                            if(tarifario == "ISS"){
                                //Procedimiento 75%, sala 75%, materiales 75%
                                alert("Procedimiento No. "+i+" liquidado Procedimiento 75%, sala 75%, materiales 75%");
                                porcent_especialista = 75;
                                porcent_anestesiologo = 75;
                                porcent_ayudante = 75;
                                porcent_pesos_suma = 75;
                                porcent_sala_suma = 75;
                                porcent_material_suma = 75;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //Validando tarifario SOAT
                            if(tarifario == "SOAT"){
                                //Procedimiento 75%, sala 50%, materiales 75%
                                alert("Procedimiento No. "+i+" liquidado Procedimiento 75%, sala 50%, materiales 75%");
                                porcent_especialista = 75;
                                porcent_anestesiologo = 75;
                                porcent_ayudante = 75;
                                porcent_pesos_suma = 75;
                                porcent_sala_suma = 50;
                                porcent_material_suma = 75;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                        }//fin Mismo Especialista
                    }//fin Misma Via
                }//fin Segunda Vez
                                                                                                        
            }//FIN Tipo de cirug�a PROCEDIMIENTO BILATERAL 
            //***********************************************************************************************************************************************************************************************************
            //VAlidando:  Tipo de cirug�a PROCEDIMIENTO MULTIPLE 
            //new_op_liquida[0] == "2">Multiple
            else if(new_op_liquida[0]==2){
                                                                                                        
                //VAlidando: Numero de cirugia 
                //new_op_liquida[1] = "1">Primera Vez
                if(new_op_liquida[1]==1){
                    //VAlidando: Via de Acceso
                    //new_op_liquida[2] == "1">Unica Via
                    if(new_op_liquida[2] == 1){
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "1">Mismo Especialista
                        if(new_op_liquida[3] == 1){
                            //Procedimiento 100%, sala 100%, materiales 100%
                            porcent_especialista = 100;
                            porcent_anestesiologo = 100;
                            porcent_ayudante = 100;
                            porcent_pesos_suma = 100;
                            porcent_sala_suma = 100;
                            porcent_material_suma = 100;
                            Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                subtotal_pesos,Total_pesos,med_odonto_general);
                            alert("Procedimiento No. "+i+" Liquidado al 100%, Verificar condiciones");
                        //Total_pesos = Total_pesos + eval($('#subtotal_pesos_'+i).val());
                        //porcent_especialista;porcent_anestesiologo;porcent_ayudante;porcent_pesos_suma;porcent_sala_suma;porcent_material_suma;
                        //$("#porcentajes_"+i).val("100:::100:::100:::100:::100:::100");
                        }//fin Mismo Especialista
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "2">Diferente Especialista
                        if(new_op_liquida[3] == 2){
                            //VAlidando: Tarifario SOAT
                            if(tarifario == "SOAT"){
                                //CIRUJANO 100%, ANESTESIOLOGO 75%, AYUDANTE 50%, SALA 50%, MATERIALES 0%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 100%, ANESTESIOLOGO 75%, AYUDANTE 50%, SALA 50%, MATERIALES 0%");
                                porcent_especialista = 100;
                                porcent_anestesiologo = 75;
                                porcent_ayudante = 50;
                                porcent_pesos_suma = 0;
                                porcent_sala_suma = 50;
                                porcent_material_suma = 0;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //VAlidando: Tarifario ISS
                            if(tarifario == "ISS"){
                                //VAlidando: Tarifario ISS 2001
                                if(anio == "2001"){
                                    //CIRUJANO 100%, ANESTESIOLOGO 75%, AYUDANTE 50%, SALA 100%, MATERIALES 100%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 100%, ANESTESIOLOGO 75%, AYUDANTE 50%, SALA 100%, MATERIALES 100%");
                                    porcent_especialista = 100;
                                    porcent_anestesiologo = 75;
                                    porcent_ayudante = 50;
                                    porcent_pesos_suma = 0;
                                    porcent_sala_suma = 100;
                                    porcent_material_suma = 100;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                                //VAlidando: Tarifario ISS 2004
                                if(anio == "2004"){
                                    //CIRUJANO 100%, ANESTESIOLOGO 100%, AYUDANTE 100%, SALA 100%, MATERIALES 100%
                                    porcent_especialista = 100;
                                    porcent_anestesiologo = 100;
                                    porcent_ayudante = 100;
                                    porcent_pesos_suma = 100;
                                    porcent_sala_suma = 100;
                                    porcent_material_suma = 100;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                    alert("Procedimiento No. "+i+" PROCEDIMIENTO LIQUIDADO AL 100%, verifique condiciones");
                                //Total_pesos = Total_pesos + eval($('#subtotal_pesos_'+i).val());
                                //porcent_especialista;porcent_anestesiologo;porcent_ayudante;porcent_pesos_suma;porcent_sala_suma;porcent_material_suma;
                                //$("#porcentajes_"+i).val("100:::100:::100:::100:::100:::100");
                                }
                            }
                        }//fin Diferente Especialista
                    }//fin Unica Via
                    //VAlidando: Via de Acceso
                    //new_op_liquida[2] == "3">Diferente Via
                    if(new_op_liquida[2] == 3){
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "1">Mismo Especialista 
                        if(new_op_liquida[3] == 1){
                            //Procedimiento 100%, sala 100%, materiales 100%
                            porcent_especialista = 100;
                            porcent_anestesiologo = 100;
                            porcent_ayudante = 100;
                            porcent_pesos_suma = 100;
                            porcent_sala_suma = 100;
                            porcent_material_suma = 100;
                            Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                subtotal_pesos,Total_pesos,med_odonto_general);
                            alert("Procedimiento No. "+i+" Liquidado al 100%, Verificar condiciones");
                        //Total_pesos = Total_pesos + eval($('#subtotal_pesos_'+i).val());
                        //porcent_especialista;porcent_anestesiologo;porcent_ayudante;porcent_pesos_suma;porcent_sala_suma;porcent_material_suma;
                        //$("#porcentajes_"+i).val("100:::100:::100:::100:::100:::100");
                        }//fin Mismo Especialista 
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "2">Diferente Especialista
                        if(new_op_liquida[3] == 2){
                            //VAlidando: Tarifario SOAT
                            if(tarifario == "SOAT"){
                                //CIRUJANO 100%, ANESTESIOLOGO 75%, AYUDANTE 50%, SALA 50%, MATERIALES 75%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 100%, ANESTESIOLOGO 75%, AYUDANTE 50%, SALA 50%, MATERIALES 75%");
                                porcent_especialista = 100;
                                porcent_anestesiologo = 75;
                                porcent_ayudante = 50;
                                porcent_pesos_suma = 0;
                                porcent_sala_suma = 50;
                                porcent_material_suma = 75;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //VAlidando: Tarifario ISS
                            if(tarifario == "ISS"){
                                //VAlidando: Tarifario ISS 2001
                                if(anio == "2001"){
                                    //CIRUJANO 100%, ANESTESIOLOGO 75%, AYUDANTE 50%, SALA 100%, MATERIALES 100%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 100%, ANESTESIOLOGO 75%, AYUDANTE 50%, SALA 100%, MATERIALES 100%");
                                    porcent_especialista = 100;
                                    porcent_anestesiologo = 75;
                                    porcent_ayudante = 50;
                                    porcent_pesos_suma = 0;
                                    porcent_sala_suma = 100;
                                    porcent_material_suma = 100;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                                //VAlidando: Tarifario ISS 2004
                                if(anio == "2004"){
                                    //CIRUJANO 100%, ANESTESIOLOGO 100%, AYUDANTE 100%, SALA 100%, MATERIALES 100%
                                    porcent_especialista = 100;
                                    porcent_anestesiologo = 100;
                                    porcent_ayudante = 100;
                                    porcent_pesos_suma = 100;
                                    porcent_sala_suma = 100;
                                    porcent_material_suma = 100;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                    alert("Procedimiento No. "+i+" Liquidado al 100% Verifiar condiciones");
                                //Total_pesos = Total_pesos + eval($('#subtotal_pesos_'+i).val());
                                //porcent_especialista;porcent_anestesiologo;porcent_ayudante;porcent_pesos_suma;porcent_sala_suma;porcent_material_suma;
                                //$("#porcentajes_"+i).val("100:::100:::100:::100:::100:::100");
                                }
                            }
                        }//fin Diferente Especialista
                    }//fin Diferente Via
                }//Primera Vez
                //VAlidando: Numero de cirugia 
                //new_op_liquida[1] = "2">Segunda Vez
                if(new_op_liquida[1]==2){
                    //validadno: Via de Acceso
                    //new_op_liquida[2] == "1">Unica Via
                    if(new_op_liquida[2] == 1){
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "1">Mismo Especialista 
                        if(new_op_liquida[3] == 1){
                            //VAlidando: Tarifario SOAT
                            if(tarifario == "SOAT"){
                                //CIRUJANO 50%, ANESTESIOLOGO 50%, AYUDANTE 50%, SALA 0%, MATERIALES 0%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 50%, ANESTESIOLOGO 50%, AYUDANTE 50%, SALA 0%, MATERIALES 0%");
                                porcent_especialista = 50;
                                porcent_anestesiologo = 50;
                                porcent_ayudante = 50;
                                porcent_pesos_suma = 0;
                                porcent_sala_suma = 0;
                                porcent_material_suma = 0;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //VAlidando: Tarifario ISS
                            if(tarifario == "ISS"){
                                //VAlidando: Tarifario ISS 2001
                                if(anio == "2001"){
                                    //CIRUJANO 60%, ANESTESIOLOGO 60%, AYUDANTE 60%, SALA 50%, MATERIALES 50%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 60%, ANESTESIOLOGO 60%, AYUDANTE 60%, SALA 50%, MATERIALES 50%");
                                    porcent_especialista = 60;
                                    porcent_anestesiologo = 60;
                                    porcent_ayudante = 60;
                                    porcent_pesos_suma = 60;
                                    porcent_sala_suma = 50;
                                    porcent_material_suma = 50;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                                //VAlidando: Tarifario ISS 2004
                                if(anio == "2004"){
                                    //CIRUJANO 55%, ANESTESIOLOGO 55%, AYUDANTE 55%, SALA 55%, MATERIALES 50%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 55%, ANESTESIOLOGO 55%, AYUDANTE 55%, SALA 55%, MATERIALES 50%");
                                    porcent_especialista = 55;
                                    porcent_anestesiologo = 55;
                                    porcent_ayudante = 55;
                                    porcent_pesos_suma = 55;
                                    porcent_sala_suma = 55;
                                    porcent_material_suma = 50;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                            }
                        }//fin Mismo Especialista 
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "2">Diferente Especialista
                        if(new_op_liquida[3] == 2){
                            //VAlidando: Tarifario SOAT
                            if(tarifario == "SOAT"){
                                //CIRUJANO 50%, ANESTESIOLOGO 75%, AYUDANTE 0%, SALA 50%, MATERIALES 0%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 50%, ANESTESIOLOGO 75%, AYUDANTE 0%, SALA 50%, MATERIALES 0%");
                                porcent_especialista = 50;
                                porcent_anestesiologo = 75;
                                porcent_ayudante = 0;
                                porcent_pesos_suma = 0;
                                porcent_sala_suma = 50;
                                porcent_material_suma = 0;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //VAlidando: Tarifario ISS
                            if(tarifario == "ISS"){
                                //VAlidando: Tarifario ISS 2001
                                if(anio == "2001"){
                                    //CIRUJANO 60%, ANESTESIOLOGO 0%, AYUDANTE 0%, SALA 50%, MATERIALES 50%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 60%, ANESTESIOLOGO 0%, AYUDANTE 0%, SALA 50%, MATERIALES 50%");
                                    porcent_especialista = 60;
                                    porcent_anestesiologo = 0;
                                    porcent_ayudante = 0;
                                    porcent_pesos_suma = 0;
                                    porcent_sala_suma = 50;
                                    porcent_material_suma = 50;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                                //VAlidando: Tarifario ISS 2004
                                if(anio == "2004"){
                                    //CIRUJANO 40%, ANESTESIOLOGO 40%, AYUDANTE 40%, SALA 40%, MATERIALES 50%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 40%, ANESTESIOLOGO 40%, AYUDANTE 40%, SALA 40%, MATERIALES 50%");
                                    porcent_especialista = 40;
                                    porcent_anestesiologo = 40;
                                    porcent_ayudante = 40;
                                    porcent_pesos_suma = 40;
                                    porcent_sala_suma = 40;
                                    porcent_material_suma = 50;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                            }
                        }//fin Diferente Especialista
                    }//fin Unica Via
                    //validadno: Via de Acceso
                    //new_op_liquida[2] == "3">Diferente Via
                    if(new_op_liquida[2] == 3){
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "1">Mismo Especialista 
                        if(new_op_liquida[3] == 1){
                            //VAlidando: Tarifario SOAT
                            if(tarifario == "SOAT"){
                                //CIRUJANO 75%, ANESTESIOLOGO 75%, AYUDANTE 75%, SALA 50%, MATERIALES 75%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 75%, ANESTESIOLOGO 75%, AYUDANTE 75%, SALA 50%, MATERIALES 75%");
                                porcent_especialista = 75;
                                porcent_anestesiologo = 75;
                                porcent_ayudante = 75;
                                porcent_pesos_suma = 75;
                                porcent_sala_suma = 50;
                                porcent_material_suma = 75;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //VAlidando: Tarifario ISS
                            if(tarifario == "ISS"){
                                //VAlidando: Tarifario ISS 2001
                                if(anio == "2001"){
                                    //CIRUJANO 75%, ANESTESIOLOGO 75%, AYUDANTE 75%, SALA 50%, MATERIALES 50%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 75%, ANESTESIOLOGO 75%, AYUDANTE 75%, SALA 50%, MATERIALES 50%");
                                    porcent_especialista = 75;
                                    porcent_anestesiologo = 75;
                                    porcent_ayudante = 75;
                                    porcent_pesos_suma = 75;
                                    porcent_sala_suma = 50;
                                    porcent_material_suma = 50;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                                //VAlidando: Tarifario ISS 2004
                                if(anio == "2004"){
                                    //CIRUJANO 65%, ANESTESIOLOGO 65%, AYUDANTE 65%, SALA 65%, MATERIALES 50%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 65%, ANESTESIOLOGO 65%, AYUDANTE 65%, SALA 65%, MATERIALES 50%");
                                    porcent_especialista = 65;
                                    porcent_anestesiologo = 65;
                                    porcent_ayudante = 65;
                                    porcent_pesos_suma = 65;
                                    porcent_sala_suma = 65;
                                    porcent_material_suma = 50;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                            }
                        }//Fin mismo especiliasta
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "2">Diferente Especialista
                        if(new_op_liquida[3] == 2){
                            //VAlidando: Tarifario SOAT
                            if(tarifario == "SOAT"){
                                //CIRUJANO 50%, ANESTESIOLOGO 75%, AYUDANTE 0%, SALA 50%, MATERIALES 75%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 50%, ANESTESIOLOGO 75%, AYUDANTE 0%, SALA 50%, MATERIALES 75%");
                                porcent_especialista = 50;
                                porcent_anestesiologo = 75;
                                porcent_ayudante = 0;
                                porcent_pesos_suma = 0;
                                porcent_sala_suma = 50;
                                porcent_material_suma = 75;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //VAlidando: Tarifario ISS
                            if(tarifario == "ISS"){
                                //VAlidando: Tarifario ISS 2001
                                if(anio == "2001"){
                                    //CIRUJANO 60%, ANESTESIOLOGO 0%, AYUDANTE 0%, SALA 50%, MATERIALES 50%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 60%, ANESTESIOLOGO 0%, AYUDANTE 0%, SALA 50%, MATERIALES 50%");
                                    porcent_especialista = 60;
                                    porcent_anestesiologo = 0;
                                    porcent_ayudante = 0;
                                    porcent_pesos_suma = 0;
                                    porcent_sala_suma = 50;
                                    porcent_material_suma = 50;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                                //VAlidando: Tarifario ISS 2004
                                if(anio == "2004"){
                                    //CIRUJANO 40%, ANESTESIOLOGO 40%, AYUDANTE 40%, SALA 40%, MATERIALES 50%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 40%, ANESTESIOLOGO 40%, AYUDANTE 40%, SALA 40%, MATERIALES 50%");
                                    porcent_especialista = 40;
                                    porcent_anestesiologo = 40;
                                    porcent_ayudante = 40;
                                    porcent_pesos_suma = 40;
                                    porcent_sala_suma = 40;
                                    porcent_material_suma = 50;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                            }
                        }//Fin diferente especialista
                    }//Fin Diferente Via
                }//FIN Segunda Vez
                //VAlidando: Numero de cirugia 
                //new_op_liquida[1] = "3">Tercera Vez
                if(new_op_liquida[1]==3){
                    //validadno: Via de Acceso
                    //new_op_liquida[2] == "1">Unica Via
                    if(new_op_liquida[2] == 1){
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "1">Mismo Especialista 
                        if(new_op_liquida[3] == 1){
                            //VAlidando: Tarifario SOAT
                            if(tarifario == "SOAT"){
                                //CIRUJANO 50%, ANESTESIOLOGO 50%, AYUDANTE 50%, SALA 0%, MATERIALES 0%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 50%, ANESTESIOLOGO 50%, AYUDANTE 50%, SALA 0%, MATERIALES 0%");
                                porcent_especialista = 50;
                                porcent_anestesiologo = 50;
                                porcent_ayudante = 50;
                                porcent_pesos_suma = 50;
                                porcent_sala_suma = 0;
                                porcent_material_suma = 0;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //VAlidando: Tarifario ISS
                            if(tarifario == "ISS"){
                                //VAlidando: Tarifario ISS 2001
                                if(anio == "2001"){
                                    //CIRUJANO 0%, ANESTESIOLOGO 0%, AYUDANTE 0%, SALA 0%, MATERIALES 0%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 0%, ANESTESIOLOGO 0%, AYUDANTE 0%, SALA 0%, MATERIALES 0%");
                                    porcent_especialista = 0;
                                    porcent_anestesiologo = 0;
                                    porcent_ayudante = 0;
                                    porcent_pesos_suma = 0;
                                    porcent_sala_suma = 0;
                                    porcent_material_suma = 0;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                                //VAlidando: Tarifario ISS 2004
                                if(anio == "2004"){
                                    //CIRUJANO 55%, ANESTESIOLOGO 55%, AYUDANTE 55%, SALA 55%, MATERIALES 0%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 55%, ANESTESIOLOGO 55%, AYUDANTE 55%, SALA 55%, MATERIALES 0%");
                                    porcent_especialista = 55;
                                    porcent_anestesiologo = 55;
                                    porcent_ayudante = 55;
                                    porcent_pesos_suma = 55;
                                    porcent_sala_suma = 55;
                                    porcent_material_suma = 0;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                            }
                        }//fin Mismo Especialista 
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "2">Diferente Especialista
                        if(new_op_liquida[3] == 2){
                            //VAlidando: Tarifario SOAT
                            if(tarifario == "SOAT"){
                                //CIRUJANO 50%, ANESTESIOLOGO 75%, AYUDANTE 0%, SALA 50%, MATERIALES 0%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 50%, ANESTESIOLOGO 75%, AYUDANTE 0%, SALA 50%, MATERIALES 0%");
                                porcent_especialista = 50;
                                porcent_anestesiologo = 75;
                                porcent_ayudante = 0;
                                porcent_pesos_suma = 0;
                                porcent_sala_suma = 50;
                                porcent_material_suma = 0;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //VAlidando: Tarifario ISS
                            if(tarifario == "ISS"){
                                //CIRUJANO 40%, ANESTESIOLOGO 40%, AYUDANTE 40%, SALA 40%, MATERIALES 0%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 40%, ANESTESIOLOGO 40%, AYUDANTE 40%, SALA 40%, MATERIALES 0%");
                                porcent_especialista = 40;
                                porcent_anestesiologo = 40;
                                porcent_ayudante = 40;
                                porcent_pesos_suma = 40;
                                porcent_sala_suma = 40;
                                porcent_material_suma = 0;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                        }//fin Diferente Especialista
                    }//fin Unica Via
                    //validadno: Via de Acceso
                    //new_op_liquida[2] == "3">Diferente Via
                    if(new_op_liquida[2] == 3){
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "1">Mismo Especialista 
                        if(new_op_liquida[3] == 1){
                            //VAlidando: Tarifario SOAT
                            if(tarifario == "SOAT"){
                                //CIRUJANO 75%, ANESTESIOLOGO 75%, AYUDANTE 75%, SALA 50%, MATERIALES 75%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 75%, ANESTESIOLOGO 75%, AYUDANTE 75%, SALA 50%, MATERIALES 75%");
                                porcent_especialista = 75;
                                porcent_anestesiologo = 75;
                                porcent_ayudante = 75;
                                porcent_pesos_suma = 75;
                                porcent_sala_suma = 50;
                                porcent_material_suma = 75;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //VAlidando: Tarifario ISS
                            if(tarifario == "ISS"){
                                //VAlidando: Tarifario ISS 2001
                                if(anio == "2001"){
                                    //CIRUJANO 75%, ANESTESIOLOGO 75%, AYUDANTE 75%, SALA 50%, MATERIALES 50%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 75%, ANESTESIOLOGO 75%, AYUDANTE 75%, SALA 50%, MATERIALES 50%");
                                    porcent_especialista = 75;
                                    porcent_anestesiologo = 75;
                                    porcent_ayudante = 75;
                                    porcent_pesos_suma = 75;
                                    porcent_sala_suma = 50;
                                    porcent_material_suma = 50;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                                //VAlidando: Tarifario ISS 2004
                                if(anio == "2004"){
                                    //CIRUJANO 65%, ANESTESIOLOGO 65%, AYUDANTE 65%, SALA 65%, MATERIALES 0%
                                    alert("Procedimiento No. "+i+" liquidado CIRUJANO 65%, ANESTESIOLOGO 65%, AYUDANTE 65%, SALA 65%, MATERIALES 0%");
                                    porcent_especialista = 65;
                                    porcent_anestesiologo = 65;
                                    porcent_ayudante = 65;
                                    porcent_pesos_suma = 65;
                                    porcent_sala_suma = 65;
                                    porcent_material_suma = 0;
                                    Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                        porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                        subtotal_pesos,Total_pesos,med_odonto_general);
                                }
                            }
                        }//Fin mismo especiliasta
                        //VAlidando: Especialista
                        //new_op_liquida[3] == "2">Diferente Especialista
                        if(new_op_liquida[3] == 2){
                            //VAlidando: Tarifario SOAT
                            if(tarifario == "SOAT"){
                                //CIRUJANO 50%, ANESTESIOLOGO 75%, AYUDANTE 0%, SALA 50%, MATERIALES 75%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 50%, ANESTESIOLOGO 75%, AYUDANTE 0%, SALA 50%, MATERIALES 75%");
                                porcent_especialista = 50;
                                porcent_anestesiologo = 75;
                                porcent_ayudante = 0;
                                porcent_pesos_suma = 0;
                                porcent_sala_suma = 50;
                                porcent_material_suma = 75;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                            //VAlidando: Tarifario ISS
                            if(tarifario == "ISS"){
                                //CIRUJANO 40%, ANESTESIOLOGO 40%, AYUDANTE 40%, SALA 40%, MATERIALES 0%
                                alert("Procedimiento No. "+i+" liquidado CIRUJANO 40%, ANESTESIOLOGO 40%, AYUDANTE 40%, SALA 40%, MATERIALES 0%");
                                porcent_especialista = 40;
                                porcent_anestesiologo = 40;
                                porcent_ayudante = 40;
                                porcent_pesos_suma = 40;
                                porcent_sala_suma = 40;
                                porcent_material_suma = 0;
                                Total_pesos = actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,
                                    porcent_ayudante,pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,
                                    subtotal_pesos,Total_pesos,med_odonto_general);
                            }
                        }//Fin diferente especialista
                    }//Fin Diferente Via
                }//fin Tercera Vez
            }//fin Tipo de cirug�a PROCEDIMIENTO MULTIPLE 
            else{
                alert("Procedimiento No. "+i+" ..:: NO PUDO SER LIQUIDADO ::.. ELIMINELO DE LA LISTA Y VERIFIQUE LAS CONDICIONES");
                $("#liquidado").val("no");
            }
        }/*FIn for*/
                                
    }//Fin del if que evalua primer procedimiento
    //Redondeamos el resultado final y le agregamos el signo pesos.
                                    
    Total_pesos = Math.round((Total_pesos+ajuste)/100)*100;
    $("#cel_Total").html("$"+formato_numero(Total_pesos,0,'',','));
    $("#Total").val(Total_pesos);
    if($("#liquidado").val()=="si"){
        //$("#mostrar_guarda").css("display", "block"); 
        //$("#mostrar_guarda1").css("display", "block");
        $("#muestra_liquidar").css('display', 'none');
    }else{
        $("#mostrar_guarda").css("display", "none"); 
        $("#mostrar_guarda1").css("display", "none"); 
    }

                                                                                                            

/*########################################################*/	
//                $("#cel_especialista_"+i).html("$");
//                $("#especialista_"+i).html();
//                                
//                $("#cel_anestesiologo_"+i).html("$");
//                $("#anestesiologo_"+i).html();
//
//                $("#cel_ayudante_"+i).html("$");
//                $("#ayudante_"+i).html();
//
//                $("#cel_pesos_suma_"+i).html("$");
//                $("#pesos_suma_"+i).html();
//                                
//                $("#cel_sala_suma_"+i).html("$");
//                $("#sala_suma_"+i).html();
//
//                $("#cel_material_suma_"+i).html("$");
//                $("#material_suma_"+i).html();
//                                
//                $("#cel_SubTotal_"+i).html("$");
//                $("#SubTotal_"+i).html();
//
//                $("#cel_Total").html("$");
//                $("#Total").html();

//    **********  TABLA DE LIQUIDACION PARA ISS Y SOAT      **********
//TIPO DE CIRUGIA	        VEZ     VIA DE ACCESO   ESPECIALISTA	    TARIFARIO	A�O  SERV PROF ESPECIAL	PROCEDI	SALA	MATERIALES
//PROCEDIMIENTO BILATERAL	PRIMERA	MISMA VIA	MISMO ESPECIALISTA	TODOS	TODOS	TODOS	UNO	100	100	100
//PROCEDIMIENTO BILATERAL	SEGUNDA	MISMA VIA	MISMO ESPECIALISTA	ISS	TODOS	TODOS	UNO	75	75	75
//PROCEDIMIENTO BILATERAL	SEGUNDA	MISMA VIA	MISMO ESPECIALISTA	SOAT	TODOS	TODOS	UNO	75	50	75
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	MISMO ESPECIALISTA	TODOS	TODOS	TODOS	UNO	100	100	100
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	MISMO ESPECIALISTA	SOAT	TODOS	TODOS	UNO	50	0	0
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	MISMO ESPECIALISTA	ISS	2001	TODOS	UNO	60	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	MISMO ESPECIALISTA	ISS	2004	TODOS	UNO	55	55	50
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	MISMO ESPECIALISTA	SOAT	TODOS	TODOS	UNO	50	0	0
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	MISMO ESPECIALISTA	ISS	2001	TODOS	UNO	0	0	0
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	MISMO ESPECIALISTA	ISS	2004	TODOS	UNO	55	55	0
//PROCEDIMIENTO MULTIPLE	PRIMERA	DIFERENTE VIA	MISMO ESPECIALISTA	TODOS	TODOS	TODOS	UNO	100	100	100
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	MISMO ESPECIALISTA	SOAT	TODOS	TODOS	UNO	75	50	75
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	MISMO ESPECIALISTA	ISS	2001	TODOS	UNO	75	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	MISMO ESPECIALISTA	ISS	2004	TODOS	UNO	65	65	50
//PROCEDIMIENTO MULTIPLE	TERCERA	DIFERENTE VIA	MISMO ESPECIALISTA	SOAT	TODOS	TODOS	UNO	75	50	75
//PROCEDIMIENTO MULTIPLE	TERCERA	DIFERENTE VIA	MISMO ESPECIALISTA	ISS	2001	TODOS	UNO	75	50	50
//PROCEDIMIENTO MULTIPLE	TERCERA	DIFERENTE VIA	MISMO ESPECIALISTA	ISS	2004	TODOS	UNO	65	65	0
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	CIRUJANO	UNO	100	50	0
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	ANESTESIOLOGO	UNO	75	50	0
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	AYUDANTE	UNO	50	50	0
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2001	CIRUJANO	UNO	100	100	100
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2001	ANESTESIOLOGO	UNO	75	100	100
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2001	AYUDANTE	UNO	50	100	100
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2004	CIRUJANO	UNO	100	100	100
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2004	ANESTESIOLOGO	UNO	100	100	100
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2004	AYUDANTE	UNO	100	100	100
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	CIRUJANO	UNO	50	50	0
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	ANESTESIOLOGO	UNO	75	50	0
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	AYUDANTE	UNO	0	50	0
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2001	CIRUJANO	UNO	60	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2001	ANESTESIOLOGO	UNO	0	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2001	AYUDANTE	UNO	0	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2004	TODOS	UNO	40	40	50
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	CIRUJANO	UNO	50	50	0
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	ANESTESIOLOGO	UNO	75	50	0
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	AYUDANTE	UNO	0	50	0
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	TODOS	TODOS	UNO	40	40	0
//PROCEDIMIENTO MULTIPLE	PRIMERA	UNICA VIA	DIFERENTE ESPECIALISTA	TODOS	TODOS	TODOS	DOS	100	100	100
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	CIRUJANO	DOS	50	50	0
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	ANESTESIOLOGO	DOS	75	50	0
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	AYUDANTE	DOS	0	50	0
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2001	CIRUJANO	DOS	60	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2001	ANESTESIOLOGO	DOS	0	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2001	AYUDANTE	DOS	0	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	2004	TODOS	DOS	40	40	50
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	CIRUJANO	DOS	50	50	0
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	ANESTESIOLOGO	DOS	75	50	0
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	AYUDANTE	DOS	0	50	0
//PROCEDIMIENTO MULTIPLE	TERCERA	UNICA VIA	DIFERENTE ESPECIALISTA	ISS	TODOS	TODOS	DOS	40	40	0
//PROCEDIMIENTO MULTIPLE	PRIMERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	CIRUJANO	UNO	100	50	75
//PROCEDIMIENTO MULTIPLE	PRIMERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	ANESTESIOLOGO	UNO	75	50	75
//PROCEDIMIENTO MULTIPLE	PRIMERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	AYUDANTE	UNO	50	50	75
//PROCEDIMIENTO MULTIPLE	PRIMERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2001	CIRUJANO	UNO	100	100	100
//PROCEDIMIENTO MULTIPLE	PRIMERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2001	ANESTESIOLOGO	UNO	75	100	100
//PROCEDIMIENTO MULTIPLE	PRIMERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2001	AYUDANTE	UNO	50	100	100
//PROCEDIMIENTO MULTIPLE	PRIMERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2004	TODOS	UNO	100	100	100
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	CIRUJANO	UNO	50	50	75
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	ANESTESIOLOGO	UNO	75	50	75
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	AYUDANTE	UNO	0	50	75
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2001	CIRUJANO	UNO	60	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2001	ANESTESIOLOGO	UNO	0	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2001	AYUDANTE	UNO	0	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2004	TODOS	UNO	40	40	50
//PROCEDIMIENTO MULTIPLE	TERCERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	CIRUJANO	UNO	50	50	75
//PROCEDIMIENTO MULTIPLE	TERCERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	ANESTESIOLOGO	UNO	75	50	75
//PROCEDIMIENTO MULTIPLE	TERCERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	AYUDANTE	UNO	0	50	75
//PROCEDIMIENTO MULTIPLE	PRIMERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	TODOS	TODOS	TODOS	DOS	100	100	100
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	CIRUJANO	DOS	50	50	75
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	ANESTESIOLOGO	DOS	75	50	75
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	AYUDANTE	DOS	0	50	75
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2001	CIRUJANO	DOS	60	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2001	ANESTESIOLOGO	DOS	0	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2001	AYUDANTE	DOS	0	50	50
//PROCEDIMIENTO MULTIPLE	SEGUNDA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	2004	TODOS	DOS	40	40	50
//PROCEDIMIENTO MULTIPLE	TERCERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	CIRUJANO	DOS	50	50	75
//PROCEDIMIENTO MULTIPLE	TERCERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	ANESTESIOLOGO	DOS	75	50	75
//PROCEDIMIENTO MULTIPLE	TERCERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	SOAT	TODOS	AYUDANTE	DOS	0	50	75
//PROCEDIMIENTO MULTIPLE	TERCERA	DIFERENTE VIA	DIFERENTE ESPECIALISTA	ISS	TODOS	TODOS	DOS	40	40	0                                                                                                                                   		
                                                                                    
}//FIN DE LA FUNCION liquidar()
    
function actualiza_liquidar(i,especialista,porcent_especialista,anestesiologo,porcent_anestesiologo,ayudante,porcent_ayudante,
    pesos_suma,porcent_pesos_suma,sala_suma,porcent_sala_suma,material_suma,porcent_material_suma,subtotal_pesos,Total_pesos,med_odonto_general){
    var ajuste = 49;
    //Especialista% y redondeado a la centana
    especialista = eval(especialista * porcent_especialista / 100);
    especialista = Math.round((especialista+ajuste)/100)*100;
    $("#cel_especialista_"+i).html("$"+especialista);
    $("#especialista_"+i).val(especialista);
                                                
    //med_odonto_general% y redondeado a la centana, Se liquida con el mismo % del especialista
    med_odonto_general = eval(med_odonto_general * porcent_especialista / 100);
    med_odonto_general = Math.round((med_odonto_general+ajuste)/100)*100;
    $("#cel_med_odonto_general_"+i).html("$"+med_odonto_general);
    $("#med_odonto_general_"+i).val(med_odonto_general);
                                                
    //anestesiologo% y redondeado a la centana
    anestesiologo = eval(anestesiologo * porcent_anestesiologo / 100);
    anestesiologo = Math.round((anestesiologo+ajuste)/100)*100;
    $("#cel_anestesiologo_"+i).html("$"+anestesiologo);
    $("#anestesiologo_"+i).val(anestesiologo);

    //ayudante% y redondeado a la centana
    ayudante = eval(ayudante * porcent_ayudante / 100);
    ayudante = Math.round((ayudante+ajuste)/100)*100;
    $("#cel_ayudante_"+i).html("$"+ayudante);
    $("#ayudante_"+i).val(ayudante);

    if(eval(especialista+anestesiologo+ayudante+med_odonto_general)==0){
        var promedio = 0;
        //pesos_suma% y redondeado a la centana
        if(porcent_pesos_suma == 0){
            if(porcent_especialista != 0){
                promedio++;
            }
            if(porcent_anestesiologo != 0){
                promedio++;
            }
            if(porcent_ayudante != 0){
                promedio++;
            }
            if(med_odonto_general!= 0){
                promedio=1;
                porcent_anestesiologo = 0; //ISS 2004 NO LIQUIDA % ANESTESIOLOGO NI AYUDANTE
                porcent_ayudante = 0;
            }
            porcent_pesos_suma = eval((porcent_especialista+porcent_anestesiologo+porcent_ayudante)/promedio)
        }
        pesos_suma = eval(pesos_suma * porcent_pesos_suma / 100);
        pesos_suma = Math.round((pesos_suma+ajuste)/100)*100;
    }else{
        pesos_suma = eval(especialista+anestesiologo+ayudante+med_odonto_general);
        //pesos_suma = eval(pesos_suma * porcent_pesos_suma / 100);
        pesos_suma = Math.round((pesos_suma+ajuste)/100)*100;
    }
    $("#cel_pesos_suma_"+i).html("$"+pesos_suma);
    $("#pesos_suma_"+i).val(pesos_suma);

    //sala% y redondeado a la centana
    sala_suma = eval(sala_suma * porcent_sala_suma / 100);
    sala_suma = Math.round((sala_suma+ajuste)/100)*100;
    $("#cel_sala_suma_"+i).html("$"+sala_suma);
    $("#sala_suma_"+i).val(sala_suma);

    //material al 75% y redondeado a la centana
    material_suma = eval(material_suma * porcent_material_suma / 100);
    material_suma = Math.round((material_suma+ajuste)/100)*100;
    $("#cel_material_suma_"+i).html("$"+material_suma);
    $("#material_suma_"+i).val(material_suma);
                                
    //Guarda los porcentajes aplicados a cada caso.
    $("#porcentajes_"+i).val(porcent_especialista+":::"+porcent_anestesiologo+":::"+porcent_ayudante+":::"+
        porcent_pesos_suma+":::"+porcent_sala_suma+":::"+porcent_material_suma);

    subtotal_pesos = eval(pesos_suma+sala_suma+material_suma);
    $("#cel_SubTotal_"+i).html("$"+formato_numero(subtotal_pesos,0,'',','));
    $("#SubTotal_"+i).val(subtotal_pesos);

    Total_pesos = eval(Total_pesos + subtotal_pesos);
    return Total_pesos;
}
    
function formato_numero(numero, decimales, separador_decimal, separador_miles){ // v2007-08-06
    numero=parseFloat(numero);
    if(isNaN(numero)){
        return "";
    }
    if(decimales!==undefined){
        numero=numero.toFixed(decimales);	// Redondeamos
    }
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ","); // Convertimos el punto en separador_decimal
    if(separador_miles){
        var miles=new RegExp("(-?[0-9]+)([0-9]{3})"); // A�adimos los separadores de miles
        while(miles.test(numero)) {
            numero=numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }
    return numero;
}	// formato_numero()
    
function factura_condiciones(){
    if($('#ok_fecha').val() === "NO"){
        alert('VERIFICAR LAS FECHAS DE VIGENCIA PARA EL CONVENIO DEL PACIENTE SELECCIONADO... ');
        $("#error_fecha").css("display", "block");
        return;
    }
                                    
    if($('#ok_facturar').val() === "NO"){
        alert('VERIFICAR EL TARIFARIO PARA EL CONVENIO DEL PACIENTE SELECCIONADO... ');
        $("#error_tarifario").css("display", "block");
        return;
    }
    $("#mostrar_condiciones").css("display", "block");
    $("#ocultar_liquida").css("display", "none");
    $("#mostrar_guarda").css("display", "none");
    $("#mostrar_guarda1").css("display", "none");
}
    
function Valida_Exite(i){
                                                                                                                                                                                                                        	
    var Cadena = jQuery('#Aray').val();
    var Datos  = jQuery('#Cadena').val(); 
    if(!jQuery.trim(Datos)){
        if(jQuery('#Valido_'+i).is(':checked')){
            var id   = jQuery('#Services_id_'+i).val();
                                                                                                                                                                                                                        					
            $.ajax({
                url: 'liquidador/Valida_Existe/', 
                type: 'GET',
                //cache: false,
                dataType: 'json',
                data: ({
                    actionID: 'Valida_Existe',
                    Dato:Cadena,
                    Services_id:id
                }),
                //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
                success: function(data){
                    if(data.val=='TRUE'){
                        alert('Uno de los Servicios Selecionados ya esta en La Lista... ');
                        $('#Valido_'+i).attr('checked',false);
                    }
                                                                                                                                                                                                                        											
                }/*data*/
            });
        }
    }else{
        if($('#Valido_'+i).is(':checked')){
            var id   = $('#Services_id_'+i).val();
                                                                                                                                                                                                                        					
            $.ajax({
                url: 'liquidador/Valida_Existe_2/', 
                type: 'GET',
                //cache: false,
                dataType: 'json',
                data: ({
                    actionID: 'Valida_Existe_2',
                    Datos:Datos,
                    Cadena:Cadena,
                    Services_id:id
                }),
                //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
                success: function(data){
                    if(data.val=='TRUE'){
                        alert('Uno de los Servicios Selecionados ya esta en La Lista... ');
                        $('#Valido_'+i).attr('checked',false);
                    }
                                                                                                                                                                                                                        											
                }/*data*/
            });
        }
    }
}
    
function SelectTextCampo(ID)
{
    
    jQuery('#'+ID).focus();
    jQuery('#'+ID).select();
    
//document.getElementById(ID).focus(); 
//document.getElementById(ID).select();
}
    
function Elimina(){
    $("#mostrar_guarda").css("display", "none");
    $("#mostrar_guarda1").css("display", "none");
    $("#muestra_liquidar").css('display', 'block');
    var Index = $('#Index_2').val();
    var c_tarifario=$('#c_tarifario').val();
    var anio_smlv  = $('#c_anual').val();
    var anio = "";
    var tarifario = "";
                                                                            
    if(c_tarifario==1){
        anio = "TODOS";
        tarifario = "SOAT";
    }
    if(c_tarifario==2){
        anio = "2001";
        tarifario = "ISS";
    }
    if(c_tarifario==3){
        anio = "2004";
        tarifario = "ISS";
    }
    $('#Cadena').val('');
    for(i=1;i<Index;i++){
        if($('#Eliminar_'+i).is(':checked')==false){

            var Services_id  = $('#Servis_id_'+i).val();
            var Sala_id      = $('#Sala_id_'+i).val();
            var Materiales_id = $('#Matariales_id_'+i).val();
            var subtotal_u = $('#subtotal_u_'+i).val();
            var especialista_2004 = $('#especialista_'+i).val();
            var med_odonto_general = $('#med_odonto_general_'+i).val();
            var op_liquida = $('#op_liquida_'+i).val();                    
            var new_op_liquida = op_liquida.split(';');
            var op_liquida = '**'+new_op_liquida[0]+'**'+new_op_liquida[1]+'**'+new_op_liquida[2]+'**'+new_op_liquida[3]; 
            //             = '**'+tcirugia         +'**'+ocacion          +'**'+c_via_acceso     +'**'+especialista;
            var Cadena  = ','+Services_id+'**'+Sala_id+'**'+Materiales_id+'**'+subtotal_u+'**'+especialista_2004+'**'+med_odonto_general;

            $('#Cadena').val($('#Cadena').val()+Cadena+op_liquida);
        }
    }/*Fin For*/
    var Aray = $('#Cadena').val();
    $('#Aray').val(Aray);
    $.ajax({
        url: 'liquidador/adicionar_procedimiento/', 
        type: 'GET',
        //cache: false,
        //dataType: 'json',
        data: ({
            actionID: 'Listar',
            Dato:Aray,
            Tarifario:tarifario,
            anio:anio,              //A�o para UVR tarifarios ISS
            anio_smlv:anio_smlv     //A�o para SMLV tarifario SOAT
        }),
        //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
        beforeSend: function(){
            $("#resultado_datos").html("Eliminando..."); //Muestra mensaje mientras se ejecuta el proceso.
        },
        //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
        success: function(data){
            $('#resultado_datos').html("");
            $('#Div_Servicos').html('');
            $('#Div_Lista').html(data);
                                                                                                                                                                                                                        								
        }/*data*/
    });
}
    
function Valida_Exite_p(i){
                                                                                                                                                                                                            	
    var Cadena = $('#Aray_p').val();
    if($('#Valido_Prod_'+i).is(':checked')){
        var id   = $('#Productos_id_'+i).val();

        $.ajax({
            url: 'liquidador/Valida_Existe_Producto/', 
            type: 'GET',
            //cache: false,
            dataType: 'json',
            data: ({
                actionID: 'Valida_Existe_Producto',
                Dato:Cadena,
                Services_id:id
            }),
            //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
            success: function(data){
                if(data.val=='TRUE'){
                    alert('Uno de los Productos Selecionados ya esta en La Lista... ');
                    $('#Valido_Prod_'+i).attr('checked',false);
                    $('#cantidad_prod_'+i).val("");
                }
                                                                                                                                                                                                                        											
            }/*data*/
        });
    }
}
    
function Calculo_Precio(i){
    var cantidad_prod = $('#cantidad_prod_'+i).val();
    if($('#Valido_Prod_'+i).is(':checked')){/*if($('#Valido_'+i).is(':checked'))*/
        var valor_u = parseInt($('#valor_up_'+i).val());
        var valor_total = 0;

        if(!$.trim(cantidad_prod)){
            //alert('Ingrese la cantidad de productos ...');
            $('#cantidad_prod_'+i).val("");
            $('#Valido_Prod_'+i).attr('checked', false);
            //$('#cantidad_prod_'+i).focus();
            //setTimeout('document.getElementById("cantidad_prod_'+i+'").focus()',75); 
            return false;
        }

        if(cantidad_prod == ""){ 
            //alert('Ingrese la cantidad de productos ...');
            $('#cantidad_prod_'+i).val("");
            $('#Valido_Prod_'+i).attr('checked', false);
            //$('#cantidad_prod_'+i).focus();
            //setTimeout('document.getElementById("cantidad_prod_'+i+'").focus()',75);
                
            return false;
        }
                                
        if(cantidad_prod == 0){ 
            alert('La cantidad de productos debe ser mayor a 0 ...');
            $('#cantidad_prod_'+i).val("");
            $('#cantidad_prod_'+i).focus();
            setTimeout('document.getElementById("cantidad_prod_'+i+'").focus()',75);
            return false;
        }

        if(cantidad_prod != 0){
            //alert ("Cantidad: "+cantidad_prod);
            //alert ("valor_u: "+valor_u);
            valor_total = eval(valor_u * cantidad_prod);
            //alert ("valor_total: "+valor_total);

            $('#valor_totalp_'+i).val(valor_total);
            $('#valor_totalp_cell_'+i).html("$"+formato_numero(valor_total,0,'.',','));
        }
    }else{
        if(!$.trim(cantidad_prod)){
            $('#Valido_Prod_'+i).attr('checked', false);
            $('#cantidad_prod_'+i).val("");
        }else if(cantidad_prod == 0){
            $('#Valido_Prod_'+i).attr('checked', false)
            $('#cantidad_prod_'+i).val("");
        }else{
            $('#Valido_Prod_'+i).attr('checked', true);
            Valida_Exite_p(i);
        }
    }//fin if
}
    
function SoloNumeros(field) {
                                                                                                                                                                                                                        	
    var valid = "0123456789."
    var temp;
    for (var i=0; i<field.value.length; i++) {
        temp = "" + field.value.substring(i, i+1);
        if (valid.indexOf(temp) == "-1") {
            field.value=(field.value.substring(0,i)+(field.value.substring(i+1,field.value.length)));
            i--
        }
    }
}
    
function Elimina_p(){
    var Index = $('#Index_lista_p').val();
    $('#Aray_p').val(0);
    for(i=1;i<Index;i++){
        if($('#Eliminar_prod_'+i).is(':checked')==false){
            var Productos_id  = $('#Lista_P_id_'+i).val();
            var Productos_code = $('#Lista_P_code_'+i).val();
            var Productos_descrip = $('#Lista_P_descrip_'+i).val();
            var cantidad_prod = $('#Lista_P_cantidad_'+i).val();
            var valor_up = $('#lista_valor_up_'+i).val();
            var valor_totalp = $('#lista_valor_totalp_'+i).val();
                                                                                                                                                                                                                        					
            var Cadena_p     = '###'+Productos_id+'**'+Productos_code+'**'+Productos_descrip+'**'+cantidad_prod+'**'+valor_up+'**'+valor_totalp;
                            
            $('#Aray_p').val($('#Aray_p').val()+Cadena_p);
                                                                                                                                                                                                                        					
        }/*if($('#Valido_'+i).is(':checked'))*/
    }/*FIn for*/
    /*########################################################*/	
    var Aray_p = $('#Aray_p').val();
    $.ajax({
        url: 'liquidador/listar_productos/', 
        type: 'GET',
        //cache: false,
        //dataType: 'json',
        data: ({
            actionID: 'listar_productos',
            Dato_p:Aray_p
        }),
        beforeSend: function(){
            $("#resultado_datos1").html("Eliminando..."); //Muestra mensaje mientras se ejecuta el proceso.
        },
        //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
        success: function(data){                    
            $('#resultado_datos1').html("");
            $('#busca_productos').html("");
            $('#agega_productos').html(data);
                                                                                                                                                                                                                        								
        }/*data*/
    });
}
    
function factura_Liquida(){
                                        
    var fechaFac = $("#FechaFac").val();
    var termPag1= $("#termPag").val();
    var termPag = termPag1.split('-');
    if(termPag[0] == "xx"){
        alert("Debe seleccionar terminos de pago");
        $('#termPag').focus();
        return 0;
    }
    var fechVen = $("#fechVen").val();
    //desc =(document.getElementById("desc").value);
    var desc = 0;
    var retefuente = $("#retefuente").val();
    if(retefuente == "xx"){
        alert("Debe seleccionar terminos retefuetne");
        $('#retefuente').focus();
        return 0;
    }
    //ica = (document.getElementById("ica").value);
    var ica =0;
    var forPag = $("#forPag").val();
    if(forPag == "xx"){
        alert("Debe seleccionar forma de pago");
        $('#forPag').focus();
        return 0;
    }
    var notas = $("#notas").val();
    if(notas == ""){
        notas = "&nbsp;"
    }
                                        
    jConfirm('DESEA GENERAR LA FACTURA DE LA LIQUIDACION?...', 'CONFIRMACION', function(r) {
        if(r==true){
            $("#oculta_generar").css("display", "none");
            $("#Busca_product").css('display', 'none');
            $("#elimina_productos").css('display', 'none');
            var id_paciente = $('#c_paciente').val();
            var id_tarifario = $('#c_tarifario').val();
            var anio = $('#c_anual').val();
            var Index = $('#Index_2').val();
            var Total = $('#Total').val();
                                            
            if(id_tarifario==1){
                id_tarifario = "SOAT";
            }
            if(id_tarifario==2){
                anio = "2001";
                id_tarifario = "ISS";
            }
            if(id_tarifario==3){
                anio = "2004";
                id_tarifario = "ISS";
            }
            //CREANDO VECTOR PARA CADA SERVICIO LIQUIDADO.
            for(i=1;i<Index;i++){
                var id_procedimiento    = $('#Servis_id_'+i).val();
                var cups_procedimiento  = $('#cups_procedimiento_'+i).val();
                var especialista_val    = $('#especialista_'+i).val();
                var anestesiologo_val   = $('#anestesiologo_'+i).val();
                var ayudante_val        = $('#ayudante_'+i).val();
                var med_odonto_general_val = $('#med_odonto_general_'+i).val();
                var suma_val            = $('#pesos_suma_'+i).val();
                var op_liquida          = $('#op_liquida_'+i).val();
                var Sala_id             = $('#Sala_id_'+i).val(); //enviar id para optener el cups de la sala
                var sala_val            = $('#sala_suma_'+i).val();
                var Materiales_id       = $('#Materiales_id_'+i).val(); //enviar id para optener el cups de los materiales
                var materiales_val      = $('#material_suma_'+i).val();
                var SubTotal            = $('#SubTotal_'+i).val();
                var porcentajes         = $('#porcentajes_'+i).val();
                            
                var Cadena = ','+id_procedimiento+'**'+cups_procedimiento+'**'+especialista_val+'**'+anestesiologo_val+'**'+ayudante_val+'**'+med_odonto_general_val+'**'+suma_val+'**'+op_liquida+'**'+Sala_id+'**'+sala_val+'**'+Materiales_id+'**'+materiales_val+'**'+SubTotal+'**'+porcentajes;
                $('#Aray_2').val($('#Aray_2').val()+Cadena);

            }/*FIn for*/
                        
            var Index_p = $('#Index_lista_p').val();
            for(i=1;i<Index_p;i++){
                var Productos_id = $('#Lista_P_id_'+i).val();
                var Productos_code = $('#Lista_P_code_'+i).val();
                var cantidad_prod = $('#Lista_P_cantidad_'+i).val();
                var valor_up = $('#lista_valor_up_'+i).val();

                var productos = ','+Productos_id+'**'+Productos_code+'**'+cantidad_prod+'**'+valor_up;
                $('#Aray_3').val($('#Aray_3').val()+productos);    
            }
                                            
            var datos_cadena = $('#Aray_2').val();
            var datos_producto = $('#Aray_3').val();
            $.ajax({
                url: 'liquidador/ventana_factura/', 
                type: 'GET',
                //cache: false,
                dataType: 'json',
                data: ({
                    actionID: 'ventana_factura',
                    FechaFac:fechaFac,
                    termPag:termPag[0],
                    fechVen:fechVen,
                    desc:desc,
                    retefuente:retefuente,
                    ica:ica,
                    forPag:forPag,
                    notas:notas,
                    id_tarifario:id_tarifario,
                    anio:anio,
                    Total:Total,
                    Index:Index,
                    datos_cadena:datos_cadena,
                    id_paciente:id_paciente,
                    datos_producto:datos_producto
                }),
                beforeSend: function(){
                    $("#resultado_datos2").html("Generando Factura..."); //Muestra mensaje mientras se ejecuta el proceso.
                },
                //error:function(objeto, quepaso, otroobj){alert('Error de Conexión , Favor Vuelva a Intentar')},
                success: function(data){
                    if(data.val=='FALSE'){
                                        
                        jAlert(data.descrip,'ERROR');
                        return false;
                    }else if(data.val=='TRUE'){
                                        
                        $("#resultado_datos2").html("Factura Generada...");
                        var invoiceid = data.invoiceid;
                        window.open("facturaLiquidador.php?var="+invoiceid+"&pos=0");
                    }    
                            
                }/*data*/
            });
                                            
        }
    });
}
        