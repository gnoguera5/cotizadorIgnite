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
        url:'/pdf',
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
        subtotalAnexo: 0,
        totalAnexo: 0,
        anexo2:0,
        anexo3:0,
        anexo4:0,
        anexo5:0,
        anexo6:0,
        anexo7:0,
        anexo8:0,
        anexo9:0,
        anexo10:0,
        anexo12:0,
        anexo14:0,
        anexo17:0,
        anexo19:0,
        anexo21:0,
        anticipo:0,
        totalIva:0
    },
    watch:{
        anexo2: function () {
            this.getTotal();
        },
        anexo3: function () {
            this.getTotal();
        },
        anexo4: function () {
            this.getTotal();
        },
        anexo5: function () {
            this.getTotal();
        },
        anexo6: function () {
            this.getTotal();
        },
        anexo7: function () {
            this.getTotal();
        },
        anexo8: function () {
            this.getTotal();
        },
        anexo9: function () {
            this.getTotal();
        },
        anexo10: function () {
            this.getTotal();
        },
        anexo12: function () {
            this.getTotal();
        },
        anexo14: function () {
            this.getTotal();
        },
        anexo17: function () {
            this.getTotal();
        },
        anexo19: function () {
            this.getTotal();
        },
        anexo21: function () {
            this.getTotal();
        },
        anticipo: function () {
            this.getTotal();
        }

    },
    methods: {

        getTotal: function () {
            this.subtotalAnexo= parseFloat(this.anexo2)+parseFloat(this.anexo3)+parseFloat(this.anexo4)+parseFloat(this.anexo5)
                +parseFloat(this.anexo6)+parseFloat(this.anexo7)+parseFloat(this.anexo8)+parseFloat(this.anexo9)+parseFloat(this.anexo10)
                +parseFloat(this.anexo12)+parseFloat(this.anexo14)+parseFloat(this.anexo17)+parseFloat(this.anexo19)+parseFloat(this.anexo21)
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