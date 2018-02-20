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
        url:'/pdf',
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
        subtotalAnexo: 0,
        totalAnexo: 0,
        anexo6:0,
        anexo9:0,
        anexo12:0,
        anexo15:0,
        anexo18:0,
        anexo22:0,
        anexo28:0,
        anexo31:0,
        anexo38:0,
        anexo43:0,
        anexo47:0,
        anexo51:0,
        anexo54:0,
        anticipo:0,
        totalIva:0
    },
    watch:{
        anexo6: function () {
            this.getTotal();
        },
        anexo9: function () {
            this.getTotal();
        },
        anexo12: function () {
            this.getTotal();
        },
        anexo15: function () {
            this.getTotal();
        },
        anexo18: function () {
            this.getTotal();
        },
        anexo22: function () {
            this.getTotal();
        },
        anexo28: function () {
            this.getTotal();
        },
        anexo31: function () {
            this.getTotal();
        },
        anexo38: function () {
            this.getTotal();
        },
        anexo43: function () {
            this.getTotal();
        },
        anexo47: function () {
            this.getTotal();
        },
        anexo51: function () {
            this.getTotal();
        },
        anexo54: function () {
            this.getTotal();
        },
        anticipo: function () {
            this.getTotal();
        }

    },
    methods: {

        getTotal: function () {
            this.subtotalAnexo= parseFloat(this.anexo6)+parseFloat(this.anexo9)+parseFloat(this.anexo12)+parseFloat(this.anexo15)
                +parseFloat(this.anexo18)+parseFloat(this.anexo22)+parseFloat(this.anexo28)+parseFloat(this.anexo31)+parseFloat(this.anexo38)
                +parseFloat(this.anexo43)+parseFloat(this.anexo47)+parseFloat(this.anexo51)+parseFloat(this.anexo54)
            ;
           this.subtotalAnexo=this.subtotalAnexo;
            var iva= 1.15;
            var res = this.subtotalAnexo / iva ;
            this.totalIva =this.subtotalAnexo* .16;
            this.totalAnexo = (this.subtotalAnexo + this.totalIva)-this.anticipo;
            this.totalIva= this.redondea(this.totalIva,2);
            this.totalAnexo= this.redondea(this.totalAnexo,2);
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