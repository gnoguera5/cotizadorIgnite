window.Fuse = Fuse;
Vue.http.headers.common['X-CSRF-TOKEN'] = $('#_token').val();
new Vue({
    el: '#app',
    data: {
        fuse: null,
        search: '',
        list: [],
        result: [],
        fuseCatalogos: null,
        catalogos: [],
        resultCatalogos: [],
        searchCatalogos: '',
        /* agregar filas */
        rows_cotizacion: [],
        rows_clientes: [],
        subtotal_cotizacion:0,
        iva_cotizacion:0,
        total_cotizacion:0,
        tipo_moneda : "",
        msgErrors: {},
        errors: false

    },
    mounted() {
        var options = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ["nombre", "apellidopaterno", "apellidomaterno", "correo", "telefono"]
        };

        var tipoCotizacion = $('#tipoCotizacion').val();
        var cotizacion_id = $('#cotizacion_id').val();
        /* opciones para catalogo */
        var options_catalogos = {
            shouldSort: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ["tipo_producto", "descripcion"]
        };

        this.$http.get('/getClientes').then(function(response) {
            this.list = response.data;
            this.fuse = new window.Fuse(this.list, options);
            this.result = this.list
        }, function(error) {
            console.log(error);
        });

        this.$http.get('/getCatalogos').then(function(response) {
            this.catalogos = response.data;
            this.fuseCatalogos = new window.Fuse(this.catalogos, options_catalogos);
            this.resultCatalogos = this.catalogos
        }, function(error) {
            console.log(error);
        });
        if(tipoCotizacion==2){
            this.$http.get('/findCotizacionById/'+cotizacion_id).then(function(response) {
                console.log(response.data);
                var result = response.data;
                var logo = result.logo;
                var paramsCotizacion = result.paramsCotizacion;
                var totalCatalogos = result.totalCatalogos;
                var i = 0;
                // for ( i = 0; i < totalCatalogos; i++) {
                //     this.rows_cotizacion.push({ tipo_producto: paramsCotizacion.tipo_producto[i], descripcion: paramsCotizacion.descripcion[i],
                //         cantidad: paramsCotizacion.cantidad[i],precio_unitario:paramsCotizacion.precio_unitario[i],
                //         total: paramsCotizacion.total[i]
                //     });
                // }

                $("input[name=logo][value=" + logo + "]").prop('checked', true);
                $('#requisicion').val(result.requisicion);
                $('#empresa').val(result.empresa);
                $('#validez').val(result.validez);
                $('#tiempo_entrega').val(result.tiempo_entrega);

                $('#nombre_cliente').val(result.nombre);
                $('#cliente_id').val(result.id);
                $('#pnombre_cliente').html(result.nombre);
                $('#forma_de_pago option[value='+result.forma_de_pago+']').attr('selected','selected');

                $('#garantia').val(result.garantia);

                this.rows_clientes.push({ id: result.id, nombre: result.nombre, correo: result.correo, telefono: result.telefono });

                this.subtotal_cotizacion = this.redondea(result.subtotal,2);
                this.iva_cotizacion = this.redondea(result.iva,2);
                this.total_cotizacion = this.redondea(result.total,2);

            }, function(error) {
                console.log(error);
            });
        }
    },

    methods: {
        selectProducto: function(tipo_producto, descripcion) {
            this.rows_cotizacion.push({ tipo_producto: tipo_producto, descripcion: descripcion,
                cantidad:1,precio_unitario:'',
                total: ''
            });
        },
        hideProducts:function () {
            $('#m_catalogos').modal('hide')
        },
        selectonCatalogos:function (tipo_producto, descripcion,precio_unitario) {
            var contador_elementos = $('#contador_elementos').val()*1;
            var TotalCotizacion = $('#TotalCotizacion').val()*1;
            contador_elementos = contador_elementos +1
            TotalCotizacion = TotalCotizacion +1
            $('#contador_elementos').val(contador_elementos);
            $('#TotalCotizacion').val(TotalCotizacion);
            agregarElementos(contador_elementos,descripcion,tipo_producto,precio_unitario,1,'');
            getTotalRow(contador_elementos);
            getTotal();
        },
        quitarProducto: function(row) {
            console.log(row)
            console.log(this.rows_cotizacion);
            this.rows_cotizacion.splice(row, 1);
        },
        selectCliente: function(id, nombre, correo, telefono, row) {
            this.rows_clientes.length = 0;
            this.rows_clientes.push({ id: id, nombre: nombre, correo: correo, telefono: telefono });
        },
        quitarCliente: function(row) {
            this.rows_clientes.splice(row, 1);
        },
        getTotalRow: function(id_cotizacion) {

            var cantidad = parseFloat($('#cantidad' + id_cotizacion + '').val()) || 0;
            var tipo_precio = ('#tipo_precio').val();
            if(tipo_precio!=1){
                var precio_unitario = parseFloat($('#precio_unitario' + id_cotizacion + '').val()) || 0;
                var suma = cantidad * precio_unitario;
                var tipo_moneda = $('#tipo_moneda').val();
                if(tipo_moneda==1){
                    var dolar = parseFloat($('#dolar').val());
                    suma = suma * dolar
                }
                $('#total' + id_cotizacion + '').val(suma);
            }


        },
        getTotal: function() {
            var subtotal = 0;
            console.log('aqui');
            this.rows_cotizacion.forEach(function(element, index) {
                var total = parseFloat($('#total' + index + '').val()) || 0;
                subtotal += total;

            }, this);
            var totalIva = subtotal * .16;
            $('#subtotal').val(this.redondea(subtotal,2));
            $('#iva').val(this.redondea(totalIva,2));
            $('#total').val(this.redondea(subtotal + totalIva, 2));
        },
        redondea: function(sVal, nDec) {
            var n = parseFloat(sVal);
            var s = "0.00";
            if (!isNaN(n)) {
                n = Math.round(n * Math.pow(10, nDec)) / Math.pow(10, nDec);
                s = String(n);
                s += (s.indexOf(".") == -1 ? "." : "") + String(Math.pow(10, nDec)).substr(1);
                s = s.substr(0, s.indexOf(".") + nDec + 1);
            }
            return s;
        },

        guardarContrato: function() {
            $('#loadspinner').show();
            var dataString = $("#frm_cliente, #frm_logo , #frm_cotizacion , #frm_requisicion").serialize();

            $.ajax({
                type:'POST',
                url:'/cotizaciones',
                data:dataString,
                dataType: "json",
                headers: {'X-CSRF-TOKEN': $('#_token').val()},
                success:function(data){
                    $('#loadspinner').hide();
                    window.location.href = '/cotizaciones';
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log('Fallo')
                    $('#loadspinner').hide();
                }
            });
        },
        save_client:function(){
            var dataString = $("#frm_add_cliente").serialize();
            var self = this;
            self.errors = false;
            self.msgErrors = {};
            $.ajax({
                type:'POST',
                url:'/clientes',
                data:dataString,
                dataType: "json",
                headers: {'X-CSRF-TOKEN': $('#_token').val()},
                success:function(data){
                    
                    document.getElementById("frm_add_cliente").reset();
                    $('#m_add_clientes').modal('hide');   
                    alert('Cliente agregado');
                    //window.location.href = '/cotizaciones';
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    self.errors = true;
                    var msgErrors=XMLHttpRequest.responseText;
                    var response = JSON.parse(msgErrors);
                    $.each( response, function( key, value) {
                        self.msgErrors[key]=(""+value).replace("^\\[|\\]$", "");
                    });
                    //this.errors[key]=(""+result[key]).replace("^\\[|\\]$", "");

                }
            });
        },
        copyToClipboard: function(valor){
            console.log(valor);
            var ruta = $('#base_url_pdf').val();
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(ruta+'/'+valor).select();
            document.execCommand("copy");
            $temp.remove();
        },
        selectUserById:function (id,nombre) {
            $('#pnombre_cliente').html(nombre);
            $('#cliente_id').val(id);
            $('#nombre_cliente').val(nombre);
            $('#m_clientes').modal('hide')
        }


    },
    watch: {
        search() {
            if (this.search.trim() === '')
                this.result = this.list
            else
                this.result = this.fuse.search(this.search.trim())
        },
        searchCatalogos() {
            if (this.searchCatalogos.trim() === '')
                this.resultCatalogos = this.catalogos
            else
                this.resultCatalogos = this.fuseCatalogos.search(this.searchCatalogos.trim())
        }
    }
});


function agregarElementoVacio() {
    var contador_elementos = $('#contador_elementos').val()*1;
    var TotalCotizacion = $('#TotalCotizacion').val()*1;
    contador_elementos = contador_elementos +1
    TotalCotizacion = TotalCotizacion +1
    $('#contador_elementos').val(contador_elementos);
    $('#TotalCotizacion').val(TotalCotizacion);

    agregarElementos(contador_elementos,'','',0,1,'');
}

function agregarElementos(index,descripcion,tipo_producto,precio_unitario = 0,cantidad,total) {
    console.log('preciounitario'+precio_unitario);
    var rTotal = total||0
    var tipo_precio = $('#tipo_precio').val();
    var punitario = '';
    if (tipo_precio == '1' && index==0){
        punitario = 'block';
    }else{
        punitario = 'none';
    }

    if(tipo_precio!='1'){
        punitario='block';
    }
    console.log('total'+rTotal);
    console.log('index'+index);
    $("#table_catalogs  > tbody")
    .append($('<tr id="row'+index+'">')
        .append($('<td>')
            .append($('<input type="text" onchange="getTotalRow('+index+'); getTotal('+index+')" id="cantidad'+index+'"  name="cantidad'+index+'" value="'+cantidad+'">'
            +'<input type="hidden" id="descripcion'+index+'" name="descripcion'+index+'" value="'+descripcion+'">'
            + '<input type="hidden" id="tipo_producto'+index+'" name="tipo_producto'+index+'" value="'+tipo_producto+'">'
           )

            )
        )
        .append($('<td>')
            .append($('<input type="text" '+descripcion+' onchange="" id="descripcion'+index+'" name="descripcion'+index+'" value="'+descripcion+'"> '))
        )
        .append($('<td>')
            .append($('<input type="text" style="display:'+punitario+'"  onchange="getTotalRow('+index+'); getTotal('+index+')" id="precio_unitario'+index+'" name="precio_unitario'+index+'" value="'+parseFloat(precio_unitario).toFixed(2)+'"> '))
        )
        .append($('<td>')
            .append($('<input type="text" style="display:'+punitario+'"  onchange="getTotal()"  id="total'+index+'" name="total'+index+'" value="'+rTotal+'" >')

            )
        )
        .append($('<td>')
            .append($('<input type="button"   value="Quitar" onclick="remover_row('+index+')"  class="btn btn-s btn-primary">')

            )
        )

    );

    $('#tfoot').show();

}

function remover_row(index) {
    var contador_elementos = $('#contador_elementos').val()*1;
    var TotalCotizacion = $('#TotalCotizacion').val()*1;
    contador_elementos = contador_elementos-1||0;
    TotalCotizacion = TotalCotizacion-1||0;
    $('#contador_elementos').val(contador_elementos);
    $('#TotalCotizacion').val(TotalCotizacion);

    $('#row'+index+'').remove();
    getTotal(contador_elementos);
    if (contador_elementos<0) {
        $('#tfoot').hide();
    }
}

function getTotalRow(index) {
    var cantidad = $('#cantidad'+index+'').val();
    var precio_unitario = $('#precio_unitario'+index+'').val();
    var total = redondea(cantidad*precio_unitario,2);
    var tipo_moneda = $('#tipo_moneda').val();
    var tipo_precio = $('#tipo_precio').val();

    //if(tipo_precio!=1){
        if(tipo_moneda==1){
            var dolar = parseFloat($('#dolar').val());
            total = total * dolar
        }
        $('#total'+index+'').val(total);
   // }

}

function redondea(sVal, nDec) {
    var n = parseFloat(sVal);
    var s = "0.00";
    if (!isNaN(n)) {
        n = Math.round(n * Math.pow(10, nDec)) / Math.pow(10, nDec);
        s = String(n);
        s += (s.indexOf(".") == -1 ? "." : "") + String(Math.pow(10, nDec)).substr(1);
        s = s.substr(0, s.indexOf(".") + nDec + 1);
    }
    return s;
}

function getTotal(index) {
    var contador_elementos = $('#contador_elementos').val()*1;
    var subtotal = 0;
    for (var index = 0; index <= contador_elementos; index++) {
        var total = parseFloat($('#total' + index + '').val()) || 0;
        subtotal += total;
        console.log('index'+index)
        console.log('total'+total)
        console.log('subtotal'+subtotal)
    }
    console.log('aqui se calcula el total');
    console.log('contador_elementos'+contador_elementos);
    console.log('index'+index);
    console.log('subtotal'+subtotal);

    var totalIva = subtotal * .16;
    $('#subtotal').val(this.redondea(subtotal,2));
    $('#iva').val(this.redondea(totalIva,2));
    $('#total').val(this.redondea(subtotal + totalIva, 2));
}
$(document).ready(function(){
    var tipoCotizacion = $('#tipoCotizacion').val();
    var cotizacion_id = $('#cotizacion_id').val();

    if(tipoCotizacion=='2' || tipoCotizacion=='3'){

        $.ajax({
            type:'GET',
            url:'/findCotizacionById/'+cotizacion_id,
            //data:dataString,
            dataType: "json",

            success:function(result){


                var logo = result.logo;
                var paramsCotizacion = result.paramsCotizacion;
                var totalCatalogos = result.totalCatalogos;
                var contador_elementos = result.contador_elementos;
                var TotalCotizacion = result.TotalCotizacion;
                var cliente_id= result.id;
                var nombre_cliente= result.nombre;
                var requisicion = result.requisicion;
                var empresa = result.empresa;
                var tipo_precio = result.tipo_precio;


                console.log(result);

                var tipo_moneda = result.tipo_moneda;
                $('#tipo_moneda option[value='+tipo_moneda+']').attr('selected','selected');
                $('#tipo_precio option[value='+tipo_precio+']').attr('selected','selected');
                if(tipo_moneda==1){
                    $( "#dolar" ).prop( "disabled", false );
                    $( "#dolar" ).val(result.dolar);
                }


                $('#contador_elementos').val(contador_elementos)
                $('#TotalCotizacion').val(TotalCotizacion)

                $('#requisicion').val(requisicion)
                $('#empresa').val(empresa)


                $('#cliente_id').val(cliente_id);
                $('#nombre_cliente').val(nombre_cliente);
                $('#pnombre_cliente').html(nombre_cliente);

                var i = 0;
                for ( i = 0; i <= contador_elementos; i++) {
                    console.log(i);
                    agregarElementos(i,paramsCotizacion.descripcion[i],paramsCotizacion.tipo_producto[i],paramsCotizacion.precio_unitario[i],paramsCotizacion.cantidad[i],paramsCotizacion.total[i]);
                    getTotalRow(i);
                    getTotal(i);
                    //
                    /* this.rows_cotizacion.push({ tipo_producto: paramsCotizacion.tipo_producto[i], descripcion: paramsCotizacion.descripcion[i],
                        cantidad: paramsCotizacion.cantidad[i],precio_unitario:paramsCotizacion.precio_unitario[i],
                        total: paramsCotizacion.total[i]
                    }); */
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

                $('#loadspinner').hide();
            }
        });
    }

});