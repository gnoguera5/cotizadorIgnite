/**
 * Created by manuel on 14/07/17.
 */
function next(){
    $("#wizard").bwizard("next");
}


function saveUser(){

    var datos = $('#sUser').serialize();

    $('#errorsUser').html('');
    $.ajax({
        type:'POST',
        url:'/clientes',
        data:datos,
        dataType: "json",
        headers: {'X-CSRF-TOKEN': $('#_token').val()},
        success:function(data){
            location.reload();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#errorsUser').show();

            var msgErrors=XMLHttpRequest.responseText;
            var response = JSON.parse(msgErrors);
            errorString = '<ul>';
            $.each( response, function( key, value) {
                errorString += '<li>' + value + '</li>';
            });
            errorString += '</ul>';
            $('#errorsUser').html(errorString);

        }
    });
    event.preventDefault(); //prevent default action

}
function selectUser(user_id) {

    $.ajax({
        type:'GET',
        url:'/selectUser/'+user_id,
        dataType: "json",
        headers: {'X-CSRF-TOKEN': $('#_token').val()},
        success:function(data){
            if(data.status===200){ //se encontro un usuario con perfil
                $("input[name*='nombre_consumidor']").val(data.data.nombre);
                $("input[name*='declaraciones_fisica1']").val(data.data.nacionalidad);
                $("input[name*='declaraciones_fisica2']").val(data.data.correo);
                $("input[name*='declaraciones_fisica3']").val(data.data.telefono);
                $("input[name*='declaraciones_fisica4']").val(data.data.rfc);
                $("input[name*='declaraciones_fisica5']").val(data.data.calle);
                $("input[name*='declaraciones_fisica6']").val(data.data.numero);
                $("input[name*='declaraciones_fisica7']").val(data.data.colonia);
                $("input[name*='declaraciones_fisica8']").val(data.data.delegacion);
                $("input[name*='declaraciones_fisica9']").val(data.data.cp);
                $("input[name*='declaraciones_fisica10']").val(data.data.delegacion);

                $("#wizard").bwizard("next");
            }else{
                alert('El usuario no tiene un perfíl');
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {


        }
    });
}
function createUser() {
    $('#sUser').show();
    $('#tUser').hide();
}
function cancelUser() {
    $('#sUser').hide();
    $('#tUser').show();
    $('#errorsUser').hide();
}

function generatePdfContrato1() {
    var frmDeclaraciones = $('#frmDeclaraciones').serialize();
    var clausulas = $('#frmClausulas').serialize();
    var anexo = $('#frmAnexo').serialize();
    var dataString = $("#frmDeclaraciones, #frmClausulas , #frmAnexo").serialize();
    $('#loadspinner').show();
    $.ajax({
        type:'POST',
        url:'/contratos/update',
        data:dataString,
        dataType: "json",
        headers: {'X-CSRF-TOKEN': $('#_token').val()},
        success:function(data){
            console.log(data);
            $('#loadspinner').hide();
            console.log(data);
            if(data.status===200){ //se encontro un usuario con perfil
                window.location.href = '/contratos';
            }
            console.log(data.id);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#loadspinner').show();

        }
    });
}

new Vue({
    el: '#appAnexo',
    data: {

    },
    methods: {


        getTotal: function () {

            var subtotalAnexo = $("input[name=subtotalAnexo]").val();
            var totalAnexo=$("input[name=totalAnexo]").val();
            var anexo6=$("input[name=anexo6]").val();
            var anexo9=$("input[name=anexo9]").val();
            var anexo12=$("input[name=anexo12]").val();
            var anexo15=$("input[name=anexo15]").val();
            var anexo18=$("input[name=anexo18]").val();
            var anexo22=$("input[name=anexo22]").val();
            var anexo28=$("input[name=anexo28]").val();
            var anexo31=$("input[name=anexo31]").val();
            var anexo38=$("input[name=anexo38]").val();
            var anexo43=$("input[name=anexo43]").val();
            var anexo47=$("input[name=anexo47]").val();
            var anexo51=$("input[name=anexo51]").val();
            var anexo54=$("input[name=anexo54]").val();
            var anticipo=$("input[name=clausula7]").val();
            var totalIva=$("input[name=totalIva]").val();
            var subtotal = 0;
            subtotal= parseFloat(anexo6)+parseFloat(anexo9)+parseFloat(anexo12)+parseFloat(anexo15)+parseFloat(anexo18)+parseFloat(anexo22)+parseFloat(anexo28)+parseFloat(anexo31)+parseFloat(anexo38)+parseFloat(anexo43)+parseFloat(anexo47)+parseFloat(anexo51)+parseFloat(anexo54);
            $("input[name=subtotalAnexo]").val(subtotal);

            var iva= 1.15;

            var tIva =subtotal* .16;
            var tAnexo = (subtotal + tIva)-anticipo;
            tIva= this.redondea(tIva,2);
            tAnexo= this.redondea(tAnexo,2);
            console.log(subtotal);
            console.log(anticipo);
            console.log(tIva);
            console.log(tAnexo);
            $("input[name=totalIva]").val(tIva);
            $("input[name=totalAnexo]").val(tAnexo);

        },
        redondea:function (sVal, nDec) {
            var n = parseFloat(sVal);
            var s = "0.00";
            if (!isNaN(n)){
                n = Math.round(n * Math.pow(10, nDec)) / Math.pow(10, nDec);
                s = String(n);
                s += (s.indexOf(".") == -1? ".": "") + String(Math.pow(10, nDec)).substr(1);
                s = s.substr(0, s.indexOf(".") + nDec + 1);
            }
            return s;
        }

    }

});