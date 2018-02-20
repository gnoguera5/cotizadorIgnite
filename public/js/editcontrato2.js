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
                $("input[name='nombre_consumidor']").val(data.data.nombre);
                $("input[name='declaraciones8']").val(data.data.ciudad);
                $("input[name='declaraciones10']").val(data.data.telefono);
                $("input[name='declaraciones9']").val(data.data.rfc);
                $("input[name='declaraciones11']").val(data.data.correo);



                console.log('2');

                $("#wizard").bwizard("next");
            }else{
                alert('El usuario no tiene un perfíl');
            }
            console.log(data.id);
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

function generatePdfContraro2() {
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
            var subtotalAnexo=$("input[name=subtotalAnexo]").val();
            var totalAnexo=$("input[name=totalAnexo]").val();
            var anexo2=$("input[name=anexo2]").val();
            var anexo3=$("input[name=anexo3]").val();
            var anexo4=$("input[name=anexo4]").val();
            var anexo5=$("input[name=anexo5]").val();
            var anexo6=$("input[name=anexo6]").val();
            var anexo7=$("input[name=anexo7]").val();
            var anexo8=$("input[name=anexo8]").val();
            var anexo9=$("input[name=anexo9]").val();
            var anexo10=$("input[name=anexo10]").val();
            var anexo12=$("input[name=anexo12]").val();
            var anexo14=$("input[name=anexo14]").val();
            var anexo17=$("input[name=anexo17]").val();
            var anexo19=$("input[name=anexo19]").val();
            var anexo21=$("input[name=anexo21]").val();
            var anticipo=$("input[name=anexo25]").val();
            var totalIva=$("input[name=totalIva]").val();
            var subtotal = 0;

            subtotal= parseFloat(anexo2)+parseFloat(anexo3)+parseFloat(anexo4)+parseFloat(anexo5)
                +parseFloat(anexo6)+parseFloat(anexo7)+parseFloat(anexo8)+parseFloat(anexo9)+parseFloat(anexo10)
                +parseFloat(anexo12)+parseFloat(anexo14)+parseFloat(anexo17)+parseFloat(anexo19)+parseFloat(anexo21)
            ;
            $("input[name=subtotalAnexo]").val(subtotal);
            var iva= 1.15;

            var tIva =subtotal* .16;
            var tAnexo = (subtotal + tIva)-anticipo;
            tIva= this.redondea(tIva,2);
            tAnexo= this.redondea(tAnexo,2);

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