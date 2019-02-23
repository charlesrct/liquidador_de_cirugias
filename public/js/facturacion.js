  
//Funciones Jquery
$(document).ready(
    function()
    {
        $("#VerMasivo").hide('fast');
        $("#display").hide('fast');
        $("#error_fecha").hide('fast');
        $("#Masivo").click(comparar_fechas);
        $("#NomCliente").click(comparar_fechas);
        $("#termPag").change(suma_dias);
    }); 

function suma_dias()
{
    seleccion1=$(this).val();
    var seleccion = seleccion1.split('-');    
    if(seleccion[0] == 'xx') {
        alert('Seleccione un T�rmino de Facturaci�n');            
        return 0;
    }
    sumaDia=seleccion[1];
    fechaInicial = new Date($("#FechaFac").val()); //new Date(2010, 1, 22); // 22 de Marzo del 2010 -  los meses comienzan a contar desde 0
    fechaTermino1 = suma_fecha(sumaDia,fechaInicial); //calculo dias de vencemiento
    $("#fechVen").val(fechaTermino1);               //muestra la fecha de vencimiento en el formulario
}

function suma_fecha(sumaDia,fechaInicial)
{
    valorFechaTermino = fechaInicial.getTime(fechaInicial) + (sumaDia*24*60*60*1000); // ( d�as * horas * minutos * segundos * milisegundos )
    fechaTermino = new Date(valorFechaTermino);
    dia=fechaTermino.getDate()+1;
    mes=fechaTermino.getMonth()+1; //Los meses van de 0 a 11
    ano=fechaTermino.getFullYear();
    mes_ini=fechaInicial.getMonth()+1;
    var dias_mes = new Array(0, 1, -2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1); //Dias a sumar o restar para cada mes del a�os
    if(mes != mes_ini)      //verificamos si la fecha final es el mismo mes
    {
        var cantidad_meses=0;           //pasa de diciembre a enero?
        cantidad_meses = mes-mes_ini;
        if (cantidad_meses<0) {
            cantidad_meses= 12 + cantidad_meses;
        }
        var i =0;                   //Suma o resta de los dias de cada unos de los meses entre la fecha inicial y final
        for (i=0; i<cantidad_meses; i++){
            if (i!=0){
                mes_ini++;
            }
            if (mes_ini>12){             //pasa de diciembre a enero?
                mes_ini=mes_ini-12;
            }
            if(mes_ini==2){         //Es febrero de 28 o 29 dias?? verificando a�os bisiestos
                if ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0))){
                    //alert("Es bisiesto y febrero de 29 dias");
                    sumaDia++;
                }
            }
            sumaDia=parseInt(sumaDia)+parseInt(dias_mes[mes_ini]);            
        }
        
    }
    //Calculamos de nuevo la fecha final con la correccion de los meses de 31 dias y los 28/29 dias de febrero
    
    valorFechaTermino = fechaInicial.getTime(fechaInicial) + (sumaDia*24*60*60*1000); // ( d�as * horas * minutos * segundos * milisegundos )
    fechaTermino = new Date(valorFechaTermino);
    dia=fechaTermino.getDate()+1;
    mes=fechaTermino.getMonth()+1; //Los meses van de 0 a 11
    ano=fechaTermino.getFullYear();
    if (dia < 10){
        dia = "0"+dia;
    }
    if (mes < 10){
        mes = "0"+mes;
    }
    
    fechaTermino1=(ano+"-"+mes+"-"+dia);
    return fechaTermino1;
}

function Masivo()
{
    $("#VerMasivo").show('fast');	
    $("#display").hide('fast');
    $("#seleccion").show('fast');
    $("#error_fecha").hide('fast');
}
function NomCliente()
{
    $("#VerMasivo").hide('fast');	
    $("#display").show('fast');
    $("#seleccion").hide('fast');
    $("#error_fecha").hide('fast');
}
function comparar_fechas()
{
    fecha_ini=($("#fecha_inicial").val());
    fecha_fin=($("#fecha_final").val());
    if(fecha_fin<fecha_ini){
        $("#seleccion").show('fast');
        $("#VerMasivo").hide('fast');	
        $("#display").hide('fast');
        $("#error_fecha").show('fast');
        $("#Masivo").removeAttr("checked");
        $("#NomCliente").removeAttr("checked");
    }
    if ($('#NomCliente:checked').val() == 2)
    {
        $("#Masivo").removeAttr("checked");
        NomCliente();
    }
    if ($('#Masivo:checked').val() == 1)
    {
        $("#NomCliente").removeAttr("checked");
        Masivo();
    }
}


//Fin Funciones Jquery

