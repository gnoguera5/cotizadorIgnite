window.Fuse = Fuse;
Vue.http.headers.common["X-CSRF-TOKEN"] = $("#_token").val();

new Vue({
  el: "#app",
  data: {
    fuse: null,
    search: "",
    list: [],
    result: [],
    fuseCatalogos: null,
    catalogos: [],
    resultCatalogos: [],
    searchCatalogos: "",
    /* agregar filas */
    rows_cotizacion: [],
    rows_clientes: [],
    subtotal_cotizacion: 0,
    iva_cotizacion: 0,
    total_cotizacion: 0,
    tipo_moneda: "",
    dolar: 0,
    exchange:''
  },
  mounted() {
    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "nombre",
        "apellidopaterno",
        "apellidomaterno",
        "correo",
        "telefono"
      ]
    };

    var tipoCotizacion = $("#tipoCotizacion").val();
    var cotizacion_id = $("#cotizacion_id").val();
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

    this.$http.get("/getClientes").then(
      function(response) {
        this.list = response.data;
        this.fuse = new window.Fuse(this.list, options);
        this.result = this.list;
      },
      function(error) {
        console.log(error);
      }
    );

    this.$http.get("/getCatalogos").then(
      function(response) {
        this.catalogos = response.data;
        this.fuseCatalogos = new window.Fuse(this.catalogos, options_catalogos);
        this.resultCatalogos = this.catalogos;
      },
      function(error) {
        console.log(error);
      }
    );

    if (tipoCotizacion == 2) {
      this.$http.get("/findPrecotizacionById/" + cotizacion_id).then(
        function(response) {
          var result = response.data;
          var logo = result.logo;
          var paramsCotizacion = result.paramsCotizacion;
          var totalCatalogos = result.TotalCotizacion;

          $("#exchange").val(result.exchange);

          /*
          for (var i = 0; i < totalCatalogos; i++) {
            this.rows_cotizacion.push({
              descripcion: paramsCotizacion.descripcion[i],
              componente: paramsCotizacion.componente[i],
              total: paramsCotizacion.total[i],
              total10: paramsCotizacion.total10[i],
              total15: paramsCotizacion.total15[i],
              total20: paramsCotizacion.total20[i],
              totaldls: paramsCotizacion.totaldls[i],
              totaldlsiva: paramsCotizacion.totaldlsiva[i]
            });
          }

          $("input[name=logo][value=" + logo + "]").prop("checked", true);
          $("#requisicion").val(result.requisicion);
          $("#empresa").val(result.empresa);
          $("#validez").val(result.validez);
          $("#tiempo_entrega").val(result.tiempo_entrega);

          $("#nombre_cliente").val(result.nombre);
          $("#cliente_id").val(result.id);
          $("#pnombre_cliente").html(result.nombre);
          $("#forma_de_pago option[value=" + result.forma_de_pago + "]").attr(
            "selected",
            "selected"
          );

          $("#garantia").val(result.garantia);

          this.rows_clientes.push({
            id: result.id,
            nombre: result.nombre,
            correo: result.correo,
            telefono: result.telefono
          });

          this.subtotal_cotizacion = this.redondea(result.subtotal, 2);
          this.iva_cotizacion = this.redondea(result.iva, 2);
          this.total_cotizacion = this.redondea(result.total, 2);

          */
          for (var i = 0; i < totalCatalogos; i++) {
            var contador_elementos = $("#contador_elementos").val() * 1;
            var TotalCotizacion = $("#TotalCotizacion").val() * 1;
            contador_elementos = contador_elementos + 1;
            TotalCotizacion = TotalCotizacion + 1;
            $("#contador_elementos").val(contador_elementos);
            $("#TotalCotizacion").val(TotalCotizacion);

            agregarElementos(
              i,
              paramsCotizacion.componente[i],
              paramsCotizacion.descripcion[i],
              paramsCotizacion.total[i],
              paramsCotizacion.total10[i],
              paramsCotizacion.total15[i],
              paramsCotizacion.total20[i],
              paramsCotizacion.totaldls[i],
              paramsCotizacion.totaldlsiva[i]
            );
            // getTotalRow(i);
            getTotal(i);
          }
        },
        function(error) {
          console.log(error);
        }
      );
    } else {
      _.times(8, index => {
        if (index === 0) agregarElementoVacio("Procesador");
        if (index === 1) agregarElementoVacio("Tarjeta Madre");
        if (index === 2) agregarElementoVacio("Tarjeta de Video");
        if (index === 3) agregarElementoVacio("Disco Duro");
        if (index === 4) agregarElementoVacio("SSD");
        if (index === 5) agregarElementoVacio("Endriamiento");
        if (index === 6) agregarElementoVacio("Fuente de Poder");
        if (index === 7) agregarElementoVacio("Gabinete");
      });
    }
  },

  methods: {
    renderDolar: function() {
      return isNaN(this.dolar) || !this.dolar
        ? 0
        : parseFloat(this.dolar * 1.16).toFixed(2);
    },
    selectProducto: function(tipo_producto, descripcion) {
      this.rows_cotizacion.push({
        tipo_producto: tipo_producto,
        descripcion: descripcion,
        cantidad: 1,
        precio_unitario: "",
        total: ""
      });
    },
    hideProducts: function() {
      $("#m_catalogos").modal("hide");
    },
    selectonCatalogos: function(tipo_producto, descripcion, precio_unitario) {
      console.log("DOLARS", this.dolar);
      var contador_elementos = $("#contador_elementos").val() * 1;
      var TotalCotizacion = $("#TotalCotizacion").val() * 1;
      contador_elementos = contador_elementos + 1;
      TotalCotizacion = TotalCotizacion + 1;
      $("#contador_elementos").val(contador_elementos);
      $("#TotalCotizacion").val(TotalCotizacion);
      agregarElementos(
        contador_elementos,
        descripcion,
        tipo_producto,
        precio_unitario,
        1,
        ""
      );
      getTotalRow(contador_elementos);
      getTotal();
    },
    quitarProducto: function(row) {
      console.log(row);
      console.log(this.rows_cotizacion);
      this.rows_cotizacion.splice(row, 1);
    },
    selectCliente: function(id, nombre, correo, telefono, row) {
      this.rows_clientes.length = 0;
      this.rows_clientes.push({
        id: id,
        nombre: nombre,
        correo: correo,
        telefono: telefono
      });
    },
    quitarCliente: function(row) {
      this.rows_clientes.splice(row, 1);
    },
    getTotalRow: function(id_cotizacion) {
      var cantidad = parseFloat($("#cantidad" + id_cotizacion + "").val()) || 0;
      var tipo_precio = "#tipo_precio".val();
      if (tipo_precio != 1) {
        var precio_unitario =
          parseFloat($("#precio_unitario" + id_cotizacion + "").val()) || 0;
        var suma = cantidad * precio_unitario;
        var tipo_moneda = $("#tipo_moneda").val();
        if (tipo_moneda == 1) {
          var dolar = parseFloat($("#dolar").val());
          suma = suma * dolar;
        }
        $("#total" + id_cotizacion + "").val(suma);
      }
    },
    getTotal: function() {
      var subtotal = 0;
      console.log("aqui");
      this.rows_cotizacion.forEach(function(element, index) {
        var total = parseFloat($("#total" + index + "").val()) || 0;
        subtotal += total;
      }, this);
      var totalIva = subtotal * 0.16;
      $("#subtotal").val(this.redondea(subtotal, 2));
      $("#iva").val(this.redondea(totalIva, 2));
      $("#total").val(this.redondea(subtotal + totalIva, 2));
    },
    redondea: function(sVal, nDec) {
      var n = parseFloat(sVal);
      var s = "0.00";
      if (!isNaN(n)) {
        n = Math.round(n * Math.pow(10, nDec)) / Math.pow(10, nDec);
        s = String(n);
        s +=
          (s.indexOf(".") == -1 ? "." : "") +
          String(Math.pow(10, nDec)).substr(1);
        s = s.substr(0, s.indexOf(".") + nDec + 1);
      }
      return s;
    },
    guardarContrato: function() {
      $("#loadspinner").show();
      var dataString = $(
        "#frm_logo, #frm_cotizacion , #frm_requisicion"
      ).serialize();
      //precio_unitario

      console.log(dataString)

      $.ajax({
        type: "POST",
        url: "/precotizaciones",
        data: dataString,
        dataType: "json",
        headers: { "X-CSRF-TOKEN": $("#_token").val() },
        success: function(data) {
          $("#loadspinner").hide();

          console.log(data);
          window.location.href = "/precotizaciones";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          console.log({ XMLHttpRequest, textStatus, errorThrown });
          $("#loadspinner").hide();
        }
      });
    },
    copyToClipboard: function(valor) {
      console.log(valor);
      var ruta = $("#base_url_pdf").val();
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(ruta + "/" + valor).select();
      document.execCommand("copy");
      $temp.remove();
    },
    selectUserById: function(id, nombre) {
      $("#pnombre_cliente").html(nombre);
      $("#cliente_id").html(id);
      $("#nombre_cliente").html(nombre);
      $("#m_clientes").modal("hide");
    }
  },
  watch: {
    search() {
      if (this.search.trim() === "") this.result = this.list;
      else this.result = this.fuse.search(this.search.trim());
    },
    searchCatalogos() {
      if (this.searchCatalogos.trim() === "")
        this.resultCatalogos = this.catalogos;
      else
        this.resultCatalogos = this.fuseCatalogos.search(
          this.searchCatalogos.trim()
        );
    },
    exchange(){
      var TotalCotizacion = $('#TotalCotizacion').val();
      for (var index = 0; index < TotalCotizacion; index++) {
        getTotalDLS(index);
        
      }
    }
  }
});

function getTotalInDollars(dollarVal, pesos, withIva = false) {
  if (isNaN(dollarVal) || isNaN(pesos)) return 0;
  return withIva ? pesos * 1.16 * dollarVal : pesos * dollarVal;
}

function getTotalWithMultiplier(total, multipler = 1) {
  return (total * multipler).toFixed(2);
}

function agregarElementoVacio(componente = "") {
  var contador_elementos = $("#contador_elementos").val() * 1;
  var TotalCotizacion = $("#TotalCotizacion").val() * 1;
  contador_elementos = contador_elementos + 1;
  TotalCotizacion = TotalCotizacion + 1;
  $("#contador_elementos").val(contador_elementos);
  $("#TotalCotizacion").val(TotalCotizacion);

  agregarElementos(contador_elementos, componente);
}

function agregarElementos(
  index,
  componente,
  descripcion = '',
  total = 0,
  total10 = 0,
  total15 = 0,
  total20 = 0,
  totaldls = 0,
  totaldlsiva = 0
) {
  var rTotal = total || 0;
  var tipo_precio = $("#tipo_precio").val();
  var punitario = "";
  if (tipo_precio == 1) {
    punitario = "disabled";
  }

  $("#table_catalogs  > tbody").append(
    $('<tr id="row' + index + '">')
      .append(
        $("<td>").append(
          $(`<input readonly type="text" id='componente${index}' name='componente${index}' value='${componente}' />`)
        )
      )
      .append(
        $("<td>").append(
          $(`<input type="text" id='descripcion${index}' name='descripcion${index}' value='${descripcion}' />`)
        )
      )
      .append(
        $("<td>").append(
          $(`<input type="text" onchange='getTotalDLS(${index}); getTotal(${index});' id='totaldls${index}' name='totaldls${index}' value='${totaldls}' />`)
        )
      )
      .append(
        $("<td>").append(
          $(`<input readonly type="text" id='totaldlsiva${index}' name='totaldlsiva${index}' value='${totaldlsiva}' />`)
        )
      )
      .append(
        $("<td>").append(
          $(`<input readonly type="text" id='total${index}' name='total${index}' value='${total}' />`)
        )
      )
      .append(
        $("<td>").append(
          $(`<input readonly type="text" id='total10${index}' name='total10${index}' value='${total10}' />`)
        )
      )
      .append(
        $("<td>").append(
          $(`<input readonly type="text" id='total15${index}' name='total15${index}' value='${total15}' />`)
        )
      )
      .append(
        $("<td>").append(
          $(`<input readonly type="text" id='total20${index}' name='total20${index}' value='${total20}' />`)
        )
      )
  );

  $("#tfoot").show();
}

function remover_row(index) {
  var contador_elementos = $("#contador_elementos").val() * 1;
  var TotalCotizacion = $("#TotalCotizacion").val() * 1;
  contador_elementos = contador_elementos - 1 || 0;
  TotalCotizacion = TotalCotizacion - 1 || 0;
  $("#contador_elementos").val(contador_elementos);
  $("#TotalCotizacion").val(TotalCotizacion);

  $("#row" + index + "").remove();
  getTotal(contador_elementos);
  if (contador_elementos < 0) {
    $("#tfoot").hide();
  }
}

function getTotalRow(index, dolar) {
  var cantidad = $("#cantidad" + index + "").val();
  var precio_unitario = $("#precio_unitario" + index + "").val();
  var total = redondea(cantidad * precio_unitario, 2);
  var tipo_moneda = $("#tipo_moneda").val();
  var tipo_precio = $("#tipo_precio").val();
  var dolar = parseFloat($("#dolar").val());
  
  $("#total" + index + "").val(total);

  $("#total10" + index + "").val(getTotalWithMultiplier(total, 1.1));
  $("#total15" + index + "").val(getTotalWithMultiplier(total, 1.15));
  $("#total20" + index + "").val(getTotalWithMultiplier(total, 1.2));
  $("#totaldls" + index + "").val(getTotalInDollars(dolar, total));
  $("#totaldlsiva" + index + "").val(getTotalInDollars(dolar, total, true));

  if (tipo_precio != 1) {
   
  }
}

function getTotalDLS(index) {
  var total = redondea(parseFloat($("#totaldls" + index).val()),2);
  var dolar = parseFloat($("#exchange").val()) || 0;
  console.log('index-'+index);
  $("#totaldlsiva" + index + "").val(redondea(getTotalInDollars(1, total, true),2));
  $("#total" + index + "").val(getTotalWithMultiplier(total * dolar * 1.16, 1));
  $("#total10" + index + "").val(getTotalWithMultiplier(total * dolar * 1.16, 1.1));
  $("#total15" + index + "").val(getTotalWithMultiplier(total * dolar * 1.16, 1.15));
  $("#total20" + index + "").val(getTotalWithMultiplier(total * dolar * 1.16, 1.2));
}

function redondea(sVal, nDec) {
  var n = parseFloat(sVal);
  var s = "0.00";
  if (!isNaN(n)) {
    n = Math.round(n * Math.pow(10, nDec)) / Math.pow(10, nDec);
    s = String(n);
    s +=
      (s.indexOf(".") == -1 ? "." : "") + String(Math.pow(10, nDec)).substr(1);
    s = s.substr(0, s.indexOf(".") + nDec + 1);
  }
  return s;
}

function getTotal(index) {
  var contador_elementos = $("#contador_elementos").val() * 1;
  var total = 0;
  var total10 = 0;
  var total15 = 0;
  var total20 = 0;
  var totaldls = 0;
  var totaldlsiva = 0;

  for (var index = 0; index <= contador_elementos; index++) {
    total += parseFloat($("#total" + index + "").val()) || 0;
    total10 += parseFloat($("#total10" + index + "").val()) || 0;
    total15 += parseFloat($("#total15" + index + "").val()) || 0;
    total20 += parseFloat($("#total20" + index + "").val()) || 0;
    totaldls += parseFloat($("#totaldls" + index + "").val()) || 0;
    totaldlsiva += parseFloat($("#totaldlsiva" + index + "").val()) || 0;
  }

  $("#total").val(this.redondea(total, 2));
  $("#total10").val(this.redondea(total10, 2));
  $("#total15").val(this.redondea(total15, 2));
  $("#total20").val(this.redondea(total20, 2));
  $("#totaldls").val(this.redondea(totaldls, 2));
  $("#totaldlsiva").val(this.redondea(totaldlsiva, 2));
}

/**

$(document).ready(function(){
    var tipoCotizacion = $('#tipoCotizacion').val();
    var cotizacion_id = $('#cotizacion_id').val();

    if(tipoCotizacion=='2' || tipoCotizacion=='3'){

        $.ajax({
            type:'GET',
            url:'/findPrecotizacionById/'+cotizacion_id,
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
                    agregarElementos(i,paramsCotizacion.descripcion[i],paramsCotizacion.tipo_producto[i],paramsCotizacion.precio_unitario[i],paramsCotizacion.cantidad[i],paramsCotizacion.total[i], result.dolar);
                    getTotalRow(i);
                    getTotal(i);
                }
                for ( i = 0; i <= contador_elementos; i++) {
                    console.log(i);
                    agregarElementos(i,paramsCotizacion.descripcion[i],paramsCotizacion.tipo_producto[i],paramsCotizacion.precio_unitario[i],paramsCotizacion.cantidad[i],paramsCotizacion.total[i], result.dolar);
                    getTotalRow(i);
                    getTotal(i);
                    //
                    /* this.rows_cotizacion.push({ tipo_producto: paramsCotizacion.tipo_producto[i], descripcion: paramsCotizacion.descripcion[i],
                        cantidad: paramsCotizacion.cantidad[i],precio_unitario:paramsCotizacion.precio_unitario[i],
                        total: paramsCotizacion.total[i]
                    });
                }

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {

                $('#loadspinner').hide();
            }
        });
    }

});
                 */
