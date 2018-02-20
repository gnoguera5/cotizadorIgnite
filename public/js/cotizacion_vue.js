/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var MyComponent = __webpack_require__(1)
Vue.component('vueTypeahead', MyComponent);

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
        total_cotizacion:0

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
        if(tipoCotizacion==2 || tipoCotizacion==3){
            this.$http.get('/findCotizacionById/'+cotizacion_id).then(function(response) {
                console.log(response.data);
                var result = response.data;
                var logo = result.logo;
                var paramsCotizacion = result.paramsCotizacion;
                var totalCatalogos = result.totalCatalogos;
                var i = 0;
                for ( i = 0; i < totalCatalogos; i++) {
                    this.rows_cotizacion.push({ tipo_producto: paramsCotizacion.tipo_producto[i], descripcion: paramsCotizacion.descripcion[i],
                        cantidad: paramsCotizacion.cantidad[i],precio_unitario:paramsCotizacion.precio_unitario[i],
                        total: paramsCotizacion.total[i]
                    });
                }

                $("input[name=logo][value=" + logo + "]").prop('checked', true);
                $('#requisicion').val(result.requisicion);
                $('#empresa').val(result.empresa);
                $('#validez').val(result.validez);
                $('#tiempo_entrega').val(result.tiempo_entrega);

                this.rows_clientes.push({ id: result.id, nombre: result.nombre, correo: result.correo, telefono: result.telefono });

                this.subtotal_cotizacion = result.subtotal;
                this.iva_cotizacion = result.iva;
                this.total_cotizacion = result.total;

            }, function(error) {
                console.log(error);
            });
        }
    },

    methods: {
        selectProducto: function(tipo_producto, descripcion) {
            this.rows_cotizacion.push({ tipo_producto: tipo_producto, descripcion: descripcion,
                cantidad:0,precio_unitario:0,
                total: 0
            });
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
            var precio_unitario = parseFloat($('#precio_unitario' + id_cotizacion + '').val()) || 0;
            var suma = cantidad + precio_unitario;
            $('#total' + id_cotizacion + '').val(suma);
        },
        getTotal: function() {
            var subtotal = 0;
            this.rows_cotizacion.forEach(function(element, index) {
                var total = parseFloat($('#total' + index + '').val()) || 0;
                subtotal += total;
            }, this);
            var totalIva = subtotal * .16;
            $('#subtotal').val(subtotal);
            $('#iva').val(totalIva);
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
            $('#frm_cotizacion').append('<input type="hidden" name="TotalCotizacion" value="'+this.rows_cotizacion.length+'" />');
            var dataString = $("#frm_cliente, #frm_logo , #frm_cotizacion , #frm_requisicion").serialize();
            //precio_unitario

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

                    $('#loadspinner').hide();
                }
            });
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/manuel/Sites/php/ignite/public/js/VueTypeahead.vue Unexpected token (1:0)\nYou may need an appropriate loader to handle this file type.\n| <template>\n|   <input ref=\"input\" class=\"typeahead-suggestions\"\n|          :class=\"classes\"");

/***/ })
/******/ ]);